class DateController {
    constructor(date) {
        this.visualTime = window.document.getElementById('time')
        this.visualDate = window.document.getElementById('date')

        this.second = this.zeroCheck(date.getSeconds())
        this.minute = this.zeroCheck(date.getMinutes())
        this.hour = this.zeroCheck(date.getHours())

        this.day = this.zeroCheck(date.getDate())
        this.mounth = this.zeroCheck(date.getMonth() + 1)
        this.year = this.zeroCheck(date.getFullYear())
    }

    setDate() {
        this.visualDate.innerText = this.day + '/' + this.mounth + '/' + this.year
    }

    getTime(date) {
        this.second = this.zeroCheck(date.getSeconds())
        this.minute = this.zeroCheck(date.getMinutes())
        this.hour = this.zeroCheck(date.getHours())
    }

    setTime() {
        this.visualTime.innerText = this.hour + ':' + this.minute + ':' + this.second
    }

    zeroCheck(value) {
        if(parseInt(value) < 10) {
            return '0' + value
        }
        return value
    }
}

 // Inicialização 
const date = new DateController(new Date()) 

 date.setDate()
 date.setTime()
 const interval = setInterval(() => {
    date.setTime()
    date.getTime(new Date())
 }, 1000);