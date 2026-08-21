def custom_split(text, separator=None):
	parts = []
	current = ""

	for character in text:
		is_separator = character.isspace() if separator is None else character == separator

		if is_separator:
			if current or separator is not None:
				parts.append(current)
				current = ""
		else:
			current += character

	if current or separator is not None:
		parts.append(current)

	return parts


print(custom_split("This is a sentence"))
print(custom_split("one,two,three", ","))
