def factorial(number):
	result = 1

	for value in range(2, number + 1):
		result *= value

	return result


print(factorial(4))
