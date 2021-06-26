class Calculator {
    constructor() {
        this.lastOperator = ''
        this.lastNumber = ''
        this.result = ''
        this.operation = []
        this.outputResult = window.document.getElementById('number')
        this.check = false
    }

    clearAll() {
        this.operation = []

        this.showValues()
    }

    clearOperation(value) {
        let aux = value.toString().replaceAll(',', '')
        aux = aux.replaceAll('<span class="operator">', '')
        aux = aux.replaceAll('</span>', '')
        return aux
    }

    inputNumber(num) {
        if(this.check) {
            this.clearAll()
        }

        this.operation.push(num) 
        this.lastNumber = num
        this.showValues()
    }

    inputOperators(op) {
        this.check = false
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
            else if(this.operation.length == 0) {
                this.operation.push('0')
                this.operation.push(op)
            }
            this.lastOperator = op
        }
        else {
            if( this.operation[this.operation.length - 2] == '*' ||
                this.operation[this.operation.length - 2] == '%' ||
                this.operation[this.operation.length - 2] == '/' ||
                this.operation[this.operation.length - 2] == '-' ||
                this.operation[this.operation.length - 2] == '+'  
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

    showValues() {
        if(this.operation.length == 0) {
            this.outputResult.innerHTML = '0'
        }
        else {
            this.outputResult.innerHTML = this.operation.toString().replaceAll(',', '')
        }
    }

    showResult() {
        if( this.operation[this.operation.length - 2] == '*' ||
            this.operation[this.operation.length - 2] == '%' ||
            this.operation[this.operation.length - 2] == '/' ||
            this.operation[this.operation.length - 2] == '-' ||
            this.operation[this.operation.length - 2] == '+' ||
            this.operation[this.operation.length - 2] == '.'  
        )  {
            this.operation.push('0')
        }
        
        this.result = eval(this.clearOperation(this.operation))
        this.clearAll()
        this.operation.push(this.result) 

        this.showValues()

        this.check = true
    }
}

var calc = new Calculator()
calc.showValues()
