

class Calculator{
    constructor(previousOperand, currentOperand){
        this.previousOperand = previousOperand
        this.currentOperand = currentOperand
        this.clear()
       
    }

    clear(){
        this.currentDisplay = ""
        this.previousDisplay = ""
        this.operation = ""

    }

    delete(){
        this.currentDisplay = this.currentDisplay.toString().slice(0, -1)

    }

    appendNumber(number){
        if( number === '.' && this.currentDisplay.includes('.'))   return 

 this.currentDisplay = this.currentDisplay.toString() + number.toString()
        
    }
    

    chooseOperations(operation){
        if(this.currentDisplay ==='') return
        if(this.previousDisplay !== ''){
            this.compute()
        }
        this.operation = operation
        this.previousDisplay = this.currentDisplay
        this.currentDisplay =''

    };

    compute(){
       let computedNumber
       const prevNumber = parseFloat(this.previousDisplay)
       const currentNumber = parseFloat(this.currentDisplay)
       if( isNaN(prevNumber) || isNaN(currentNumber)) return
       switch(this.operation) {
           case '+':
               computedNumber =  prevNumber + currentNumber
               break
            case '-':
                computedNumber = prevNumber - currentNumber
                break 
            case 'x':   
                computedNumber = prevNumber * currentNumber
                break
            case '/':
                computedNumber = prevNumber / currentNumber  
                break
            case '%':   
                computedNumber = prevNumber / 100 * currentNumber    
       }
       this.currentDisplay = computedNumber
       this.operation = undefined
       this.previousDisplay= ''
    }

    updateDisplay(){
        this.currentOperand.innerText = this.currentDisplay.toLocaleString()
        if(this.operation  != null){
        this.previousOperand.innerText =
        ` ${this.previousDisplay} ${this.operation} ${this.currentDisplay}`;
        
        }
    }

}

const numberButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalButton = document.querySelector('[data-equal]')
const previousOperand = document.querySelector('[data-previous-operand]')
const currentOperand = document.querySelector('[data-current-operand]')

 

const calculator = new Calculator(previousOperand, currentOperand)

numberButton.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButton.forEach( button => {
    button.addEventListener('click', () => {
        calculator.chooseOperations(button.innerText)
    calculator.updateDisplay()
    })
    
})
  
equalButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
});


clearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})



deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})