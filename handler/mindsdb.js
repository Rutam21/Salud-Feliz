const MindsDB = require("mindsdb-js-sdk").default;
const logger = require("../logger");
const medicineModelName = process.env.MINDSDB_OPENAI_MEDICINE_MODEL;
const symptomModelName = process.env.MINDSDB_OPENAI_SYMPTOM_MODEL;
const precautionModelName = process.env.MINDSDB_OPENAI_PRECAUTION_MODEL;
const nutrientModelName = process.env.MINDSDB_OPENAI_NUTRIENT_MODEL;
const exerciseModelName = process.env.MINDSDB_OPENAI_EXERCISE_MODEL;
const yogaModelName = process.env.MINDSDB_OPENAI_YOGA_MODEL;

async function connectToMindsDB() {
  try {
    await MindsDB.connect({
      user: process.env.MINDSDB_USERNAME,
      password: process.env.MINDSDB_PASSWORD,
    });
    logger.info("Connected to MindsDB Cloud");
  } catch (error) {
    logger.error("Error connecting to MindsDB Cloud:", error);
    throw error;
  }
}

async function analyzeMedicine(inputText) {
  let retries = 3; // Maximum number of retries

  while (retries > 0) {
    try {
      const escapedMessage = inputText.replace(/"/g, ""); // Escape double quotes
      const text = `SELECT usage FROM ${medicineModelName} WHERE medicine="${escapedMessage}"`; // use escaped message
      const medicineResponse = await MindsDB.SQL.runQuery(text);
      if (!medicineResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return medicineResponse.rows[0].usage;
    } catch (error) {
      logger.error("Error extracting medicine details:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function analyzeSymptoms(inputText) {
  let retries = 3; // Maximum number of retries

  while (retries > 0) {
    try {
      const escapedMessage = inputText.replace(/"/g, ""); // Escape double quotes
      const text = `SELECT symptoms FROM ${symptomModelName} WHERE disease="${escapedMessage}"`; // use escaped message
      const symptomResponse = await MindsDB.SQL.runQuery(text);
      if (!symptomResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return symptomResponse.rows[0].symptoms;
    } catch (error) {
      logger.error("Error extracting disease symptoms:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function analyzePrecautions(inputText) {
  let retries = 3; // Maximum number of retries

  while (retries > 0) {
    try {
      const escapedMessage = inputText.replace(/"/g, ""); // Escape double quotes
      const text = `SELECT precautions FROM ${precautionModelName} WHERE disease="${escapedMessage}"`; // use escaped message
      const precautionResponse = await MindsDB.SQL.runQuery(text);
      if (!precautionResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return precautionResponse.rows[0].precautions;
    } catch (error) {
      logger.error("Error extracting disease precautions:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function analyzeNutrients(inputText) {
  let retries = 3; // Maximum number of retries

  while (retries > 0) {
    try {
      const escapedMessage = inputText.replace(/"/g, ""); // Escape double quotes
      const text = `SELECT nutrients FROM ${nutrientModelName} WHERE food="${escapedMessage}"`; // use escaped message
      const nutrientResponse = await MindsDB.SQL.runQuery(text);
      if (!nutrientResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return nutrientResponse.rows[0].nutrients;
    } catch (error) {
      logger.error("Error extracting food nutrients:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function extarctExercise(inputText) {
  let retries = 3; // Maximum number of retries

  while (retries > 0) {
    try {
      const escapedMessage = inputText.replace(/"/g, ""); // Escape double quotes
      const text = `SELECT activity FROM ${exerciseModelName} WHERE exercise="${escapedMessage}"`; // use escaped message
      const exerciseResponse = await MindsDB.SQL.runQuery(text);
      if (!exerciseResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return exerciseResponse.rows[0].activity;
    } catch (error) {
      logger.error("Error extracting exercise details:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

async function extarctYoga(inputText) {
  let retries = 3; // Maximum number of retries

  while (retries > 0) {
    try {
      const escapedMessage = inputText.replace(/"/g, ""); // Escape double quotes
      const text = `SELECT activity FROM ${yogaModelName} WHERE yoga="${escapedMessage}"`; // use escaped message
      const yogaResponse = await MindsDB.SQL.runQuery(text);
      if (!yogaResponse.rows) {
        throw new Error("Invalid response from MindsDB");
      }
      return yogaResponse.rows[0].activity;
    } catch (error) {
      logger.error("Error extracting Yoga details:", error);
      retries--;
      if (retries === 0) {
        throw new Error("Maximum number of retries reached");
      }
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
    }
  }
}

module.exports = {
  connectToMindsDB,
  analyzeMedicine,
  analyzeSymptoms,
  analyzePrecautions,
  analyzeNutrients,
  extarctExercise,
  extarctYoga,
};
