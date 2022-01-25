// ====================================================
// simple DOM manipulation: changing value of element
// ====================================================

let docObj = document.querySelector('.header-title');

function eventHandler(e) {
    console.log('response!');
    this.firstChild.nodeValue = "DOMDOMDOM";
}

function eventHandler2(e) {
    console.log('new response!');
    this.firstChild.nodeValue = "DOM Manipulation";
}

// console.log(docObj.firstChild.nodeValue);

docObj.addEventListener('mouseenter', eventHandler);
docObj.addEventListener('click', eventHandler2);

// ====================================================
// simple DOM manipulation: handling onclick events
// ====================================================

let mainButton = document.querySelector('.main-button');

// with this way of handling clicks, only one onclick handler can be assigned
// to an object at a time. addEventListener is more flexible in this regard.
// mainButton.onclick = function() {
//     console.log('onclick event');
//     this.textContent = 'Clicked!';
// }

function eventHandler3(e) {
    console.log('onclick event');
    this.textContent = 'Clicked!';

    // reloads the current URL, like the Refresh button
    // location.reload();
}

mainButton.addEventListener('click', eventHandler3);

// ====================================================
// simple data structures: objects (with lessons)
// ====================================================

// object   = collection of properties
// property = association between a name (aka key) and a value
//              - key/value pairs

// to access object properties:
// objectName.propertyName

// defining objects & property values:
// const myCar = new Object();
// myCar.make = 'Honda';
// myCar.model = 'Accord';
// myCar.year = 2012;

// creating an object via OBJECT INITIALIZER:
const myCar = {
    make: 'Honda',
    model: 'Accord',
    year: 2012
}

// myCar.unassigedProperty // returns undefined

// creating an object via CONSTRUCTOR FUNCTION: 
function Phone(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}

const myPhone = new Phone('Apple', 'iPhone 12 Pro', 2021);
console.log(myPhone);

// can also have objects as values. 
// e.g. myPhone.owner = new Person(<name>, <sex>, <age>);
// to access that object's values: e.g. myPhone.owner.name

// creating an object via the OBJECT.CREATE METHOD:
const myComputer = {
    make: 'Apple', // default
    model: 'MacBook Pro',
    size: 14,
    year: 2021
}

const bigPro = Object.create(myComputer);
bigPro.size = 16;
// useful bc allows to choose the PROTOTYPE OBJECT for object you want to 
// create, without having to define a constructor function

// can access or set objects using bracket notation
// good for those property names with spaces or hyphens or start with number
// good for properties that are not determined until runtime
// myCar['make'];

// console.log(myCar);

// to iterate over all enumerable properties of an object: 
function showProps(obj, objName) {
    let result = '';
    for (let i in obj) {
        if (obj.hasOwnProperty(i)) {
            result += `${objName}.${i} = ${obj[i]}\n`;
        }
    }
    console.log(result);
}

// showProps(myCar, 'myCar');
// console.log(Object.keys(myCar));
// console.log(Object.getOwnPropertyNames(myCar));

// can access object properties via index, e.g. myCar[0] is 'Honda'

// OBJECT INHERITANCE
// all objects in JS inherit from at least one other object

// can add property to previous defined object type using PROTOTYPE PROPERTY
// defines a property that's shared by all objects of specified type

Phone.prototype.color = 'blue';
myPhone.color = 'spacegray';
console.log(myPhone);

// can define methods, assigned as the property of an object
// method: property of an object that is a function

function test(arg) {
    console.log(`my arg is ${arg}`);
}

function Cup(color, method) {
    this.color = color;
    this.method = method;
}

let myCup = new Cup('blue', test);
myCup.method('apple');

console.log(Object.keys(myCup));

// can define GETTERS with GET (method that gets value of specific property) 
// can define SETTERS with SET (method that sets value of specific property)
// getters/setters can be defined through object initializers...

const o = {
    a: 7,
    get b() {
        return this.a + 1;
    },
    set c(x) {
        this.a = x / 2;
    }
}

console.log(o.a); // 7
console.log(o.b); // 8
o.c = 50;
console.log(o.a); // 25

// ... or added later using getter/setter-adding method

const p = { a: 0 };

