import math
import turtle


class Circle:

    def __init__(self, radius=None, diameter=None):
        if radius is not None:
            self.radius = radius
        elif diameter is not None:
            self.radius = diameter / 2
        else:
            raise ValueError("You must specify either a radius or a diameter.")

    @property
    def radius(self):
        """Get the radius of the circle."""
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative.")
        self._radius = value

    @property
    def diameter(self):
        """Query or calculate the diameter using a decorator."""
        return self._radius * 2

    @diameter.setter
    def diameter(self, value):
        """Set the radius via diameter."""
        self.radius = value / 2

    @property
    def area(self):
        """Compute the circle's area."""
        return math.pi * (self._radius**2)

    def __str__(self):
        return f"Circle(Radius: {self.radius:.2f}, Diameter: {self.diameter:.2f}, Area: {self.area:.2f})"

    def __repr__(self):
        return f"Circle({self.radius})"

    def __add__(self, other):
        """Add two circles together and return a new circle with combined radius."""
        if isinstance(other, Circle):
            return Circle(radius=self.radius + other.radius)
        return NotImplemented

    def __gt__(self, other):
        """Compare if this circle is larger than another."""
        if isinstance(other, Circle):
            return self.radius > other.radius
        return NotImplemented

    def __eq__(self, other):
        """Check equality of two circles."""
        if isinstance(other, Circle):
            return self.radius == other.radius
        return NotImplemented

    def __lt__(self, other):
        """Enable sorting by implementing less-than comparison."""
        if isinstance(other, Circle):
            return self.radius < other.radius
        return NotImplemented


# ==========================================
# Testing the Circle Class Capabilities
# ==========================================

# 1. Initialize by radius or diameter
c1 = Circle(radius=5)
c2 = Circle(diameter=20)  # Radius will be 10

print(f"c1: {c1}")
print(f"c2: {c2}")
print(f"c1 Area: {c1.area:.2f}")

# 2. Add two circles together
c3 = c1 + c2
print(f"c3 (c1 + c2): {c3}")

# 3. Comparisons
print(f"Is c2 > c1? {c2 > c1}")
print(f"Is c1 == c2? {c1 == c2}")

# 4. Sorting a list of circles
circles = [Circle(radius=12), Circle(diameter=6), Circle(radius=2), Circle(diameter=16)]
circles.sort()
print("\nSorted Circles:", circles)


# ==========================================
# Bonus Challenge: Draw Sorted Circles with Turtle
# ==========================================
def draw_circles(circle_list):
    screen = turtle.Screen()
    screen.title("Sorted Circles")
    t = turtle.Turtle()
    t.speed(3)

    # Move starting position to the left
    t.penup()
    t.goto(-250, 0)
    t.pendown()

    for c in circle_list:
        t.circle(c.radius * 3)  # Scaled up slightly for visibility
        t.penup()
        # Space out circles based on diameter
        t.forward(c.diameter * 3 + 20)
        t.pendown()

    screen.mainloop()


# Uncomment to run visual turtle drawing:
# draw_circles(circles)