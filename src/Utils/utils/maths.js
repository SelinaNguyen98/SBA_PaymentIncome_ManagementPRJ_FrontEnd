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

/**
 * Change Number Interger to String with Sparator by ,
 * input: interger || 0
 * output: string with demical Sparator by ,
 * @param {*} input
 * @returns
 */
export const formatNumberSeparator = (input) => {
  // Loại bỏ các ký tự không phải số khỏi giá trị nhập vào
  let numericValue = input.replace(/[^0-9]/g, "");

  // loai bo trong hop bat dau bang 0 && null  && ''
  numericValue =
    numericValue == "0" || numericValue == "" || numericValue == null
      ? "0"
      : numericValue.replace(/^0+/, "");
  // Định dạng giá trị nhập vào với dấu chấm làm phân tách hàng nghìn
  return numericValue.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
};

/**
 * Format string number with Sparator to interger
 * remove character ,
 * @param {*} input
 * @returns
 */
export const formatNumberHasDot = (input) => {
  // Loại bỏ các ký tự không phải số khỏi giá trị nhập vào
  // eslint-disable-next-line no-useless-escape
  return Number(input.replace(/\,/g, ""));
};

/**
 * // Format Float to String with Separator ,
 * input: float
 * return: float string toFixed 2
 * @param {*} input
 * @returns
 */
export const formatFloatToCustomString = (input) => {
  input = parseFloat(input);
  return input === 0 || input === null
    ? 0
    : input.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
};

/**
 *  input: string number 0-9 || . || ,
 *  return: string number with "decimal separator" and "thousands separator."
 * // 1. Loai bo real and interger by ,
 * // 2. separator interger by .
 * // 3. get real with 2
 * // 4. join
 * @param {*} input
 * @returns
 */
export const formatInputToFloatStringSeparator = (inputValue) => {
  // chuyen ve dang string float separator .
  let step1 = inputValue.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
  // phan chia real && int
  let step2 = step1.toString().split(".");
  let intPart = formatNumberSeparator(step2[0]);
  step2[0] = intPart;
  let step3 = step2.join(".");
  let dotIndex = step3.indexOf(".");
  return dotIndex !== -1 ? step3.substring(0, dotIndex + 3) : step3;
};