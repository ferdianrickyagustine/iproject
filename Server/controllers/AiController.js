const { GoogleGenerativeAI } = require("@google/generative-ai");

class AiController {
  static async chatbot(req, res, next) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const { message } = req.body;
      const prompt = `
  You are a pet recommendation assistant. Only answer questions about recommending pets for family situations or environmental conditions. 
  If the user's input is unrelated to pets, reply with "Sorry, I don't understand." 
  Here's the user's query:
  ${message}
`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      res.status(200).json({
        text,
      });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
}

module.exports = AiController;
