class Calculator {
    constructor() {
        this.lastOperator = ''
        this.lastNumber = ''
        this.operation = []
        this.outputResult = window.document.getElementById('number')
    }

    inputNumber(num) {
        this.operation.push(num) 
        this.lastNumber = num
        this.showResult()
    }

    inputOperators(op) {
        if(op == '.') {
            if(this.lastOperator != '.' && this.operation.length > 0) {

                if( this.operation[this.operation.length - 1] == '*' ||
                    this.operation[this.operation.length - 1] == '%' ||
                    this.operation[this.operation.length - 1] == '/' ||
                    this.operation[this.operation.length - 1] == '-' ||
                    this.operation[this.operation.length - 1] == '+'
                  )
                  {
                    this.operation.push('0')
                    this.operation.push(op)
                  }
                  else {
                    this.operation.push(op)
                  }
                this.lastOperator = op
            }
        }
        else {
            if( this.operation[this.operation.length - 1] == '*' ||
                this.operation[this.operation.length - 1] == '%' ||
                this.operation[this.operation.length - 1] == '/' ||
                this.operation[this.operation.length - 1] == '-' ||
                this.operation[this.operation.length - 1] == '+' ||
                this.operation[this.operation.length - 1] == '.'  
              ) 
            {
                this.operation[this.operation.length - 1] = op
                this.lastOperator = op
            }
            else if(this.operation.length > 0){
                this.operation.push(op)
                this.lastOperator = op
            }
        }
        
        this.showResult()
    }

    validCheck(value) {
        
    } 

    showResult() {
        this.outputResult.innerText = this.operation.toString().replaceAll(',', '') 
    }
}

var calc = new Calculator()
calc.showResult()
