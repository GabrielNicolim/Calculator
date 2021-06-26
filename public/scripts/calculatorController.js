class Calculator {
    constructor() {
        this.lastOperator = ''
        this.lastNumber = ''
        this.operation = []
        this.outputResult = window.document.getElementById('number')
    }

    clearAll() {
        this.operation = []

        this.showValues()
    }

    inputNumber(num) {
        this.operation.push(num) 
        this.lastNumber = num
        this.showValues()
    }

    inputOperators(op) {
        if(op == '.') {
            if(this.lastOperator != '.' && this.operation.length > 0) {

                if( this.operation[this.operation.length - 2] == '*' ||
                    this.operation[this.operation.length - 2] == '%' ||
                    this.operation[this.operation.length - 2] == '/' ||
                    this.operation[this.operation.length - 2] == '-' ||
                    this.operation[this.operation.length - 2] == '+'
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
            if( this.operation[this.operation.length - 2] == '*' ||
                this.operation[this.operation.length - 2] == '%' ||
                this.operation[this.operation.length - 2] == '/' ||
                this.operation[this.operation.length - 2] == '-' ||
                this.operation[this.operation.length - 2] == '+' ||
                this.operation[this.operation.length - 2] == '.'  
              ) 
            {
                this.operation[this.operation.length - 2] = op
                this.lastOperator = op
            }
            else if(this.operation.length > 0) {
                this.operation.push('<span class="operator">')
                this.operation.push(op)
                this.operation.push('</span>')
                this.lastOperator = op
            }
        }
        
        this.showValues()
    }

    validCheck(value) {
        
    } 

    showValues() {
        if(this.operation.length == 0) {
            this.outputResult.innerHTML = '0'
        }
        else {
            this.outputResult.innerHTML = this.operation.toString().replaceAll(',', '')
        }
    }

    showResult() {
        //eval  

        console.log(this.operation)
    }
}

var calc = new Calculator()
calc.showValues()
