const openai = require("../config/openai");

const generateImage = async (prompt) => {
  try {
    if (!prompt) {
      throw new Error("You must provide a message");
    }

    const response = await openai.createImage({
      prompt,
    });

    const trimmedResponse = response.data;

    return trimmedResponse;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  generateImage,
};
