export const formatStringMonthYearToDate = (sMonth, sYear) => {
  // Make sure sMonth and sYear are valid numbers
  const month = parseInt(sMonth, 10);
  const year = parseInt(sYear, 10);

  // Check if the values are valid
  if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
    throw new Error("Invalid month or year values");
  }

  // Create a new Date object using the provided values
  const formattedDate = new Date(year, month - 1);

  return formattedDate;
};


export const checkRegexMonthDatePattern = (input) => {
  const regexPattern = /^(0[1-9]|1[0-2])\/\d{4}$/;
  return regexPattern.test(input);
};
