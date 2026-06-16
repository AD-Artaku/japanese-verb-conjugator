import os
import json
import re
import time
import calendar
import sqlite3
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET
from email.utils import parsedate
import pykakasi
from flask import Flask, render_template, request, jsonify, url_for
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

# =====================
# SEARCH STATS — SQLite
# Tracks successful verb searches (verb + count, anonymous).
# DB file sits next to app.py; export to CSV anytime for Google Sheets.
# =====================
_STATS_DB = os.path.join(os.path.dirname(__file__), "verb_stats.db")

def _init_stats_db():
    with sqlite3.connect(_STATS_DB) as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS verb_searches (
                verb  TEXT PRIMARY KEY,
                count INTEGER NOT NULL DEFAULT 0
            )
        """)

_init_stats_db()

def _track_search(verb):
    try:
        with sqlite3.connect(_STATS_DB) as conn:
            conn.execute("""
                INSERT INTO verb_searches (verb, count) VALUES (?, 1)
                ON CONFLICT(verb) DO UPDATE SET count = count + 1
            """, (verb,))
    except Exception:
        pass  # never let tracking break a real request

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
# STATIC ASSET CACHE-BUSTING
# Appends ?v=<file-mtime> to every url_for('static', ...) call in templates.
# Browsers cache CSS/JS aggressively between deploys but re-fetch the instant
# a file changes (its mtime changes). Critical on mobile, where a stale
# style.css / script.js would otherwise linger for days after a fix.
# =====================
def _dated_url_for(endpoint, **values):
    if endpoint == "static":
        filename = values.get("filename")
        if filename:
            try:
                mtime = os.stat(os.path.join(app.root_path, "static", filename)).st_mtime
                values["v"] = int(mtime)
            except OSError:
                pass  # missing file — fall back to an unversioned URL
    return url_for(endpoint, **values)

@app.context_processor
def _override_url_for():
    return dict(url_for=_dated_url_for)

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
    _track_search(user_verb)
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
# RESUME PAGE
# =====================
@app.route("/resume")
def resume():
    return render_template("resume.html")


@app.route("/resume/print")
def resume_print():
    return render_template("resume_print.html")

@app.route("/resume/print/en")
def resume_print_en():
    return render_template("resume_print_en.html")

@app.route("/resume/download")
def resume_download():
    from flask import send_from_directory
    return send_from_directory(
        app.static_folder,
        "職務経歴書_チョウ_エリック.pdf",
        as_attachment=True,
        download_name="職務経歴書_チョウ_エリック.pdf"
    )

@app.route("/resume/download/en")
def resume_download_en():
    from flask import send_from_directory
    return send_from_directory(
        app.static_folder,
        "職務経歴書_チョウ_エリック_EN.pdf",
        as_attachment=True,
        download_name="職務経歴書_チョウ_エリック_EN.pdf"
    )


# =====================
# PORTFOLIO PAGE
# Fetches the ArtStation RSS feed, parses artwork entries,
# and caches results for 30 min to avoid hitting ArtStation on every load.
# =====================
_portfolio_cache = {"data": None, "ts": 0}
_PORTFOLIO_TTL   = 1800  # seconds

def _fetch_portfolio(limit=12):
    now = time.time()
    if _portfolio_cache["data"] and now - _portfolio_cache["ts"] < _PORTFOLIO_TTL:
        return _portfolio_cache["data"]

    url = "https://www.artstation.com/eric_chou.rss"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=8) as resp:
        root = ET.fromstring(resp.read())

    import html as _html
    content_ns = "http://purl.org/rss/1.0/modules/content/"
    items = []
    for item in root.iter("item"):
        title    = item.findtext("title") or ""
        link     = item.findtext("link")  or ""
        pub_date = item.findtext("pubDate") or ""

        # Images live in <content:encoded>, entity-encoded — decode first
        encoded_el   = item.find(f"{{{content_ns}}}encoded")
        encoded_text = _html.unescape(encoded_el.text) if (encoded_el is not None and encoded_el.text) else ""

        m = re.search(r'<img[^>]+src=["\']([^"\']+)["\']', encoded_text)
        raw_url    = m.group(1).split("?")[0] if m else ""  # strip cache-buster

        # RSS already gives /large/ URLs; derive smaller sizes from it
        large_url  = raw_url
        medium_url = raw_url.replace("/large/", "/medium/")
        small_url  = raw_url.replace("/large/", "/small/")

        def _proxy(u):
            if not u:
                return ""
            return "/portfolio/img?url=" + urllib.parse.quote(u, safe="")

        try:
            parts    = parsedate(pub_date)
            date_str = f"{calendar.month_abbr[parts[1]]} {parts[0]}"
        except Exception:
            date_str = ""

        items.append({
            "title": title, "link": link, "date": date_str,
            "large_url":  _proxy(large_url),
            "medium_url": _proxy(medium_url),
            "small_url":  _proxy(small_url),
        })
        if len(items) >= limit:
            break

    _portfolio_cache["data"] = items
    _portfolio_cache["ts"]   = now
    return items


@app.route("/portfolio/img")
def portfolio_img():
    url = request.args.get("url", "")
    if not (url.startswith("https://cdna.artstation.com/") or
            url.startswith("https://cdnb.artstation.com/")):
        return "", 400
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0",
            "Referer":    "https://www.artstation.com/",
        })
        with urllib.request.urlopen(req, timeout=10) as resp:
            data         = resp.read()
            content_type = resp.headers.get("Content-Type", "image/jpeg")
        from flask import Response
        r = Response(data, content_type=content_type)
        r.headers["Cache-Control"] = "public, max-age=86400"
        return r
    except Exception:
        return "", 404


@app.route("/portfolio")
def portfolio():
    try:
        pieces = _fetch_portfolio(limit=12)
    except Exception:
        pieces = []

    # Pin the nanba piece as the featured hero; fall back to first item
    featured_idx = 0
    for i, p in enumerate(pieces):
        if "nanba" in p["title"].lower() or "namba" in p["title"].lower() or "なんば" in p["title"] or "難波" in p["title"]:
            featured_idx = i
            break

    featured = pieces[featured_idx] if pieces else None
    rest     = [p for i, p in enumerate(pieces) if i != featured_idx]
    side     = rest[:3]
    grid     = rest[3:]

    return render_template("portfolio.html", featured=featured, side=side, grid=grid)


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


# =====================
# SEO — robots.txt & sitemap.xml
# Served from root so crawlers find them at the expected paths.
# =====================
@app.route("/robots.txt")
def robots_txt():
    from flask import Response
    base = request.host_url
    lines = [
        "User-agent: *",
        "Allow: /",
        "Disallow: /api/",
        "Disallow: /suggest",
        "Disallow: /portfolio/img",
        "Disallow: /resume/download",
        "Disallow: /resume/download/en",
        "Disallow: /resume/print",
        "Disallow: /resume/print/en",
        f"Sitemap: {base}sitemap.xml",
    ]
    return Response("\n".join(lines), mimetype="text/plain")


@app.route("/sitemap.xml")
def sitemap_xml():
    from flask import Response
    base = request.host_url.rstrip("/")
    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>{base}/</loc>          <priority>1.0</priority><changefreq>weekly</changefreq></url>
  <url><loc>{base}/portfolio</loc> <priority>0.9</priority><changefreq>weekly</changefreq></url>
  <url><loc>{base}/resume</loc>    <priority>0.9</priority><changefreq>monthly</changefreq></url>
  <url><loc>{base}/devlog</loc>    <priority>0.7</priority><changefreq>monthly</changefreq></url>
</urlset>"""
    return Response(xml, mimetype="application/xml")


if __name__ == "__main__":
    app.run(debug=True)