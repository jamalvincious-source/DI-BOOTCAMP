from menu_manager import MenuManager

def load_manager():
    return MenuManager()

def show_restaurant_menu(manager):
    print("\n--- Restaurant Menu ---")
    for item in manager.menu["items"]:
        print(f"- {item['name']}: ${item['price']}")
    print("-----------------------")

def add_item_to_menu(manager):
    name = input("Enter the item's name: ").strip()
    try:
        price = float(input("Enter the item's price: "))
        manager.add_item(name, price)
        print("item was added successfully")
    except ValueError:
        print("Invalid price entered. Please enter a valid number.")

def remove_item_from_menu(manager):
    name = input("Enter the name of the item you want to remove: ").strip()
    success = manager.remove_item(name)
    if success:
        print("Item was deleted successfully.")
    else:
        print("Error: Item was not found in the menu.")

def show_user_menu():
    manager = load_manager()
    
    while True:
        print("\n        MENU")
        print("(a) Add an item")
        print("(d) Delete an item")
        print("(v) View the menu")
        print("(x) Exit")
        
        choice = input(": ").strip().lower()
        
        if choice == 'v':
            show_restaurant_menu(manager)
        elif choice == 'a':
            add_item_to_menu(manager)
        elif choice == 'd':
            remove_item_from_menu(manager)
        elif choice == 'x':
            manager.save_to_file()
            print("Menu was saved. Exiting program.")
            break
        else:
            print("Invalid choice, please choose a valid option from the menu.")

if __name__ == "__main__":
    show_user_menu()