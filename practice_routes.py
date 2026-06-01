"""
practice_routes.py
Flask Blueprint for the SRS flashcard practice feature.

To integrate into app.py when ready:
    from practice_routes import practice_bp
    app.register_blueprint(practice_bp)
"""

import json
import os
import uuid
import zipfile
import sqlite3
import tempfile
import re
from flask import Blueprint, render_template, jsonify, request, send_from_directory
from JP_Verb_conjugator_v3 import Verb, honorific_godan_verb, HIRAGANA_PREFERRED

practice_bp = Blueprint("practice", __name__, url_prefix="/practice")

# =====================
# Paths
# =====================
BASE_DIR        = os.path.dirname(__file__)
VERB_DICT_PATH  = os.path.join(BASE_DIR, "verb_dict.json")
MEDIA_DIR       = os.path.join(BASE_DIR, "static", "practice_media")

os.makedirs(MEDIA_DIR, exist_ok=True)

with open(VERB_DICT_PATH, encoding="utf-8") as f:
    VERB_DICT = json.load(f)

VALID_ENDINGS   = ("う", "く", "ぐ", "す", "つ", "ぬ", "ぶ", "む", "る")
INVALID_ENDINGS = ("い", "な", "だ", "た", "て", "で", "ば", "に",
                   "ない", "ます", "した", "って", "んで", "いて",
                   "いで", "して", "られ", "させ", "れば", "たら")


def _is_all_hiragana(text):
    for ch in text:
        cp = ord(ch)
        if not (0x3040 <= cp <= 0x309F or ch == "ー"):
            return False
    return True


def _is_valid_verb(verb):
    if not verb:
        return False
    if verb in ["する", "くる", "来る"]:
        return True
    if verb.endswith(("てくる", "でくる")):
        return True
    if verb in honorific_godan_verb:
        return True
    if verb.endswith("する") and len(verb) > 2:
        return True
    for ending in INVALID_ENDINGS:
        if verb.endswith(ending):
            return False
    if verb.endswith(VALID_ENDINGS):
        return True
    return False


def _build_conjugation_html(verb):
    """
    Returns (resolved_verb, front_html, back_html) for a verb card,
    or raises ValueError if the verb is invalid.
    """
    verb = verb.strip()

    if _is_all_hiragana(verb):
        if verb not in VERB_DICT:
            raise ValueError("verb not found in dictionary")
        if verb not in HIRAGANA_PREFERRED:
            verb = VERB_DICT[verb][0]

    if not _is_valid_verb(verb):
        raise ValueError("not a valid dictionary-form verb")

    v = Verb(verb)
    v.polite().negative()
    f = v.forms

    front_html = f"<div class='card-front-verb'>{verb}</div>"

    DISPLAY_FORMS = [
        ("dictionary",                 "辞書形",   "Plain"),
        ("polite_dictionary",          "ます形",   "Polite"),
        ("negative",                   "ない形",   "Neg. Plain"),
        ("polite_negative_dictionary", "ません",   "Neg. Polite"),
        ("past",                       "た形",     "Past"),
        ("polite_past",                "ました",   "Past Polite"),
        ("te",                         "て形",     "Te-form"),
        ("potential",                  "可能形",   "Potential"),
        ("passive",                    "受身形",   "Passive"),
        ("causative",                  "使役形",   "Causative"),
        ("volitional",                 "意向形",   "Volitional"),
    ]

    rows = ""
    for key, jp_label, en_label in DISPLAY_FORMS:
        val = f.get(key)
        if val:
            rows += (
                f"<tr>"
                f"<td class='conj-label'>{jp_label} <span class='conj-en'>({en_label})</span></td>"
                f"<td class='conj-value'>{val}</td>"
                f"</tr>"
            )

    back_html = f"<table class='conj-table'>{rows}</table>"
    return verb, front_html, back_html


# =====================
# ROUTES
# =====================

@practice_bp.route("/")
def practice_home():
    return render_template("practice.html")


@practice_bp.route("/media/<path:filename>")
def serve_media(filename):
    """Serve imported Anki media files."""
    return send_from_directory(MEDIA_DIR, filename)


@practice_bp.route("/conjugate/<verb>")
def conjugate(verb):
    """
    Validates a verb and returns front/back HTML for it.
    Used when the user manually adds a verb card.
    """
    try:
        resolved, front_html, back_html = _build_conjugation_html(verb)
        return jsonify({
            "ok":    True,
            "id":    resolved,
            "label": resolved,
            "front": front_html,
            "back":  back_html,
        })
    except ValueError as e:
        return jsonify({"ok": False, "error": str(e)})
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)})


