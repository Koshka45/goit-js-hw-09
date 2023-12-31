import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startTimerBtn = document.querySelector('button[data-start]');
startTimerBtn.disabled = true;
console.log(startTimerBtn);

const timePicker = document.querySelector('#datetime-picker');
console.log(timePicker);
const timerValue = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    console.log(new Date());

    if (selectedDates[0] < new Date()) {
      startTimerBtn.disabled = true;
      window.alert('Please choose a date in the future');
    } else {
      startTimerBtn.disabled = false;
      startTimerBtn.addEventListener('click', () => {
        changeTimerValue(selectedDates[0]);
      });
    }
  },
};

flatpickr(timePicker, options);

function changeTimerValue(selectedTime) {
  const timer = {
    start() {
      startTimerBtn.disabled = true;
      timePicker.disabled = true;

      const startTime = selectedTime;
      timerId = setInterval(() => {
        const currentTime = Date.now();

        const deltaTime = currentTime - startTime;
        // const realDeltaTime = deltaTime * -1
        // console.log(realDeltaTime)
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        console.log(`days = ${days}`);

        timerValue.days.textContent = days;
        timerValue.hours.textContent = hours;
        timerValue.minutes.textContent = minutes;
        timerValue.seconds.textContent = seconds;
        // console.log(days)
        // console.log(typeof (days))
        console.log(deltaTime);

        if (deltaTime >= 0) {
          clearInterval(timerId);
          console.log('I worked');
        }
      }, 1000);
    },
  };
  timer.start();
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day) * -1);
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour) * -1);
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute) * -1);
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second) * -1);

  return { days, hours, minutes, seconds };
}
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
