import { useEffect, useState } from "react";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoMdArrowDropleftCircle, IoMdArrowDroprightCircle } from "react-icons/io";
import Button from "../Button";

import {
  checkRegexMonthDatePattern,
  formatStringMonthYearToDate,
} from "../../Utils/utils/maths";

export default function MonthYearPicker({
  // eslint-disable-next-line react/prop-types
  className,
  // eslint-disable-next-line react/prop-types
  selectedDate,
  // eslint-disable-next-line react/prop-types
  setSelectedDate,
   // eslint-disable-next-line react/prop-types
  showInputDataButton = false, 
  // eslint-disable-next-line react/prop-types
  t,
  // eslint-disable-next-line react/prop-types
  inputDataButtonClick = () => {},
}) {
  const [tmp, setTmp] = useState("");
  // eslint-disable-next-line no-unused-vars
  const t_translate =t;
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    const valueString = selectedDate.toLocaleDateString("en-US", {
      month: "2-digit",
      year: "numeric",
    });
    setTmp(valueString);
  }, [selectedDate]);

  const handleIncrementMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedDate(newDate);
  };

  const handleDecrementMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedDate(newDate);
  };

  const handleBlur = () => {
    const dateString = tmp;
    const isValidInput = checkRegexMonthDatePattern(dateString);

    if (isValidInput) {
      const [sMonth, sYear] = dateString.split("/");
      const date = formatStringMonthYearToDate(sMonth, sYear);
      setSelectedDate(date);
    } else {
      // eslint-disable-next-line react/prop-types
      const valueString = selectedDate.toLocaleDateString("en-US", {
        month: "2-digit",
        year: "numeric",
      });
      setTmp(valueString);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleBlur();
      // Your logic for Enter key press event
    }
  };

  return (
    <div className={`flex flex-1 items-center px-2  border border-gray-500 rounded-full focus:border-black focus:outline ${className}`}>
      <div onClick={handleDecrementMonth}><IoMdArrowDropleftCircle className="text-xl max-[1600px]:text-[15px] hover:text-2xl cursor-pointer transition-transform transform-gpu hover:scale-110"/></div>

      <div
        className={`flex flex-1 items-center px-2 rounded-full focus:border-2 focus:border-black focus:outline `}
      >
        <ReactDatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          customInput={<CustomCelendarsIcon />}
          showMonthYearPicker
          showPopperArrow={false}
        />
        {/* <div className="flex-1 text-center"> */}
        {/* <ReactDatePicker
            className=" text-center focus:outline-none font-medium w-full h-full"
            selected={tmp}
            // onChange={setTmp}

            dateFormat="MM-yyyy"
            showPopperArrow={false}
            calendarContainer={CustomCalendarContainer}
          /> */}
        <input
          className=" flex-1 text-center  focus:outline-none font-medium w-full h-full max-[1600px]:text-[10px]"
          value={tmp}
          onChange={(event) => {
            const value = event.target.value;
            setTmp(value);
          }}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
        ></input>
      </div>
      {/* </div> */}
      <div onClick={handleIncrementMonth}><IoMdArrowDroprightCircle className="text-xl max-[1600px]:text-[15px] hover:text-2xl cursor-pointer transition-transform transform-gpu hover:scale-110"/></div>
      {showInputDataButton && (
        <Button
          className="ml-4 col-span-12 lg:col-span-1 flex-shrink-0 px-1 my-1"
          onClick={inputDataButtonClick}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
        >
          <span className="max-[1600px]:text-[10px]">{t("button.input_monthly_data")}</span>
        </Button>)}
    </div>
  );
}

// eslint-disable-next-line react/prop-types
const CustomCelendarsIcon = ({ onClick }) => {
  return (
    <div
      className={`flex text-center justify-center items-center  py-1 cursor-pointer`}
    >
      <svg
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-7 h-7"
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

// eslint-disable-next-line react/prop-types, no-unused-vars
function CustomCalendarContainer({ className }) {
  return <CalendarContainer className={className}></CalendarContainer>;
}
