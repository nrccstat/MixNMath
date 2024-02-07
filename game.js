let currentLevel = 1; // Start at level 1, though the level might play a different role depending on game design
let currentExpression = '';
let difficulty = 'Basic';
let usedDigits = new Set(); // To track digits used in the current expression

function generateTargetNumber() {
    let min, max;
    switch (difficulty) {
        case 'Basic':
            min = 1;
            max = 1000;
            break;
        case 'Medium':
            min = 1000;
            max = 4000;
            break;
        case 'Hard':
            min = 4000;
            max = 11111;
            break;
        default:
            // Default to Basic range if something goes wrong
            min = 1;
            max = 1000;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let targetNumber = generateTargetNumber(); // Initialize target number

function updateTargetDisplay() {
    document.getElementById('level').innerText = `Level: ${currentLevel}`;
    document.getElementById('challenge').innerText = `Make ${targetNumber}`;
}

function setDifficulty(newDifficulty) {
    difficulty = newDifficulty;
    currentLevel = 1; // Reset to level 1 when difficulty changes
    usedDigits.clear(); // Clear used digits
    currentExpression = ''; // Clear current expression
    targetNumber = generateTargetNumber(); // Generate a new target number based on the new difficulty
    updateTargetDisplay(); // Update the display to show the new target number and reset level
    document.getElementById('expression').innerText = ''; // Clear the expression display
    document.getElementById('result').innerText = ''; // Clear any previous result message
}

function appendToExpression(char) {
    if (!isNaN(char) && usedDigits.has(char)) {
        alert("Each digit can only be used once.");
        return;
    }
    
    if (!isNaN(char)) {
        usedDigits.add(char);
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
            return false; // If any digit from 1-9 is not used, return false
        }
    }
    return true; // All digits were used exactly once
}

function deleteLastDigit() {
    if (currentExpression.length > 0) {
        const lastChar = currentExpression[currentExpression.length - 1];
        if (!isNaN(lastChar)) {
            // If last character is a digit, remove it from usedDigits
            usedDigits.delete(lastChar);
        }
        // Remove the last character from the expression
        currentExpression = currentExpression.slice(0, -1);
        // Update the expression display
        document.getElementById('expression').innerText = currentExpression;
    }
}

function checkAnswer() {
    if (!checkAllDigitsUsedOnce()) {
        document.getElementById('result').innerText = "You must use all digits from 1-9 exactly once.";
        return;
    }

    try {
        const evaluatedResult = math.evaluate(currentExpression);
        document.getElementById('result').innerText = `Your expression evaluates to: ${evaluatedResult}`;
        if (Math.abs(evaluatedResult - targetNumber) < 1e-4) {
            alert(`Correct! Your expression matches the target number: ${evaluatedResult}`);
            // Reset for a new challenge
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
document.addEventListener('keydown', function(event) {
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
        checkAnswer();
    } else if (key === 'Backspace') {
        deleteLastDigit();
    } else if (key === 'Delete') {
        clearExpression();
    }
});
