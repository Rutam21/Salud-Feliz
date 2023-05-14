function handlePrecautions(event) {
  event.preventDefault();
  const inputText = document.getElementById("precautionInput").value;
  const resultDiv = document.getElementById("precautionResult");

  // Clear the input field
  document.getElementById("precautionInput").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const precautionCloseButton = document.querySelector(".home-button05");
  const precautionDiv = document.querySelector("#precautionDiv");

  precautionCloseButton.addEventListener("click", () => {
    precautionDiv.style.display = "none";
  });

  // Send a POST request to /summarize endpoint
  try {
    fetch("/findPrecautions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputText }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the prediction
        if (!data.error) {
          resultDiv.innerHTML =
            "Find the Precautions below: <br/><br/>" + data.precautions;
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("precautionDiv").style.display = "flex";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("precautionDiv").style.display = "flex";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while finding disease precautions.");
        throw error; // add this line to throw the error
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while finding disease precautions.");
  }
}
