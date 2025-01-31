  document.getElementById("subscription-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents default form submission

    let email = document.getElementById("email").value;
    let loading = document.querySelector(".loading");
    let sentMessage = document.querySelector(".sent-message");
    let errorMessage = document.querySelector(".error-message");

    loading.style.display = "block";
    sentMessage.style.display = "none";
    errorMessage.style.display = "none";

    let googleAppsScriptUrl = "https://script.google.com/macros/s/AKfycby26Hv6s-13kjkDA3N9DWIee6e35ywi5Mr0PED5YT9YWESNWLeZjSAvuBrrlb-gWq778Q/exec";

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
