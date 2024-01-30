/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Button from "../../../Utils/Button";
import YearPicker_Button from "../../../Utils/YearPicker/YearPicker_Button";
import "../Style/style.css";
import { AppContext } from "../../../Utils/contexts/app.context";
import { useTranslation } from "react-i18next";
import { getPaymentsByYearAndMonths, getFileExportExcel_PL } from "../Controller";
import * as XLSX from "xlsx";
const PL_Report = () => {
  let sequentialNumber = 1;
  let sequentialNumber_excel = 1;
  const { isShowAsideFilter } = useContext(AppContext);
  const { t } = useTranslation();

  const [selectedYearExport, setSelectedYearExport] = useState(new Date());
  const [dataBS, setDataBS] = useState([]);

  useEffect(() => {
    getPaymentsData(selectedYearExport.getFullYear());
  }, [selectedYearExport]);

  const getPaymentsData = async (year) => {
    try {
      const response = await getPaymentsByYearAndMonths(year);
      console.log(response);
      const formattedData = formatData(response);
      console.log(formattedData);
      setDataBS(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const formatData = (rawData) => {
    rawData.sort((a, b) => a.group_id - b.group_id);

    return rawData.map((group) => {
      const categories = group.categories.map((category) => {
        const data =
          typeof category.data === "string"
            ? JSON.parse(category.data)
            : category.data;
        const formattedData = Object.keys(data).reduce((acc, month) => {
          acc[month] = formatNumber(data[month]) || 0;
          return acc;
        }, {});

        return {
          category_id: category.category_id,
          category_name: category.category_name,
          data: formattedData,
        };
      });

      const total_month =
        typeof group.total_month === "string"
          ? JSON.parse(group.total_month)
          : group.total_month;
      const formattedTotalMonth = Object.keys(total_month).reduce(
        (acc, month) => {
          acc[month] = formatNumber(total_month[month]) || 0;
          return acc;
        },
        {}
      );

      return {
        group_id: group.group_id,
        group_name: group.group_name,
        categories,
        total_month: formattedTotalMonth,
      };
    });
  };

  const formatNumber = (number) => {
    const roundedNumber = parseFloat(number).toFixed(2);
    const numberWithCommas = roundedNumber
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const [integerPart, decimalPart] = numberWithCommas.split(".");
    const formattedNumber = decimalPart
      ? `${integerPart}.${decimalPart}`
      : numberWithCommas;

    return formattedNumber;
  };

  const exportToExcel= async (year) => {
    // const titleRow = [t("title.PL_report")]; // Add title row
    // const headerRow = [
    //   "",
    //   "No",
    //   t("header_table_PL_BS.name"),
    //   ...Array.from({ length: 12 }).map((_, monthIndex) => {
    //     const displayMonth = ((monthIndex + 3) % 12) + 1;
    //     const displayYear =
    //       selectedYearExport.getFullYear() + Math.floor((monthIndex + 3) / 12);

    //     return `${displayMonth}/${displayYear}`;
    //   }),
    //   t("header_table_PL_BS.total"),
    //   "",
    // ];

    // const dataRows = dataBS.flatMap((groupData, groupIndex) => [
    //   ...groupData.categories.map((categoryData, categoryIndex) => [
    //     "",
    //     sequentialNumber_excel++,
    //     categoryData.category_name,
    //     ...Object.keys(categoryData.data).map(
    //       (month) => categoryData.data[month]
    //     ),
    //     categoryData.total,
    //     "",
    //   ]),
    //   [
    //     "",
    //     sequentialNumber_excel++,
    //     groupData.group_name,
    //     ...Object.keys(groupData.total_month).map(
    //       (month) => groupData.total_month[month]
    //     ),
    //     "",
    //   ],
    //   ["", "", "", "", "", "", ""],
    // ]);
    // const ws = XLSX.utils.aoa_to_sheet([titleRow, headerRow, ...dataRows]);

    // const wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // XLSX.writeFile(wb, "Profit_and_Loss_Report.xlsx");
    try {
      const response = await getFileExportExcel_PL(year);
      //console.log(response);
      //const formattedData = formatData(response);
      //console.log(formattedData);
      //setDataBS(formattedData);
    } catch (error) {
      console.error("Show Error :", error);
    }
  };

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
              className={` relative bg-main-theme pb-5 h-full ${
                isShowAsideFilter ? "col-span-10" : "col-span-full"
              }`}
            >
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
                          onClick={()=>{exportToExcel(selectedYearExport.getFullYear())}}
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
                <div className="max-h-[500px] overflow-y-auto overflow-x-auto mt-4 text-sm relative">
                  <table
                    id="Table"
                    className="max-h-[500px] text-sm w-full table-fixed"
                  >
                    <thead className="sticky top-0 bg-white z-50 w-full">
                      <tr>
                        <th className="w-[1px]"></th>
                        <th className="w-16">No</th>
                        <th className="w-64">{t("header_table_PL_BS.name")}</th>
                        {Array.from({ length: 12 }).map((_, monthIndex) => {
                          const displayMonth = ((monthIndex + 3) % 12) + 1;
                          const displayYear =
                            selectedYearExport.getFullYear() +
                            Math.floor((monthIndex + 3) / 12);

                          return (
                            <th key={monthIndex} className="w-32">
                              {`${displayMonth}/${displayYear}`}
                            </th>
                          );
                        })}

                        <th className="w-24">
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
                      <tr className="bg-white h-[0px] py-0 my-0">
                        <td colSpan={100}></td>
                      </tr>
                      {dataBS.map((groupData, groupIndex) => (
                        <React.Fragment key={groupIndex}>
                          {groupData.categories.map(
                            (categoryData, categoryIndex) => (
                              <tr key={`${groupIndex}-${categoryIndex}`}>
                                <td className="w-[1px]"></td>
                                <td className="w-16">
                                  {sequentialNumber++}
                                </td>{" "}
                                {/* Increment the counter */}
                                <td className="w-64">
                                  <input
                                    className="text-center"
                                    readOnly
                                    value={categoryData.category_name}
                                  />
                                </td>
                                {Object.keys(categoryData.data).map(
                                  (month, monthIndex) => (
                                    <td key={monthIndex} className="w-32">
                                      <input
                                        className="text-center"
                                        readOnly
                                        value={categoryData.data[month]}
                                      />
                                    </td>
                                  )
                                )}
                                <td className="w-24">
                                  <input
                                    className="text-center"
                                    readOnly
                                    value={categoryData.data.total}
                                  />
                                </td>
                              </tr>
                            )
                          )}
                          <tr key={groupIndex} className="brown-row">
                            <td className="w-[1px]"></td>
                            <td className="w-16">{sequentialNumber++}</td>{" "}
                            {/* Increment the counter */}
                            <td className="w-64">{groupData.group_name}</td>
                            {Object.keys(groupData.total_month).map(
                              (month, monthIndex) => (
                                <td key={monthIndex} className="w-32">
                                  <input
                                    className="text-center"
                                    readOnly
                                    value={groupData.total_month[month]}
                                  />
                                </td>
                              )
                            )}
                            <td className="w-24">
                              <input
                                className="text-center"
                                readOnly
                                value={groupData.total_month.total}
                              />
                            </td>
                          </tr>
                        </React.Fragment>
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
