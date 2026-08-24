def list_count(items, element):
	total = 0

	for item in items:
		if item == element:
			total += 1

	return total


print(list_count(["a", "a", "t", "o"], "a"))
