import os
import json
from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
from dotenv import load_dotenv
from JP_Verb_conjugator_v3 import Verb, honorific_godan_verb, HIRAGANA_PREFERRED

load_dotenv()

app = Flask(__name__)

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


@app.route("/", methods=["GET", "POST"])
def home():

    cards = None
    input_error = False

    if request.method == "POST" and "verb" in request.form:

        user_verb = (request.form.get("verb") or request.form.get("verb_desktop") or "").strip()

        if user_verb:
            # =====================
            # HIRAGANA AUTO-RESOLVE
            # If input is hiragana-only and has exactly one kanji match,
            # silently swap it in. If multiple matches, the frontend
            # dropdown should have handled it — we still pick the first
            # as a safe fallback here.
            # =====================
            if is_all_hiragana(user_verb):
                # Hiragana input must exist in the dictionary —
                # rejects nonsense like かえるかえる that would
                # otherwise pass is_valid_verb by ending in る.
                if user_verb not in VERB_DICT:
                    input_error = True
                else:
                    if user_verb not in HIRAGANA_PREFERRED:
                        user_verb = VERB_DICT[user_verb][0]

            if not input_error:
                if is_valid_verb(user_verb):
                    v = Verb(user_verb)
                    v.polite().negative()
                    cards = v.forms
                else:
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