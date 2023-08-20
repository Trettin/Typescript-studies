

// Using this interface with length property that makes countAndDescribe function able to work with both string and array because both have length property in it.
interface Lentghty {
  length: number;
}

function countAndDescribe<T extends Lentghty>(element: T): [T, string] {
  let description = 'Got no value.';

  if (element.length > 0) {
    description = `Got ${element.length} element${element.length === 1 ? '': 's'}.`;
  }

  return [element, description];
}

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
  ) {
    return 'Value: ' + obj[key];
}

console.log(extractAndConvert({name: 'Gabriel'}, 'name'));