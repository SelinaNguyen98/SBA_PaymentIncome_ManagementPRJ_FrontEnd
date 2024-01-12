import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../../Utils/contexts/app.context";
import MonthYearPicker from "../../../../Utils/MonthYearPicker";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line react/prop-types
const AccountAnnalytics = () => {
  const {t } = useTranslation();
  const t_account = t;
  const { isShowAsideFilter } = useContext(AppContext);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);
  // eslint-disable-next-line no-unused-vars
  const [data_AccountAnnalytics, setData_AccountAnnalytics] = useState([
    {
      No: 1,
      Account_Category: "ABC",
      JPY: 9,
      VND: 1,
      USD: 1,
      Total: 9,
    },
    {
      No: 2,
      Account_Category: "ABC",
      JPY: 9,
      VND: 1,
      USD: 1,
      Total: 9,
    },
    {
      No: 3,
      Account_Category: "ABC",
      JPY: 9,
      VND: 1,
      USD: 1,
      Total: 9,
    },
    {
      No: 4,
      Account_Category: "ABC",
      JPY: 9,
      VND: 1,
      USD: 1,
      Total: 9,
    },
    {
      No: 5,
      Account_Category: "ABC",
      JPY: 9,
      VND: 1,
      USD: 1,
      Total: 9,
    },
    {
      No: 6,
      Account_Category: "ABC",
      JPY: 9,
      VND: 1,
      USD: 1,
      Total: 9,
    },
    {
      No: 7,
      Account_Category: "ABC",
      JPY: 9,
      VND: 1,
      USD: 1,
      Total: 9,
    },
    {
      No: 8,
      Account_Category: "ABC",
      JPY: 9,
      VND: 1,
      USD: 1,
      Total: 9,
    },
    {
      No: 9,
      Account_Category: "ABC",
      JPY: 9,
      VND: 1,
      USD: 1,
      Total: 9,
    },
    {
      No: 10,
      Account_Category: "ABC",
      JPY: 9,
      VND: 1,
      USD: 1,
      Total: 9,
    },
    {
      No: 11,
      Account_Category: "ABC",
      JPY: 9,
      VND: 1,
      USD: 1,
      Total: 9,
    },
    {
      No: 12,
      Account_Category: "ABC",
      JPY: 9,
      VND: 1,
      USD: 1,
      Total: 9,
    },
    {
      No: 13,
      Account_Category: "ABC",
      JPY: 9,
      VND: 1,
      USD: 1,
      Total: 9,
    },
    {
      No: 14,
      Account_Category: "ABC",
      JPY: 9,
      VND: 1,
      USD: 1,
      Total: 9,
    },
    {
      No: 15,
      Account_Category: "ABC",
      JPY: 9,
      VND: 1,
      USD: 1,
      Total: 9,
    },
  ]);
  return (
    <div className="h-screen">
      <div
        id="contentInvoiceDetail"
        className={` relative bg-main-theme pb-5 h-full ${
          isShowAsideFilter ? "col-span-10" : "col-span-full"
        }`}
      >
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
          <span className="font-bold">
            {t_account("navHeader.accountAnalytics")}
          </span>
        </div>

        {/* control area */}
        <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4  bg-white rounded-[16px] ">
          <div className="grid  gap-2 items-center w-full ">
            <div className="flex items-center justify-between gap-2 flex-row max-[1390px]:flex-col">
              <div className="mt-1 px-6 flex flex-row items-center">
                <div className="gap-2 items-center flex flex-row max-[1000px]:flex-col">
                  <MonthYearPicker
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    className="col-span-12 lg:col-span-2 max-[1000px]:w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* table data */}
          <div className="max-h-[600px] overflow-y-auto mt-4">
          <table id="invoiceTable" className="w-full">
            <thead>
              <tr>
                <th className="w-[1%]"></th>
                <th className="w-[10%]">No</th>
                <th className="w-[20%]">{t_account("accountAnalytics.account_category")}</th>
                <th className="w-[10%]">JPY</th>
                <th className="w-[10%]">VND</th>
                <th className="w-[10%]">USD</th>
                <th className="w-[10%]">{t_account("accountAnalytics.total")}</th>
                <th className="w-[1%]"></th>
              </tr>
            </thead>
            
            <tbody className="">
              <tr className="">
                <td colSpan={100}></td>
              </tr>
              
              {data_AccountAnnalytics.map(
                (rowData_AccountAnnalytics, index) => (
                  <tr key={index}>
                    <td className="w-[1%]"></td>
                    <td className="w-[10%]" name="tb_no">
                      {rowData_AccountAnnalytics.No}
                    </td>
                    <td className="w-[10%]" name="tb_account_category">
                      {rowData_AccountAnnalytics.Account_Category}
                    </td>
                    <td className="w-[10%]" name="tb_jpy">
                      {rowData_AccountAnnalytics.JPY}
                    </td>
                    <td className="w-[10%]" name="tb_vnd">
                      {rowData_AccountAnnalytics.VND}
                    </td>
                    <td className="w-[10%] overflow-x-hidden" name="tb_usd">
                      {rowData_AccountAnnalytics.USD}
                    </td>
                    <td
                      className="max-w-[10%] min-w-[10%] w-[10%] overflow-x-hidden overflow-scroll"
                      name="tb_total"
                    >
                      {rowData_AccountAnnalytics.Total}
                    </td>
                    <td className="w-[1%]"></td>
                  </tr>
                )
              )}

              <tr className="bg-main-theme h-[0px] py-0 my-0">
                <td colSpan={100}></td>
              </tr>
            </tbody>
          </table>
          </div>

          <div className=" mt-3">
            <div className=" flex flex-wrap gap-4 items-center">
              <span className="font-bold">  {t_account("title.total_of_month")}</span>
              {/*  max-lg:space-y-2  */}
              <div className="flex items-center gird grid-cols-12 gap-2 flex-1 max-lg:space-y-2  max-[680px]:flex-col">
                <div className=" inline-flex mx-3 ">
                  JPY
                  <input
                    type="text"
                    className=" bg-main-theme max-w-[100px] ml-2  "
                    readOnly
                  />
                </div>
                <div className=" inline-flex mx-3 ">
                  VND
                  <input
                    type="text"
                    className=" bg-main-theme  max-w-[100px] ml-2 "
                    readOnly
                  />
                </div>
                <div className=" inline-flex mx-3 ">
                  USD
                  <input
                    type="text"
                    className=" bg-main-theme  max-w-[100px] ml-2 "
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountAnnalytics;
