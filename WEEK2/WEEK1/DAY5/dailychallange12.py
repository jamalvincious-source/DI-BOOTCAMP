def is_palindrome(text):
	return text == text[::-1]


print(is_palindrome("radar"))
print(is_palindrome("John"))
