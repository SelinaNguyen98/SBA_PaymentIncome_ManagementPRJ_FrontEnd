/* eslint-disable no-unused-vars */
import { React, useContext, useEffect, useState } from "react";
import Button from "../../../Utils/Button";
import "../UI/index.css";
import MonthYearPicker from "../../../Utils/MonthYearPicker";
import YearPicker_Button from "../../../Utils/YearPicker/YearPicker_Button";
import { AppContext } from "../../../Utils/contexts/app.context";
import { useTranslation } from "react-i18next";
import Form_InputMonthlyData from "./Dialoag/Input_monthly_data";
import Form_InputBalanceYeatData from "./Dialoag/Input_balance_from_previous_year";
import * as API from "../API/index";
const BS_Report = () => {
  const { isShowAsideFilter } = useContext(AppContext);
  // Chuyển đổi ngôn ngữ
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(new Date());
  const { showToast } = useContext(AppContext);

  const [selectedYearExport, setSelectedYearExport] = useState(new Date());
  const [dataBS, setDataBS] = useState([
    {
      No: 1,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      2022: 100,
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
      Total: 1300,
    },
    {
      No: 2,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      2022: 100,
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
      Total: 1300,
    },
    {
      No: 3,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      2022: 100,
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
      Total: 1300,
    },
    {
      No: 4,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      2022: 100,
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
      Total: 1300,
    },
    {
      No: 5,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      2022: 100,
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
      Total: 1300,
    },
    {
      No: 6,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      2022: 100,
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
      Total: 1300,
    },
    {
      No: 7,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      2022: 100,
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
      Total: 1300,
    },
    {
      No: 8,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      2022: 100,
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
      Total: 1300,
    },
    {
      No: 9,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      2022: 100,
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
      Total: 1300,
    },
    {
      No: 10,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      2022: 100,
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
      Total: 1300,
    },
    {
      No: 11,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      2022: 100,
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
      Total: 1300,
    },
    {
      No: 12,
      Account_category_name: "John Doe",
      Company_Name: "John Doe",
      2022: 100,
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
      Total: 1300,
    },
  ]);
  // useEffect(() => {
  //   console.log(dataBS);
  // }, [dataBS]);
  // useEffect(() => {
  //   console.log(selectedYearExport);
  // }, [selectedYearExport]);

  // eslint-disable-next-line no-unused-vars

  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState({
    isShowForm_InputMonthlyData: false,
    isShowForm_InputBalanceFromPreviousYear: false,
  });
  // eslint-disable-next-line no-unused-vars
  const {
    isShowForm_InputMonthlyData,
    isShowForm_InputBalanceFromPreviousYear,
  } = state;
  const updateState = (data) => setState(() => ({ ...state, ...data }));
  const handleInputMonthlyDataButtonClick = () => {
    updateState({ isShowForm_InputMonthlyData: true });
  };

  const handleInputBalanceYearDataButtonClick = () => {
    // Custom logic for the input data button click
    updateState({ isShowForm_InputBalanceFromPreviousYear: true });
  };

  useEffect(() => {
    console.log(selectedYearExport)
    const controller = new AbortController();
    API.getAllTable(selectedYearExport.getFullYear(), setDataBS, controller);
    updateState({ isShowForm_InputMonthlyData: false, isShowForm_InputBalanceFromPreviousYear: false })
    return () => {
      controller.abort();
      setDataBS([]);
    };
  }, [selectedYearExport]);
  let idx = 1;

  function addComma(number) {
    if (!number) return number;
    number = number.toString().replaceAll(",", "");
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  // useEffect(() => {
  //   const controller = new AbortController();
  //   if (state.isShowForm_InputBalanceFromPreviousYear == false || state.isShowForm_InputMonthlyData == false) {
  //     API.getAllTable(selectedYearExport.getFullYear(), setDataBS, controller)
  //     return () => { controller.abort() }
  //   }
  // }, [state, selectedYearExport])
  return (
    <div className="grid grid-cols-12 bg-main-theme h-full">
      <div
        id="contentInvoiceDetail"
        className={` relative bg-main-theme pb-5
          col-span-full
        }`}
      >
        <div className="">
          <div className="h-screen">
            <div
              id="contentInvoiceDetail"
              className={` relative bg-main-theme pb-5 h-full ${isShowAsideFilter ? "col-span-10" : "col-span-full"
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
                  {t("title.BS_report")}
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
                          onClick={() => API.exportFile(selectedYearExport.getFullYear())}
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
                    <div className="flex flex-row gap-2 items-center justify-center max-[1200px]:flex-col">
                      <MonthYearPicker
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        className="col-span-12 lg:col-span-2 max-[1000px]:w-full max-w-sm max-[1600px]:max-w-[320px]"
                        showInputDataButton={true}
                        t={t}
                        inputDataButtonClick={handleInputMonthlyDataButtonClick}
                      />
                      <YearPicker_Button
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        className="col-span-12 lg:col-span-2 max-[1000px]:w-full max-w-[465px] max-[1600px]:max-w-[380px]"
                        showInputBalanceButton={true}
                        t={t}
                        inputDataButtonClick={
                          handleInputBalanceYearDataButtonClick
                        }
                      />
                    </div>
                  </div>
                </div>
                {/* table data */}
                <div className="max-h-[500px] max-[700px]:max-h-[450px] overflow-y-auto overflow-x-auto mt-4 text-sm w-full relative">
                  <table id="BSreport" className="text-sm">
                    <thead className="sticky top-0 bg-white z-4 w-full">
                      <tr>
                        <th className="w-[1px]"></th>
                        <th className="w-[2px]">No</th>
                        <th className="w-[100px]">
                          {t("header_table_PL_BS.name")}
                        </th>
                        <th className="w-[10px]">
                          {selectedYearExport.getFullYear() - 1}
                        </th>
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

                        <th className="w-[10px]">
                          {t("header_table_PL_BS.total")}
                        </th>
                        <th className="w-[1px]"></th>
                      </tr>
                      <tr className=" ">
                        <td
                          colSpan={100}
                          className=" h-2 bg-white border border-main-theme "
                        ></td>
                      </tr>
                    </thead>

                    <tbody className="">
                      {/*Warring: Second row is like padding-top */}
                      <tr>
                        <td
                          colSpan={100}
                          className=" h-2 bg-main-theme  rounded-t-[10px] border border-main-theme   "
                        ></td>
                      </tr>
                      {dataBS?.map((rowData_BS, index1) => (
                        <>
                          {rowData_BS?.categories?.map(
                            (rowData_Category, index2) => (
                              <tr key={idx}>
                                <td className="w-[1px]"></td>
                                <td className="w-[2px]" name="tb_no">
                                  {idx++}
                                </td>
                                <td
                                  className="max-w-[100px] min-w-[10px] w-[100px] overflow-x-auto overflow-scroll"
                                  name="tb_account_category"
                                >
                                  {rowData_Category.category_name}
                                </td>

                                <td className="w-[10px]" name="tb_pevious_year">
                                  {addComma(
                                    rowData_Category.data[
                                    selectedYearExport?.getFullYear() - 1
                                    ]
                                  )}
                                </td>
                                <td className="w-[10px]" name="tb_04">
                                  {addComma(
                                    rowData_Category.data[
                                    selectedYearExport?.getFullYear() + "-04"
                                    ]
                                  )}
                                </td>
                                <td className="w-[10px]" name="tb_05">
                                  {addComma(
                                    rowData_Category.data[
                                    selectedYearExport?.getFullYear() + "-05"
                                    ]
                                  )}
                                </td>
                                <td className="w-[10px]" name="tb_06">
                                  {addComma(
                                    rowData_Category.data[
                                    selectedYearExport?.getFullYear() + "-06"
                                    ]
                                  )}
                                </td>
                                <td className="w-[10px]" name="tb_07">
                                  {addComma(
                                    rowData_Category.data[
                                    selectedYearExport?.getFullYear() + "-07"
                                    ]
                                  )}
                                </td>
                                <td className="w-[10px]" name="tb_08">
                                  {addComma(
                                    rowData_Category.data[
                                    selectedYearExport?.getFullYear() + "-08"
                                    ]
                                  )}
                                </td>
                                <td className="w-[10px]" name="tb_09">
                                  {addComma(
                                    rowData_Category.data[
                                    selectedYearExport?.getFullYear() + "-09"
                                    ]
                                  )}
                                </td>
                                <td className="w-[10px]" name="tb_10">
                                  {addComma(
                                    rowData_Category.data[
                                    selectedYearExport?.getFullYear() + "-10"
                                    ]
                                  )}
                                </td>
                                <td className="w-[10px]" name="tb_11">
                                  {addComma(
                                    rowData_Category.data[
                                    selectedYearExport?.getFullYear() + "-11"
                                    ]
                                  )}
                                </td>
                                <td className="w-[10px]" name="tb_12">
                                  {addComma(
                                    rowData_Category.data[
                                    selectedYearExport?.getFullYear() + "-12"
                                    ]
                                  )}
                                </td>
                                <td className="w-[10px]" name="tb_01_Next_Year">
                                  {addComma(
                                    rowData_Category.data[
                                    selectedYearExport?.getFullYear() +
                                    1 +
                                    "-01"
                                    ]
                                  )}
                                </td>
                                <td className="w-[10px]" name="tb_02_Next_Year">
                                  {addComma(
                                    rowData_Category.data[
                                    selectedYearExport?.getFullYear() +
                                    1 +
                                    "-02"
                                    ]
                                  )}
                                </td>
                                <td className="w-[10px]" name="tb_03_Next_Year">
                                  {addComma(
                                    rowData_Category.data[
                                    selectedYearExport?.getFullYear() +
                                    1 +
                                    "-03"
                                    ]
                                  )}
                                </td>
                                <td className="w-[10px]" name="tb_total">
                                  {addComma(rowData_Category.data.total)}
                                </td>
                                <td className="w-[1px]"></td>
                              </tr>
                            )
                          )}
                          <tr key={idx} className="bg-slate-800">
                            <td className="w-[1px] td_group"></td>
                            <td className="w-[2px] td_group" name="tb_no">
                              {idx++}
                            </td>
                            <td
                              className="max-w-[1 td_group00px] min-w-[10px] w-[100px] overflow-x-auto overflow-scroll td_group"
                              name="tb_account_category"
                            >
                              {rowData_BS?.group_name}
                            </td>

                            <td
                              className="w-[10px] td_group"
                              name="tb_pevious_year"
                            >
                              {addComma(
                                rowData_BS.total_month?.[
                                selectedYearExport?.getFullYear() - 1
                                ]
                              )}
                            </td>
                            <td className="w-[10px] td_group" name="tb_04">
                              {addComma(
                                rowData_BS.total_month?.[
                                selectedYearExport?.getFullYear() + "-04"
                                ]
                              )}
                            </td>
                            <td className="w-[10px] td_group" name="tb_05">
                              {addComma(
                                rowData_BS.total_month?.[
                                selectedYearExport?.getFullYear() + "-05"
                                ]
                              )}
                            </td>
                            <td className="w-[10px] td_group" name="tb_06">
                              {addComma(
                                rowData_BS.total_month?.[
                                selectedYearExport?.getFullYear() + "-06"
                                ]
                              )}
                            </td>
                            <td className="w-[10px] td_group" name="tb_07">
                              {addComma(
                                rowData_BS.total_month?.[
                                selectedYearExport?.getFullYear() + "-07"
                                ]
                              )}
                            </td>
                            <td className="w-[10px] td_group" name="tb_08">
                              {addComma(
                                rowData_BS.total_month?.[
                                selectedYearExport?.getFullYear() + "-08"
                                ]
                              )}
                            </td>
                            <td className="w-[10px] td_group" name="tb_09">
                              {addComma(
                                rowData_BS.total_month?.[
                                selectedYearExport?.getFullYear() + "-09"
                                ]
                              )}
                            </td>
                            <td className="w-[10px] td_group" name="tb_10">
                              {addComma(
                                rowData_BS.total_month?.[
                                selectedYearExport?.getFullYear() + "-10"
                                ]
                              )}
                            </td>
                            <td className="w-[10px] td_group" name="tb_11">
                              {addComma(
                                rowData_BS.total_month?.[
                                selectedYearExport?.getFullYear() + "-11"
                                ]
                              )}
                            </td>
                            <td className="w-[10px] td_group" name="tb_12">
                              {addComma(
                                rowData_BS.total_month?.[
                                selectedYearExport?.getFullYear() + "-12"
                                ]
                              )}
                            </td>
                            <td
                              className="w-[10px] td_group"
                              name="tb_01_Next_Year"
                            >
                              {addComma(
                                rowData_BS.total_month?.[
                                selectedYearExport?.getFullYear() + 1 + "-01"
                                ]
                              )}
                            </td>
                            <td
                              className="w-[10px] td_group"
                              name="tb_02_Next_Year"
                            >
                              {addComma(
                                rowData_BS.total_month?.[
                                selectedYearExport?.getFullYear() + 1 + "-02"
                                ]
                              )}
                            </td>
                            <td
                              className="w-[10px] td_group"
                              name="tb_03_Next_Year"
                            >
                              {addComma(
                                rowData_BS.total_month?.[
                                selectedYearExport?.getFullYear() + 1 + "-03"
                                ]
                              )}
                            </td>
                            <td className="w-[10px] td_group" name="tb_total">
                              {addComma(rowData_BS.total_month?.total)}
                            </td>
                            <td className="w-[1px] td_group"></td>
                          </tr>
                        </>
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
      <Form_InputMonthlyData
        // eslint-disable-next-line no-undef
        visible={isShowForm_InputMonthlyData}
        t={t}
        cancel={() => {
          updateState({ isShowForm_InputMonthlyData: false });
        }}
        selectedTime={selectedDate}
        showToast={showToast}
        setSelectedYearExport={setSelectedYearExport}
      />
      <Form_InputBalanceYeatData
        // eslint-disable-next-line no-undef
        visible={isShowForm_InputBalanceFromPreviousYear}
        t={t}
        cancel={() => {
          updateState({ isShowForm_InputBalanceFromPreviousYear: false });
        }}
        selectedTime={selectedYear}
        showToast={showToast}
        setSelectedYearExport={setSelectedYearExport}
      />
    </div>
  );
};

export default BS_Report;