let currentExpression = '';
let difficulty = 'Easy';
let usedDigits = new Set(); 
let timerInterval;
let timerStarted = false;
let pauseButtonAdded = false; 

function startTimer() {
    timerStarted = true; 
    
    document.getElementById("challenge").style.display = "block";

    let timerDisplay = document.getElementById("timer");
    let time = timerDisplay.textContent.split(":");
    let minutes = parseInt(time[0]);
    let seconds = parseInt(time[1]);
    let msec = parseInt(time[2]);

    let totalTime = minutes * 6000 + seconds * 100 + msec;

    let timerInterval = setInterval(function () {
        totalTime--;
        if (totalTime >= 0) {
            minutes = Math.floor(totalTime / 6000);
            seconds = Math.floor((totalTime % 6000) / 100);
            msec = totalTime % 100;

            let formattedTime =
                (minutes < 10 ? "0" : "") +
                minutes +
                ":" +
                (seconds < 10 ? "0" : "") +
                seconds +
                ":" +
                (msec < 10 ? "0" : "") +
                msec;
            timerDisplay.textContent = formattedTime;
        } else {
            clearInterval(timerInterval);
            document.getElementById("startButton").textContent = "Reset Timer";
            document.getElementById("startButton").style.backgroundColor = "#ff8f8f";
            document.getElementById("startButton").style.filter = "drop-shadow(-5px 0px 0px #8F4949)";
            document.getElementById("challenge").style.display = "none"; 
        }
    }, 10);

    document.getElementById("startButton").setAttribute("onclick", "resetTimer()");
    document.getElementById("startButton").style.backgroundColor = ""; 
    
    enableFeatures();
}



function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById("timer").textContent = "1:00:00";
    document.getElementById("startButton").textContent = "Start Timer";
    document.getElementById("startButton").style.backgroundColor = ""; // Reset button color
    document.getElementById("startButton").style.filter = "drop-shadow(-5px 0px 0px #48804E)"
    document.getElementById("startButton").setAttribute("onclick", "startTimer()");
    timerStarted = false;
    removePauseButton();
    updateTargetDisplay();

    
}

function enableFeatures() {
    enableAllButtons(); 
    document.addEventListener('keydown', handleKeyPress); 
}



function enableAllButtons() {
    let buttons = document.querySelectorAll(".button");
    buttons.forEach(button => {
        button.removeAttribute("disabled");
    });
}

function addPauseButton() {
    let timerContainer = document.querySelector(".timer-container");
    let pauseButton = document.createElement("button");
    pauseButton.setAttribute("id", "pauseButton");
    pauseButton.setAttribute("class", "clear-button"); 
    pauseButton.textContent = "Pause Timer";
    pauseButton.addEventListener("click", toggleTimer);
    timerContainer.appendChild(pauseButton);
    pauseButtonAdded = true;
}

function removePauseButton() {
    let pauseButton = document.getElementById("pauseButton");
    if (pauseButton) {
        pauseButton.remove();
        pauseButtonAdded = false;
    }
}
function toggleTimer() {
    if (timerStarted) {
        clearInterval(timerInterval);
        timerStarted = false;
        document.getElementById("startButton").textContent = "Start Timer";
        document.getElementById("pauseButton").style.display = "none";
    } else {
        startTimer();
        document.getElementById("startButton").textContent = "Pause Timer";
        document.getElementById("pauseButton").style.display = "inline-block";
    }
}



