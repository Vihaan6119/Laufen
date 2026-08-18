const sentenceDisplay = document.getElementById('sentence');
let targetSentence = sentences[Math.floor(Math.random() * sentences.length)];
let finishFlag = targetSentence.length * 20;
const playerInput = document.getElementById('input');
const player = document.getElementById('player');
const ai = document.getElementById('ai');
let aiPosition = 0;
let playerPosition = 0;
const restart = document.getElementById('restart');
//const finishFlag = 800;  
let aiInterval;
const finishLine = document.getElementById('finish-line');
let raceStart = false;
let raceOver = false;

finishLine.style.marginLeft = finishFlag + "px";

sentenceDisplay.textContent = targetSentence;

playerInput.addEventListener('input', function(){
    if (!raceStart){
    raceStart = true;
    StartAI();
    }
    if (targetSentence.startsWith(playerInput.value)){
        playerInput.style.backgroundColor = "lightgreen";
        playerPosition = playerInput.value.length * 20;
        player.style.marginLeft = playerPosition + "px";
    }
    else {
        playerInput.style.backgroundColor = "lightcoral";
    }

    if (playerInput.value === targetSentence && !raceOver){
        raceOver = true;
        clearInterval(aiInterval);
        alert("You won! Congratulations!");
    }
});

function StartAI(){
    aiInterval = setInterval(function(){
        aiPosition = aiPosition + 4.5;
        ai.style.marginLeft = aiPosition + "px";
        if (aiPosition >= finishFlag){
            clearInterval(aiInterval);
            alert("AI won! Better luck next time.");
        }
    }, 50);
}

restart.addEventListener('click', function(){
    clearInterval(aiInterval);        

    raceStart = false;                
    raceOver = false;

    playerInput.value = "";
    playerPosition = 0;
    player.style.marginLeft = "0px";
    playerInput.style.backgroundColor = "white";

    aiPosition = 0;
    ai.style.marginLeft = "0px";

    targetSentence = sentences[Math.floor(Math.random() * sentences.length)];
    finishFlag = targetSentence.length * 20;
    sentenceDisplay.textContent = targetSentence;
    finishLine.style.marginLeft = finishFlag + "px";
});