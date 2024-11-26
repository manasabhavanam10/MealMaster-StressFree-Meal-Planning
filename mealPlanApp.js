const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config()


const generateMealPlan = async (req, res) => {
    try {
        const { diet, calories, allergens, ingredients } = req.body;
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        //const prompt = `Generate a ${diet} meal plan with ${calories} calories for single meal.`;
        const prompt = `Generate a detailed meal recipe based on the following criteria:

                        Meal Type: ${diet}
                        Calories: ${calories}
                        Ingredients (optional): ${ingredients}
                        Allergies (optional): ${allergens}
                        The recipe should:

                        Use only the specified ingredients, or suggest ingredients if none are provided.
                        Avoid any ingredients that contain Allergies ${allergens} .
                        Include step-by-step cooking instructions in bullet format.
                        Provide a short description of the dish and approximate prep and cook times.
                        Optionally suggest substitutions for allergens (if applicable).`
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        const response = result.response.text()
        res.json(response)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = { generateMealPlan }