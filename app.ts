type Order = 'first' | 'second'
const position: Order = 'first';

let userInput: unknown;
let userName: string;


userInput = 5;
userInput = 'Max';

// Tsc error
// userName = userInput;

if (typeof userInput === 'string') {
  // Typescript doesn't allow to store uknown in typed variable without checking type
  userName = userInput;
}

// Functions with return type void actually return undefined
// But if you set the return type to undefined then you will need to place the return statement

// Since throw breaks the script the function will never have a return type.
function generateError(message: string, errorCode: number): never {
  throw {message, errorCode}
}