from datetime import datetime

def minutes_lived(birthdate_str):
    # 1. Parse the string into a datetime object
    # Format: YYYY-MM-DD (e.g., '1995-05-15')
    birthdate = datetime.strptime(birthdate_str, "%Y-%m-%d")
    
    # 2. Get the current date and time
    now = datetime.now()
    
    # 3. Calculate the time difference (timedelta object)
    time_lived = now - birthdate
    
    # 4. Convert total seconds to minutes
    total_minutes = int(time_lived.total_seconds() // 60)
    
    # 5. Display the result
    print(f"You have lived approximately {total_minutes:,} minutes!")

# Example usage:
minutes_lived("2000-01-01")