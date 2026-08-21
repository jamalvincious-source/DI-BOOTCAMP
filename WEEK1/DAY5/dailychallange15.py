def common_div(first_number, second_number):
	divisors = []

	for divisor in range(1, min(first_number, second_number) + 1):
		if first_number % divisor == 0 and second_number % divisor == 0:
			divisors.append(divisor)

	return divisors[1:]


print(common_div(10, 20))
