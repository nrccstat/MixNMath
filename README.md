# MiXNMath Game Functions

This Markdown file contains JavaScript functions for a game called MixNMath..

## Variables

```javascript
let currentLevel = 1; // Start at level 1, though the level might play a different role depending on game design
let currentExpression = '';
let difficulty = 'Basic';
let usedDigits = new Set(); // To track digits used in the current expression
let targetNumber = generateTargetNumber(); // Initialize target number

## Functions

# generateTargetNumber()
Generates a target number based on the current difficulty level.

# updateTargetDisplay()
Updates the display to show the current level and target number.

# setDifficulty(newDifficulty)
Sets the difficulty level and resets the game parameters accordingly.

# appendToExpression(char)
Appends a character to the current expression and updates the display.

# clearExpression()
Clears the current expression and resets the used digits.

# checkAllDigitsUsedOnce()
Checks if all digits from 1 to 9 are used exactly once in the expression.

# deleteLastDigit()
Deletes the last digit from the current expression and updates the display.

# checkAnswer()
Checks if the current expression evaluates to the target number and provides feedback.

## Initialization

// Event listener for DOMContentLoaded to initialize the game display
document.addEventListener('DOMContentLoaded', updateTargetDisplay);

This Markdown file provides an overview of the variables and functions used in the math game, along with brief descriptions of their purposes.



