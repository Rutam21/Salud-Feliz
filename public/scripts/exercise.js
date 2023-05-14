function handleExercise(event) {
  event.preventDefault();
  const inputText = document.getElementById("exerciseInput").value;
  const resultDiv = document.getElementById("exerciseResult");

  // Clear the input field
  document.getElementById("exerciseInput").value = "";

  // Loading Screen
  document.getElementById("loading-screen").style.display = "block";

  const exerciseCloseButton = document.querySelector(".home-button09");
  const exerciseDiv = document.querySelector("#exerciseDiv");

  exerciseCloseButton.addEventListener("click", () => {
    exerciseDiv.style.display = "none";
  });

  // Send a POST request to /summarize endpoint
  try {
    fetch("/findExercises", {
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
            "Find the steps to do the Exercise below: <br/><br/>" +
            data.exercise;
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("exerciseDiv").style.display = "flex";
        } else {
          resultDiv.innerHTML =
            "We are caught in the middle of an error. Please try Again!";
          document.getElementById("loading-screen").style.display = "none";
          document.getElementById("exerciseDiv").style.display = "flex";
        }
      })
      .catch((error) => {
        document.getElementById("loading-screen").style.display = "none";
        alert("An error occurred while finding exercise steps.");
        throw error; // add this line to throw the error
      });
  } catch (error) {
    document.getElementById("loading-screen").style.display = "none";
    alert("An error occurred while finding exercise steps.");
  }
}
