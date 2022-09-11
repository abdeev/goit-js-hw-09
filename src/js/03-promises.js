import { Notify } from 'notiflix/build/notiflix-notify-aio';
import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });// Fulfill
      } else {
        reject({ position, delay });// Reject
      }
    }, delay);
  });
  return promise;
  };

function onBtnSubmitCreatesPromise(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount }
  } = event.target;

  let firstDelay = Number(delay.value);
  let waitingDelay = Number(step.value);

  Notiflix.Loading.arrows('Working on your task...', {
    position: 'center-center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    messageColor: '#32c682',
  });
  Notiflix.Loading.remove(firstDelay);
  
  for (let position = 1; position <= Number(amount.value); position += 1) {
    createPromise(position, firstDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay} ms`, {
          position: 'right-top',
          timeout: 7000,
          cssAnimationStyle: 'from-top',
        },);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay} ms`, {
          position: 'right-top',
          timeout: 7000,
          cssAnimationStyle: 'from-top',
        },);
      })
      .finally(() => console.log("Promise settled"));
    firstDelay += waitingDelay;
    
  }
}

formEl.addEventListener('submit', onBtnSubmitCreatesPromise)