@practice_bp.route("/import", methods=["POST"])
def import_apkg():
    """
    Accepts an .apkg file upload.
    Extracts notes from the embedded SQLite database and any media files.
    Returns a list of card objects ready to be saved in localStorage.

    Response shape:
    {
        "ok": true,
        "cards": [
            { "id": "...", "label": "...", "front": "<html>", "back": "<html>" },
            ...
        ],
        "media_saved": 12,
        "errors": []
    }
    """
    file = request.files.get("deck")
    if not file:
        return jsonify({"ok": False, "error": "No file uploaded"}), 400

    # Initialise to None so the finally block never hits a NameError
    tmp_path = None
    db_path  = None
    errors   = []
    cards    = []
    media_saved = 0

    try:
        # =====================
        # Save upload to a named temp file.
        # We close it immediately after writing so Windows doesn't
        # hold a lock that prevents zipfile from opening the same path.
        # =====================
        tmp_fd, tmp_path = tempfile.mkstemp(suffix=".apkg")
        try:
            with os.fdopen(tmp_fd, "wb") as tmp_f:
                file.save(tmp_f)
        except Exception:
            os.close(tmp_fd)   # make sure fd is released if save() fails
            raise

        with zipfile.ZipFile(tmp_path, "r") as zf:
            names = zf.namelist()

            # =====================
            # Extract media files
            # Anki stores a JSON file called "media" that maps numeric
            # filenames → original names: {"0": "img.jpg", "1": "audio.mp3"}
            # =====================
            media_map = {}
            if "media" in names:
                raw = zf.read("media")
                # Anki writes the media map as UTF-8 JSON, but some builds
                # use latin-1 or write an empty file — handle all cases.
                media_json = raw.decode("utf-8", errors="replace").strip()
                if media_json:
                    try:
                        media_map = json.loads(media_json)
                    except json.JSONDecodeError:
                        pass  # no media map — just skip media extraction

            for numeric_name, real_name in media_map.items():
                if numeric_name in names:
                    dest = os.path.join(MEDIA_DIR, real_name)
                    with zf.open(numeric_name) as src, open(dest, "wb") as dst:
                        dst.write(src.read())
                    media_saved += 1

            # =====================
            # Extract the SQLite database to its own temp file.
            # Anki 2.1 uses "collection.anki21"; older decks use "collection.anki2".
            # Close the file handle immediately after writing (same Windows reason).
            # =====================
            # Prefer anki21b (Anki 2.1.50+ modern format), then fall back to older files.
            db_name = next(
                (n for n in ("collection.anki21b", "collection.anki21", "collection.anki2") if n in names),
                None,
            )
            if db_name is None:
                return jsonify({"ok": False, "error": "No Anki database found in .apkg"}), 400

            raw_db_bytes = zf.read(db_name)

        # =====================
        # Detect the actual format of the database file.
        # SQLite files start with "SQLite format 3\x00".
        # Some Anki builds zstd-compress the db inside the zip — in that case
        # we try to decompress before opening.
        # =====================
        SQLITE_MAGIC = b"SQLite format 3\x00"
        ZSTD_MAGIC   = b"\x28\xb5\x2f\xfd"

        if raw_db_bytes[:16] == SQLITE_MAGIC:
            db_bytes = raw_db_bytes  # already a plain SQLite file
        elif raw_db_bytes[:4] == ZSTD_MAGIC:
            # zstd-compressed — decompress first
            try:
                import zstandard as zstd
                import io
                db_bytes = zstd.ZstdDecompressor().stream_reader(
                    io.BytesIO(raw_db_bytes)
                ).read()
            except ImportError:
                return jsonify({
                    "ok":    False,
                    "error": "This .apkg uses zstd compression. Run: pip install zstandard",
                }), 400
        else:
            return jsonify({
                "ok":    False,
                "error": (
                    f"Unrecognised database format in '{db_name}' "
                    f"(magic bytes: {raw_db_bytes[:8].hex()}). "
                    "Try exporting from Anki with 'Support older Anki versions' checked."
                ),
            }), 400

        db_fd, db_path = tempfile.mkstemp(suffix=".db")
        try:
            with os.fdopen(db_fd, "wb") as db_f:
                db_f.write(db_bytes)
        except Exception:
            os.close(db_fd)
            raise

        # =====================
        # Parse notes from SQLite.
        # notes.flds: fields separated by \x1f (ASCII unit separator).
        # Field 0 = front, field 1 = back for standard note types.
        # =====================
        con = sqlite3.connect(db_path)
        try:
            cur = con.cursor()
            cur.execute("SELECT id, flds FROM notes")
            rows = cur.fetchall()
        finally:
            con.close()

        for note_id, flds in rows:
            fields    = flds.split("\x1f")
            front_raw = fields[0].strip() if len(fields) > 0 else ""
            back_raw  = fields[1].strip() if len(fields) > 1 else ""

            if not front_raw:
                continue

            # Skip Anki's compatibility warning note injected into legacy exports
            if "colpkg" in front_raw or "colpkg" in back_raw:
                continue

            front_html = _rewrite_media_refs(front_raw)
            back_html  = _rewrite_media_refs(back_raw) if back_raw else "<em>(no back field)</em>"

            cards.append({
                "id":    f"anki_{note_id}",
                "label": _plain_text(front_raw)[:40],
                "front": front_html,
                "back":  back_html,
            })

    except zipfile.BadZipFile:
        return jsonify({"ok": False, "error": "File does not appear to be a valid .apkg"}), 400
    except Exception as e:
        return jsonify({"ok": False, "error": str(e)}), 500
    finally:
        for path in [tmp_path, db_path]:
            if path:
                try:
                    os.unlink(path)
                except Exception:
                    pass

    return jsonify({
        "ok":          True,
        "cards":       cards,
        "media_saved": media_saved,
        "errors":      errors,
    })


# =====================
# HELPERS
# =====================

def _rewrite_media_refs(html):
    """
    Rewrites Anki media references so they resolve in our app.
    - <img src="foo.jpg">      → <img src="/practice/media/foo.jpg">
    - [sound:foo.mp3]          → <audio controls src="/practice/media/foo.mp3"></audio>
    """
    # Rewrite img src attributes
    html = re.sub(
        r'(<img\s[^>]*src=")(?!http)([^"]+)(")',
        lambda m: f'{m.group(1)}/practice/media/{m.group(2)}{m.group(3)}',
        html,
        flags=re.IGNORECASE,
    )
    # Rewrite [sound:filename] tags
    html = re.sub(
        r'\[sound:([^\]]+)\]',
        lambda m: f'<audio controls src="/practice/media/{m.group(1)}"></audio>',
        html,
    )
    return html


def _plain_text(html):
    """Strip HTML tags to get a plain-text label for the deck list."""
    return re.sub(r"<[^>]+>", "", html).strip()
