def find_max(numbers):
    if not numbers:
        return None
    
    # Start by assuming the first number is the maximum
    max_num = numbers[0]
    
    # Iterate through the list to compare each number
    for num in numbers:
        if num > max_num:
            max_num = num
            
    return max_num

# Example usage:
print(find_max([0, 1, 3, 50]))
# Output: 50