document.addEventListener("DOMContentLoaded", function() {
    const resultField = document.getElementById("result");
    const numberButtons = document.querySelectorAll(".number");
    const operatorButtons = document.querySelectorAll(".operator");
    const decimalButton = document.querySelector(".decimal");
    const clearButton = document.querySelector(".clear");
    const equalButton = document.querySelector(".equal");
  
    let currentInput = "";
    let previousInput = "";
    let currentOperator = null;
    let shouldResetInput = false;
  
    function updateDisplay() {
      resultField.value = currentInput;
    }
  
    function clear() {
      currentInput = "";
      previousInput = "";
      currentOperator = null;
      shouldResetInput = false;
      updateDisplay();
    }
  
    function appendNumber(number) {
      if (shouldResetInput) {
        currentInput = "";
        shouldResetInput = false;
      }
      currentInput += number;
      updateDisplay();
    }
  
    function chooseOperator(operator) {
      if (currentOperator !== null) {
        evaluate();
      }
      currentOperator = operator;
      previousInput = currentInput;
      shouldResetInput = true;
    }
  
    function evaluate() {
      const previous = parseFloat(previousInput);
      const current = parseFloat(currentInput);
      if (isNaN(previous) || isNaN(current)) {
        return;
      }
      
      let result;
      switch (currentOperator) {
        case "+":
          result = previous + current;
          break;
        case "-":
          result = previous - current;
          break;
        case "*":
          result = previous * current;
          break;
        case "/":
          result = previous / current;
          break;
        default:
          return;
      }
      
      currentInput = result.toString();
      previousInput = "";
      currentOperator = null;
      shouldResetInput = true;
      updateDisplay();
    }

    numberButtons.forEach(function(button) {
    button.addEventListener("click", function() {
    appendNumber(button.textContent);
    });
    });
    
    operatorButtons.forEach(function(button) {
    button.addEventListener("click", function() {
    chooseOperator(button.textContent);
    });
    });
    
    decimalButton.addEventListener("click", function() {
    if (!currentInput.includes(".")) {
    appendNumber(decimalButton.textContent);
    }
    });
    
    clearButton.addEventListener("click", clear);
    
    equalButton.addEventListener("click", evaluate);
    });      
  