class MenuManager:
    def __init__(self):
        self.menu = [
            {"name": "Soup", "price": 10, "spice": "B", "gluten": False},
            {"name": "Hamburger", "price": 15, "spice": "A", "gluten": True},
            {"name": "Salad", "price": 18, "spice": "A", "gluten": False},
            {"name": "French Fries", "price": 5, "spice": "C", "gluten": False},
            {"name": "Beef bourguignon", "price": 25, "spice": "B", "gluten": True},
        ]

    def add_item(self, name, price, spice, gluten):
        self.menu.append({
            "name": name,
            "price": price,
            "spice": spice,
            "gluten": gluten,
        })

    def update_item(self, name, price, spice, gluten):
        for item in self.menu:
            if item["name"] == name:
                item.update({
                    "price": price,
                    "spice": spice,
                    "gluten": gluten,
                })
                return

        print(f"{name} is not on the menu.")

    def remove_item(self, name):
        for item in self.menu:
            if item["name"] == name:
                self.menu.remove(item)
                print(self.menu)
                return

        print(f"{name} is not on the menu.")
