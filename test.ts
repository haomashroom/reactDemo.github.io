// type t1 = "a";
// type t2 = "a|c";
// type t3 = "b";

// type o = t1 extends t2 ? true : false;

function sayHello(person: string): string {
  return "Hello, " + person;
}

let user = "Tom";
console.log(sayHello(user));

console.log(123);
