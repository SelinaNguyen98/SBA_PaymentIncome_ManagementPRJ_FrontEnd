import MonthYearPicker from "../../../../Utils/MonthYearPicker";
import { useTranslation } from "react-i18next";
import InvoiceDetailFooter from "../../InvoiceDetails/InvoicDetailFooter/InvoiceDetailFooter";
import { callAPI_GetAnalytics } from "../API";
import { useEffect, useState } from "react";
import {
  formatFloatToCustomString,
  formatNumberSeparator,
} from "../../../../Utils/utils/maths";
// eslint-disable-next-line react/prop-types
const AccountAnnalytics = () => {
  const { t } = useTranslation();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [state, setState] = useState({
    dataTable: [],
    usdTotal: 0,
    vndTotal: 0,
    jpyTotal: 0,
  });
  const updateStateTable = (dataTable) =>
    setState(() => ({ ...state, ...dataTable }));

  const { dataTable, usdTotal, vndTotal, jpyTotal } = state;

  useEffect(() => {
    fetchAnalytics();
  }, [selectedDate]);

  const fetchAnalytics = async () => {
    try {
      const response = await callAPI_GetAnalytics(
        selectedDate.getMonth() + 1,
        selectedDate.getFullYear()
      );

      updateStateTable({
        dataTable: response?.categories?.category_analytics || [],
        usdTotal: response?.categories?.total_cost_usd || 0,
        vndTotal: response?.categories?.total_cost_vnd || 0,
        jpyTotal: response?.categories?.total_cost_jpy || 0,
      });

      console.log(response?.categories?.total_cost_usd);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" relative bg-main-theme pb-5 h-screen">
      {/* Lable */}
      <div className="mt-1 px-6 flex flex-shrink-0 items-center ">
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
        <span className="font-bold">{t("navHeader.accountAnalytics")}</span>
      </div>

      {/* control area */}
      <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4  bg-white rounded-[16px] ">
        <div className="lg:flex  items-center mt-1 px-6 ">
          <div className=" max-lg:px-10">
            <MonthYearPicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        </div>
        {/* table fix header */}
        <div className=" w-full h-[430px] 2xl-plus:h-[600px]   ">
          <div className=" overflow-auto  h-[400px] 2xl-plus:h-[566px] w-full rounded-lg bg-white mt-2   ">
            <table className=" table-fixed w-full border-hidden min-w-[1000px]     ">
              <thead className=" table-fixed py-2 bg-main-theme text-[11px] 2xl-plus:text-[16px] uppercase sticky top-0 z-10  ">
                <tr className=" border-hidden ">
                  {/* Warring: The first tag td be liked left padding */}
                  <th className=" w-[2%] rounded-l-[10px]"></th>
                  {/* //////////////// */}
                  <th className=" w-[10%] py-2"> NO</th>
                  <th className=" w-[26%]">{t(`title.accountCategory`)}</th>
                  <th className=" w-[20%]"> JPY</th>
                  <th className=" w-[20%]"> VND</th>
                  <th className=" w-[20%]"> USD</th>
                  {/* Warring: The last tag td be liked left padding */}
                  <th className=" w-[2%]  rounded-r-[10px]"></th>
                  {/* //////////////// */}
                </tr>
                <tr className=" h-2 bg-white border-hidden ">
                  <th colSpan={100}></th>
                </tr>
              </thead>
              {/* <thead className=" h-2 border-hidden"></thead> */}

              <tbody className=" bg-main-theme rounded-lg">
                {/* //////////////// */}
                {/*Warring: Second row is like padding-top */}
                <tr className=" ">
                  <td
                    colSpan={100}
                    className=" h-2 bg-main-theme rounded-t-[10px] border border-main-theme "
                  ></td>
                </tr>
                {/* //////////////// */}
                {dataTable && dataTable.length > 0 ? (
                  dataTable.map((analytic, index) => (
                    <tr
                      key={index}
                      className="h-[35px] 2xl-plus:h-[50px] text-[14px] 2xl-plus:text-[18px] 2xl-plus:p-2 "
                    >
                      {/* Warring:  First column of each row is like padding-left */}
                      <td className=" border-hidden "></td>
                      {/* //////////////// */}

                      {/* TODO DATA MAIN*/}
                      <td className=" bg-main-theme text-center border border-solid border-gray-500 overflow-hidden whitespace-nowrap ">
                        {index + 1}
                      </td>
                      <td className=" px-4 bg-main-theme border border-solid border-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis">
                        <input
                          className=" w-full outline-none bg-transparent overflow-hidden overflow-ellipsis whitespace-nowrap text-center"
                          readOnly
                          value={analytic?.name || ""}
                        />
                      </td>
                      <td className=" px-4 bg-main-theme border border-solid border-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis">
                        <input
                          className=" w-full outline-none bg-transparent overflow-hidden overflow-ellipsis whitespace-nowrap"
                          readOnly
                          value={formatFloatToCustomString(
                            analytic?.cost_jpy || 0
                          )}
                        />
                      </td>

                      <td className=" px-4 bg-main-theme border border-solid border-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis">
                        <input
                          className=" w-full outline-none bg-transparent overflow-hidden overflow-ellipsis whitespace-nowrap"
                          readOnly
                          // value={analytic?.cost_vnd || "0"}
                          value={formatNumberSeparator(analytic?.cost_vnd || 0)}
                        />
                      </td>
                      <td className=" px-4 bg-main-theme border border-solid border-gray-500 overflow-hidden whitespace-nowrap overflow-ellipsis">
                        <input
                          className=" w-full outline-none bg-transparent overflow-hidden overflow-ellipsis whitespace-nowrap"
                          readOnly
                          // value={analytic?.cost_usd || "0"}
                          value={formatFloatToCustomString(
                            analytic?.cost_usd || 0
                          )}
                        />
                      </td>

                      {/* Warring: Last column of each row is like padding-right */}
                      <td className=" w-[2%] bg-main-theme border-hidden"></td>
                      {/* //////////////// */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={100} className="text-center">
                      {t("announce.data_not_found")}
                    </td>
                  </tr>
                )}

                {/* Warring:  Last row like tha padding bottom */}
                <tr>
                  <td
                    colSpan={100}
                    className=" h-2 p-[5px]  rounded-b-[10px] border-hidden "
                  ></td>
                </tr>
                {/* //////////////// */}
              </tbody>
            </table>
          </div>
        </div>

        <InvoiceDetailFooter
          totalUSD={usdTotal || 0}
          totalVND={vndTotal || 0}
          totalJPY={jpyTotal || 0}
        />
      </div>
    </div>
  );
};

export default AccountAnnalytics;