Object.defineProperties(p, {
    'b': { get: function() { return this.a + 1; } },
    'c': { set: function(x) { this.a = x / 2; } }
})

p.c = 10; // runs setter, which assigns 10 / 2 (5) to 'a' property
console.log(o.b); // runs getter, which yields a + 1 or 6

// can delete properties with DELETE OPERATOR, e.g. delete myObj.objProperty

delete p.a;
'a' in p; // returns false

// can compare objects, but must remember: two distinct objects are never equal, even if
// they have the same properties. only comparing the same object REFERENCE with itself yields true.

const fruit = { name: 'apple' };
const fruitbear = { name: 'apple' }; // distinct object with same properties
const fruitbird = fruit; // assigning fruit object reference to fruitbird

fruit == fruitbear; // returns false
fruit == fruitbird; // returns true

// ====================================================
// simple data structures: arrays and queues
// ====================================================

// can use an array as a queue by using push() and shift() methods
// push() method equiv to enqueue operation
// shift() method equiv to dequeue operation

// Queue constructor function
function Queue() {
    this.elements = [];
}

// adds element to end of queue
Queue.prototype.enqueue = function(e) {
    this.elements.push(e);
}

// removes element from front of queue
Queue.prototype.dequeue = function() {
    return this.elements.shift();
}

// check if queue is empty
Queue.prototype.isEmpty = function() {
    return this.elements.length == 0;
}

// get the element at the front of the queue
Queue.prototype.peek = function() {
    return !this.isEmpty() ? this.elements[0] : undefined;
    // if not empty, return element at index 0, otherwise return undefined
}

// get the length of a queue
Queue.prototype.length = function() {
    return this.elements.length;
}

// EXAMPLE, EASY-TO-GRASP:
// Wendys just opened, waiting line at Wendys is currently empty []
let wendysQueue = new Queue();

// a group of seven people arrive at Wendys, each added at end of line
for (let i = 1; i <= 7; i++) {
    wendysQueue.enqueue(i);
    // []
    // [1]
    // [1,2]
    // [1,2,3]
    // [1,2,3,4]
    // [1,2,3,4,5]
    // [1,2,3,4,5,6]
    // [1,2,3,4,5,6,7]
}

// who is the first customer?
wendysQueue.peek() // returns 1, the first person in line

// how long is the line?
wendysQueue.length(); // returns 7

// first person served and left the line
wendysQueue.dequeue(); // returns 1, wendysQueue now [2,3,4,5,6,7]
wendysQueue; // now returns [2,3,4,5,6,7]

// how to serve the next persons in line, in order?
while (!wendysQueue.isEmpty()) {
    wendysQueue.dequeue();
    // [1,2,3,4,5,6,7]
    // [2,3,4,5,6,7]
    // [3,4,5,6,7]
    // [4,5,6,7]
    // [5,6,7]
    // [6,7]
    // [7]
    // []
}

wendysQueue; // now returns [], an empty line / queue

// ====================================================
// simple data structures: arrays and stacks
// ====================================================

// can use an array as a stack using the push() and pop() methods

// Stack constructor function
function Stack() {
    this.elements = [];
}

// checks if the stack is empty
Stack.prototype.isEmpty = function() {
    return this.elements.length == 0;
}

// EXAMPLE, EASY-TO-GRASP:
// you're laying 5 books on top of each other, nothing on the table []
let bookStack = new Stack();

// you start stacking, one book on top of the last book
for (let i = 1; i <= 5; i++) {
    bookStack.elements.push(i);
    // []
    // [1]
    // [1,2]
    // [1,2,3]
    // [1,2,3,4]
    // [1,2,3,4,5]
}

bookStack; // now returns [1,2,3,4,5]

// now you want to put the books away, starting from the top downwards
while (!bookStack.isEmpty()) {
    bookStack.elements.pop();
    // [1,2,3,4,5]
    // [1,2,3,4]
    // [1,2,3]
    // [1,2]
    // [1]
    // []
}

bookStack; // now returns [], an empty stack

// ====================================================
// simple data structures: objects and sets
// ====================================================

// Set object lets you store unique values of any type
// they don't repeat within the Set
// can convert between Set and Array
// they are objects, but the contents within them are both keys and values!

