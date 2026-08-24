def separate_types(items):
	integers = []
	strings = []

	for item in items:
		if isinstance(item, int) and not isinstance(item, bool):
			integers.append(item)
		elif isinstance(item, str):
			strings.append(item)

	return integers, strings


integers, strings = separate_types([1, "hello", 2, "world", 3])
print(integers)
print(strings)
