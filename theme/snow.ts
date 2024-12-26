export const isSnowThemeOn = () => {
  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();

  const minDate = new Date(currentYear, 11, 15);
  const maxDate = new Date(currentYear + 1, 1, 20);

  return currentDate >= minDate && currentDate <= maxDate;
};
