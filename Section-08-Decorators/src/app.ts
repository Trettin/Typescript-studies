
// function Logger(logString: string) {
//   return function(constructor: Function) {
//     console.log(logString)
//     console.log(constructor)
//   }
// }

// function WithTemplate(template: string, hookId: string) {
//   return function(constructor: any) {
//     console.log('Rendering Template')
//     const hookEl = document.getElementById(hookId);

//     const person = new constructor('Gabss');

//     if (hookEl) {
//       hookEl.innerHTML = template;
//       hookEl.querySelector('h2')!.textContent = person.name;
//     }
//   }
// }

// // Decorators are executed when classes are defined, not instantiated
// @Logger('Test log')
// @WithTemplate(`
// <h1>My person Obj</h1>
// <h2></h2> 
// `
// ,'app')
// class Person {

//   constructor(public name: string) {
//     console.log('Constructor')
//   } 
// }

// const pers = new Person('Gab');

// console.log(pers);

function Log(target: any, propName: string) {
  console.log('Property name: ', propName);
  console.log('Property constructor', target);
}
class Product {
  @Log
  title: string;
  private _price: number;

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

  getPriceWithTax(tax: number) {
    return this._price * (1 + tax);
  }
}