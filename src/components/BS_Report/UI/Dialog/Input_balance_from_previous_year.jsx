// eslint-disable-next-line no-unused-vars
import { React, useContext, useEffect, useState } from "react";
import Button from "../../../../Utils/Button";
import Modal from "../../../../Utils/Modal";

export default function Input_balance_from_previous_year({
  // eslint-disable-next-line react/prop-types
  visible,
  // eslint-disable-next-line react/prop-types
  cancel,
  // eslint-disable-next-line react/prop-types
  t,
  // eslint-disable-next-line react/prop-types
  selectedTime,
}) {
  const t_translate = t;
  // eslint-disable-next-line no-unused-vars
  const [data_year, setData_year] = useState([
    {
      No: 1,
      Account_category_name: "John Doe",
      Amount: "100",
    },
    {
      No: 2,
      Account_category_name: "John Doe",
      Amount: "100",
    },
    {
      No: 3,
      Account_category_name: "John Doe",
      Amount: "100",
    },
    {
      No: 4,
      Account_category_name: "John Doe",
      Amount: "100",
    },
    {
      No: 5,
      Account_category_name: "John Doe",
      Amount: "100",
    },
    {
      No: 6,
      Account_category_name: "John Doe",
      Amount: "100",
    },
    {
      No: 7,
      Account_category_name: "John Doe",
      Amount: "100",
    },
    {
      No: 8,
      Account_category_name: "John Doe",
      Amount: "100",
    },
    {
      No: 9,
      Account_category_name: "John Doe",
      Amount: "100",
    },
    {
      No: 10,
      Account_category_name: "John Doe",
      Amount: "100",
    },
    {
      No: 11,
      Account_category_name: "John Doe",
      Amount: "100",
    },
    {
      No: 12,
      Account_category_name: "John Doe",
      Amount: "100",
    },
    {
      No: 13,
      Account_category_name: "John Doe",
      Amount: "100",
    },
  ]);
  // eslint-disable-next-line react/prop-types
  const year = selectedTime.getFullYear();

  const isInputMonthlyData = t_translate(
    "form_input_monthly_data_BS.title_form_balance_previous_year"
  ).includes("INPUT BALANCE FROM PREVIOUS YEAR");

  return (
    <Modal visible={visible}>
      <div className="flex flex-col bg-white m-2 py-5 px-12 rounded-2xl w-[800px] max-[1000px]:w-[400px]  max-[1000px]:max-h-[700px] overflow-y-auto">
        {isInputMonthlyData ? (
          // Display if the translation contains "INPUT MONTHLY DATA FOR"
          <span className="uppercase py-1 mx-auto my-3 px-12 text-center bg-white-500/80 font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
            {t_translate("form_input_monthly_data_BS.title_form_balance_previous_year")}{" ("} {year-1}{")"}{" FOR "}{year}
          </span>
        ) : (
          // Display if the translation contains "月毎野データ入力"
          <span className="uppercase py-1 mx-auto px-12 text-center bg-white-500/80 font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
             {year-1} {t_translate("form_input_monthly_data_BS.title_form_balance_previous_year")}
          </span>
        )}
        <div className="max-h-[600px] max-w-[1600px] overflow-y-auto overflow-x-auto mt-4 text-sm">
          <table id="invoiceTable" className="text-sm">
            <thead>
              <tr>
                <th className="w-[1px]"></th>
                <th className="w-[3px]">No</th>
                <th className="w-[100px]">
                  {t_translate("form_input_monthly_data_BS.title_table_name")}
                </th>
                <th className="w-[10px]">
                  {t_translate("form_input_monthly_data_BS.title_table_amount")}
                </th>
                <th className="w-[1px]"></th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="">
                <td colSpan={100}></td>
              </tr>
              {data_year.map((rowData_year, index) => (
                <tr key={index}>
                  <td className="w-[1px]"></td>
                  <td className="w-[3px]" name="tb_no">
                    {rowData_year.No}
                  </td>
                  <td
                    className="max-w-[100px] min-w-[10px] w-[100px] overflow-x-auto overflow-scroll"
                    name="tb_name"
                  >
                    {rowData_year.Account_category_name}
                  </td>

                  <td
                    className="w-[10px] editable-cell"
                    name="tb_Amount"
                    contentEditable="true"
                    suppressContentEditableWarning={true}
                    onBlur={(e) => {
                      const newData = [...data_year];
                      newData[index].Amount = e.target.innerText;
                      setData_year(newData);
                    }}
                  >
                    {rowData_year.Amount}
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
        <div className="flex items-center justify-around  mt-6 mb-7  ">
          <Button
            onClick={() => {
              // Handle save logic
            }}
            className="py-2 border-2 border-gray min-w-[150px]"
          >
            {t_translate("button.save")}
          </Button>
          <Button
            onClick={cancel}
            className="border-red-500 bg-white border-2 py-2 min-w-[150px]"
          >
            <span className="text-red-500 uppercase">
              {t_translate("button.cancel")}
            </span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
