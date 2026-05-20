# 3rd version - OOP upgrade / instead of storeing info in a global list, we make a class

irregular_godan_verb = ["入る", "走る", "帰る", "切る", "知る", "要る", "減る", "滑る", "蹴る", "握る", "参る", "混じる", "交じる", "交る", "焦る", "湿る", "茂る", "遮る", "罵る", "嘲る", "蘇る", "覆る", "捻る","煎る", "練る", "限る", "喋る", "散る", "照る"]

# Honorific godan verbs with irregular masu stems
honorific_godan_verb = {
    "ござる":     "ござい",
    "いらっしゃる": "いらっしゃい",
    "おっしゃる":  "おっしゃい",
    "なさる":     "なさい",
    "くださる":   "ください",
}

godan_map = {
    "う": {"a":"わ", "i":"い", "e":"え", "o":"お"},
    "く": {"a":"か", "i":"き", "e":"け", "o":"こ"},
    "ぐ": {"a":"が", "i":"ぎ", "e":"げ", "o":"ご"},
    "す": {"a":"さ", "i":"し", "e":"せ", "o":"そ"},
    "つ": {"a":"た", "i":"ち", "e":"て", "o":"と"},
    "ぬ": {"a":"な", "i":"に", "e":"ね", "o":"の"},
    "ぶ": {"a":"ば", "i":"び", "e":"べ", "o":"ぼ"},
    "む": {"a":"ま", "i":"み", "e":"め", "o":"も"},
    "る": {"a":"ら", "i":"り", "e":"れ", "o":"ろ"},
}