// add method           adds value to Set, nothing if already in Set
// has method           checks if value is in a Set object
// delete method        removes value from Set
// size method          returns size of Set object
// Array.from(mySet)    converts Set object to Array object (can also use [...mySet])

const peopleIKnow = new Set();

peopleIKnow.add('Samuel'); // Set [ 'Samuel' ]
peopleIKnow.add('Jocelyn'); // Set [ 'Samuel', 'Jocelyn' ]
peopleIKnow.add('Jocelyn'); // Set [ 'Samuel', 'Jocelyn' ]
peopleIKnow.add('Arhamis'); // Set [ 'Samuel', 'Jocelyn', 'Arhamis' ]
peopleIKnow.size; // 3
peopleIKnow.has('Samuel'); // true
peopleIKnow.has('Pedro'); // false
peopleIKnow.delete('Jocelyn'); // removes Jocelyn from the Set
peopleIKnow.has('Jocelyn'); // false, since they were removed
peopleIKnow.size; // 2, since Jocelyn was removed

// Examples, with math terms
const setA = new Set([1, 2, 3, 4])
const setB = new Set([2, 3])
const setC = new Set([3, 4, 5, 6])

// isSuperset(setA, setB)          // returns true
// union(setA, setC)               // returns Set {1, 2, 3, 4, 5, 6}
// intersection(setA, setC)        // returns Set {3, 4}
// symmetricDifference(setA, setC) // returns Set {1, 2, 5, 6}
// difference(setA, setC)          // returns Set {1, 2}

// ====================================================
// manipulating data structures: loops, map, filter, reduce, Object.keys
// ====================================================

// LOOPS (for loops, learned)

// MAP
// calls function on every element in array, 
// and adds the results to a new list
const myArr1 = [1,2,3,4,5];

function addSeven(x) {
    return x + 7;
}

myArr1.map(addSeven); // creates [8,9,10,11,12]

// FILTER
// calls function on every element in array, 
// and adds only the elements that returned true to a new list
const myArr2 = ['ant','banana','grape'];

function fiveOrMore(word) {
    return word.length >= 5;
}

myArr2.filter(fiveOrMore); // creates ['banana','grape']

// REDUCE
// calls function on every element in array,
// using the previous value and current value as its arguments,
// and returns a single value (think of an accumulator)
const myArr3 = [1,2,3];

function addAll(x,y) {
    return x + y;
}

myArr3.reduce(addAll); // returns 6

// OBJECT.KEYS
// returns array of given object's property names
const myObj1 = {
    name: 'Erick',
    age: 24,
    employedAs: 'web developer'
};

Object.keys(myObj1); // returns ['name', 'age', 'employedAs']

// ====================================================
// using fetch API: promises
// ====================================================

// replaces callbacks, better bc no need to endlessly indent,
// just add a then and stay in the same indent

// promise is committing to something
// either promise is completed (resolved)
// or promise is failed (rejected)

// great for when you need to do something that's going to take a long time 
// in the background (eg downloading image from server)

// promise object takes a function with two variables, resolve and reject

let myPromise = new Promise((resolve, reject) => {
    let a = 1 + 2;
    if (a == 2) {
        resolve('Success');
    } else {
        reject('Failed');
    }
});

// to interact with promises
// then only runs if Promise resolved
// catch only runs if Promise rejected
myPromise.then((message) => {
    console.log('This is in the then ' + message);
}).catch((message) => {
    console.log('This is in the catch ' + message);
})

// if you need multiple promises (that resolve at different times) for a new Promise 
// that needs them all at the same time, use Promise.all

// resolves in 20ms
const recordVideoOne = new Promise((resolve,reject) => {
    resolve('Video 1 Recorded');
})
// resolves in 40ms
const recordVideoTwo = new Promise((resolve,reject) => {
    resolve('Video 2 Recorded');
})
// resolves in 100ms
const recordVideoThree = new Promise((resolve,reject) => {
    resolve('Video 3 Recorded');
})

// resolves at the same time, returns all messages
Promise.all([
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
]).then((messages) => {
    console.log(messages);
})

// if you want to wait until at least one (out of many) resolves, use Promise.race

