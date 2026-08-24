import builtins


class MenuManager:
    def __init__(self):
        # Initial list of dish dictionaries
        self.menu = [
            {"name": "Soup", "price": 10, "spice_level": "B", "gluten_index": False},
            {"name": "Hamburger", "price": 15, "spice_level": "A", "gluten_index": True},
            {"name": "Salad", "price": 18, "spice_level": "A", "gluten_index": False},
            {"name": "French Fries", "price": 5, "spice_level": "C", "gluten_index": False},
            {"name": "Beef bourguignon", "price": 25, "spice_level": "B", "gluten_index": True}
        ]

    def add_item(self, name, price, spice, gluten):
        """Adds a new dish to the menu."""
        new_dish = {
            "name": name,
            "price": price,
            "spice_level": spice,
            "gluten_index": gluten
        }
        self.menu.append(new_dish)
        builtins.print(f"'{name}' has been added to the menu.")

    def update_item(self, name, price, spice, gluten):
        """Updates an existing dish on the menu or notifies if missing."""
        for item in self.menu:
            if item["name"].lower() == name.lower():
                item["price"] = price
                item["spice_level"] = spice
                item["gluten_index"] = gluten
                builtins.print(f"'{name}' has been updated successfully.")
                return
        
        builtins.print(f"Error: '{name}' is not in the menu.")

    def remove_item(self, name):
        """Deletes a dish from the menu and prints the updated menu list."""
        for item in self.menu:
            if item["name"].lower() == name.lower():
                self.menu.remove(item)
                builtins.print(f"'{name}' has been removed from the menu.")
                builtins.print("Updated Menu:")
                for dish in self.menu:
                    builtins.print(dish)
                return
        
        builtins.print(f"Error: '{name}' is not in the menu.")


# --- Example Usage & Testing ---
if __name__ == "__main__":
    manager = MenuManager()

    # Add a dish
    manager.add_item("Tacos", 12, "C", False)

    # Update a dish
    manager.update_item("Soup", 12, "B", False)

    # Remove a dish
    manager.remove_item("Hamburger")

    # Try removing a non-existent dish
    manager.remove_item("Pizza")