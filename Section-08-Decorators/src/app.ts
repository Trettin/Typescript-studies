
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

// function Log(target: any, propName: string) {
//   console.log('Property name: ', propName);
//   console.log('Property constructor', target);
// }

// function Log2(target: any, name: string, descripor: PropertyDescriptor) {
//   console.log('Acessor decorator!');
//   console.log(target);
//   console.log(name);
//   console.log(descripor);
// }

// function Log3(target: any, name: string | Symbol, descripor: PropertyDescriptor) {
//   console.log('Method decorator!');
//   console.log(target);
//   console.log(name);
//   console.log(descripor);
// }

// /**
//  * @param target 
//  * @param name Name of the function
//  * @param argPosition 
//  */
// function Log4(target: any, name: string | Symbol, argPosition: number) {
//   console.log('Parameter decorator!');
//   console.log(target);
//   console.log(name);
//   console.log(argPosition);
// }

// class Product {
//   @Log
//   title: string;
//   private _price: number;

//   @Log2
//   set price(val: number) {
//     if (val > 0) {
//       this._price = val;
//       return;
//     }
//     throw new Error('Invalid Price - Price should be positive.')
//   }

//   constructor(t: string, p: number) {
//     this.title = t;
//     this.price = p;
//   }

//   @Log3
//   getPriceWithTax(@Log4 tax: number) {
//     return this._price * (1 + tax);
//   }
// }
