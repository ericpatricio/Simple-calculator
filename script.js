// DOM variables
const previousOperandTextElement = document.querySelector('#previous-operand');
const currentOperandTextElement = document.querySelector('#current-operand');
const numberButtons = document.querySelectorAll('#number');
const operationButtons = document.querySelectorAll('#operation');
const clearButton = document.querySelector('#clear-all');
const deleteButton = document.querySelector('#delete');
const equalButton = document.querySelector('#equal');

// Calculator class to store info
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;

    this.clear();
  }

  // Clear function
  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  // Delete function - to remove single number
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // Append function - to add number to the screen calculator
  appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // Choose function - every time a user click on one of the operation buttons
  chooseOperation(operation) {
    if(this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    } 
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }
  // Compute function - take values, compute single values and display it
  compute() {
    let calculate;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if(isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        calculate = prev + current
        break
      case '-':
        calculate = prev - current
        break
      case '*':
        calculate = prev * current
        break
      case '÷':
        calculate = prev / current
        break
      default:
        return
    }
    this.currentOperand = calculate;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if(isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0 })
    }
    if(decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay;
    }
  }
  // Update function - update values inside of output
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if(this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }    
  }
}

// Creating calculator object
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Loop throught each number button, append it and update display
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();    
  })
});
// Loop throught operation, choose operation and update display
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();    
  })
});
// Listen to the equal button, compute values and display it
equalButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
});
// Listen to clear button
clearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
});
// Listen to delete button
deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
});