class Farm:
	def __init__(self, farm_name):
		self.name = farm_name
		self.animals = {}

	def add_animal(self, animal_type=None, count=1, **animals):
		if animal_type is not None:
			self.animals[animal_type] = self.animals.get(animal_type, 0) + count

		for animal_name, animal_count in animals.items():
			self.animals[animal_name] = self.animals.get(animal_name, 0) + animal_count

	def get_info(self):
		animal_lines = [
			f"{animal_type:<6}: {count}"
			for animal_type, count in self.animals.items()
		]
		return "\n".join([
			f"{self.name}'s farm",
			"",
			*animal_lines,
			"",
			"    E-I-E-I-0!",
		])

	def get_animal_types(self):
		return sorted(self.animals)

	def get_short_info(self):
		animal_names = []
		for animal_type in self.get_animal_types():
			suffix = "s" if self.animals[animal_type] > 1 else ""
			animal_names.append(f"{animal_type}{suffix}")

		if not animal_names:
			return f"{self.name}'s farm has no animals."

		if len(animal_names) == 1:
			animal_list = animal_names[0]
		elif len(animal_names) == 2:
			animal_list = " and ".join(animal_names)
		else:
			animal_list = ", ".join(animal_names[:-1]) + " and " + animal_names[-1]

		return f"{self.name}'s farm has {animal_list}."


macdonald = Farm("McDonald")
macdonald.add_animal("cow", 5)
macdonald.add_animal("sheep")
macdonald.add_animal("sheep")
macdonald.add_animal("goat", 12)
print(macdonald.get_info())
print(macdonald.get_short_info())
