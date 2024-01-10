/* eslint-disable no-unused-vars */
import { React, useContext, useEffect, useState } from "react";
import Button from "../../../Utils/Button";
import "../../../Utils/style.css";
import YearPicker_Button from "../../../Utils/YearPicker/YearPicker_Button";
import "../../Invoice_Management/InvoiceDetails/styles.css";
import { AppContext } from "../../../Utils/contexts/app.context";
import { useTranslation } from "react-i18next";
import { PiTranslateFill } from "react-icons/pi";
import { locales } from "../../../Utils/i18n/i18n";
import "../../../Utils/style.css";
import Popover from "../../../Utils/Popover";
import classNames from "classnames";
const PL_Report = () => {
  const { isShowAsideFilter } = useContext(AppContext);
  // Chuyển đổi ngôn ngữ
  const { i18n, t } = useTranslation();
  const currentLanguage = locales[i18n.language];
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const { toggleAsideFilter } = useContext(AppContext);

  const [selectedYear, setSelectedYear] = useState(new Date());
  useEffect(() => {
    console.log(selectedYear);
  }, [selectedYear]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  const [selectedYearExport, setSelectedYearExport] = useState(new Date());
  useEffect(() => {
    console.log(selectedYearExport);
  }, [selectedYearExport]);

  // eslint-disable-next-line no-unused-vars
  const [dataBS, setDataBS] = useState([
    {
      No: 1,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      "04/2023": 100,
      "05/2023": 100,
      "06/2023": 100,
      "07/2023": 100,
      "08/2023": 100,
      "09/2023": 100,
      "10/2023": 100,
      "11/2023": 100,
      "12/2023": 100,
      "01/2024": 100,
      "02/2024": 100,
      "03/2024": 100,
      Total: 1200,
    },
    {
      No: 2,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      "04/2023": 100,
      "05/2023": 100,
      "06/2023": 100,
      "07/2023": 100,
      "08/2023": 100,
      "09/2023": 100,
      "10/2023": 100,
      "11/2023": 100,
      "12/2023": 100,
      "01/2024": 100,
      "02/2024": 100,
      "03/2024": 100,
      Total: 1200,
    },
    {
      No: 3,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      "04/2023": 100,
      "05/2023": 100,
      "06/2023": 100,
      "07/2023": 100,
      "08/2023": 100,
      "09/2023": 100,
      "10/2023": 100,
      "11/2023": 100,
      "12/2023": 100,
      "01/2024": 100,
      "02/2024": 100,
      "03/2024": 100,
      Total: 1200,
    },
    {
      No: 4,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      "04/2023": 100,
      "05/2023": 100,
      "06/2023": 100,
      "07/2023": 100,
      "08/2023": 100,
      "09/2023": 100,
      "10/2023": 100,
      "11/2023": 100,
      "12/2023": 100,
      "01/2024": 100,
      "02/2024": 100,
      "03/2024": 100,
      Total: 1200,
    },
    {
      No: 5,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      "04/2023": 100,
      "05/2023": 100,
      "06/2023": 100,
      "07/2023": 100,
      "08/2023": 100,
      "09/2023": 100,
      "10/2023": 100,
      "11/2023": 100,
      "12/2023": 100,
      "01/2024": 100,
      "02/2024": 100,
      "03/2024": 100,
      Total: 1200,
    },
    {
      No: 6,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      "04/2023": 100,
      "05/2023": 100,
      "06/2023": 100,
      "07/2023": 100,
      "08/2023": 100,
      "09/2023": 100,
      "10/2023": 100,
      "11/2023": 100,
      "12/2023": 100,
      "01/2024": 100,
      "02/2024": 100,
      "03/2024": 100,
      Total: 1200,
    },
    {
      No: 7,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      "04/2023": 100,
      "05/2023": 100,
      "06/2023": 100,
      "07/2023": 100,
      "08/2023": 100,
      "09/2023": 100,
      "10/2023": 100,
      "11/2023": 100,
      "12/2023": 100,
      "01/2024": 100,
      "02/2024": 100,
      "03/2024": 100,
      Total: 1200,
    },
    {
      No: 8,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      "04/2023": 100,
      "05/2023": 100,
      "06/2023": 100,
      "07/2023": 100,
      "08/2023": 100,
      "09/2023": 100,
      "10/2023": 100,
      "11/2023": 100,
      "12/2023": 100,
      "01/2024": 100,
      "02/2024": 100,
      "03/2024": 100,
      Total: 1200,
    },
    {
      No: 9,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      "04/2023": 100,
      "05/2023": 100,
      "06/2023": 100,
      "07/2023": 100,
      "08/2023": 100,
      "09/2023": 100,
      "10/2023": 100,
      "11/2023": 100,
      "12/2023": 100,
      "01/2024": 100,
      "02/2024": 100,
      "03/2024": 100,
      Total: 1200,
    },
    {
      No: 10,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      "04/2023": 100,
      "05/2023": 100,
      "06/2023": 100,
      "07/2023": 100,
      "08/2023": 100,
      "09/2023": 100,
      "10/2023": 100,
      "11/2023": 100,
      "12/2023": 100,
      "01/2024": 100,
      "02/2024": 100,
      "03/2024": 100,
      Total: 1200,
    },
    {
      No: 11,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      "04/2023": 100,
      "05/2023": 100,
      "06/2023": 100,
      "07/2023": 100,
      "08/2023": 100,
      "09/2023": 100,
      "10/2023": 100,
      "11/2023": 100,
      "12/2023": 100,
      "01/2024": 100,
      "02/2024": 100,
      "03/2024": 100,
      Total: 1200,
    },
    {
      No: 12,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      "04/2023": 100,
      "05/2023": 100,
      "06/2023": 100,
      "07/2023": 100,
      "08/2023": 100,
      "09/2023": 100,
      "10/2023": 100,
      "11/2023": 100,
      "12/2023": 100,
      "01/2024": 100,
      "02/2024": 100,
      "03/2024": 100,
      Total: 1200,
    },
  ]);
  return (
    <div className="grid grid-cols-12 bg-main-theme h-full">
      {isShowAsideFilter && (
        <div className="col-span-2  bg-[#111c3e] p-3">
          <button>Toggle modal</button>
        </div>
      )}
      <div
        id="contentInvoiceDetail"
        className={` relative bg-main-theme pb-5 ${
          isShowAsideFilter ? "col-span-10" : "col-span-full"
        }`}
      >
        <div className="flex flex-row gap-4 items-center mt-2 px-5 py-2 bg-main-theme">
          <div className="col-span-12 lg:col-span-1 lg:justify-center justify-start flex items-center px-1">
            {/* TO DO icon swich sidebar */}
            <svg
              onClick={toggleAsideFilter}
              className="w-9 h-9 cursor-pointer flex-shrink-0"
              viewBox="0 0 49 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="45" height="8" rx="4" fill="black" />
              <rect y="14" width="49" height="9" rx="4.5" fill="black" />
              <rect y="29" width="34" height="8" rx="4" fill="black" />
            </svg>

            <Popover
              className="flex items-center cursor-pointer ml-2 "
              renderPopover={
                <div className=" bg-yellow rounded-[12px]">
                  <div className="flex flex-col items-center justify-center px-4 py-2  ">
                    <button
                      className="flex items-center py-2 px-3 rounded-[16px] text-left font-bold text-sm uppercase bg-white w-[106px] justify-between"
                      onClick={() => changeLanguage("en")}
                    >
                      <span>English</span>
                      <span
                        className={`ml-2 ${
                          currentLanguage === "en" ? "" : "hidden"
                        }`}
                      >
                        <svg
                          viewBox="0 0 19 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                        >
                          <path
                            d="M2 8.6L6.28571 13L17 2"
                            stroke="#3CA745"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    <button
                      className="flex items-center py-2 px-3 mt-2 rounded-[16px] text-left font-bold text-sm uppercase bg-white w-full justify-between"
                      onClick={() => changeLanguage("jp")}
                    >
                      <span className=""> 日本語</span>
                      <span
                        className={`ml-2 ${
                          currentLanguage === "jp" ? "" : "hidden"
                        }`}
                      >
                        <svg
                          viewBox="0 0 19 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                        >
                          <path
                            d="M2 8.6L6.28571 13L17 2"
                            stroke="#3CA745"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              }
            >
              <PiTranslateFill
                className="w-10 h-10 cursor-pointer flex-shrink-0"
                // onClick={handleLanguageSwitch}
              />
            </Popover>
          </div>
        </div>
        <div className="">
          <div className="h-screen">
            <div
              id="contentInvoiceDetail"
              className={` relative bg-main-theme pb-5 h-full ${
                isShowAsideFilter ? "col-span-10" : "col-span-full"
              }`}
            >
              {/* Lable */}
              <div className="mt-2 px-6 flex flex-shrink-0 items-center ">
                <svg
                  viewBox="0 0 34 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mr-2"
                >
                  <path
                    d="M32.006 0.00320557C28.7713 0.186782 22.342 0.854977 18.373 3.28456C18.0991 3.4522 17.9439 3.75029 17.9439 4.06196V25.5404C17.9439 26.2222 18.6894 26.6531 19.318 26.3367C23.4016 24.2813 29.3073 23.7206 32.2274 23.5671C33.2244 23.5146 33.9994 22.7153 33.9994 21.7573V1.81536C34 0.769977 33.0933 -0.0581833 32.006 0.00320557ZM15.6264 3.28456C11.658 0.854977 5.22868 0.187372 1.99396 0.00320557C0.906667 -0.0581833 0 0.769977 0 1.81536V21.7579C0 22.7165 0.775035 23.5157 1.77201 23.5677C4.6933 23.7212 10.602 24.2825 14.6855 26.339C15.3124 26.6548 16.0556 26.2245 16.0556 25.5445V4.05133C16.0556 3.73907 15.9009 3.45279 15.6264 3.28456Z"
                    fill="black"
                  />
                </svg>
                <span className="font-bold text-xl">
                  {" "}
                  {t("title.PL_report")}
                </span>
              </div>
              {/* control area */}
              <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4  bg-white rounded-[16px] ">
                <div className="grid  gap-2 items-center w-full ">
                  <div className="flex items-center justify-between gap-2 flex-row max-[1400px]:flex-col">
                    <div className="mt-1 px-6 flex flex-row items-centers">
                      <div className="gap-2 items-center flex flex-row max-[300px]:flex-col">
                        <YearPicker_Button
                          selectedYear={selectedYearExport}
                          setSelectedYear={setSelectedYearExport}
                          className="col-span-12 lg:col-span-2 max-[1000px]:w-full max-w-36 max-[1600px]:max-w-32"
                        />
                        <Button
                          className="ml-4 col-span-12 lg:col-span-1 flex-shrink-0 px-1 my-1 gap-2"
                          onClick={() => {}}
                          data-modal-target="crud-modal"
                          data-modal-toggle="crud-modal"
                        >
                          <img
                            className="max-[1600px]:max-w-30 max-[1600px]:max-h-30"
                            width="40"
                            height="40"
                            src="https://img.icons8.com/bubbles/50/microsoft-excel-2019.png"
                            alt="microsoft-excel-2019"
                          />
                          <span className="max-[650px]:text-[10px]  max-[1600px]:text-[10px]">
                          {t("button.export")}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* table data */}
                <div className="max-h-[600px] max-w-[1600px] overflow-y-auto overflow-x-auto mt-4 text-sm">
                  <table id="invoiceTable" className="text-sm">
                    <thead>
                      <tr>
                        <th className="w-[1px]"></th>
                        <th className="w-[3px]">No</th>
                        <th className="w-[100px]">{t("header_table_PL_BS.name")}</th>
                        {Array.from({ length: 12 }).map((_, monthIndex) => {
                          const displayMonth = ((monthIndex + 3) % 12) + 1;
                          const displayYear =
                            selectedYearExport.getFullYear() +
                            Math.floor((monthIndex + 3) / 12);

                          return (
                            <th key={monthIndex} className="w-[10px]">
                              {`${displayMonth}/${displayYear}`}
                            </th>
                          );
                        })}

                        <th className="w-[10px]">{t("header_table_PL_BS.total")}</th>
                        <th className="w-[1px]"></th>
                      </tr>
                    </thead>
                    <tbody className="">
                      <tr className="">
                        <td colSpan={100}></td>
                      </tr>
                      {dataBS.map((rowData_BS, index) => (
                        <tr key={index}>
                          <td className="w-[1px]"></td>
                          <td className="w-[3px]" name="tb_no">
                            {rowData_BS.No}
                          </td>
                          <td
                            className="max-w-[100px] min-w-[10px] w-[100px] overflow-x-auto overflow-scroll"
                            name="tb_account_category"
                          >
                            {rowData_BS.Account_category_name}
                          </td>

                          <td className="w-[10px]" name="tb_04">
                            {rowData_BS["04/2023"]}
                          </td>
                          <td className="w-[10px]" name="tb_05">
                            {rowData_BS["05/2023"]}
                          </td>
                          <td className="w-[10px]" name="tb_06">
                            {rowData_BS["06/2023"]}
                          </td>
                          <td className="w-[10px]" name="tb_07">
                            {rowData_BS["07/2023"]}
                          </td>
                          <td className="w-[10px]" name="tb_08">
                            {rowData_BS["08/2023"]}
                          </td>
                          <td className="w-[10px]" name="tb_09">
                            {rowData_BS["09/2023"]}
                          </td>
                          <td className="w-[10px]" name="tb_10">
                            {rowData_BS["10/2023"]}
                          </td>
                          <td className="w-[10px]" name="tb_11">
                            {rowData_BS["11/2023"]}
                          </td>
                          <td className="w-[10px]" name="tb_12">
                            {rowData_BS["12/2023"]}
                          </td>
                          <td className="w-[10px]" name="tb_01_Next_Year">
                            {rowData_BS["01/2024"]}
                          </td>
                          <td className="w-[10px]" name="tb_02_Next_Year">
                            {rowData_BS["02/2024"]}
                          </td>
                          <td className="w-[10px]" name="tb_03_Next_Year">
                            {rowData_BS["03/2024"]}
                          </td>
                          <td className="w-[10px]" name="tb_total">
                            {rowData_BS.Total}
                          </td>
                          <td className="w-[1px]"></td>
                        </tr>
                      ))}

                      <tr className="bg-main-theme h-[0px] py-0 my-0">
                        <td colSpan={100}></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PL_Report;
