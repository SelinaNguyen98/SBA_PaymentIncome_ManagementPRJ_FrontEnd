import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";

const CustomInput = ({ value, onClick, onChange }) => {
  const [tmpStringValue, setTmpStringValue] = useState(value.toString());

  useEffect(() => {
    setTmpStringValue(value.toString());
  }, [value]);

  const handletOnchangeITmpStringValue = (event) => {
    setTmpStringValue(event.target.value);
  };

  const handleBlurTmpValue = () => {
    // Split the string into month and year
    const [month, year] = tmpStringValue.split("/").map(Number);

    // Check if the values are valid
    if (month >= 1 && month <= 12 && !isNaN(year)) {
      // Create a new Date object (month is 0-based in JavaScript)
      const parsedDate = new Date(year, month - 1, 1);
      console.log(parsedDate);

      if (!isNaN(parsedDate.getTime())) {
        // Format the date as "MM-yyyy"
        const formattedDate = parsedDate.toLocaleDateString("en-US", {
          month: "2-digit",
          year: "numeric",
        });

        // Update the state and call onChange
        setTmpStringValue(formattedDate);
        onChange(parsedDate);
      } else {
        handleInvalidDate();
      }
    } else {
      handleInvalidDate();
    }
  };

  const handleInvalidDate = () => {
    // Handle the case where the entered date is invalid
    // For example, you can set a default date or show an error message
    const today = new Date();
    setTmpStringValue(
      today.toLocaleDateString("en-US", { month: "2-digit", year: "numeric" })
    );
    console.log(today);
    onChange(today);
  };

  return (
    <div
      className={`flex rounded-lg text-center justify-center items-center font-medium border-black border-2 px-2 py-1 cursor-pointer`}
    >
      <input
        type="text"
        value={tmpStringValue}
        className=" text-center w-full focus:outline-none"
        //   onClick={onClick}
        onChange={handletOnchangeITmpStringValue}
        //   onChange={onChange} // handle manual input
        onBlur={handleBlurTmpValue} // handle manual input
      />

      <svg
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
        />
      </svg>
    </div>
  );
};

export default function MonthYearPicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  //   const [inputValue, setInputValue] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // setInputValue(selectedDate.toDateString("MM-yyyy"))

    // const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-based
    // const year = selectedDate.getFullYear();

    // const formattedDate = `${month}-${year}`;
    // console.log(formattedDate);
    // setInputValue(formattedDate);
  };

  //   const handleInputChange = (event) => {
  //     setInputValue(event.target.value);
  //   };

  //   const handleBlur = () => {
  //     // Update DatePicker state based on the manually entered value
  //     const parsedDate = new Date(inputValue);
  //     if (!isNaN(parsedDate.getTime())) {
  //       setSelectedDate(parsedDate);
  //     }
  //   };

  return (
    <>
      <ReactDatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MM/yyyy"
        showMonthYearPicker
        customInput={
          <CustomInput
            // value={inputValue}
            onChange={handleDateChange}
            // onBlur={handleBlur}
          />
        }
      />
      <div>selectedDate :{selectedDate.toDateString()}</div>
      {/* <div>inputValue :{inputValue}</div> */}
    </>
  );
}

// import React, { useState } from "react";
// import ReactDatePicker from "react-datepicker";

// const CustomInput = ({ value, onClick, onChange, onBlur }) => (
//   <div
//     className={`flex rounded-lg text-center justify-center items-center font-medium border-black border-2 px-2 py-1 cursor-pointer`}
//   >
//     <svg
//       onClick={onClick}
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       strokeWidth="1.5"
//       stroke="currentColor"
//       className="w-6 h-6"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
//       />
//     </svg>
//     <input
//       type="text"
//       value={value}
//       className=" text-center w-full focus:outline-none"
//       onClick={onClick}
//       // onChange={(event) => handleInputChange(event)}
//       onChange={onChange} // handle manual input
//       onBlur={onBlur} // handle manual input
//     />
//   </div>
// );

// export default function MonthYearPicker() {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [inputValue, setInputValue] = useState("");

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     // setInputValue(selectedDate.toDateString("MM-yyyy"))

//     // const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because months are zero-based
//     // const year = selectedDate.getFullYear();

//     // const formattedDate = `${month}-${year}`;
//     // console.log(formattedDate);
//     // setInputValue(formattedDate);
//   };

//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleBlur = () => {
//     // Update DatePicker state based on the manually entered value
//     const parsedDate = new Date(inputValue);
//     if (!isNaN(parsedDate.getTime())) {
//       setSelectedDate(parsedDate);
//     }
//   };

//   return (
//     <>
//       <ReactDatePicker
//         selected={selectedDate}
//         onChange={handleDateChange}
//         dateFormat="MM-yyyy"
//         showMonthYearPicker
//         customInput={
//           <CustomInput
//             value={inputValue}
//             onChange={handleInputChange}
//             onBlur={handleBlur}
//           />
//         }
//       />
//       <div>selectedDate :{selectedDate.toDateString()}</div>
//       <div>inputValue :{inputValue}</div>
//     </>
//   );
// }
