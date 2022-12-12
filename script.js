let storedValue = 0;
let storedOperator = '';
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', (e) => getInput(e)));

const display = document.querySelector('.viewport');
let activeVal = "";

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
  processInput(input);
}

function updateDisplay(val) {
  display.innerHTML = val;  
}

function updateActiveValue(val) {
  if(val === '' || activeVal === '') activeVal = val;
  else activeVal += val;   
}

function updateStoredValue(val = activeVal){
  storedValue = val;
}

function storeOperator(val){
  storedOperator = val;
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

function evaluate(){
  if(storedValue !== '' && activeVal !== ''){
    const result = operate(storedOperator, Number(storedValue), Number(activeVal));
    console.log(`Result:      ${result}`);
    updateDisplay(result);
    updateActiveValue('');
    updateStoredValue(result);
  }
}

function processOperator(operator) {
  if(storedOperator === '' && storedValue != ''){
    storeOperator(operator);     
  } else if (storedOperator === ''){
    storeOperator(operator);
    updateStoredValue(activeVal);
    updateActiveValue('');
  } else {
    evaluate();
    storeOperator(operator)
  }
}

function processInput(input) {
  if(!isNaN(input)) {                   // checks for number  
    updateActiveValue(input);
    updateDisplay(activeVal);
  } else if (checkForOperator(input)){  // checks for operator
    processOperator(input);
  } else if (input === '='){            // checks for equals sign
    evaluate();
    storeOperator('')
  } else if (input === 'C'){
    clearCalculator();
  }
  console.log(`Active Value: ${activeVal}`);
  console.log(`Stored Value: ${storedValue}`);  
}

function clearCalculator(){
  updateActiveValue('');
  updateStoredValue('');
  updateDisplay(0);
}