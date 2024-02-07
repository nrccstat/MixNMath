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

# MixNMath Game Functions

This Markdown file contains descriptions of the functions used in the MixNMath game.

## `setDifficulty(newDifficulty)`

This function sets the difficulty level of the game. It takes a string parameter `newDifficulty` representing the new difficulty level ('Basic', 'Medium', or 'Hard').

## `appendToExpression(char)`

This function appends a character to the current expression. It takes a single character `char` as a parameter and updates the expression display accordingly.

## `clearExpression()`

This function clears the current expression and resets the used digits. It does not take any parameters.

## `deleteLastDigit()`

This function deletes the last digit from the current expression. It updates the expression display accordingly. It does not take any parameters.

## `checkAnswer()`

This function checks if the current expression evaluates to the target number and provides feedback. It does not take any parameters.

## CSS Styles

- `body`: Sets the layout of the entire page, with centering and a background color of #333.

- `.game-container`: Styles the container for the game interface with background color, padding, border radius, and maximum width.

- `.difficulty-buttons`: Adds margin at the bottom of the difficulty buttons.

- `.difficulty-button`: Styles the difficulty buttons with margin, padding, border, border radius, cursor, and transition effects.

- `#basic`, `#medium`, `#hard`: Assigns different background colors to the difficulty buttons based on their IDs.

- `.title`: Styles the game title with margin and color.

- `.level-display`: Styles the level display with margin.

- `.input-display`: Styles the input display area with minimum height, background color, border radius, padding, and margin.

- `.buttons-container`: Styles the container for buttons with flex layout, wrapping, and center alignment.

- `.button`: Styles the buttons with padding, margin, and border radius.

- `.button:hover`: Adds a hover effect to the buttons with a transition.

- `.submit-button`: Styles the submit button with a specific background color.

- `.clear-button`: Styles the clear button with a specific background color.

- `#my`: Zooms the content inside the `#my` element by 300%.






