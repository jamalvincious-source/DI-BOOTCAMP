# Step 2: Import the Faker class
from faker import Faker

# Initialize the Faker instance
fake = Faker()

# Step 3: Create an empty list of users
users = []


# Step 4: Create a function to add users
def add_users(num_users):
    for _ in range(num_users):
        # Create a dictionary for each user with fake data
        user = {
            "name": fake.name(),
            "address": fake.address(),
            "language_code": fake.language_code(),
        }
        # Append the dictionary to the users list
        users.append(user)


# Step 5: Call the function and print the users list
add_users(5)  # Generates 5 fake users

# Print the list of users formatted nicely
import json

print(json.dumps(users, indent=2))