// resolves at the same time, returns first message of Promise that resolves
Promise.race([
    recordVideoOne,
    recordVideoTwo,
    recordVideoThree
]).then((messages) => {
    console.log(messages);
})

// ====================================================
// using fetch API: async and await
// ====================================================

// both async and await are syntactic sugar that make Promises easier to work with
// async tells JS that once it hits an await, it can do other things until it finishes
// await tells JS to wait until makeRequest finishes, THEN execute next thing
// try...catch statement specifies a response (the catch) should an exception be thrown by
// any statement within the try

// MAKING PROMISES:
function makeRequest(location) {
    return new Promise((resolve, reject) => {
        console.log(`Making Request to ${location}`)
        if (location === 'Google') {
            resolve('Google says hi')
        } else {
            reject('We can only talk to Google')
        }
    })
}

function processRequest(response) {
    return new Promise((resolve, reject) => {
        console.log('Processing response')
        resolve(`Extra information + ${response}`)
    })
}

// HOW TO CALL THESE FUNCTIONS USING PROMISES & THEN:
// makeRequest('Google').then(response => {
//     console.log('Response Received')
//     return processRequest(response)
// }).then(processedResponse => {
//     console.log(processedResponse)
// }).catch(err => {
//     console.log(err)
// })

// HOW TO CALL THESE FUNCTIONS WITH ASYNC AND AWAIT:
// async function doWork() { 
//     const response = await makeRequest('Google') 
//     console.log('Response Received')
//     const processedResponse = await processRequest(response)
//     console.log(processedResponse)
// }
// doWork()

// HOW TO ADD A CATCH TO THE ASYNC AND AWAIT FUNCTION:
async function doWork() { 
    try {
        const response = await makeRequest('Google') 
        console.log('Response Received')
        const processedResponse = await processRequest(response)
        console.log(processedResponse)
    } catch(err) {
        console.log(err)
    }
}
doWork()

// ====================================================
// using fetch API: fetch
// ====================================================
// first property is URL

// fetch(<url>) returns Promise {<pending>}
// res returns Response {... body, ok, status, statusText... }
// the Response object contains the body of data we requested, but it's not directly accessible
// res.json() returns another Promise {<pending>}
// data returns data from API
// if get request fails, fetch shouldn't run

// USING FETCH TO GET DATA FROM SERVER:
fetch('https://reqres.in/api/users')
    .then(res => {
        if (res.ok) {
            console.log('SUCCESS')
        } else {
            console.log('NOT SUCCESSFUL')
        }
}).then(data => console.log(data));

// USING FETCH TO POST DATA TO SERVER (USING JSON):
fetch('https://reqres.in/api/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: 'User1'
    })
})
    .then(res => {
        return res.json() // can be parsed to other formats if needed
}).then(data => console.log(data));

// ====================================================
// basics of regex
// ====================================================

// used to validate user-generated input and search through text
// regexr.com is a great site to learn regex

const regex1a = /foo/; // literal way
const regex1b = new RegExp(/foo/); // instantiate RegExp

const matches1 = 'Some Text'.match(regex1a); // find all matching patterns
const index1 = 'Some Text'.search(regex1a); // search for a single match
const next = 'Some Text'.replace(regex1a,'hi mom!'); // replace matching patterns

// PASSWORD VALIDATION

// example. let's break this down
// password must contain a capital letter, lowercase letter, number, and min length of 8
const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g;
console.log('asdf'.search(re)); // returns 0 if valid, -1 if invalid
// ^                match the beginning of input
// (?=.*\d)         positive lookahead. beginning of input only matches if starting with 
//                      zero or more of any character (.*) followed by a digit (\d)
// (?=.*[a-z])      positive lookahead. previous input only matches if starting with zero
//                      or more of any character (.*) followed by any lowercase character ([a-z])
// (?=.*[A-Z])      positive lookahead. previous input only matches if starting with zero
//                      or more of any character (.*) followed by any uppercase character ([A-Z])
// (?=.*[a-zA-Z])   positive lookahead. previous input only matches if starting with zero
//                      or more of any character (.*) followed by any character ([a-zA-Z])
// .{8,}            match 8 or more of any character (.)
// $                match the end of input

