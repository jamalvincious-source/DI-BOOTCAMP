def sum_over_k(sentence, k):
	total = 0

	for word in sentence.split():
		if len(word) > k:
			total += 1

	return total


sentence = "Do or do not there is no try"
k = 2
print(sum_over_k(sentence, k))
