type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}

// Intersection Type
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date()
};

// Union Type
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// Function overload
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: string, c: string): string;
function add(a: number, b: number, c: number): number;
function add(a: Combinable, b: Combinable, c?: Combinable) {
  // Type guard
  c = c || (typeof a === 'string' || typeof b === 'string' ? '' : 0);

  if (typeof a === 'string' || typeof b === 'string' || typeof c === 'string') {
    return a.toString() + b.toString() + c.toString();
  }
  return a + b + c;
}

type UnknownEmployee = Employee | Admin;

// Type guard for properties in custom types that don't exist in run time 
function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name ' + emp.name);
  if ('privileges' in emp) {
    console.log('Privileges ' + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('Start date ' + emp.startDate);
  }
}

printEmployeeInformation(e1);

class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo ...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  // Type guard for class that works in runtime
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}


// Discriminated Union  => using some property that all the interfaces share
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('Moving at speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});

interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not valid email',
  username: 'Must start with a capital character'
}
