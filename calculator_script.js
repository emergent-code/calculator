const screen = document.querySelector("#screen")
const sevenBtn = document.querySelector("#seven");
const eightBtn = document.querySelector("#eight");
const nineBtn = document.querySelector("#nine");
const addBtn = document.querySelector("#add");
const acBtn = document.querySelector("#ac");
const fourBtn = document.querySelector("#four");
const fiveBtn = document.querySelector("#five");
const sixBtn = document.querySelector("#six");
const subtractBtn = document.querySelector("#sub");
const deleteBtn = document.querySelector("#del");
const oneBtn = document.querySelector("#one");
const twoBtn = document.querySelector("#two");
const threeBtn = document.querySelector("#three");
const divideBtn = document.querySelector("#divide");
const moduloBtn = document.querySelector("#modulo");
const zeroBtn = document.querySelector("#zero");
const decimalBtn = document.querySelector("#deci");
const ansBtn = document.querySelector("#ans");
const multiBtn = document.querySelector("#multi");
const equalBtn = document.querySelector("#equal");


let equalUsed = false
let currentOperation = ''
let value1 = []
let value2 = []
let validity = true
let switchValue = false
let decimalUsed = false

const add = function(a, b) {
	return Number(a) + Number(b)

};

const subtract = function(a, b) {
	return Number(a) - Number(b)
};

function divide(a, b){
    return a/b
}

function multiply(a, b){
    return a*b
}

function modulo(a, b){
    return a%b
}





function operate(a, b, operation){
    if(operation == "add"){
      let result = add(a, b)
      result = parseFloat(result.toFixed(10))
      value1 = Array.from(String(result), numberFixed)
      displayResult(result)
      toggleStyle(addBtn)
    }
    else if(operation == "multi"){
      let result = multiply(a,b)
      result = parseFloat(result.toFixed(10))
      value1 = Array.from(String(result), numberFixed)
      displayResult(result)
      toggleStyle(multiBtn)
    }
    else if(operation == "subtract"){
        let result = subtract(a,b)
        result = parseFloat(result.toFixed(10))
        value1 = Array.from(String(result), numberFixed)
        toggleStyle(subtractBtn)
        displayResult(result)
    }
    else if(operation == "divide"){
        if(b != 0){
            let result = divide(a,b)
            result = parseFloat(result.toFixed(10))
            value1 = Array.from(String(result), numberFixed)
            toggleStyle(divideBtn)
            displayResult(result)
        }
        else{
            alert("Divide by zero error")
        }
    }
    else if(operation == "modulo"){
        if(b != 0){
        let result = modulo(a, b)
        result = parseFloat(result.toFixed(10))
        value1 = Array.from(String(result), numberFixed)
        toggleStyle(moduloBtn)
        displayResult(result)
        }
        else{
            alert("Divide by zero error")
        }
    }

    else{
      console.log("Error")
    }
    validity = true
    value2 = []
    decimalUsed = false

    if(equalUsed){
        currentOperation = ''
        value1 = []
        value2 = []
        switchValue = false
        equalUsed = false
      }
  }

function numberFixed(value){
    if(value == "."){
        return "."
    }
    else{
        return Number(value)
    }
}
  
function equate(){
    if(value1.length && value2.length){
      equalUsed = true
      operate(value1.join(''), value2.join(''), currentOperation)
    }
    else{
      alert("Syntax ERROR")
    }
  }

function manageValues(value){
    //takes and stores values in value1 or value2 arrays
    validity = true
    //stops zero from being first value
    if(value == 0 && switchValue == false && value1.length >= 1 && decimalUsed == false){
        return
    }
    else if(value == 0 && switchValue == true && value2.length >= 1 && decimalUsed == false){
        return
    }

    if(value1.length == 16 || value2.length == 16){
        alert("Limit of input is 16 digits")
        return
    }

    if(value == "." && decimalUsed == false){
        decimalUsed = true
    }
    else if(value == "." && decimalUsed == true){
        return
    }

    if(switchValue == false){
      value1.push(value)
      displayResult(value1.join(''))
    }
    else if(switchValue == true){
      value2.push(value)
      displayResult(value2.join(''))
    }
  }
  
function manageOperations(operation){
    if(checkValidity() == false){
        alert("Syntax ERROR - cannot enter operations sequentially")
        return
      }
    
      switchValue = true
      decimalUsed = false
    
      if(value1.length == 0 && value2.length ==0){
        alert("Syntax ERROR - enter a number first")
        return
      }
      //If value1 and value2 exist, operate on them
      if(value1.length && value2.length){
        operate(value1.join(''), value2.join(''), currentOperation)
      }
      
      if(operation == "multi"){
        currentOperation = "multi"
        toggleStyle(multiBtn)
      }
      else if(operation == "add"){
        currentOperation = "add"
        toggleStyle(addBtn)
      }
      else if(operation == "divide"){
        currentOperation = "divide"
        toggleStyle(divideBtn)
      }
      else if(operation == "subtract"){
        currentOperation = "subtract"
        toggleStyle(subtractBtn)
      }
      else if(operation == "modulo"){
        currentOperation = "modulo"
        toggleStyle(moduloBtn)
      }
  }
  
  
function checkValidity(){
    //If previous was x or +, alert syntax error
    if(validity == true){
      return true
    }
    else if(validity == false){
      return false
    }
  }
  
  
function displayResult(result){
    screen.textContent = String(result)
}

function toggleStyle(operationBtn){
    //turn button orange if operation is in use/has been pressed
    //turn button grey if operation is completed
    operationBtn.classList.toggle("buttonPress")
  }

function backSpace(){
    if(switchValue == true){
      value2.splice(-1, 1)
      displayResult(value2.join(''))
    }
    else if(switchValue == false){
      value1.splice(-1, 1)
      displayResult(value1.join(''))
    }
}

function allClear(){
    value1 = []
    value2 = []
    screen.textContent = ''
    validity = true
    switchValue = false
    equalUsed = false
    currentOperation = ''
    decimalUsed = false
}

function storeAnswer(){
    //store and use answer from last operation
    //
}

sevenBtn.addEventListener("click", () => {manageValues(7)});
eightBtn.addEventListener("click", () => {manageValues(8)});
nineBtn.addEventListener("click",  () => {manageValues(9)});
addBtn.addEventListener("click", () => {manageOperations("add")});
acBtn.addEventListener("click", allClear);
fourBtn.addEventListener("click", () => {manageValues(4)});
fiveBtn.addEventListener("click", () => {manageValues(5)});
sixBtn.addEventListener("click", () => {manageValues(6)});
subtractBtn.addEventListener("click", () => {manageOperations("subtract")});
deleteBtn.addEventListener("click", backSpace);
oneBtn.addEventListener("click", () => {manageValues(1)});
twoBtn.addEventListener("click", () => {manageValues(2)});
threeBtn.addEventListener("click", () => {manageValues(3)});
divideBtn.addEventListener("click", () => {manageOperations("divide")});
moduloBtn.addEventListener("click", () => {manageOperations("modulo")});
zeroBtn.addEventListener("click", () => {manageValues(0)} );
decimalBtn.addEventListener("click", () => {manageValues(".")});
// ansBtn.addEventListener("click",);
multiBtn.addEventListener("click", () => {manageOperations("multi")});
equalBtn.addEventListener("click", equate);