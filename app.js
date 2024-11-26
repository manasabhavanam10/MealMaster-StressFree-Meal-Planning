const express = require('express');
const { generateMealPlan } = require('./mealPlanApp');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/generate-meal-plan', generateMealPlan);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});