const gptService = require("../services/gptService");

const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await gptService.generateImage(prompt);

    res.status(200).json({ success: true, response });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { generateImage };
