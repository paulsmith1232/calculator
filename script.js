let storedValue = '';
let storedOperator = '';
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', (e) => getInput(e)));

const display = document.querySelector('.viewport');
let activeVal = '';

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
  else if (activeVal.length < 9 && val !== '.') {
    activeVal += val;   
  } else if (val === '.' && activeVal.indexOf('.') === -1){
    activeVal += val;
  }
  console.log(activeVal.indexOf('.'));
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
    let result = operate(storedOperator, Number(storedValue), Number(activeVal));
    if(result % 1 !== 0){
      result = parseFloat(result.toFixed(8-result.toString().indexOf('.')));
    }
    console.log(`Result:      ${result}`);
    if (result !== Infinity){
      updateActiveValue('');
      updateStoredValue(result);      
    } else {
      clearCalculator();
      result = "Nice try";
    }
    updateDisplay(result);
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
  if(!isNaN(input) || input === '.') {                   // checks for number  
    if(activeVal === '' && storedOperator === '' && storedValue !== '') updateStoredValue('');
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
  storeOperator('');
  updateDisplay(0);
}