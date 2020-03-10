var address = {
	Street: 'Main',
	Number: 100,
	Apartment:
	{
		Floor: 3,
		Number: 301
	}
};

var person = {
	firstname: 'Chi-Shan',
	lastname: 'Yu',
	greet: function() {
		console.log(`Hello, ${this.firstname} ${this.lastname}`);
	}
};
person.greet();

console.log(person['firstname']);

// Object Literals
let name, phone;
let info = {
	name: name,
	phone: phone,
	printInfo: function() {
		console.log(`Name: ${this.name}, Phone: ${this.phone}`);
	}
}

info.name = "ntue";
info.phone = "2732-1104";
info.printInfo();

let info1 = {
	name,
	phone,
	printInfo() {
		console.log(`Name: ${this.name}, Phone: ${this.phone}`);
	}
}

info1.name = "ntue";
info1.phone = "2732-1104";
info1.printInfo();
