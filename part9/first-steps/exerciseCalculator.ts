interface calculationResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const getRating = (average: number, target: number): number => {
  return Math.min(Math.max(Math.floor((average * 3) / target), 1), 3);
};

const getDescription = (rating: number): string => {
  if (rating > 2) return 'very good';
  if (rating > 1) return 'not too bad but could be better';
  return 'very bad';
};

const calculateExercises = (
  dailyExerciseHours: number[],
  targetAmount: number
): calculationResult => {
  const average =
    dailyExerciseHours.reduce((a, b) => a + b, 0) / dailyExerciseHours.length;
  const rating = getRating(average, targetAmount);
  const ratingDescription = getDescription(rating);
  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.filter(x => x > 0).length,
    success: average >= targetAmount,
    rating,
    ratingDescription,
    target: targetAmount,
    average
  };
};

interface bmiCalculatorParams {
  hours: number[];
  target: number;
}

const parseExerciseCalculatorArguments = (
  args: string[]
): bmiCalculatorParams => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (isNaN(Number(args[2])))
    throw new Error('Provided target was not a number!');
  const hours: number[] = [];
  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i])))
      throw new Error('Provided hours were not numbers!');
    hours.push(Number(args[i]));
  }
  return {
    hours,
    target: Number(args[2])
  };
};

try {
  const { hours, target } = parseExerciseCalculatorArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
