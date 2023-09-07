
function Logger(constructor: Function) {
  console.log('Logging')
  console.log(constructor)
}
// Decorators are executed when classes are defined, not instantiated
@Logger
class Person {
  name = 'Max';

  constructor() {
    console.log('Constructor')
  } 
}

const pers = new Person();

console.log(pers)