function generateTargetNumber() {
    let min, max;
    if (difficulty == "Easy") {
        min = 1;
        max = 100;
    }
    else if (difficulty == "Medium"){
        min = 100;
        max = 300;
    }
    else if (difficulty == "Hard"){
        min = 300;
        max = 1000;     
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
}


let targetNumber = generateTargetNumber(); 

function updateTargetDisplay() {
    document.getElementById('challenge').innerText = `Make ${targetNumber}`;
}


function setDifficulty(newDifficulty) {
    usedDigits.clear(); 
    currentExpression = ''; 
    difficulty = newDifficulty;
    targetNumber = generateTargetNumber(); 
    updateTargetDisplay(); 
    document.getElementById('expression').innerText = ''; 
    document.getElementById('result').innerText = ''; 
}

function appendToExpression(char) {
    if (!isNaN(char) && usedDigits.has(char)) {
        alert("Each digit can only be used once.");
        return;
    }

    if (!isNaN(char)) {
        usedDigits.add(char);
    }

    if (currentExpression.trim().length === 0 && (char === '+' || char === '-' || char === '*' || char === '/' || char === '^')) {
        alert("Invalid operator usage.");
        return;
    }

    const lastChar = currentExpression[currentExpression.length - 1];

    if ((lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === "^") &&
        (char === '+' || char === '-' || char === '*' || char === '/' || lastChar === "^")) {
        alert("Please use one operator at a time.");
        return;
    }

    currentExpression += char;
    document.getElementById('expression').innerText = currentExpression;
}


function clearExpression() {
    currentExpression = '';
    usedDigits.clear();
    document.getElementById('expression').innerText = '';
    document.getElementById('result').innerText = '';
}

function checkAllDigitsUsedOnce() {
    for (let digit = 1; digit <= 9; digit++) {
        if (!usedDigits.has(digit.toString())) {
            return false; 
        }
    }
    return true; 
}

function deleteLastDigit() {
    if (currentExpression.length > 0) {
        const lastChar = currentExpression[currentExpression.length - 1];
        if (!isNaN(lastChar)) {
            usedDigits.delete(lastChar);
        }
        currentExpression = currentExpression.slice(0, -1);
        document.getElementById('expression').innerText = currentExpression;
    }
}

function checkAnswer() {
    if (!checkAllDigitsUsedOnce()) {
        document.getElementById('result').innerText = "You must use all digits from 1-9 exactly once.";
        return;
    }

    const trimmedExpression = currentExpression.trim();
    const firstChar = trimmedExpression.charAt(0);
    const lastChar = trimmedExpression.charAt(trimmedExpression.length - 1);
    const operators = ['+', '-', '*', '/', '^'];

    if (operators.includes(firstChar) || operators.includes(lastChar)) {
        document.getElementById('result').innerText = "Invalid operator usage.";
        return;
    }

    for (let i = 0; i < trimmedExpression.length - 1; i++) {
        if (operators.includes(trimmedExpression.charAt(i)) && operators.includes(trimmedExpression.charAt(i + 1))) {
            document.getElementById('result').innerText = "Please use one operator at a time.";
            return;
        }
    }

    try {
        const evaluatedResult = math.evaluate(currentExpression);
        document.getElementById('result').innerText = `Your expression evaluates to: ${evaluatedResult}`;
        if (Math.abs(evaluatedResult - targetNumber) < 1e-4) {
            alert(`Correct! Your expression matches the target number: ${evaluatedResult}`);
            clearExpression();
            targetNumber = generateTargetNumber();
            updateTargetDisplay();
        } else {
            alert(`Close! Your expression evaluates to: ${evaluatedResult}, but the target was ${targetNumber}. Try again.`);
        }
    } catch (error) {
        document.getElementById('result').innerText = error;
        console.error("Error evaluating expression:", error);
    }
}


document.addEventListener('DOMContentLoaded', updateTargetDisplay);
document.addEventListener('keydown', handleKeyPress);

function handleKeyPress(event) {
    if (timerStarted) {
        const key = event.key; 
        if (key >= '0' && key <= '9') {
            appendToExpression(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/' || (event.shiftKey && key === '^')) {
            appendToExpression(key);
        } else if (key === '(') {
            appendToExpression('(');
        } else if (key === ')') {
            appendToExpression(')');
        } else if (key === 'Enter') {
            const lastChar = currentExpression.trim().charAt(currentExpression.trim().length - 1);
            const operators = ['+', '-', '*', '/'];
            if (operators.includes(lastChar)) {
                alert("Invalid operator usage.");
                return;
            }
            checkAnswer();
        } else if (key === 'Backspace') {
            deleteLastDigit();
        } else if (key === 'Delete') {
            clearExpression();
        }
    }
}


