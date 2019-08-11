//Evaluate these:
//#1
[2] === [2] //false
{} === {}  //false

//#2 what is the value of property a for each object.
const object1 = { a: 5 };  //4
const object2 = object1; //4
const object3 = object2; //4
const object4 = { a: 5};  //5
object1.a = 4; //4


//#3 create two classes: an Animal class and a Mamal class. 
// create a cow that accepts a name, type and color and has a sound method that moo's her name, type and color. 
class Animal{
	constructor(name, color, type){
		this.name = name;
		this.color = color;
		this.type = type;
	}
}

class Cow extends Animal{
	constructor(name, color, type){
		super(name, color, type);
	}

	moo(){
		console.log(`moooo ${this.name} ${this.color} ${this.type}`);
	}
}