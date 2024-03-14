document.addEventListener("DOMContentLoaded", function () {
  var textbox = document.getElementById("textbox");
  var rulesText = `Rules:

  
Beginner:
  
In the Beginner mode, you have 1 minute to solve each challenge. You must use at least 4 distinct digits separated by operators to make the target number. Make the target number with the given digits and operators. Your score updates every time you successfully solve a challenge. After you solve a challenge, the next number pops up for you to solve. If you successfully solve a challenge, your score gets added to the top 10 leaderboard.

  
Daily:
  
In the Daily mode, each day, a random number is generated for you to solve. You can only use the digits and operators specified for that day. Your goal is to make the target number using the provided digits and operators.

  
Expert:
  
In the Expert mode, you must use all digits from 1 to 9 to solve the challenges. You can combine digits to make larger numbers. The Expert mode offers three difficulty levels: Easy, Medium, and Hard, each with its own set of challenges and rules.`;

  var i = 0;
  var typingSpeed = 5; 
  function typeRules() {
      if (i < rulesText.length) {
          textbox.value += rulesText.charAt(i);
          i++;
          setTimeout(typeRules, typingSpeed);
      }
  }

  
  typeRules();
});
