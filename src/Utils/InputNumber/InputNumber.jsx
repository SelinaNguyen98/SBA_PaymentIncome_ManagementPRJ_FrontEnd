import React from "react";
import { formatNumberSeparator } from "../utils/maths";

export default function InputNumber({ number, setNumber, className }) {
  const handleInputChange = (e) => {
    // // Loại bỏ các ký tự không phải số khỏi giá trị nhập vào
    // const numericValue = e.target.value.replace(/[^0-9]/g, "");
    // // Định dạng giá trị nhập vào với dấu chấm làm phân tách hàng nghìn khi người dùng nhập số
    // // if (/^\d+$/.test(numericValue)) {

    // // }
    // const formattedValue = numericValue.replace(/(\d)(?=(\d{3})+$)/g, "$1.");
    // setNumber(formattedValue);

    setNumber(formatNumberSeparator(e.target.value));
  };

  return (
    <input
      value={number}
      onChange={handleInputChange}
      onBlur={handleInputChange}
      className={
        className
          ? className
          : "bg-white mx-2 min-w-[150px] shadow-sm rounded-md px-1"
      }
    />
  );
}
