import re
import string


class Text:

    def __init__(self, text: str):
        self.text = text

    def word_frequency(self, word: str):
        words = self.text.lower().split()
        count = words.count(word.lower())
        return count if count > 0 else f"Word '{word}' not found."

    def most_common_word(self):
        words = self.text.lower().split()
        if not words:
            return None

        freq_dict = {}
        for w in words:
            freq_dict[w] = freq_dict.get(w, 0) + 1

        return max(freq_dict, key=freq_dict.get)

    def unique_words(self) -> list:
        words = self.text.lower().split()
        return list(set(words))

    @classmethod
    def from_file(cls, file_path: str):
        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()
        return cls(content)


class TextModification(Text):

    def remove_punctuation(self) -> str:
        # Removes punctuation using str.translate and string.punctuation
        translator = str.maketrans("", "", string.punctuation)
        self.text = self.text.translate(translator)
        return self.text

    def remove_stop_words(self) -> str:
        stop_words = {
            "a",
            "an",
            "the",
            "is",
            "it",
            "in",
            "on",
            "of",
            "and",
            "or",
            "to",
            "for",
            "with",
            "this",
            "that",
        }
        words = self.text.split()
        filtered_words = [w for w in words if w.lower() not in stop_words]
        self.text = " ".join(filtered_words)
        return self.text

    def remove_special_characters(self) -> str:
        # Retains alphanumeric characters and spaces using regex
        self.text = re.sub(r"[^a-zA-Z0-9\s]", "", self.text)
        return self.text