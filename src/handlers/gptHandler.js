const openai = require("../config/openai");

const generateImage = async (req, res) => {
  try {
    const { message } = req.body;

    const prompt = message;

    const response = await openai.createImage({
      prompt,
    });

    const trimmedResponse = response.data

    res.status(200).json({ success: true, response: trimmedResponse });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = generateImage;
