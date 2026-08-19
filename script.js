const sentenceDisplay = document.getElementById('sentence');
const playerInput = document.getElementById('input');
const player = document.getElementById('player');
const ai = document.getElementById('ai');
const restart = document.getElementById('restart');
const finishLine = document.getElementById('finish-line');
const track = document.getElementById('track');
const timerEl = document.getElementById('timer');
const resultEl = document.getElementById('result');
const resultText = document.getElementById('result-text');

let targetText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
let finishFlag = track.clientWidth - 100;
let playerProgress = 0, aiProgress = 0;
const aiRate = 0.00043;
const raceTime = 120;
let timeLeft = raceTime;
let aiInterval, timerInterval;
let raceStart = false, raceOver = false;
let mistakes = 0, prevLen = 0, startTime = 0;

finishLine.style.marginLeft = finishFlag + "px";
timerEl.textContent = timeLeft;

function renderText() {
    sentenceDisplay.innerHTML = '';
    for (let i = 0; i < targetText.length; i++) {
        const s = document.createElement('span');
        s.textContent = targetText[i];
        sentenceDisplay.appendChild(s);
    }
    updateTyping();
}

function updateTyping() {
    const val = playerInput.value, caret = playerInput.selectionStart;
    const letters = sentenceDisplay.children;
    for (let i = 0; i < letters.length; i++) {
        let cls = '';
        if (i < val.length) cls = (val[i] === targetText[i]) ? 'good' : 'bad';
        if (i === caret) cls += ' caret';
        letters[i].className = cls.trim();
    }
}

function moveCars() {
    player.style.marginLeft = (playerProgress * finishFlag) + "px";
    ai.style.marginLeft = (aiProgress * finishFlag) + "px";
}

function startAI() {
    aiInterval = setInterval(function(){
        aiProgress += aiRate;
        moveCars();
        if (aiProgress >= 1) endRace("The AI finished!");
    }, 50);
}

function startTimer() {
    timerInterval = setInterval(function(){
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) endRace("Time's up!");
    }, 1000);
}

function endRace(reason) {
    if (raceOver) return;
    raceOver = true;
    clearInterval(aiInterval);
    clearInterval(timerInterval);
    playerInput.disabled = true;
    const val = playerInput.value;
    let correct = 0;
    for (let i = 0; i < val.length; i++) {
        if (val[i] === targetText[i]) correct++;
    }
    const minutes = (Date.now() - startTime) / 60000;
    const wpm = minutes > 0 ? Math.round((correct / 5) / minutes) : 0;
    const acc = (correct + mistakes) > 0 ? Math.round(correct / (correct + mistakes) * 100) : 100;
    resultText.textContent = reason + " " + (playerProgress >= aiProgress ? "You win! " : "AI wins! ") +
        "Your speed was " + wpm + " WPM with " + acc + "% accuracy.";
    resultEl.style.display = 'block';
}

playerInput.addEventListener('input', function(){
    if (raceOver) return;
    if (!raceStart) {
        raceStart = true;
        startTime = Date.now();
        startAI();
        startTimer();
    }
    const val = playerInput.value;
    if (val.length > prevLen) {
        if (val[val.length - 1] !== targetText[val.length - 1]) mistakes++;
    }
    prevLen = val.length;
    let correct = 0;
    for (let i = 0; i < val.length; i++) if (val[i] === targetText[i]) correct++;
    playerProgress = correct / targetText.length;
    moveCars();
    updateTyping();
    if (val.trim() === targetText.trim()) endRace("You finished!");
});

playerInput.addEventListener('keyup', updateTyping);
sentenceDisplay.addEventListener('click', function(){ playerInput.focus(); });

restart.addEventListener('click', function(){
    clearInterval(aiInterval);
    clearInterval(timerInterval);
    raceStart = false;
    raceOver = false;
    playerProgress = 0;
    aiProgress = 0;
    timeLeft = raceTime;
    timerEl.textContent = timeLeft;
    playerInput.value = '';
    playerInput.disabled = false;
    targetText = paragraphs[Math.floor(Math.random() * paragraphs.length)];
    renderText();
    moveCars();
    resultEl.style.display = 'none';
    mistakes = 0;
    prevLen = 0;
    startTime = 0;
    playerInput.focus();
});

renderText();
playerInput.focus();