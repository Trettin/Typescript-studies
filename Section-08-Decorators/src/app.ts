
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

function WithTemplate(template: string, hookId: string) {
  return function<T extends {new(...args: any[]): {name: string}}>(_constructor: T) {
    console.log('Rendering Template')
    
    return class extends _constructor {
      constructor(...args: any[]) {
        super(...args);

        const hookEl = document.getElementById(hookId);

        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h2')!.textContent = this.name;
        }
      }
    }
  }
}

// Decorators are executed when classes are defined, not instantiated
@Logger('Test log')
@WithTemplate(`
<h1>My person Obj</h1>
<h2></h2> 
`
,'app')
class Person {

  constructor(public name: string) {
    console.log('Constructor')
  } 
}

const pers = new Person('Gab');

console.log(pers);

function Log(target: any, propName: string) {
  console.log('Property name: ', propName);
  console.log('Property constructor', target);
}

/**
 * Acessor and method decorators can return values
 * We can return a new PropertyDescriptor
 * configurable: true
 * enumerable: false
 * get: undefined
 * set: ƒ price(val)
 */
function Log2(target: any, name: string, descripor: PropertyDescriptor) {
  console.log('Acessor decorator!');
  console.log(target);
  console.log(name);
  console.log(descripor);
}

/**
 * 
 * @param target 
 * @param name 
 * @param descripor {
 *  configurable: true
 *  enumerable: false
 *  value: ƒ getPriceWithTax(tax)
 *  writable true
 * } 
 */
function Log3(target: any, name: string | Symbol, descripor: PropertyDescriptor) {
  console.log('Method decorator!');
  console.log(target);
  console.log(name);
  console.log(descripor);
}

/**
 * @param target 
 * @param name Name of the function
 * @param argPosition 
 */
function Log4(target: any, name: string | Symbol, argPosition: number) {
  console.log('Parameter decorator!');
  console.log(target);
  console.log(name);
  console.log(argPosition);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
      return;
    }
    throw new Error('Invalid Price - Price should be positive.')
  }

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

function Autobind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn
    }
  }
  return adjDescriptor;
}
class Printer {
  message = 'This works'

  @Autobind
  showMessage() {
    console.log(this.message)
  }
}

const p = new Printer();
const button = document.querySelector('button');
button?.addEventListener('click', p.showMessage);

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[] //['required', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
  }
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
  }
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig){
    return true
  }
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break;

        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;

  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();

  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  
  if (!validate(createdCourse)) {
    alert('Invalid Input, try again')
    return;
  }
  console.log({createdCourse})

})