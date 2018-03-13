"use strict"

var Calculator = function (str) {
  this.str = str;
  this.input(); 
}

Calculator.prototype = {
  init: function() {},
  input: function (input ) {
    this.str = input || this.str || "0";
    console.log(this.output());
  },
  output: function (input) {
    return this.validate() || eval(this.str);
  },
  validate: function () {
    var reg = /[^1-9,0,*,/,\-,+,%, ,(,)]/g;
    var result = this.str.match(reg);
    if (result) {
      return "Invalid: " + result;
    }

  },
  
  clear: function () {
    this.str = "0";
    console.log(this.output());
  }
  
}

var a = new Calculator();
sum("5 + (5 / 2 * 85 + 1)");
//a.input("5 / 2 * 85 + 1asd");
//a.input("5 + (5 / 2 * 85 + 1)")


//a.clear();

function sum (string) {a.input(string)}
