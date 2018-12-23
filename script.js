// object that represents display and acts as the calculator's "memory"
let displayObject = {
  leftArg: "",
  operator: "",
  rightArg: "",
  previous: "",
}

// the pointer to the div that represents display in the DOM
let displayDiv = document.querySelector("#display");

/** returns the sum of leftArg and rightArg */
function add(leftArg, rightArg) {
  return leftArg + rightArg;
}

/** returns the minus of leftArg and rightArg */
function sub(leftArg, rightArg) {
  return leftArg - rightArg;
}

/** returns the product of leftArg and rightArg */
function mult(leftArg, rightArg) {
  return leftArg * rightArg;
}

/** returns the quptient of leftArg and rightArg */
function div(leftArg, rightArg) {
  return leftArg / rightArg;
}

/** operate(op, leftArg, rightArg) returns the value of applying the operator
 * op to leftArg and rightArg. Returns error if try to divide by 0.
 */
function operate(op, leftArg, rightArg) {
  leftArg = parseFloat(leftArg);
  rightArg = parseFloat(rightArg)
  if (op == "+") {
    return add(leftArg, rightArg);
  }
  else if (op == "-") {
    return sub(leftArg, rightArg);
  }
  else if (op == "\u00D7") {
    return mult(leftArg, rightArg);
  }
  else if (op == "\u00F7") {
    if (rightArg == "0") {
      return "ERROR!";
    }
    else {
      return div(leftArg, rightArg);
    }
  }
}

/** newArg(a, button) returns a string that fits in the calculator's 
 * display frame and only has one decimal point*/
function newArg(a, button) {
  let current = displayObject[a]
  if (current.length < 15) {
    if (current.indexOf(".") < 0 || (current.indexOf(".") >= 0 && button.textContent != ".")) {
      displayObject[a] = current + button.textContent;
      displayDiv.textContent = displayObject[a];
    }
  }
}

/** numButtonPress(button) is the event that occurs when button is pressed */
function numButtonPress(button) {
  if (displayObject.operator == "") {
    newArg("leftArg", button);
  }
  else {
    newArg("rightArg", button);
  }
}

/** calculate(op, leftArg, rightArg) is the result of applying operation op on 
 * leftArg and rightArg, converting to scientific notation if necessary */
function calculate(op, leftArg, rightArg) {
  let result = operate(op, leftArg, rightArg);
  if ((result + "").length > 14) {
    result = result.toExponential(9);
  }
  displayDiv.textContent = result;
  return result;
}

/** operatorPress(button) is the event that occurs when an operator button
 * is pressed.
 */
function operatorPress(button) {
  if (displayObject.leftArg == "" && displayObject.previous != "") {
    displayObject.leftArg = displayObject.previous;
    displayObject.operator = button.textContent;
  }
  else if (displayObject.rightArg == "" && displayObject.leftArg != "") {
    displayObject.operator = button.textContent;
  }
  else if (displayObject.rightArg != "" && displayObject.leftArg != "" && displayObject.operator != "") {
    let result = calculate(displayObject.operator, displayObject.leftArg, displayObject.rightArg);
    displayObject.operator = button.textContent;
    displayObject.leftArg = "" + result;
    displayObject.rightArg = "";
  }
}

/** enterPress is the event that occurs when the enter button is pressed */
function enterPress(button) {
  if (!(displayObject.leftArg == "" || displayObject.operator == "" || displayObject.rightArg == "")) {
    let result = calculate(displayObject.operator, displayObject.leftArg, displayObject.rightArg);
    displayObject.leftArg = "";
    displayObject.operator = "";
    displayObject.rightArg = "";
    displayObject.previous = "" + result;
  }
}

//adding the eventListeners to the number buttons
let numButtons = Array.from(document.querySelectorAll(".number"));
for (i = 0; i < numButtons.length; i++) {
  (numButtons[i]).addEventListener("click", (e) => numButtonPress(e.target));
}

//adding the eventListeners to the operator buttons
let opButtons = Array.from(document.querySelectorAll(".operator"));
for (i = 0; i < opButtons.length; i++) {
  (opButtons[i]).addEventListener("click", (e) => operatorPress(e.target));
}

//adding the eventListener to the enter button
let enter = document.querySelector("#enter");
enter.addEventListener("click", (e) => enterPress(e.target));

//adding and defining the eventListener for the clear button
let clear = document.querySelector("#clear")
clear.addEventListener("click", function (e) {
  displayObject = {
    leftArg: "",
    operator: "",
    rightArg: "",
    previous: "",
  };
  displayDiv.textContent = "";
})

