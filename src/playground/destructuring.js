//
// Object destructuring
//

/**** 
console.log('destructuring');

const person = {
  name: 'Andrew',
  age: 30,
  location: {
    city: 'san jose',
    temp: 70
  }
};

// apply default to name, and rename it to firstname
const { name: firstname = 'anonymous', age } = person;
console.log(`${firstname} is ${age}`);

// temperature uses the renaming syntax
const { city, temp: temperature } = person.location;
// if (person.location.city && person.location.temp) {
//   console.log(`It's ${person.location.temp} in ${person.location.city}`);
// }

if (city && temperature) {
  console.log(`It's ${temperature} in ${city}`);
}


const book = {
  title: 'ego is the enemy',
  author: 'Ryan Holiday',
  publisher: {
    name: 'Penguin'
  }
};

// set default name to be 'self-published'
const { name: publisherName = 'self-published' }  = book.publisher;
console.log(publisherName);

*********/


//
// Array destructuring
//

const address = ['1299 s juniper st', 'Philadephia', 'PA', '19147'];
console.log(`You are in ${address[1]} ${address[2]}`);

// matching by position: skip first and last
const [, city, state] = address; 
console.log(`You are in ${city} ${state}`);


const item = ['Coffee (hot)', '$2.0', '$2.50', '$2.75'];

// grab first and third item using array destructuring
const [ itemName, , mediumPrice ] = item;
console.log(`A medium ${itemName} cost ${mediumPrice}`);


