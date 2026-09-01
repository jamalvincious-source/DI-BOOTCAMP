import json

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

# Step 1: Load the JSON string
data = json.loads(sampleJson)

# Step 2: Access and print the nested "salary" key
salary = data["company"]["employee"]["payable"]["salary"]
print(f"Salary: {salary}")

# Step 3: Add the "birth_date" key to the "employee" dictionary
data["company"]["employee"]["birth_date"] = "1995-05-15"

# Step 4: Save the modified dictionary to a file formatted with indent
with open("employee_data.json", "w") as file:
    json.dump(data, file, indent=4)



