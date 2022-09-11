import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
    timerCountDown.timerDeadline = userInputedDate;

        btnStartEl.disabled = true;
        if (selectedDates[0] <= Date.now()) {
        Notify.failure('Please choose a date in the future')
    } else {
        btnStartEl.disabled = false;
    }

  },
});

const timerCountDown = {
    timerDeadline: null,
    intervalFunc: null,
    start() {
        this.intervalFunc = setInterval(() => {
            const subtraction = this.timerDeadline - Date.now();
            if (subtraction <= 0) {
                Notify.info("Time is up!!!                  Click here", func = () => Location.reload());
                this.stop();
                return;
            }
            const { days, hours, minutes, seconds } = this.getTimeElements(subtraction);
            rootTimerSelectorEl.querySelector('[data-days]').textContent = this.addLeadingZero(days);
            rootTimerSelectorEl.querySelector('[data-hours]').textContent = this.addLeadingZero(hours);
            rootTimerSelectorEl.querySelector('[data-minutes]').textContent = this.addLeadingZero(minutes);
            rootTimerSelectorEl.querySelector('[data-seconds]').textContent = this.addLeadingZero(seconds);
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

    addLeadingZero(value) {
    return String(value).padStart(2, 0);
    },
    stop() {
    clearInterval(this.intervalFunc);
    },
}

btnStartEl.addEventListener('click', timerCountDown.start.bind(timerCountDown));
