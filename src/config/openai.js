const { Configuration, OpenAIApi } = require("openai");
const { OPENAI_API_KEY, OPENAI_ORGANIZATION_ID } = require("./config.js");

const configuration = new Configuration({
  organization: OPENAI_ORGANIZATION_ID,
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

module.exports = openai;
