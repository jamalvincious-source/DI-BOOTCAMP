import os

class AnagramChecker:
    def __init__(self, filename="sowpods.txt"):
        """Loads the word list file into a set/list in lowercase for case-insensitive comparison."""
        self.words = set()
        
        if os.path.exists(filename):
            with open(filename, "r", encoding="utf-8") as file:
                for line in file:
                    word = line.strip().lower()
                    if word:
                        self.words.add(word)
        else:
            print(f"Warning: File '{filename}' not found. Word list is empty.")

    def is_valid_word(self, word):
        """Checks if the given word exists in the loaded word list (case-insensitive)."""
        return word.lower() in self.words

    def is_anagram(self, word1, word2):
        """Returns True if word1 and word2 are anagrams (contain the same sorted characters), False otherwise."""
        w1 = word1.lower().strip()
        w2 = word2.lower().strip()
        
        # An anagram must not be the exact same word string, and must share identical sorted characters
        if w1 == w2:
            return False
            
        return sorted(w1) == sorted(w2)

    def get_anagrams(self, word):
        """Finds and returns a list of all matching anagrams for the given word from the word list."""
        clean_word = word.lower().strip()
        anagrams_list = []
        
        for w in self.words:
            if self.is_anagram(clean_word, w):
                anagrams_list.append(w)
                
        return anagrams_list