const { analyzeImage } = require("../services/imageService");
const { getNutritionInfoFatSecret } = require("../services/nutritionService");
const fs = require("fs");

exports.analyzeImageController = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const imagePath = req.file.path;
  const predictedClass = await analyzeImage(imagePath);
  fs.unlinkSync(imagePath);

  if (!predictedClass) {
    return res.status(500).json({ error: "Error analyzing image" });
  }

  res.json({ predicted_class: predictedClass });
};

exports.predictNutritionController = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const imagePath = req.file.path;
  const predictedClass = await analyzeImage(imagePath);
  fs.unlinkSync(imagePath);

  if (!predictedClass) {
    return res.status(500).json({ error: "Error analyzing image" });
  }

  const nutritionInfo = await getNutritionInfoFatSecret(predictedClass);
  res.json({ predicted_class: predictedClass, nutrition_info: nutritionInfo });
};
