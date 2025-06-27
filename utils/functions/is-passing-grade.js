export const isPassingGrade = (grade = 0, threshold = 50) => {
  return +grade >= +threshold;
};
