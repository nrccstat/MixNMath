let currentExpression = '';
let difficulty = 'Easy';
let usedDigits = new Set(); 




function setupGame() {
    // Identify game mode based on the page or a condition, for simplification let's just focus on "Daily"
    difficulty = 'Daily';
    if (difficulty === 'Daily') {
        setupDailyMode();
    }

    // Set up event listeners for buttons
    document.querySelector('.clear-button').onclick = clearExpression;
    document.querySelector('.submit-button').onclick = checkAnswer;
    document.addEventListener('keydown', handleKeyPress);

    // Initialize other UI components if necessary
}

function setupDailyMode() {
    document.querySelector('.difficulty-buttons').style.display = 'none'; // Hide difficulty buttons
    targetNumber = generateTargetNumberForDaily();
    updateTargetDisplay();
}

function generateTargetNumberForDaily() {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    Math.seedrandom(seed); // Seed the RNG with today's date
    return Math.floor(Math.random() * 891) + 100; // Generates numbers between 100 and 990
}

let targetNumber = generateTargetNumberForDaily(); 

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
        if (Math.abs(evaluatedResult - targetNumber) < 1e-4) {
            displayCongratsMessage();
        } else {
            document.getElementById('result').innerText = `Close! Your expression evaluates to: ${evaluatedResult}, but the target was ${targetNumber}. Try again.`;
        }
    } catch (error) {
        document.getElementById('result').innerText = "Error in expression. Please try again.";
        console.error("Error evaluating expression:", error);
    }
}


document.addEventListener('DOMContentLoaded', updateTargetDisplay);
document.addEventListener('keydown', handleKeyPress);


function displayCongratsMessage() {
    // Select all child elements of `.game-container` except `header`
    const gameContentElements = document.querySelectorAll('.game-container > *:not(header)');

    // Hide these elements
    gameContentElements.forEach(element => {
        element.style.display = 'none';
    });

    // Create a congratulatory message and append it directly under the navbar or as a part of the navbar, based on your preference
    const congratsElement = document.createElement('div');
    congratsElement.setAttribute('id', 'congrats-message');
    congratsElement.style.textAlign = 'center';
    congratsElement.style.fontSize = '24px';
    congratsElement.style.fontWeight = 'bold';
    congratsElement.innerHTML = 'Congratulations! You\'ve solved the daily problem!';

    // Append the message to the game container, considering navbar should remain visible
    const navbar = document.querySelector('.navbar');
    if (navbar.nextSibling) {
        navbar.parentNode.insertBefore(congratsElement, navbar.nextSibling);
    } else {
        // If there's no next sibling, append to the game container
        document.querySelector('.game-container').appendChild(congratsElement);
    }
}

function handleKeyPress(event) {
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
