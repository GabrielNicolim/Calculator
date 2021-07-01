// AINDA A IMPLEMENTAR 
// HISTÓRICO 
// BACKSPACE 

class Calculator {
    constructor() {
        this.lastOperator = ''
        this.lastNumber = ''
        this.result = ''
        this.operation = []
        this.outputResult = window.document.getElementById('number')
        this.theme = window.document.getElementById('slider')
        this.body = window.document.getElementById('body')
        this.check = false
    }

    setTheme() {
        if(this.theme.value == -1) {
            this.body.classList = 'normal'
        }
        else if(this.theme.value == 0) {
            this.body.classList = 'light'
        }
        else if(this.theme.value == 1) {
            this.body.classList = 'dark'
        }
    }

    activeClear() {
        this.check = true
    }

    disableClear() {
        this.check = false
    }

    clearAll() {
        this.operation = []
        this.showValues()
    }

    del() {
        
    }

    inputNumber(num) {
        if(this.check) {
            this.clearAll()
            this.disableClear()
        }

        this.operation.push(num) 
        this.lastNumber = num
        
        this.showValues()
    }

    opCheck() {
        return this.operation[this.operation.length - 2] == '*' || this.operation[this.operation.length - 2] == '/' || this.operation[this.operation.length - 2] == '-' || this.operation[this.operation.length - 2] == '+'  
    }

    inputOperator(op) {
        if(this.opCheck()) {
            this.operation[this.operation.length - 2] = op
            this.lastOperator = op
        }
        else if(this.operation.length > 0) {
            this.operation.push('<span class="operator">')
            this.operation.push(op)
            this.operation.push('</span>')
            this.lastOperator = op
        }

        this.disableClear()

        this.showValues()
    }

    inputPoint(op) {
        if(this.operation.length == 0) {
            this.operation.push('0')
            this.operation.push(op)
        }
        else if(this.lastOperator != '.') {

            if(this.opCheck()) {
                this.operation.push('0')
                this.operation.push(op)
            }
            else {
                this.operation.push(op)
            }
        }
        this.lastOperator = op

        this.disableClear()
        this.showValues()
    }

    clearOperation(value) {
        let aux = value.toString().replaceAll(',', '')
        aux = aux.replaceAll('<span class="operator">', '')
        aux = aux.replaceAll('</span>', '')

        return aux
    }

    showValues() {
        this.outputResult.innerHTML = this.operation.toString().replaceAll(',', '')
    }
    
    showResult() {
        if(this.check) {
            this.clearAll()
            this.showValues()
            this.disableClear()
        }
        else {
            if(this.opCheck()) {
                this.operation[this.operation.length - 2] = ''
            }
            
            this.result = eval(this.clearOperation(this.operation))

            this.clearAll()

            if(this.result != '' && this.result != null && this.result != undefined) {
                if(!(Number.isInteger(this.result))) {
                    this.lastOperator = '.'
                    this.operation.push(this.result.toFixed(2)) 
                }
                else {
                    this.lastOperator = ''
                    this.operation.push(this.result) 
                }
    
                this.showValues()
                this.activeClear()    
            }
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
calc.initKeyboard()