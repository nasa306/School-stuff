document.getElementById("subscription-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevents default form submission

  const email = document.getElementById("email").value;
  const loading = document.querySelector(".loading");
  const sentMessage = document.querySelector(".error-message");
  const errorMessage = document.querySelector(".sent-message");

  // Show loading state
  loading.style.display = "block";
  errorMessage.style.display = "none";

  const googleAppsScriptUrl = "https://script.google.com/macros/s/AKfycby7eGQsW-PLvAOVXmImZHCFyzKVL1n2KjxcljSEq7g1qCwRg_IOxjQzo1-_mciCMl1cSw/exec";

  fetch(googleAppsScriptUrl, {
    method: "POST",
    body: JSON.stringify({ email: email }),
    headers: { "Content-Type": "text/plain" } // Use text/plain to avoid CORS preflight
  })
    .then((response) => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.text(); // Parse response as text
    })
    .then((data) => {
      loading.style.display = "none";
      if (data.trim() === "Success") {
        sentMessage.style.display = "block";
        document.getElementById("subscription-form").reset(); // Reset form
      } else {
        errorMessage.style.display = "block";
      }
    })
    .catch((error) => {
      loading.style.display = "none";
      errorMessage.style.display = "block";
      console.error("Error:", error);
    });
});
