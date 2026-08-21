import random


WORDS = [
	"correction",
	"childish",
	"beach",
	"python",
	"assertive",
	"interference",
	"complete",
	"share",
	"credit card",
	"rush",
	"south",
]

HANGMAN_STAGES = [
	"",
	"  O",
	"  O\n  |",
	"  O\n /|",
	"  O\n /|\\",
	"  O\n /|\\\n /",
	"  O\n /|\\\n / \\",
]


def display_word(word, guessed_letters):
	return " ".join(
		character if character == " " or character in guessed_letters else "_"
		for character in word
	)


def play():
	word = random.choice(WORDS)
	guessed_letters = set()
	wrong_guesses = 0

	print("Welcome to Hangman!")

	while wrong_guesses < 6:
		print(f"\n{HANGMAN_STAGES[wrong_guesses]}")
		print(f"Word: {display_word(word, guessed_letters)}")
		print(f"Wrong guesses: {wrong_guesses}/6")

		guess = input("Guess a letter: ").strip().lower()

		if len(guess) != 1 or not guess.isalpha():
			print("Please enter one letter.")
			continue

		if guess in guessed_letters:
			print("You already guessed that letter.")
			continue

		guessed_letters.add(guess)

		if guess in word:
			print("Good guess!")
			if all(character == " " or character in guessed_letters for character in word):
				print(f"\nYou win! The word was: {word}")
				return
		else:
			wrong_guesses += 1
			print("That letter is not in the word.")

	print(f"\n{HANGMAN_STAGES[wrong_guesses]}")
	print(f"You lose! The word was: {word}")


if __name__ == "__main__":
	play()
