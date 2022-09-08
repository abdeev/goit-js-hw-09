function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const bodyEl = document.querySelector('body')
const btnStartEl = document.querySelector('[data-start]');
const btnStopEl = document.querySelector('[data-stop]');
btnStopEl.disabled = true;
let changeIt;

const changerBgColor = () => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }

btnStartEl.addEventListener('click', (event) => {
    changeIt = setInterval(changerBgColor, 1000);
    btnStartEl.disabled = true;
    btnStopEl.disabled = false;
});
btnStopEl.addEventListener('click', () => {
    clearInterval(changeIt);
    btnStopEl.disabled = true;
    btnStartEl.disabled = false;
})