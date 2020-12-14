// original : will call foo() and baz() with the global object bound to 'this' and therefore will output "bar2"
// function foo() {
//     var bar = "bar1";
//     this.baz = baz;
//     this.baz();
// }

// function baz() {
//     console.log(this.bar);
// }

// var bar = "bar2";
// foo();


// this is a fixed version - will print "bar1":
// var bazWrapper = {
//     foo: function foo() {
//         console.log(this);
//         this.baz = baz;
//         this.baz();
//     },
//     bar: "bar1"
// }

// function baz() {
//     console.log(this);
//     console.log(this.bar);
// }

// var bar = "bar2";
// bazWrapper.foo();


// New 
function foo() {
    this.baz = "baz";
    console.log(this.bar + " " + baz);
}

var bar = "bar";
var baz = new foo();
console.log(baz.bar + " " + baz.baz);