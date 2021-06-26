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

    inputOperator(op) {
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
        if(this.check) {
            this.outputResult.innerHTML = '0'
            this.clearAll()
        }
        else {
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

    initKeyboard(){
        document.addEventListener("paste", e => {
            this.pasteFromClipboard(e)
        })

        document.addEventListener("keyup", e => {
            switch (e.key) {
                case 'Escape':
                    this.clearAll()
                    break;
                case '+':
                case '-':
                case '/':
                case '*':
                    this.inputOperator(e.key)
                    break;
                case '.':
                case ',':
                    this.inputOperator('.')
                    break;
                case 'Enter':
                    this.showResult()
                    break;
    
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.inputNumber(parseInt(e.key))
                    break;
            }
        })
    }
}

var calc = new Calculator()
calc.showValues()
calc.initKeyboard()
