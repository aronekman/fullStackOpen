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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