#Layer 0 - Class
class Verb:
    def __init__(self, verb):
        self.verb = verb
        self.type = self.classify()
        self.stem = self.get_stem()
        # combining 2 dictionaries into 1 master dictionary
        self.forms = self.build_base()
        self.forms.update(self.build_derivitive_forms())


    # Layer 1 - Classification
    def classify(self):

        if self.verb in ["くる", "来る"]:
            return "kuru"

        # te+kuru compound verbs (持ってくる、走ってくる etc.)
        if self.verb.endswith(("てくる", "でくる")):
            return "te_kuru"

        if self.verb == "する" or self.verb.endswith("する"):
            return "suru"

        # honorific godan — must check before regular ichidan/godan
        if self.verb in honorific_godan_verb:
            return "honorific_godan"

        if self.verb.endswith("る") and self.verb not in irregular_godan_verb:
            return "ichidan"

        if self.verb.endswith(("う","く","ぐ","す","つ","ぬ","ぶ","む")):
            return "godan"

        if self.verb in irregular_godan_verb:
            return "godan"

        return "unknown"

    def get_stem(self):

        if self.type == "ichidan":
            return self.verb[:-1]

        if self.type == "godan":
            return self.verb[:-1]

        if self.type == "honorific_godan":
            return self.verb[:-1]

        # te_kuru: stem is the te-form prefix (e.g. 持って)
        if self.type == "te_kuru":
            return self.verb[:-2]  # strip くる

        return self.verb

    # Layer 2 - Base Forms
    def Te_Form(self):

        if self.type == "ichidan":
            return self.stem + "て"

        if self.type == "te_kuru":
            return self.stem  # stem IS the te-form (e.g. 持って)

        if self.type == "honorific_godan":
            return self.stem + "って"

        if self.verb.endswith(("う", "つ", "る")):
            return self.stem + "って"

        elif self.verb.endswith(("む", "ぶ", "ぬ")):
            return self.stem + "んで"

        elif self.verb.endswith("く"):

            if self.verb == "行く":
                return "行って"

            return self.stem + "いて"

        elif self.verb.endswith("ぐ"):
            return self.stem + "いで"

        elif self.verb.endswith("す"):
            return self.stem + "して"

        return "-"

    def Past_Form(self):

        stem = self.verb[:-1]

        if self.type == "ichidan":
            return self.stem + "た"

        if self.type == "te_kuru":
            return self.stem + "きた"

        if self.type == "honorific_godan":
            return self.stem + "った"

        # irregulars
        if self.verb == "行く":
            return "行った"

        elif self.verb == "する":
            return "した"

        elif self.verb == "来る":
            return "来た"

        elif self.verb == "くる":
            return "きた"

        # godan rules
        elif self.verb.endswith(("う", "つ", "る")):
            return stem + "った"

        elif self.verb.endswith(("む", "ぶ", "ぬ")):
            return stem + "んだ"

        elif self.verb.endswith("く"):
            return stem + "いた"

        elif self.verb.endswith("ぐ"):
            return stem + "いだ"

        elif self.verb.endswith("す"):
            return stem + "した"

    def build_base(self):

        if self.type == "ichidan":
            return {
                "dictionary": self.verb,
                "stem": self.stem,
                "masu_stem": self.stem,
                "te": self.stem + "て",
                "passive": self.stem + "られる",
                "causative": self.stem + "させる",
                "causative_passive": self.stem + "させられる",
                "potential": self.stem + "られる",
                "volitional": self.stem + "よう",
                "imperative": self.stem + "ろ",
                "conditional_ba": self.stem + "れば"
            }

        elif self.type == "godan":
            ending = self.verb[-1]
            return {
                "dictionary": self.verb,
                "stem": self.stem,
                "masu_stem": self.stem + godan_map[ending]["i"],
                "te": self.Te_Form(),
                "passive": self.stem + godan_map[ending]["a"] + "れる",
                "causative": self.stem + godan_map[ending]["a"] + "せる",
                "causative_passive": self.stem + godan_map[ending]["a"] + "せられる",
                "potential": self.stem + godan_map[ending]["e"] + "る",
                "volitional": self.stem + godan_map[ending]["o"] + "う",
                "imperative": self.stem + godan_map[ending]["e"],
                "conditional_ba": self.stem + godan_map[ending]["e"] + "ば"
            }

        elif self.type == "honorific_godan":
            # masu stem is irregular, everything else follows godan る pattern
            masu_stem = honorific_godan_verb[self.verb]
            return {
                "dictionary": self.verb,
                "stem": self.stem,
                "masu_stem": masu_stem,
                "te": self.stem + "って",
                "passive": self.stem + "られる",
                "causative": self.stem + "らせる",
                "causative_passive": self.stem + "らせられる",
                "potential": self.stem + "れる",
                "volitional": self.stem + "ろう",
                "imperative": self.stem + "れ",
                "conditional_ba": self.stem + "れば"
            }

        elif self.type == "suru":
            suru_stem = self.verb[:-2]  # handles compound verbs like 勉強する
            return {
                "dictionary": self.verb,
                "stem": self.stem,
                "masu_stem": suru_stem + "し",
                "te": suru_stem + "して",
                "passive": suru_stem + "される",
                "causative": suru_stem + "させる",
                "causative_passive": suru_stem + "させられる",
                "potential": suru_stem + "できる",
                "volitional": suru_stem + "しよう",
                "imperative": suru_stem + "しろ",
                "conditional_ba": suru_stem + "すれば"
            }

        elif self.type == "kuru":
            return {
                "dictionary": self.verb,
                "stem": self.stem,
                "masu_stem": "き",
                "te": "きて",
                "passive": "こられる",
                "causative": "こさせる",
                "causative_passive": "こさせられる",
                "potential": "こられる",
                "volitional": "こよう",
                "imperative": "こい",
                "conditional_ba": "くれば"
            }

        elif self.type == "te_kuru":
            # stem = te-form prefix e.g. 持って
            # conjugate like kuru but prepend the te-form prefix
            prefix = self.stem  # e.g. 持って
            return {
                "dictionary": self.verb,
                "stem": self.stem,
                "masu_stem": prefix + "き",
                "te": prefix,           # te-form IS the prefix
                "passive": prefix + "こられる",
                "causative": prefix + "こさせる",
                "causative_passive": prefix + "こさせられる",
                "potential": prefix + "こられる",
                "volitional": prefix + "こよう",
                "imperative": prefix + "こい",
                "conditional_ba": prefix + "くれば"
            }

        return {}

    # Layer 3 - Derived/composite forms
    def build_derivitive_forms(self):

        if self.type == "ichidan":
            return {
                "past": self.stem + "た",
                "tara": self.stem + "たら",
                "te_iru": self.stem + "ている",
                "te_ita": self.stem + "ていた"
            }

        elif self.type == "godan":
            return {
                "past": self.Past_Form(),
                "tara": self.Past_Form() + "ら",
                "te_iru": self.Te_Form() + "いる",
                "te_ita": self.Te_Form() + "いた"
            }

        elif self.type == "honorific_godan":
            return {
                "past": self.Past_Form(),
                "tara": self.Past_Form() + "ら",
                "te_iru": self.Te_Form() + "いる",
                "te_ita": self.Te_Form() + "いた"
            }

        elif self.type == "suru":
            suru_stem = self.verb[:-2]
            return {
                "past": suru_stem + "した",
                "tara": suru_stem + "したら",
                "te_iru": suru_stem + "している",
                "te_ita": suru_stem + "していた"
            }

        elif self.type == "kuru":
            return {
                "past": "きた",
                "tara": "きたら",
                "te_iru": "きている",
                "te_ita": "きていた"
            }

        elif self.type == "te_kuru":
            prefix = self.stem
            return {
                "past": prefix + "きた",
                "tara": prefix + "きたら",
                "te_iru": prefix + "きている",
                "te_ita": prefix + "きていた"
            }

        return {}

    # Layer 4 - Polite layer
    def polite(self):

        self.forms["polite_dictionary"] = (
            self.forms["masu_stem"] + "ます"
        )

        self.forms["polite_volitional"] = (
            self.forms["masu_stem"] + "ましょう"
        )

        self.forms["polite_past"] = (
            self.forms["masu_stem"] + "ました"
        )

        self.forms["polite_potential"] = (
            Verb(self.forms["potential"]).forms["masu_stem"] + "ます"
        )

        self.forms["polite_passive"] = (
            Verb(self.forms["passive"]).forms["masu_stem"] + "ます"
        )

        self.forms["polite_causative"] = (
            Verb(self.forms["causative"]).forms["masu_stem"] + "ます"
        )

        self.forms["polite_causative_passive"] = (
            Verb(self.forms["causative_passive"]).forms["masu_stem"] + "ます"
        )

        self.forms["polite_imperative"] = (
            self.forms["te"] + "ください"
        )

        return self

    # Layer 5 - Negative layer
    def negative(self):

        # =========================
        # Base negative
        # =========================

        if self.type == "suru":
            suru_stem = self.verb[:-2]
            negative_base = suru_stem + "しない"

        elif self.type == "kuru":
            negative_base = "こない"

        elif self.type == "te_kuru":
            negative_base = self.stem + "こない"

        elif self.type == "ichidan":
            negative_base = self.stem + "ない"

        elif self.type == "godan":
            ending = self.verb[-1]
            negative_base = (
                self.stem + godan_map[ending]["a"] + "ない"
            )

        elif self.type == "honorific_godan":
            negative_base = self.stem + "らない"

        else:
            return self

        self.forms["negative"] = negative_base
        self.forms["negative_past"] = negative_base[:-1] + "かった"
        self.forms["negative_te"] = negative_base[:-1] + "くて"
        self.forms["negative_conditional_ba"] = (
            negative_base[:-1] + "ければ"
        )
        self.forms["negative_tara"] = (
            self.forms["negative_past"] + "ら"
        )

        # =========================
        # Helper function
        # =========================

        def negate_verb_form(form):

            temp = Verb(form)

            if temp.type == "ichidan":
                return temp.stem + "ない"

            elif temp.type == "godan":
                ending = temp.verb[-1]
                return (
                    temp.stem
                    + godan_map[ending]["a"]
                    + "ない"
                )

            elif temp.type == "suru":
                return temp.verb[:-2] + "しない"

            elif temp.type == "kuru":
                return "こない"

            elif temp.type == "te_kuru":
                return temp.stem + "こない"

            elif temp.type == "honorific_godan":
                return temp.stem + "らない"

            return form + "ない"

        # =========================
        # Negative derived forms
        # =========================

        self.forms["negative_potential"] = negate_verb_form(
            self.forms["potential"]
        )

        self.forms["negative_passive"] = negate_verb_form(
            self.forms["passive"]
        )

        self.forms["negative_causative"] = negate_verb_form(
            self.forms["causative"]
        )

        self.forms["negative_causative_passive"] = negate_verb_form(
            self.forms["causative_passive"]
        )

        # =========================
        # Polite negatives
        # =========================

        if "polite_dictionary" in self.forms:

            self.forms["polite_negative_dictionary"] = (
                self.forms["masu_stem"] + "ません"
            )

            self.forms["polite_negative_past"] = (
                self.forms["masu_stem"] + "ませんでした"
            )

            self.forms["polite_negative_potential"] = (
                Verb(self.forms["potential"]).forms["masu_stem"]
                + "ません"
            )

            self.forms["polite_negative_passive"] = (
                Verb(self.forms["passive"]).forms["masu_stem"]
                + "ません"
            )

            self.forms["polite_negative_causative"] = (
                Verb(self.forms["causative"]).forms["masu_stem"]
                + "ません"
            )

            self.forms["polite_negative_causative_passive"] = (
                Verb(
                    self.forms["causative_passive"]
                ).forms["masu_stem"]
                + "ません"
            )

        return self

'''v = Verb("持ってくる")

v.polite().negative()

for form_name, value in v.forms.items():
    print(f"{form_name}: {value}")'''