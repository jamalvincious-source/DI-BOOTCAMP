class Zoo:
	def __init__(self, zoo_name):
		self.zoo_name = zoo_name
		self.animals = []
		self.groups = {}

	def add_animal(self, *new_animals):
		for new_animal in new_animals:
			if new_animal not in self.animals:
				self.animals.append(new_animal)

	def get_animals(self):
		print(self.animals)

	def sell_animal(self, animal_sold):
		if animal_sold in self.animals:
			self.animals.remove(animal_sold)

	def sort_animals(self):
		self.animals.sort()
		self.groups = {}
		for animal in self.animals:
			first_letter = animal[0].upper()
			self.groups.setdefault(first_letter, []).append(animal)
		return self.groups

	def get_groups(self):
		for letter, animals in self.groups.items():
			print(f"{letter}: {animals}")


brooklyn_safari = Zoo("Brooklyn Safari")
brooklyn_safari.add_animal("Giraffe", "Bear", "Baboon", "Cat", "Cougar", "Lion", "Zebra")
brooklyn_safari.add_animal("Bear")
brooklyn_safari.get_animals()
brooklyn_safari.sell_animal("Bear")
brooklyn_safari.get_animals()
brooklyn_safari.sort_animals()
brooklyn_safari.get_groups()
