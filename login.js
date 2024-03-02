document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!username || !password) {
      document.getElementById("message").innerText = "Please provide both username and password.";
      return;
  }

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "storeCredentials.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          if (response.success) {
              document.getElementById("message").innerText = "Login successful.";
          } else {
              document.getElementById("message").innerText = "Failed to login. Please try again.";
          }
      }
  };
  xhr.send(`username=${username}&password=${password}`);
});
