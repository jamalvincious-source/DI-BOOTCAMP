import random


class MyList:
	def __init__(self, letters):
		self.mylist = letters

	def reversed_list(self):
		return self.mylist[::-1]

	def sorted_list(self):
		return sorted(self.mylist)

	def random_list(self):
		return [random.randint(1, 100) for _ in self.mylist]
