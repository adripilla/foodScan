const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });
const {
  analyzeImageController,
  predictNutritionController,
} = require("../controllers/scanController");

router.post("/analyze_image", upload.single("file"), analyzeImageController);
router.post("/predict_nutrition", upload.single("file"), predictNutritionController);

module.exports = router;
