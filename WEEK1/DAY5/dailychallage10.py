def longest_word(words):
	longest = ""

	for word in words:
		if len(word) > len(longest):
			longest = word

	print(longest)


longest_word(["cat", "elephant", "dog", "giraffe"])
