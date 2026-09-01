import json

# Provided sample JSON string
sampleJson = """{ 
   "company":{ 
      "employee":{ 
         "name":"emma",
         "payable":{ 
            "salary":7000,
            "bonus":800
         }
      }
   }
}"""

# Step 1: Load the JSON string into a Python dictionary
data = json.loads(sampleJson)

# Step 2: Access and print the nested “salary” key
salary = data["company"]["employee"]["payable"]["salary"]
print(f"The employee's salary is: {salary}")

# Step 3: Add the “birth_date” key to the “employee” dictionary
data["company"]["employee"]["birth_date"] = "1990-05-14"

# Step 4: Save the modified JSON to a file with indent formatting
output_file = "modified_employee.json"
with open(output_file, "w", encoding="utf-8") as file:
    json.dump(data, file, indent=4)

print(f"Modified JSON successfully saved to '{output_file}'.")