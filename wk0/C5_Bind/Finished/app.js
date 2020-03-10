var person = {
  firstname: 'Chi-Shan',
  lastname: 'Yu',
  getFullName: function() {
    var fullname = this.firstname + ' ' + this.lastname;
    return fullname;
  }
}

var logName = function() {
  console.log('logged: ' + this.getFullName());
}

var logPersonName = logName.bind(person);
logPersonName();

// callback with bind
let greet = function(fn) {
  fn();
};

let person = {
  name: 'Chi-Shan Yu',
  hello: function(){
    console.log(`Hello ${this.name}`);
  },
  sayHello: function(){
    greet(this.hello.bind(this));
  }
};

person.sayHello();

let newPerson = {
  name: 'Chi-Shan Yu',
  sayHello: function(){
    greet(
      () => console.log(`Hello ${this.name}`)
    );
  }
};

newPerson.sayHello();




