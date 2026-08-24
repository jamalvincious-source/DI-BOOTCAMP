def type_count(**arguments):
	counts = {}

	for value in arguments.values():
		type_name = type(value).__name__
		counts[type_name] = counts.get(type_name, 0) + 1

	return ", ".join(f"{type_name}: {count}" for type_name, count in counts.items())


print(type_count(a=1, b="string", c=1.0, d=True, e=False))
