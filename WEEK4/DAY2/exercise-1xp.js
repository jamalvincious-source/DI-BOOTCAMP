const person = {
	name: 'John Doe',
	location: {
		country: 'Canada',
		city: 'Vancouver',
		coordinates: [49.2827, -123.1207]
	}
};

const { name, location: { country, city, coordinates: [lat, lng] } } = person;

console.log(`name      -> "${name}"`);
console.log(`country   -> "${country}"`);
console.log(`city      -> "${city}"`);
console.log(`lat       -> ${lat}`);
console.log(`lng       -> ${lng}`);