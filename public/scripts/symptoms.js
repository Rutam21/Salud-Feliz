function handleSymptoms(event) {
  event.preventDefault();
  const inputText = document.getElementById("diseaseInput").value;
  const resultDiv = document.getElementById("diseaseResult");

  // Clear the input field
  document.getElementById("diseaseInput").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const symptomCloseButton = document.querySelector(".home-button03");
  const symptomDiv = document.querySelector("#symptomDiv");

  symptomCloseButton.addEventListener("click", () => {
    symptomDiv.style.display = "none";
  });

  // Send a POST request to /summarize endpoint
  try {
    fetch("/findSymptoms", {
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
            "Find the Symptoms below: <br/><br/>" + data.symptoms;
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("symptomDiv").style.display = "flex";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("symptomDiv").style.display = "flex";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while finding disease symptom.");
        throw error; // add this line to throw the error
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while finding disease symptom.");
  }
}
