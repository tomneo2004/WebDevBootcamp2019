var _ = require("lodash");

var array = [1,2,3,4,5,6,7,8];
console.log(_.without(array, 5));

var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.querySelector("body");

color1.addEventListener("input", generateGradient);
color2.addEventListener("input", generateGradient);

function generateGradient(){

	body.style.background = "linear-gradient(to right,"+color1.value+", "+color2.value+")";
	css.textContent = body.style.background+";";
}