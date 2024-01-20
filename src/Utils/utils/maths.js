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

// chuyển kiểu số thành chuỗi có . phân cách
export const formatNumberSeparator = (input) => {
  // Loại bỏ các ký tự không phải số khỏi giá trị nhập vào
  let numericValue = input.replace(/[^0-9]/g, "");

  // loai bo trong hop bat dau bang 0 && null  && ''
  numericValue =
    numericValue == "0" || numericValue == "" ||  numericValue == null
      ? "0"
      : numericValue.replace(/^0+/, "");
  // Định dạng giá trị nhập vào với dấu chấm làm phân tách hàng nghìn
  return numericValue.replace(/(\d)(?=(\d{3})+$)/g, "$1.");
};

// chuyen chuỗi ký tự số có dấu . thành kiểu số nguyên
export const formatNumberHasDot = (input) => {
  // Loại bỏ các ký tự không phải số khỏi giá trị nhập vào
  return Number(input.replace(/\./g, ""));
};
