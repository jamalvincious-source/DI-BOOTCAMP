def weird_print(items):
	result = []

	for index, value in enumerate(items):
		if index % 2 == 0 and value % 2 == 0:
			result.append(value)

	print(result)


weird_print([1, 2, 2, 3, 4, 5])
[2, 4]