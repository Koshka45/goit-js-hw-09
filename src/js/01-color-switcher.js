function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
const body = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
let timerId = null;

buttonStart.addEventListener('click', () => {
  buttonStart.disabled = true;

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    buttonStart.disabled = false;
  }, 1000);
});

buttonStop.addEventListener('click', () => {
  clearInterval(timerId);
  console.log(`Turn of with id ${timerId} has stopped color`);
});
