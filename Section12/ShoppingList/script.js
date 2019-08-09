var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");

function inputLength() {
	return input.value.length;
}

function createListElement() {
  var li = document.createElement("li");
  var h5 = document.createElement("h5");
  h5.appendChild(document.createTextNode(input.value));
  var hr = document.createElement("hr");
  hr.className = "strike-line";
  h5.appendChild(hr);
  var btn = document.createElement("button");
  btn.className = "btn-delete";
  var i = document.createElement("i");
  i.className = "fas fa-trash fa-3x";
  btn.appendChild(i);
  
  li.appendChild(h5);
	li.appendChild(btn);
	ul.appendChild(li);
	input.value = "";

	h5.addEventListener("click", crossItem);
	btn.addEventListener("click", deleteItem);
  li.addEventListener("mouseover", expand);
  li.addEventListener("mouseout", unexpand);
}

function unexpand(){
  var childs = this.childNodes;
  childs.forEach(function(child){
    if(child.classList.contains("btn-delete")){
      child.classList.remove("expand");
    }
  });
}
function expand(){
  var childs = this.childNodes;
  childs.forEach(function(child){
    if(child.classList.contains("btn-delete")){
      child.classList.toggle("expand");
    }
  });
}

function crossItem(){
  var hr = this.childNodes[1];
  hr.classList.toggle("strike");
  console.log(this.childNodes);
}

function deleteItem(){

	ul.removeChild(this.parentElement);
}

function addListAfterClick() {
	if (inputLength() > 0) {
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.keyCode === 13) {
		createListElement();
	}
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);