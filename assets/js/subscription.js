  document.getElementById("subscription-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents default form submission

    let email = document.getElementById("email").value;
    let loading = document.querySelector(".loading");
    let sentMessage = document.querySelector(".sent-message");
    let errorMessage = document.querySelector(".error-message");

    loading.style.display = "block";
    sentMessage.style.display = "none";
    errorMessage.style.display = "none";

    let googleAppsScriptUrl = "https://script.google.com/macros/s/AKfycbxlA-q2Li6cJNRw45qpC77JSO3DLH9eLs11JHSwb5uHTKNaK0Ai2hGZrnXC_9yQ4eI5Pg/exec";

    fetch(googleAppsScriptUrl, {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: { "Content-Type": "application/json" }
    }).then(response => response.text())
    .then(data => {
      loading.style.display = "none";
      if (data.trim() === "Success") {
        sentMessage.style.display = "block";
        document.getElementById("subscription-form").reset();
      } else {
        errorMessage.style.display = "block";
      }
    }).catch(error => {
      loading.style.display = "none";
      errorMessage.style.display = "block";
      console.error("Error:", error);
    });
  });
