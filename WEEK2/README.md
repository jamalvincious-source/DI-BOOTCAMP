with open("example.txt", "w+") as file:
    file.write("Hello World")

    # Move pointer back to start to read what was written
    file.seek(0)
    print(file.read())  # Output: Hello World
