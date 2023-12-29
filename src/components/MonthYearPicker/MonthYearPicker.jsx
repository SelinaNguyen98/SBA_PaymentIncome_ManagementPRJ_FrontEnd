import { useState } from "react";
import ReactDatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomCelendarIcon({ onClick }) {
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
}

function CustomCalendarContainer({ className }) {
  return <CalendarContainer className={className}></CalendarContainer>;
}

export default function MonthYearPicker({ className }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div
      className={`flex items-center px-2 rounded-full border-2 border-black ${className}`}
    >
      <ReactDatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        customInput={<CustomCelendarIcon />}
        showMonthYearPicker
        showPopperArrow={false}
      />
      <div className="flex-1 text-center">
        <ReactDatePicker
          className=" text-center focus:outline-none font-medium w-full h-full"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MM-yyyy"
          showPopperArrow={false}
          calendarContainer={CustomCalendarContainer}
        />
      </div>
    </div>
  );
}
