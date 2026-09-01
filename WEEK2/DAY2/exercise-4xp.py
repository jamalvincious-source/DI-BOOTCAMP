class Person:

  def __init__(self, first_name, age):
    self.first_name = first_name
    self.age = age
    self.last_name = ""

  def is_18(self):
    return self.age >= 18


class Family:

  def __init__(self, last_name):
    self.last_name = last_name
    self.members = []

  def born(self, first_name, age):
    new_person = Person(first_name, age)
    new_person.last_name = self.last_name
    self.members.append(new_person)

  def check_majority(self, first_name):
    for member in self.members:
      if member.first_name == first_name:
        if member.is_18():
          print(
              "You are over 18, your parents Jane and John accept that you will"
              " go out with your friends"
          )
        else:
          print("Sorry, you are not allowed to go out with your friends.")
        return
    print(f"No family member named {first_name} was found.")

  def family_presentation(self):
    print(f"Family Name: {self.last_name}")
    for member in self.members:
      print(f"{member.first_name}, Age: {member.age}")


# --- Testing the Implementation ---
if __name__ == "__main__":
  # Create a family
  smith_family = Family("Smith")

  # Add family members
  smith_family.born("Jane", 45)
  smith_family.born("John", 47)
  smith_family.born("Alice", 20)
  smith_family.born("Bob", 15)

  # Display family info
  print("--- Family Presentation ---")
  smith_family.family_presentation()

  # Check majority status
  print("\n--- Checking Majority ---")
  smith_family.check_majority("Alice")  # Over 18
  smith_family.check_majority("Bob")  # Under 18