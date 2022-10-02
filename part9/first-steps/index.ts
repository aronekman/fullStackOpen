import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!height || !weight || isNaN(height) || isNaN(height)) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }
  const bmi: string = calculateBmi(height, weight);
  res.json({
    weight,
    height,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).json({
      error: 'parameters missing'
    });
    return;
  }

  if (
    isNaN(Number(target)) ||
    !Array.isArray(daily_exercises) ||
    daily_exercises.some(x => isNaN(Number(x)))
  ) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }

  console.log(daily_exercises);
  res.json(
    calculateExercises(
      daily_exercises.map(x => Number(x)),
      Number(target)
    )
  );
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
