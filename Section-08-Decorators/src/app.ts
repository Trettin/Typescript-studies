
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}
// Decorators are executed when classes are defined, not instantiated
@Logger('Loggin person')
class Person {
  name = 'Max';

  constructor() {
    console.log('Constructor')
  } 
}

const pers = new Person();

console.log(pers)