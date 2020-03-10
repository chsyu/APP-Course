'use strict'

class Person {
	constructor (name) {
		this.name = name;
	}
	printGreeting () {
		console.log(`Hi, I am ${this.name}!`);
	}
}

class Employee extends Person {
	constructor (name, job) {
		super(name);
		this.job = job
	}
	printGreeting () {
		super.printGreeting();
		console.log(`Hi, I am ${this.name} and I am a ${this.job}!`);
	}
}

var person1 = new Employee('Andrew', 'Teacher');
person1.printGreeting();

var person2 = new Person('Mike');
person2.printGreeting();

Person.prototype.printGreeting = function() {
	console.log(`Hi, I am ${this.name}, and I have been changed!`);
}
person1.printGreeting();
person2.printGreeting();
