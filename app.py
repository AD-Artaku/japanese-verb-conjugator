import os
import json
import pykakasi
from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
from dotenv import load_dotenv
from JP_Verb_conjugator_v3 import Verb, honorific_godan_verb, HIRAGANA_PREFERRED

# =====================
# FURIGANA
# Initialise once at startup — pykakasi is slow to load.
# to_ruby(text) wraps each kanji run in <ruby>kanji<rt>reading</rt></ruby>.
# Hiragana/katakana/romaji tokens are returned as plain text.
# =====================
_kks = pykakasi.kakasi()

def _is_kanji(ch):
    return "一" <= ch <= "鿿"

def _is_kana(ch):
    return "぀" <= ch <= "ヿ"

def to_ruby(text):
    if not text:
        return text
    result = ""
    for item in _kks.convert(text):
        orig = item["orig"]
        hira = item["hira"]

        # No kanji in this token — output as-is
        if not any(_is_kanji(ch) for ch in orig):
            result += orig
            continue

        # Split orig into kanji prefix and trailing kana suffix (okurigana).
        # e.g. orig="食べる" → kanji_part="食", kana_suffix="べる"
        kanji_part  = orig.rstrip("".join(ch for ch in orig if _is_kana(ch)))
        kana_suffix = orig[len(kanji_part):]

        # Derive just the kanji reading by stripping the kana suffix from hira.
        # e.g. hira="たべる", kana_suffix="べる" → kanji_reading="た"
        if kana_suffix and hira.endswith(kana_suffix):
            kanji_reading = hira[: len(hira) - len(kana_suffix)]
        else:
            kanji_reading = hira

        if kanji_reading and kanji_reading != kanji_part:
            result += (
                f"<span class='kw'>"
                f"<span class='kb'>{kanji_part}</span>"
                f"<span class='kr'>{kanji_reading}</span>"
                f"</span>{kana_suffix}"
            )
        else:
            result += orig
    return result

load_dotenv()

app = Flask(__name__)

# temp below
from practice_routes import practice_bp
app.register_blueprint(practice_bp)

