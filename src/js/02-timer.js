import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const inputDateEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('[data-start]');
const rootTimerSelectorEl = document.querySelector('.timer');

btnStartEl.disabled = true;

let userInputedDate;

flatpickr(inputDateEl, {
    enableTime: true,
    dateFormat: "d-M-Y H:i",
    time_24hr: true,
    // minDate: "today",
    defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        userInputedDate = new Date(selectedDates[0]);
        console.log(selectedDates[0]);
        console.log(userInputedDate);
    
        
  },
});

const timerCountDown = {
    timerDeadline: userInputedDate,
    intervalFunc: null,
    start() {
        this.intervalFunc = setInterval(() => {
            const subtraction = this.timerDeadline - Date.now();
            if (subtraction <=0) {
                this.stop();
                return;
            }
            const { days, hours, minutes, seconds } = this.getTimeElements(subtraction);
            rootTimerSelectorEl.querySelector('[data-days]').textContent = this.pad(days);
            rootTimerSelectorEl.querySelector('[data-hours]').textContent = this.pad(hours);
            rootTimerSelectorEl.querySelector('[data-minutes]').textContent = this.pad(minutes);
            rootTimerSelectorEl.querySelector('[data-seconds]').textContent = this.pad(seconds);
        }, 1000);
    },
    getTimeElements (diff) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
    },

    pad(value) {
    return String(value).padStart(2, 0);
    },
    stop() {
    clearInterval(this.intervalFunc);
    },

    // declensionNum(num, words) {
    // // num = 4
    // // words = ['секунда', 'секунди', 'секунд']

    // return words[
    //   num % 100 > 4 && num % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    // ];
    // },
}
const onChangeCheckInput = (event) => {
    if (event.target.value <= Date.now()) {
        window.alert('Please choose a date in the future')
    } else btnStartEl.disabled = false;
}
btnStartEl.addEventListener('click', timerCountDown.start())
inputDateEl.addEventListener('change', onChangeCheckInput)
