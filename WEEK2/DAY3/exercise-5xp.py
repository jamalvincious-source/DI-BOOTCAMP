from datetime import datetime

# Step 1 & 2: Get the current date and time
now = datetime.now()

# Step 3: Create a datetime object for January 1st of the next year
next_year = now.year + 1
target = datetime(year=next_year, month=1, day=1)

# Step 4: Calculate the time difference
time_left = target - now

# Step 5: Display the time difference
days = time_left.days
hours, remainder = divmod(time_left.seconds, 3600)
minutes, seconds = divmod(remainder, 60)

print(
    f"Time left until January 1st, {next_year}: "
    f"{days} days, {hours} hours, {minutes} minutes, and {seconds} seconds"
)