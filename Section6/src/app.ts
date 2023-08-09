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

// Type guard
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
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