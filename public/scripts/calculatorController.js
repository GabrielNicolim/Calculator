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
        this.zero = false 
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

    isNumber(val) {
        return val == '1' || val == '2' || val == '3' || val == '4' || val == '5' || val == '6' || val == '7' || val == '8' || val == '9'
    }
    
    clearAll() {
        this.operation = []
        this.showValues()
    }

    del() {
        if(this.opCheck()) {
            this.operation.pop()
            this.operation.pop()
            this.operation.pop()
            
            this.zero = false 
            
            for(let i = this.operation.length - 1; i >= 0; i--) {
                if( this.operation[i] == '*' ||
                    this.operation[i] == '/' ||
                    this.operation[i] == '-' || 
                    this.operation[i] == '+' ||
                    this.operation[i] == '.'  ) {
                    this.lastOperator = this.operation[i]
                    break
                }
                else {
                    this.lastOperator == ''
                }
            } 
        }
        else if(this.operation[this.operation.length - 1] == '.' ){
            this.operation.pop()
            this.lastOperator = ''
        }
        else {
            this.operation.pop()

            for(let i = this.operation.length - 1; i >= 0; i--) {
                if( this.operation[i] == '*' ||
                    this.operation[i] == '/' ||
                    this.operation[i] == '-' || 
                    this.operation[i] == '+' ||
                    this.operation[i] == '.'  ) {
                    this.lastOperator = this.operation[i]
                    break
                }

                if(this.isNumber(this.operation[i])) {
                    this.zero = false
                }
                else if(this.operation[i] == '0'){
                    this.zero = true
                }

                this.lastNumber == this.operation[i]
            }  
        }

        this.showValues()
    }

    inputNumber(num) {
        if(this.check) {
            this.clearAll()
            this.disableClear()
        }

        if(this.zero) {
            this.operation.pop()
            this.zero = false
        }

        if(num == '0') {  
            if( this.opCheck() ||
                this.operation[this.operation.length - 1] == undefined ||
                this.operation[this.operation.length - 1] == null) {
                this.zero = true
            }
            else {
                for(let i = this.operation.length - 1; i >= 0; i--) {
                    if(!this.opCheck()) {
                        if( this.isNumber(this.operation[i]) || this.operation[i] == '.') {
                            this.zero = false
                            break
                        }
                        else {
                            this.zero = true
                        }
                    }  
                    else {
                        break
                    }
                }
            }
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

        this.zero = false
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
        this.zero = false

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
        if(this.opCheck()) {
            console.log(this.operation)
            this.operation[this.operation.length - 2] = ''
        }
        
        this.result = eval(this.clearOperation(this.operation))

        this.clearAll()

        if(this.result != '' && this.result != null && this.result != undefined) {
            if(this.result == Infinity || Number.isNaN(this.result)) {
                window.document.getElementById('container').classList.add('broken')

                const time = setTimeout(() => {
                    window.document.getElementById('reset').classList.remove('hidden')
                }, 2000)
            }
            else if(!(Number.isInteger(this.result))) {
                this.lastOperator = '.'
                this.result = this.result.toFixed(2)

                for(let i = 0; i < this.result.toString().length; i++) {
                    this.operation.push(this.result.toString()[i])
                }
            }
            else {
                this.lastOperator = ''

                for(let i = 0; i < this.result.toString().length; i++) {
                    this.operation.push(this.result.toString()[i])
                }
            }

            this.showValues()
            this.activeClear()    
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

                case 'Backspace':
                    this.del()
                    break;
            }
        })
    }

    reset() {
        window.location.reload()
    }
}

var calc = new Calculator()
calc.initKeyboard()