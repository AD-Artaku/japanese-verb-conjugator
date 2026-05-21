import json

# =====================================================================
# build_dict.py
# Run this ONCE locally to generate verb_dict.json.
# Never run on Render — only verb_dict.json gets committed to GitHub.
#
# Usage:
#   python build_dict.py
#
# Input:  jmdict-eng-common.json  (jmdict-simplified release, project root)
# Output: verb_dict.json          (commit this to GitHub)
# =====================================================================

INPUT_FILE  = "jmdict-eng-common.json"
OUTPUT_FILE = "verb_dict.json"

# Part-of-speech tags in jmdict-simplified that indicate a verb.
# Full list: https://github.com/scriptin/jmdict-simplified
VERB_POS_PREFIXES = (
    "v1",    # ichidan (e.g. 食べる)
    "v5",    # godan  (e.g. 書く, 話す …)
    "vk",    # くる
    "vs",    # suru compounds
    "vz",    # zuru verbs (a suru variant)
    "vi",    # intransitive (some overlap)
    "vt",    # transitive  (some overlap)
    "vs-i",  # irregular suru
    "vs-s",  # special suru
)

def is_verb(pos_list):
    for pos in pos_list:
        for prefix in VERB_POS_PREFIXES:
            if pos == prefix or pos.startswith(prefix + "-"):
                return True
    return False

def is_all_hiragana(text):
    """Return True if every character is hiragana (or prolonged sound mark ー)."""
    for ch in text:
        cp = ord(ch)
        if not (0x3040 <= cp <= 0x309F or ch == "ー"):
            return False
    return True

def main():
    print(f"Loading {INPUT_FILE} …")
    with open(INPUT_FILE, encoding="utf-8") as f:
        data = json.load(f)

    # jmdict-simplified top-level structure:
    # { "version": "...", "languages": [...], "commonOnly": true, "words": [ ... ] }
    words = data["words"]
    print(f"  Total entries: {len(words)}")

    verb_dict = {}   # { hiragana_reading: [kanji_form, ...], ... }
    skipped   = 0

    for entry in words:
        # Collect all part-of-speech tags across all senses
        all_pos = []
        for sense in entry.get("sense", []):
            all_pos.extend(sense.get("partOfSpeech", []))

        if not is_verb(all_pos):
            skipped += 1
            continue

        # kanji writings (k_ele in original XML → "kanji" array here)
        kanji_forms = [k["text"] for k in entry.get("kanji", [])]

        # kana readings (r_ele → "kana" array)
        kana_readings = [r["text"] for r in entry.get("kana", [])]

        if not kana_readings:
            continue

        # For each kana reading, map it to every kanji form.
        # If there are no kanji forms (kana-only verb like する、くる),
        # we still record it so the live-search can surface it.
        for reading in kana_readings:
            if not is_all_hiragana(reading):
                continue   # skip katakana readings

            targets = kanji_forms if kanji_forms else [reading]

            if reading not in verb_dict:
                verb_dict[reading] = []

            for target in targets:
                if target not in verb_dict[reading]:
                    verb_dict[reading].append(target)

    print(f"  Verb entries kept : {len(verb_dict)}")
    print(f"  Non-verb skipped  : {skipped}")

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(verb_dict, f, ensure_ascii=False, indent=2)

    print(f"Written → {OUTPUT_FILE}")

if __name__ == "__main__":
    main()
