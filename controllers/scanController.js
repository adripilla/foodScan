const { isExistingFood } = require("../services/food");
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

  console.log("Predicted class:", predictedClass);
  
  const exist = await isExistingFood(predictedClass);

    if(exist) {
    console.log("Ya existe en bd");
      
        return res.json({message : "ya existe en bd"});// status(400).json({ error: "Food already exists" }); 
    }
    else{
    console.log("no existe en bd");
    
    const nutritionInfo = await getNutritionInfoFatSecret(predictedClass);
    return res.json({ predicted_class: predictedClass, nutrition_info: nutritionInfo });
    }
};
