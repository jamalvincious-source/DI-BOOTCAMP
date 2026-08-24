import math


class Circle:
	def __init__(self, radius=1.0):
		self.radius = radius

	def perimeter(self):
		return 2 * math.pi * self.radius

	def area(self):
		return math.pi * self.radius ** 2

	def definition(self):
		print("A circle is a set of points in a plane that are all the same distance from a fixed center point.")

