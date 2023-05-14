function handleYoga(event) {
  event.preventDefault();
  const inputText = document.getElementById("yogaInput").value;
  const resultDiv = document.getElementById("yogaResult");

  // Clear the input field
  document.getElementById("yogaInput").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const yogaCloseButton = document.querySelector(".home-button11");
  const yogaDiv = document.querySelector("#yogaDiv");

  yogaCloseButton.addEventListener("click", () => {
    yogaDiv.style.display = "none";
  });

  // Send a POST request to /summarize endpoint
  try {
    fetch("/findYoga", {
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
            "Find the steps to do the Yoga Asana below: <br/><br/>" + data.yoga;
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("yogaDiv").style.display = "flex";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("yogaDiv").style.display = "flex";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while finding Yoga Asana steps.");
        throw error; // add this line to throw the error
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while finding Yoga Asana steps.");
  }
}