// /e/g 			=> matches all e in text
// /e+/g 			=> matches 1 or more e in text
// /ea?/g 			=> matches all e and a optionally
// /ea*/g			=> match 0 or more (like combo of + and ?)
// /.at/g			=> period matches anything. so “cat”, “ at”, etc
// /\./g			=> backspace escapes the char that’s next
// /\w/g			=> matches any character (\W is opposite)
// /\s/g			=> matches all whitespace (\S is opposite)
// /\w{4,5}/g 	    => {} gives min/max of preceding selector
// /[fc]at/g		=> [] match any chars inside it (indiv, ranges)
// /(t | T)he/g	    => () is its own group ( | is like or)
// /^T/g 			=> ^ match the beginning of the line
// /\.$/g			=> $ match the end of the line

// ====================================================
// basics of regex: practice
// ====================================================

// https://regexone.com 

// ====================================================
// how to encode and decode text (base64, url encoding)
// ====================================================

// when you pass information through a URL, the string must only use
// specific allowed characters. any unallowed characters must be encoded
// while en route and decoded when in use.

// URL encoding replaces unallowed characters with a % sign followed by two 
// hexadecimal digits (encodeURI and encodeURIComponent)

// base64 strings only consist of ASCII characters, so they’re generally URL-safe
// (btoa and atob)

// base64 is used to transfer binary data
// encodeURIComponent only encodes special characters

// using encode URI:
const testURI = ('https://www.google.com/spaces in file/');
const testURIComponent = ('spaces in file');

// to encode URI
encodeURI(testURI); // returns https://www.google.com/spaces%20in%20file/

// to encode URI component only
encodeURIComponent(testURIComponent); // returns spaces%20in%20file

// using base64:

// to encode string
const stringToBase64 = btoa(testURIComponent); 
stringToBase64; // returns c3BhY2VzIGluIGZpbGU=

// to decode string
const base64ToString = atob(stringToBase64);
base64ToString; // returns spaces in file

// ====================================================
// ES6 syntactic sugar: arrow functions
// ====================================================

// MDN has fantastic documentation on this

// before arrow functions
function asdf(a) {
    return a * 10;
}

// after arrow functions
a => a * 10;

// ====================================================
// ES6 syntactic sugar: destructuring assignments
// ====================================================

// MDN has fantastic documentation on this
// so does Dmitri Pavlutin, check out his blog!

// destructuring arrays and objects can be quite useful
// extract properties from objects and bind them to variables

// const [firstElement, secondElement] = list;
// is equivalent to:
// const firstElement = list[0];
// const secondElement = list[1];

// property to variable:
// const { prop } = object;

// multiple properties:
// const { prop1, prop2, ..., propN } = object;

// default value:
// const { prop = 'Default' } = object;

// alias:
// const { prop: myProp } = object;

// deep property:
// const { prop: { deepProp } } = object;

// dynamic property name:
// const { [propName]: myProp } = object;

// ====================================================
// ES6 syntactic sugar: object initializer shorthand
// ====================================================

// shorthand property names
// shorthand method names
// computed property names

// before object initializer shorthand:

var cat = 'meow';

var someOtherObj = {
    cat: cat,
    dog: function() {
        //logic
    },
    bird: 'tweet'
}

// after object initializer shorthand:

let one = 'apple';
let three = 'lettuce';

let someObj = {
    one,
    two() {
        // logic
    },
    [three]: 'tweet'
}

// ====================================================
// ES6 syntactic sugar: rest parameters
// ====================================================

// allows function to accept infinite num of args as an array
// only last param in function definition can be rest parameter

function funFunc(...args) {
    return args.reduce((prev, curr) => {
        return prev + curr;
    })
}

funFunc(1,2,3); // returns 6
funFunc(1,2,3,4,5,6) // returns 17

// ====================================================
// ES6 syntactic sugar: spread operator
// ====================================================

// only on arrays as of ES6 (ES9 introduces spread operator to objects)

// allows a new way of concatenating arrays. allows for easy 
// cloning of arrays. allows for combining/cloning objects.

const odd = [1,3,5];
const combined = [2,4,6, ...odd]; // returns [2,4,6,1,3,5]

