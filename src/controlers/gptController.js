const generateImage = require("../handlers/gptHandler");

const gptController = async () => {
  return {
    image: await generateImage,
  };
};

module.exports = gptController;