# Flask-Mail config
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.environ.get("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.environ.get("MAIL_PASSWORD")
app.config["MAIL_DEFAULT_SENDER"] = os.environ.get("MAIL_USERNAME")

mail = Mail(app)

# =====================
# VERB DICTIONARY LOAD
# Loaded once at startup — lookups are instant dict key access.
# =====================
VERB_DICT_PATH = os.path.join(os.path.dirname(__file__), "verb_dict.json")
with open(VERB_DICT_PATH, encoding="utf-8") as f:
    VERB_DICT = json.load(f)

# Valid dictionary form endings
VALID_ENDINGS = ("う", "く", "ぐ", "す", "つ", "ぬ", "ぶ", "む", "る")

# Patterns that are definitely NOT dictionary forms
INVALID_ENDINGS = ("い", "な", "だ", "た", "て", "で", "ば", "に",
                   "ない", "ます", "した", "って", "んで", "いて",
                   "いで", "して", "られ", "させ", "れば", "たら")

def is_all_hiragana(text):
    """Return True if every character is hiragana."""
    for ch in text:
        cp = ord(ch)
        if not (0x3040 <= cp <= 0x309F or ch == "ー"):
            return False
    return True

def is_valid_verb(verb):

    if not verb:
        return False

    # Allow known irregulars explicitly
    if verb in ["する", "くる", "来る"]:
        return True

    # Allow te+kuru compounds (持ってくる、走ってくる etc.)
    if verb.endswith(("てくる", "でくる")):
        return True

    # Allow honorific godan
    if verb in honorific_godan_verb:
        return True

    # Allow noun+する compounds
    if verb.endswith("する") and len(verb) > 2:
        return True

    # Reject known non-dictionary endings
    for ending in INVALID_ENDINGS:
        if verb.endswith(ending):
            return False

    # Must end in a u-row kana
    if verb.endswith(VALID_ENDINGS):
        return True

    return False


def _conjugate(user_verb):
    """
    Shared conjugation helper used by both the home and verb routes.
    Returns (resolved_verb, cards_dict) or raises ValueError.
    """
    user_verb = user_verb.strip()
    if not user_verb:
        raise ValueError("empty")

    if is_all_hiragana(user_verb):
        if user_verb not in VERB_DICT:
            raise ValueError("not found")
        if user_verb not in HIRAGANA_PREFERRED:
            user_verb = VERB_DICT[user_verb][0]

    if not is_valid_verb(user_verb):
        raise ValueError("invalid")

    v = Verb(user_verb)
    v.polite().negative()
    return user_verb, {k: to_ruby(val) for k, val in v.forms.items()}


@app.route("/", methods=["GET", "POST"])
def home():

    cards = None
    input_error = False

    if request.method == "POST" and "verb" in request.form:

        user_verb = (request.form.get("verb") or request.form.get("verb_desktop") or "").strip()

        if user_verb:
            try:
                user_verb, cards = _conjugate(user_verb)
            except ValueError:
                input_error = True

        # read toggles from POST
        show_polite = request.form.get("polite")
        show_negative = request.form.get("negative")

    else:
        # default both toggles ON for GET
        show_polite = "on"
        show_negative = "on"

    return render_template(
        "index.html",
        cards=cards,
        input_error=input_error,
        show_polite=show_polite,
        show_negative=show_negative
    )


# =====================
# SHAREABLE VERB URL
# /verb/食べる — renders the full conjugation table for a verb via GET.
# Bookmarkable, linkable, and indexable by search engines.
# =====================
@app.route("/verb/<path:verb>")
def verb_page(verb):
    cards = None
    input_error = False

    try:
        verb, cards = _conjugate(verb)
    except ValueError:
        input_error = True

    return render_template(
        "index.html",
        cards=cards,
        input_error=input_error,
        show_polite="on",
        show_negative="on",
        shared_verb=verb if cards else None,
    )


# =====================
# AJAX SEARCH ENDPOINT
# Returns conjugation data as JSON for the AJAX search.
# Called by fetch() in script.js — same logic as the form POST,
# but responds with JSON instead of rendering a template.
# =====================
@app.route("/api/search", methods=["POST"])
def api_search():
    data     = request.get_json()
    verb     = (data.get("verb") or "").strip()
    polite   = data.get("polite", True)
    negative = data.get("negative", True)

    if not verb:
        return jsonify({"ok": False, "error": "empty"}), 400

    try:
        resolved, cards = _conjugate(verb)
        return jsonify({
            "ok":       True,
            "verb":     resolved,
            "cards":    cards,
            "polite":   polite,
            "negative": negative,
        })
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 400


# =====================
# DEV LOG PAGE
# =====================
@app.route("/devlog")
def devlog():
    return render_template("devlog.html")


# =====================
# SUGGEST ENDPOINT
# Called by the frontend as the user types.
# Returns up to 8 kanji matches for a hiragana prefix.
# e.g. GET /suggest?q=たべ → ["食べる"]
# =====================
@app.route("/suggest")
def suggest():
    q = request.args.get("q", "").strip()

    if not q or not is_all_hiragana(q):
        return jsonify([])

    # Collect all readings that start with the query prefix,
    # then flatten to their kanji forms (deduplicated, order preserved).
    seen = set()
    results = []

    for reading, kanji_list in VERB_DICT.items():
        if reading.startswith(q):
            for kanji in kanji_list:
                if kanji not in seen:
                    seen.add(kanji)
                    results.append({"reading": reading, "kanji": kanji})

        if len(results) >= 8:
            break

    return jsonify(results)


@app.route("/send_message", methods=["POST"])
def send_message():

    data = request.get_json()
    message_body = data.get("message", "").strip()

    if not message_body:
        return jsonify({"success": False, "error": "Empty message"}), 400

    try:
        msg = Message(
            subject="お問い合わせ - 日本語動詞変換ツール",
            recipients=["artakusanjp@gmail.com"],
            body=message_body
        )
        mail.send(msg)
        return jsonify({"success": True})

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)