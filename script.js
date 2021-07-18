class Clc{
    constructor(previousElement, currentElement) {
        this.previousElement = previousElement
        this.currentElement = currentElement
        this.ac()
    }
    ac() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined;
    }
    toNegative(){
        let calculation
        const current = parseFloat(this.currentOperand)
        if (isNaN(current)) return
        calculation = current * (-1)
        this.currentOperand = calculation
        this.operation = undefined
    }
    toPercents(){
        let calculation
        const current = parseFloat(this.currentOperand)
        if (isNaN(current)) return
        calculation = current / 100
        this.currentOperand = calculation
        this.operation = undefined
    }
    addNum(num) {
        if (num === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + num.toString()
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.calculate()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    calculate() {
        let calculation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                calculation = prev + current
                break
            case '-':
                calculation = prev - current
                break
            case 'x':
                calculation = prev * current
                break
            case '÷':
                calculation = prev / current
                break
            default:
                return
        }
        this.currentOperand = calculation
        this.operation = undefined
        this.previousOperand = ''
    }
    getDisplayNumber(number) {
        const strNum = number.toString()
        const intDigits = parseFloat(strNum.split('.')[0])
        const decDigits = strNum.split('.')[1]
        let intDisplay
        if (isNaN(intDigits)) {
            intDisplay = ''
        } else {
            intDisplay= intDigits.toLocaleString('ru-RU')
        }
        if (decDigits != null) {
            return `${intDisplay}.${decDigits}`
        } else {
            return intDisplay
        }
    }
    updateDisplay() {
        this.currentElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousElement.innerText = ''
        }
    }
}

const numButtons = document.querySelectorAll('[data-num]')
const opButtons = document.querySelectorAll('[data-operator]')
const eqButton = document.querySelector('[data-equal]')
const acButton = document.querySelector('[data-ac]')
const toNegativeButton = document.querySelector('[data-toNegative]')
const toPercentsButton = document.querySelector('[data-toPercents]')
const prevElement = document.querySelector('[data-prev-operand]')
const currentElement = document.querySelector('[data-cur-operand]')

const calculator = new Clc(prevElement, currentElement)

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addNum(button.innerText)
        calculator.updateDisplay()
    })
})

opButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

eqButton.addEventListener('click', () => {
    calculator.calculate()
    calculator.updateDisplay()
})

acButton.addEventListener('click', () => {
    calculator.ac()
    calculator.updateDisplay()
})
toNegativeButton.addEventListener('click', ()=> {
    calculator.toNegative()
    calculator.updateDisplay()
})
toPercentsButton.addEventListener('click', ()=> {
    calculator.toPercents()
    calculator.updateDisplay()
})
