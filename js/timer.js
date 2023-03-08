const breakIncrementButton = document.getElementById('break-increment')
const breakDecrementButton = document.getElementById('break-decrement')
const sessionIncrementButton = document.getElementById('session-increment')
const sessionDecrementButton = document.getElementById('session-decrement')
const startStopButton = document.getElementById('start_stop')
const resetButton = document.getElementById('reset')
const breakLength = document.getElementById('break-length');
const sessionLength = document.getElementById('session-length');
const timeLeft = document.getElementById('time-left');
const timerLabel = document.getElementById('timer-label');

let timer;
let timerStatus = "begin";
let timerTime;

startStopButton.addEventListener("click", () => {
    let status = "session";
    if (timerStatus === "begin" || timerStatus === "stopped") {
        timeLeft.innerText = timerTime;
        timer = setInterval(() => {
            timeLeft.innerText = decrementTime()
        }, 1000);
        timerStatus = "counting";
        console.log("start the timer");
    } else if (timerStatus === "counting") {
        clearInterval(timer);
        timerStatus = "stopped";
        console.log("stop the timer")
    }

    resetButton.addEventListener("click", () => {
        clearInterval(timer);
        timeLeft.innerText = "25:00";
        sessionLength.innerText = 25;
        breakLength.innerText = 5;
    })

    function decrementTime(timeString) {
        let seconds = parseInt(timeLeft.innerText.split(":")[0] * 60) + parseInt(timeLeft.innerText.split(":")[1])
        console.log("out", seconds);

        let minutesAndSeconds = '';

        if (seconds <= 0) {
            if (status === "session") {
                console.log("session in")
                if (breakLength.innerText.length === 1) {
                    minutesAndSeconds = "0" + breakLength.innerText + ":00"
                    console.log("timeLeft", minutesAndSeconds)
                } else if (breakLength.innerText.length === 2) {
                    minutesAndSeconds = breakLength.innerText + ":00"
                }
                status = "break"
                timerLabel.innerText = "Break";
                console.log("break:", seconds, minutesAndSeconds, `status: ${status}`);

            } else if (status === "break") {
                console.log("break in")
                if (sessionLength.innerText.length === 1) {
                    minutesAndSeconds = "0" + sessionLength.innerText + ":00"
                    console.log("timeLeft", timeLeft.innerText)
                } else if (sessionLength.innerText.length === 2) {
                    minutesAndSeconds = sessionLength.innerText + ":00"
                }
                status = "session";
                timerLabel.innerText = "Session";
                console.log("session", seconds, minutesAndSeconds, `status: ${status}`);
            }

            return minutesAndSeconds;
        } else {
            seconds -= 30;
            if (Math.floor(seconds / 60) < 10 && seconds % 60 < 10) {
                minutesAndSeconds = "0" + Math.floor(seconds / 60) + ":" + "0" + seconds % 60;
            } else if (Math.floor(seconds / 60) < 10 && seconds % 60 > 10 && seconds % 60 < 60) {
                minutesAndSeconds = "0" + Math.floor(seconds / 60) + ":" + seconds % 60;
            } else if (Math.floor(seconds / 60) > 10 && seconds % 60 < 10) {
                minutesAndSeconds = Math.floor(seconds / 60) + ":" + "0" + seconds % 60;
            } else {
                minutesAndSeconds = Math.floor(seconds / 60) + ":" + seconds % 60;
            }
        }

        return minutesAndSeconds;
    }
});
breakDecrementButton.addEventListener("click", () => {
    if (parseInt(breakLength.innerText) <= 0) {
        breakLength.innerText = 0;
    } else {
        breakLength.innerText = String(parseInt(breakLength.innerText) - 1);
    }
})
breakIncrementButton.addEventListener("click", () => {
    if (parseInt(breakLength.innerText) >= 60) {
        breakLength.innerText = 60;
    } else {
        breakLength.innerText = String(parseInt(breakLength.innerText) + 1);
    }
})
sessionDecrementButton.addEventListener("click", () => {
    if (parseInt(sessionLength.innerText) <= 0) {
        sessionLength.innerText = 0;
        timerTime = 0;
    } else {
        sessionLength.innerText = String(parseInt(sessionLength.innerText) - 1);
        timerTime = sessionLength.innerText + ":00";
    }
})
sessionIncrementButton.addEventListener("click", () => {
    if (parseInt(sessionLength.innerText) >= 60) {
        sessionLength.innerText = 60;
        timerTime = 60;
    } else {
        sessionLength.innerText = String(parseInt(sessionLength.innerText) + 1);
        timerTime = sessionLength.innerText + ":00";
    }
})