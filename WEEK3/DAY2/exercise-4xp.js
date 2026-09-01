function hotelCost() {
    let nights;
    while (true) {
        let input = prompt("How many nights would you like to stay in the hotel?");
        nights = Number(input);
        if (input !== null && input.trim() !== "" && !isNaN(nights)) {
            break;
        }
    }
    return nights * 140;
}

function planeRideCost() {
    let destination;
    while (true) {
        destination = prompt("What is your destination?");
        if (destination !== null && destination.trim() !== "" && isNaN(destination)) {
            break;
        }
    }
    
    let destLower = destination.trim().toLowerCase();
    if (destLower === "london") {
        return 183;
    } else if (destLower === "paris") {
        return 220;
    } else {
        return 300;
    }
}

function rentalCarCost() {
    let days;
    while (true) {
        let input = prompt("How many days would you like to rent the car?");
        days = Number(input);
        if (input !== null && input.trim() !== "" && !isNaN(days)) {
            break;
        }
    }

    let cost = days * 40;
    if (days > 10) {
        cost *= 0.95; // 5% discount
    }
    return cost;
}

function totalVacationCost() {
    const car = rentalCarCost();
    const hotel = hotelCost();
    const plane = planeRideCost();

    console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}`);
    return car + hotel + plane;
}

totalVacationCost();