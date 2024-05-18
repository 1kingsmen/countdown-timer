let interval;
let remainingTime;
let isPaused = false;

function startCountdown(duration) {
    let timer = duration;
    const display = document.getElementById('timer');
    remainingTime = timer;

    interval = setInterval(function () {
        const hours = Math.floor(timer / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;

        display.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        if (--timer < 0) {
            clearInterval(interval);
            display.textContent = 'Time is up!';
            document.getElementById('stopButton').disabled = true;
        }

        remainingTime = timer;
    }, 1000);
}

document.getElementById('startButton').addEventListener('click', function() {
    if (!isPaused) {
        const hours = parseInt(document.getElementById('hoursInput').value, 10) || 0;
        const minutes = parseInt(document.getElementById('minutesInput').value, 10) || 0;
        const seconds = parseInt(document.getElementById('secondsInput').value, 10) || 0;
        const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        startCountdown(totalSeconds);
    } else {
        startCountdown(remainingTime);
        isPaused = false;
    }
    document.getElementById('stopButton').disabled = false;
});

document.getElementById('stopButton').addEventListener('click', function() {
    if (isPaused) {
        startCountdown(remainingTime);
        this.textContent = 'Stop';
        isPaused = false;
    } else {
        clearInterval(interval);
        this.textContent = 'Resume';
        isPaused = true;
    }
});

document.getElementById('resetButton').addEventListener('click', function() {
    clearInterval(interval);
    document.getElementById('timer').textContent = '00:00:00';
    document.getElementById('hoursInput').value = '';
    document.getElementById('minutesInput').value = '';
    document.getElementById('secondsInput').value = '';
    document.getElementById('stopButton').textContent = 'Stop';
    document.getElementById('stopButton').disabled = true;
    isPaused = false;
});

document.getElementById('stopButton').disabled = true;