// ====================================================
// ES6 syntactic sugar: rest parameter vs spread operator
// ====================================================

// spread operator unpacks elements
// rest parameter packs elements into an array

// ====================================================
// prototypes: constructor functions, 'new' keyword, 
// 'this' keyword
// ====================================================

// constructor function 
function Person1(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

// ES5 introduced Object.create() method to create a new object

// defining method in prototype object of Person1 constructor function
Person1.prototype.getFullName1 = function() {
    return this.firstName + ' ' + this.lastName;
}

// using new keyword to create new instance of object using prototype
let p1 = new Person1('John', 'Doe');

// using a Person1.prototype method on a Person1 object
p1.getFullName1();

// ====================================================
// prototypes: above but with ES6 classes
// ====================================================

// other keywords include constructor, static, extends, and super

class Person2 {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    getFullName2() {
        return this.firstName + ' ' + this.lastName;
    }
}

let p2 = new Person2('Jane', 'Doe');

p2.getFullName2();

// ====================================================
// prototypes: inheritance basics
// ====================================================

// MDN has fantastic documentation on this
// so does javascript.info

// sharing amid objects makes for easy inheritance of structure
// (data fields), behavior (functions/methods), and state (data values)

// simply put, prototypical inheritance refers to the ability to access
// object properties from another object

// In JavaScript, objects have a special hidden property [[Prototype]] 
// (as named in the specification), that is either null or references 
// another object. That object is called “a prototype”

// the __proto__ method allows to set prototypes, though it's a bit outdated

let animal = {
    eats: true,
    walk() {
        console.log('Animal walks');
    }
}
let rabbit = {
    __proto__: animal,
    walk() {
        console.log('Rabbit! Hoppity hop!');
    },
    jumps: true
}
let longEar = {
    __proto__: rabbit,
    earLength: 10
}

// getter and setter

// can use for(let prop in obj) loop to iterate over properties of objects
// hasOwnProperty, Object.keys, Object.values

// ====================================================
// cookies
// ====================================================

// cookies are a plain text data record of 5 variable-length fields:
// - expires (date cookie expires. if blank, once visitor quits browser)
// - domain (domain name of site)
// - path (path to directory/webpage that set cookie. blank if retrieve from any.)
// - secure (if "secure", can only be retrieved with secure server)
// - name=value ()

// JavaScript can read, create, modify, and delete the cookies that apply to the current
// web page

// cookies best to use for authentication

// to create a cookie, assign a string value to the document.cookie object

// cookie values can't include semicolons, commas, or whitespace
// best to use escape() function to encode value before storing in cooking
// and use unescape() function to read cookie value

function ReadCookie() {
    let allCookies = document.cookie;
    document.write('All Cookies: ' + allCookies);

    // get all cookie pairs in an array
    cookieArray = allCookies.split(';');

    for(let i = 0; i < cookieArray.length; i++) {
        let name = cookieArray[i].split('=')[0];
        let value = cookieArray[i].split('=')[1];
        document.write('Key is : ' + name + ' and Value is : ' + value);
    }
}

ReadCookie();

// ====================================================
// web storage API: local storage & session storage
// ====================================================

// check out MDN's "Using the Web Storage API"
// check out DigitalOcean's intro to local storage and session storage

// session storage maintains a separate storage area for each given origin that's 
// available for the duration of the page session (as long as the browser is open, 
// including page reloads and restores.)

// local storage like session storage, but persists even when the browser is closed and reopened.

// can only store string values

// great tools for saving key/value pairs locally

// why a good alt to using cookies?
// - data saved locally only and can't be read by the server, which eliminates the security
//   issue that cookies present
// - allows for much more data to be saved (10mb for most browsers)
// - syntax is straightforward

// to store objects or arrays as values, use JSON.stringify()
// localStorage.setItem(key, JSON.stringify(myObj));
// let item = JSON.parse(localStorage.getItem(key));

let myLocalStorage = window.localStorage;
let mySessionStorage = window.sessionStorage;

// Storage.setItem(), Storage.getItem(), Storage.removeItem(), Storage.clear()

// mySessionStorage.setItem(key,value);