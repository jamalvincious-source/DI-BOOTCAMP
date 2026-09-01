import random
import string

# Step 2: Create a string of all letters (uppercase and lowercase)
letters = string.ascii_letters

# Step 3: Generate a random string using a loop and concatenation
random_string = ""
for _ in range(5):
    random_string += random.choice(letters)

print(random_string)