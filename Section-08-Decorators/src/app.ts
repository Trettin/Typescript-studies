
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
}

function WithTemplate(template: string, hookId: string) {
  return function(constructor: any) {
    const hookEl = document.getElementById(hookId);

    const person = new constructor('Gabss');

    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h2')!.textContent = person.name;
    }
  }
}

// Decorators are executed when classes are defined, not instantiated
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

console.log(pers)