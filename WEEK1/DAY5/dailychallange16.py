def is_prime(number):
	if number < 2:
		return False

	for divisor in range(2, int(number ** 0.5) + 1):
		if number % divisor == 0:
			return False

	return True


print(is_prime(11))
