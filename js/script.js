/*VARIAVEIS*/
const buttonPlay = document.querySelector(".play");
const buttonPause = document.querySelector(".pause");
const buttonSet = document.querySelector(".set");
const buttonStop = document.querySelector(".stop");
const buttonSoundOn = document.querySelector(".sound-on");
const buttonSoundOff = document.querySelector(".sound-off");
const minutesDisplay = document.querySelector(".minutes");
const secondsDisplay = document.querySelector(".seconds");
let minutes = Number(minutesDisplay.textContent);
let timerTimeOut;

/* MUSICAS */
const buttonPressAudio = new Audio(
  "https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true"
);
const kitchenTimer = new Audio(
  "https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true"
);
const bgAudio = new Audio(
  "https://github.com/maykbrito/automatic-video-creator/blob/master/audios/bg-audio.mp3?raw=true"
);
bgAudio.loop = true;

/*  FUNCOES  */
function resetControls() {
  buttonStop.classList.add("hide");
  buttonSet.classList.remove("hide");
  buttonPlay.classList.remove("hide");
  buttonPause.classList.add("hide");
  clearTimeout(timerTimeOut);
}

function updateTimerDisplay(minutes, seconds) {
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
}

function countdown() {
  timerTimeOut = setTimeout(function () {
    let seconds = Number(secondsDisplay.textContent);
    let minutes = Number(minutesDisplay.textContent);

    updateTimerDisplay(minutes, 0);

    if (minutes == 0 && seconds == 0) {
      resetControls();
      resetTimer();
      kitchenTimer.play();

      return;
    }

    if (seconds <= 0) {
      seconds = 60;
      --minutes;
    }

    updateTimerDisplay(minutes, String(seconds - 1));

    countdown();
  }, 1000);
}

function resetTimer() {
  updateTimerDisplay(minutes, 0);
  clearTimeout(timerTimeOut);
}

/*EVENTOS*/
buttonPlay.addEventListener("click", function () {
  buttonPlay.classList.add("hide");
  buttonPause.classList.remove("hide");
  buttonStop.classList.remove("hide");
  buttonSet.classList.add("hide");

  countdown();
  buttonPressAudio.play();
});

buttonPause.addEventListener("click", function () {
  buttonPlay.classList.remove("hide");
  buttonPause.classList.add("hide");
  clearTimeout(timerTimeOut); // clear para o set, para no caso
  buttonPressAudio.play();
});

buttonStop.addEventListener("click", function () {
  resetControls();
  resetTimer();
  buttonPressAudio.play();
});

buttonSoundOn.addEventListener("click", function () {
  buttonSoundOn.classList.add("hide");
  buttonSoundOff.classList.remove("hide");
  bgAudio.pause();
});

buttonSoundOff.addEventListener("click", function () {
  buttonSoundOn.classList.remove("hide");
  buttonSoundOff.classList.add("hide");
  bgAudio.play();
});

buttonSet.addEventListener("click", function () {
  let newMinutes = prompt("Quantos minutos de estudo?");
  if (!newMinutes) {
    alert("Você digitou nenhum valor");
    resetTimer();
    return;
  } else {
    minutes = newMinutes;
    updateTimerDisplay(minutes, 0);
  }
});
