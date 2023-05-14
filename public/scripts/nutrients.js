function handleNutreints(event) {
  event.preventDefault();
  const inputText = document.getElementById("nutrientInput").value;
  const resultDiv = document.getElementById("nutrientResult");

  // Clear the input field
  document.getElementById("nutrientInput").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const nutrientCloseButton = document.querySelector(".home-button07");
  const nutrientDiv = document.querySelector("#nutreintDiv");

  nutrientCloseButton.addEventListener("click", () => {
    nutrientDiv.style.display = "none";
  });

  // Send a POST request to /summarize endpoint
  try {
    fetch("/findNutrients", {
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
            "Find the Nutrient Composition below: <br/><br/>" + data.nutri;
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("nutreintDiv").style.display = "flex";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("nutreintDiv").style.display = "flex";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while finding the food nutrients.");
        throw error; // add this line to throw the error
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while finding the food nutrients.");
  }
}
