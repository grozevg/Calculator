"use strict";

var Calculator = function (container) {
	this.container = container;
	this.init();
};

Calculator.prototype = {
	init: function () {
		document.myCalculators = document.myCalculators || [];
		document.myCalculators.push(this);
		this.createLayout();
		this.str = 0;
		this.updateDisplay();
	},

	input: function (input) {
		if (this.str)
			this.str += input;
		else
			this.str = input;

		this.updateDisplay();
	},

	output: function (input) {
		return this.validate() || eval(this.str);
	},

	validate: function () {
		var str = this.str;
		var reg = /[^1-9,0,*,/,\-,+,%, ,(,)]/g;
		var result = str.match(reg);
		//    return ;
		if (result || str.endsWith("+") || str.endsWith("-") || str.endsWith("*") || str.endsWith("/")) {
			return "Invalid: " + (result || "End of character.");
		}

	},

	updateDisplay: function (result) {
		document.getElementById("c-header").innerHTML = result || this.str;
	},

	sum() {
		this.updateDisplay(this.output());
	},

	clear: function () {
		this.str = 0;
		this.updateDisplay();
		//    console.log(this.output());
	},

	createLayout: function () {
		var cont = document.getElementById(this.container);
		cont.appendChild(this.createHeader());
		cont.appendChild(this.createBody());
	},

	createHeader: function () {
		var cHeader = document.createElement("div");
		cHeader.innerHTML = `<div id="c-header">
      <span id="c-display">Display</span>
    </div>`;
		return cHeader;

	},

	//no function
	createButton(text, i) {
		var button = document.createElement("button");
		button.innerHTML = text;
		var buttonObserver = this.buttonObserver;
		button.addEventListener("click", function () { buttonObserver(this.innerHTML) });
		return button;

	},

	buttonObserver(a) {
		var currentCalc = document.myCalculators[0];
		if (a == "C") {
			currentCalc.clear();
		}
		else if (a == "=") {
			currentCalc.sum();
		}
		else {
			currentCalc.input(a);
		}
	},

	createBody() {
		var cBody = document.createElement("div");
		for (var i = 0; i < 10; i++) {
			cBody.appendChild(this.createButton(i));
		}

		cBody.appendChild(this.createButton("+"));
		cBody.appendChild(this.createButton("-"));
		cBody.appendChild(this.createButton("*"));
		cBody.appendChild(this.createButton("/"));
		cBody.appendChild(this.createButton("="));
		cBody.appendChild(this.createButton("("));
		cBody.appendChild(this.createButton(")"));
		cBody.appendChild(this.createButton("C"));

		cBody.style.background = "green";
		return cBody;
	}

};

var a = new Calculator("myCalculator");
//sum("51 + (5 / 2 * 85 + 1)");//Invalid: End of character.
//sum("5 / 2 * 85 + 1asd"); // Invalid: a,s,d
//sum("5 + (5 / 2 * 85 + 1)") // 218.5


//a.clear();

function sum(string) { a.input(string) }


