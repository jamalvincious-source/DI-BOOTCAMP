def is_mono(numbers):
	ascending = all(numbers[index] <= numbers[index + 1] for index in range(len(numbers) - 1))
	descending = all(numbers[index] >= numbers[index + 1] for index in range(len(numbers) - 1))

	return ascending or descending


print(is_mono([7, 6, 5, 5, 2, 0]))
print(is_mono([2, 3, 3, 3]))
print(is_mono([1, 2, 0, 4]))
