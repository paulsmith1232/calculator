let storedValue = 0;
let storedOperator = '';

function add(a,b){
  return a + b;
}

function subtract(a, b){
  return a - b;
}

function mulitply(a, b){
  return a * b;
}

function divide(a, b){
  return a / b;
}

function operate(operator, a, b) {
  switch (operator){
    case '+':
      return add(a, b);
      break;    
    case '-':
      return subtract(a, b);
      break;    
    case '*':
      return mulitply(a, b);
      break;    
    case '/':
      return divide(a, b);
      break;
    default:
      console.log('Please try a different operator.')          
  } 
}

function getInput(e){
  const input = e.target.id.toString();
  if(!isNaN(input)) {
    updateActiveValue(input)
    updateDisplay(input);
  } else if (checkForOperator(input)){
    storedOperator = input;
    storeActiveValue();
    updateActiveValue('')
  } else if (input === '='){
    let result = operate(storedOperator, storedValue, activeVal);
    updateActiveValue(result);
    updateDisplay(result);
  }
    
    // number
    // operator
    // clear
    // equals
    // decimal
  
}
// need to detect if value is stored AND if operator is stored

function updateDisplay(val) {
  display.innerHTML = activeVal;  
}


function updateActiveValue(val) {
  if(val === '' || activeVal === '') activeVal = val;
  // else if(activeVal === '') activeVal = val
  else activeVal += val;
   
}

function storeActiveValue(){
  storedValue = activeVal;
}

function checkForOperator(val) {
  if( 
    val === '+'
    || val === '-'
    || val === '*'
    || val === '/'
  ) return true
  else return false;
}

console.log(operate('+', 2, 3));
console.log(operate('-', 4, 3));
console.log(operate('*', 6, 3));
console.log(operate('/', 6, 3));

const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', (e) => getInput(e)));

const display = document.querySelector('.viewport');
let activeVal = "";