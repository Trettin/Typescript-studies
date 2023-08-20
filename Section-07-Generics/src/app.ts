

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

console.log(countAndDescribe('t2'))