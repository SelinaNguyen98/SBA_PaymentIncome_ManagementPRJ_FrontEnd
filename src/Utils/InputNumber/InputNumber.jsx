// eslint-disable-next-line no-unused-vars
import React from "react";
import {
  // eslint-disable-next-line no-unused-vars
  formatFloatToCustomString,
  formatInputToFloatStringSeparator,
  // eslint-disable-next-line no-unused-vars
  formatNumberSeparator,
} from "../utils/maths";

// eslint-disable-next-line react/prop-types
export default function InputNumber({ number, setNumber, className, ...ref }) {
  const handleInputChange = (e) => {
    // // Loại bỏ các ký tự không phải số khỏi giá trị nhập vào
    // const numericValue = e.target.value.replace(/[^0-9]/g, "");
    // // Định dạng giá trị nhập vào với dấu chấm làm phân tách hàng nghìn khi người dùng nhập số
    // // if (/^\d+$/.test(numericValue)) {

    // // }
    // const formattedValue = numericValue.replace(/(\d)(?=(\d{3})+$)/g, "$1.");
    // setNumber(formattedValue);

    setNumber(formatInputToFloatStringSeparator(e.target.value));
    // setNumber(e.target.value);
  };

  return (
    <input
      value={number}
      // type="number"
      onChange={handleInputChange}
      // onInput={handleInputChange}
      {...ref}
      className={
        className
          ? className
          : "bg-white mx-2 min-w-[150px] shadow-sm rounded-md px-1"
      }
    />

    
  );
}