import os
from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
from dotenv import load_dotenv
from JP_Verb_conjugator_v3 import Verb, honorific_godan_verb

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

# Valid dictionary form endings
VALID_ENDINGS = ("う", "く", "ぐ", "す", "つ", "ぬ", "ぶ", "む", "る")

# Patterns that are definitely NOT dictionary forms
INVALID_ENDINGS = ("い", "な", "だ", "た", "て", "で", "ば", "に",
                   "ない", "ます", "した", "って", "んで", "いて",
                   "いで", "して", "られ", "させ", "れば", "たら")

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

        user_verb = request.form.get("verb", "").strip()

        if user_verb:
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