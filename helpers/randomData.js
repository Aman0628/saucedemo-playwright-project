const FIRST_NAMES = ["Aman", "Priya", "Rahul", "Sara", "John", "Emma"];
const LAST_NAMES = ["Kumar", "Sharma", "Singh", "Patel", "Smith", "Doe"];

function randomFrom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function randomFirstName() {
    return randomFrom(FIRST_NAMES);
}

function randomLastName() {
    return randomFrom(LAST_NAMES);
}

function randomZip() {
    return String(Math.floor(100000 + Math.random() * 900000));
}

function randomCheckoutInfo() {
    return {
        firstName: randomFirstName(),
        lastName: randomLastName(),
        zip: randomZip(),
    };
}

module.exports = { randomFirstName, randomLastName, randomZip, randomCheckoutInfo };
