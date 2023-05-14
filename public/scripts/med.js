function handleMedicne(event) {
  event.preventDefault();
  const inputText = document.getElementById("medInput").value;
  const resultDiv = document.getElementById("medResult");

  // Clear the input field
  document.getElementById("medInput").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const medCloseButton = document.querySelector(".home-button01");
  const medDiv = document.querySelector("#medDiv");

  medCloseButton.addEventListener("click", () => {
    medDiv.style.display = "none";
  });

  // Send a POST request to /summarize endpoint
  try {
    fetch("/findMed", {
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
            "Find the Medicine details below: <br/><br/>" + data.usage;
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("medDiv").style.display = "flex";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("medDiv").style.display = "flex";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while finding medicine usage.");
        throw error; // add this line to throw the error
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while finding medicine usage.");
  }
}
