require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mindsdb = require("./handler/mindsdb");
const logger = require("./logger");

const app = express();

// Middleware to parse request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the static files in public directory
app.use(express.static("public"));
app.use("/scripts", express.static(__dirname + "/scripts"));

// Connect to MindsDB and start the server when connection is established
mindsdb
  .connectToMindsDB()
  .then(() => {
    app.listen(3000, () => {
      logger.info("Server listening on port 3000");
    });
  })
  .catch((err) => {
    logger.error("Error connecting to MindsDB: ", err);
  });

// Route for the homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/findMed", async (req, res) => {
  const inputText = req.body.inputText;

  try {
    // Call a function from mindsdb.js
    const usage = await mindsdb.analyzeMedicine(inputText);
    res.send({ usage });
  } catch (error) {
    logger.error("Error extracting Medicine Usage: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while extracting Medicine usage." });
  }
});

app.post("/findSymptoms", async (req, res) => {
  const inputText = req.body.inputText;
  try {
    // Call a function from mindsdb.js
    const symptoms = await mindsdb.analyzeSymptoms(inputText);
    res.send({ symptoms });
  } catch (error) {
    logger.error("Error analyzing symptoms: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while analyzing symptoms" });
  }
});

app.post("/findPrecautions", async (req, res) => {
  const inputText = req.body.inputText;
  try {
    // Call a function from mindsdb.js
    const precautions = await mindsdb.analyzePrecautions(inputText);
    res.send({ precautions });
  } catch (error) {
    logger.error("Error finding precautions: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while finding the precautions." });
  }
});

// Route to handle the prediction
app.post("/findNutrients", async (req, res) => {
  const inputText = req.body.inputText;
  try {
    // Call a function from mindsdb.js
    const nutri = await mindsdb.analyzeNutrients(inputText);
    res.send({ nutri });
  } catch (error) {
    logger.error("Error finding nutrients: ", error);
    res
      .status(500)
      .send({
        error: "An error occurred while analyzing nutrients in the given dish.",
      });
  }
});

app.post("/findExercises", async (req, res) => {
  const inputText = req.body.inputText;
  try {
    // Call a function from mindsdb.js
    const exercise = await mindsdb.extarctExercise(inputText);
    res.send({ exercise });
  } catch (error) {
    logger.error("Error extracting exercise details: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while extracting exercise details." });
  }
});

app.post("/findYoga", async (req, res) => {
  const inputText = req.body.inputText;
  try {
    // Call a function from mindsdb.js
    const yoga = await mindsdb.extarctYoga(inputText);
    res.send({ yoga });
  } catch (error) {
    logger.error("Error extracting Yoga details: ", error);
    res
      .status(500)
      .send({ error: "An error occurred while extracting Yoga details." });
  }
});
