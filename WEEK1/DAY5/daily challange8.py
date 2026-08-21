import math


def norm(numbers):
	return math.sqrt(sum(number ** 2 for number in numbers))


print(norm([1, 2, 2]))
