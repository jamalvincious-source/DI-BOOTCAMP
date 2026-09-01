import random


def get_words_from_file(file_path):
    """Reads a file and returns a list of words."""
    with open(file_path, "r", encoding="utf-8") as file:
        content = file.read()
        words = content.split()
    return words


def get_random_sentence(length):
    """Generates a random sentence of specified length using words from the file."""
    # Pass the filename/path to your downloaded word list
    words = get_words_from_file("words.txt")

    # Pick 'length' random words from the list
    selected_words = [random.choice(words) for _ in range(length)]

    # Join into a single sentence and convert to lowercase
    sentence = " ".join(selected_words).lower()
    return sentence


def main():
    """Main program flow: handles purpose explanation, input validation, and execution."""
    print(
        "Welcome to the Random Sentence Generator!"
        "\nThis program generates a random sentence using words from a word file based on your chosen length."
    )

    user_input = input(
        "Enter desired sentence length (between 2 and 20 inclusive): "
    )

    # Input validation: check if integer
    try:
        length = int(user_input)
    except ValueError:
        print("Error: Input must be a valid integer.")
        return

    # Input validation: check range [2, 20]
    if 2 <= length <= 20:
        sentence = get_random_sentence(length)
        print("\nGenerated Sentence:")
        print(sentence)
    else:
        print("Error: Sentence length must be between 2 and 20.")


if __name__ == "__main__":
    main()