// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";
import Button from "../../../../Utils/Button";
import { AppContext } from "../../../../Utils/contexts/app.context";
import MonthYearPicker from "../../../../Utils/MonthYearPicker";
import AddOrderForm from "./Dialog/AddOrderForm";
import AddOutsourcingForm from "./Dialog/AddOutsourcingForm";
import AddPaymentManagementForm from "./Dialog/AddPaymentManagementForm";
import EditOrderForm from "./Dialog/EditOrderForm";
import EditOutsourcingForm from "./Dialog/EditOutsourcingForm";
import EditPaymentManagementForm from "./Dialog/EditPaymentManagementForm";
import DeleteOrder from "./Dialog/DeleteOrder";
// eslint-disable-next-line no-unused-vars
import DeleteOutsourcing from "./Dialog/DeleteOutsourcing";
// eslint-disable-next-line no-unused-vars
import DeletePaymentManagement from "./Dialog/DeletePaymentManagement";
import Pagination from "../../../../Utils/Pagination";
// eslint-disable-next-line react/prop-types
const Order = ({ t }) => {
  const t_order = t;
  const { isShowAsideFilter } = useContext(AppContext);

  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState({
    isShowDeleteModal_Order: false,
    isShowDeleteModal_Payment: false,
    isShowDeleteModal_Outsourcing: false,
    isShowFormNewOrder: false,
    isShowFormNewPayment: false,
    isShowFormNewOutsourcing: false,
    isShowFormEditOrder: false,
    isShowFormEditPayment: false,
    isShowFormEditOutsourcing: false,
  });
  // eslint-disable-next-line no-unused-vars
  const {
    isShowDeleteModal_Order,
    isShowDeleteModal_Payment,
    isShowDeleteModal_Outsourcing,
    isShowFormNewOrder,
    isShowFormNewPayment,
    isShowFormNewOutsourcing,
    isShowFormEditOrder,
    isShowFormEditPayment,
    isShowFormEditOutsourcing,

  } = state;
  const updateState = (data) => setState(() => ({ ...state, ...data }));
  // eslint-disable-next-line no-unused-vars
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  //ORDER
  // eslint-disable-next-line no-unused-vars
  const [dataOrder, setDataOrder] = useState([
    {
      No: 1,
      Date_Order: "2022-01-01",
      Company_Name: "John Doe",
      JPY: 9,
      VND: 1,
      USD: 1,
    },
    {
      No: 2,
      Date_Order: "2022-01-01",
      Company_Name: "John Doe",
      JPY: 9,
      VND: 1,
      USD: 1,
    },
    {
      No: 3,
      Date_Order: "2022-01-01",
      Company_Name: "John Doe",
      JPY: 9,
      VND: 1,
      USD: 1,
    },
    {
      No: 4,
      Date_Order: "2022-01-01",
      Company_Name: "John Doe",
      JPY: 9,
      VND: 1,
      USD: 1,
    },
    {
      No: 5,
      Date_Order: "2022-01-01",
      Company_Name: "John Doe",
      JPY: 9,
      VND: 1,
      USD: 1,
    },
  ]);

  const [selectedRows_Order, setSelectedRows_Order] = useState([]);
  const [selectAll_Order, setSelectAll_Order] = useState(false);

  const handleRowCheckboxChange_Order = (index) => {
    const newSelectedRows = [...selectedRows_Order];
    newSelectedRows[index] = !newSelectedRows[index];
    setSelectedRows_Order(newSelectedRows);
  };

  const handleSelectAllCheckboxChange_Order = () => {
    setSelectAll_Order(!selectAll_Order);
    const newSelectedRows = new Array(dataOrder.length).fill(!selectAll_Order);
    setSelectedRows_Order(newSelectedRows);
  };

  //PAYMENT MANAGEMENT
  // eslint-disable-next-line no-unused-vars
  const [data_Payment, setData_Payment] = useState([
    {
      No: 1,
      Date_of_payment: "2023-01-01",
      Company_Name: "John Doe",
      JPY: 9,
      VND: 1,
      USD: 1,
    },
    {
      No: 2,
      Date_of_payment: "2023-01-01",
      Company_Name: "John Doe",
      JPY: 9,
      VND: 1,
      USD: 1,
    },
    {
      No: 3,
      Date_of_payment: "2023-01-01",
      Company_Name: "John Doe",
      JPY: 9,
      VND: 1,
      USD: 1,
    },
    {
      No: 4,
      Date_of_payment: "2023-01-01",
      Company_Name: "John Doe",
      JPY: 9,
      VND: 1,
      USD: 1,
    },
    {
      No: 5,
      Date_of_payment: "2023-01-01",
      Company_Name: "John Doe",
      JPY: 9,
      VND: 1,
      USD: 1,
    },
  ]);

  const [selectedRows_Payment, setSelectedRows_Payment] = useState([]);
  const [selectAll_Payment, setSelectAll_Payment] = useState(false);

  const handleRowCheckboxChange_Payment = (index) => {
    const newSelectedRows = [...selectedRows_Payment];
    newSelectedRows[index] = !newSelectedRows[index];
    setSelectedRows_Payment(newSelectedRows);
  };

  const handleSelectAllCheckboxChange_Payment = () => {
    setSelectAll_Payment(!selectAll_Payment);
    const newSelectedRows = new Array(dataOrder.length).fill(
      !selectAll_Payment
    );
    setSelectedRows_Payment(newSelectedRows);
  };

  //OUTSOURCING COST
  // eslint-disable-next-line no-unused-vars
  const [data_Outsourcing, setData_Outsourcing] = useState([
    {
      No: 1,
      Outsourcing_Project: "Management",
      Company_Name: "John Doe",
      JPY: 9,
      VND: 1,
      USD: 1,
    },
    {
      No: 2,
      Outsourcing_Project: "Management",
      Company_Name: "John Doe",
      JPY: 9,
      VND: 1,
      USD: 1,
    },
    {
      No: 3,
      Outsourcing_Project: "Management",
      Company_Name: "John Doe",
      JPY: 9,
      VND: 1,
      USD: 1,
    },
    {
      No: 4,
      Outsourcing_Project: "Management",
      Company_Name: "John Doe",
      JPY: 9,
      VND: 1,
      USD: 1,
    },
    {
      No: 5,
      Outsourcing_Project: "Management",
      Company_Name: "John Doe",
      JPY: 9,
      VND: 1,
      USD: 1,
    },
  ]);

  const [selectedRows_Outsourcing, setSelectedRows_Outsourcing] = useState([]);
  const [selectAll_Outsourcing, setSelectAll_Outsourcing] = useState(false);

  const handleRowCheckboxChange_Outsourcing = (index) => {
    const newSelectedRows = [...selectedRows_Outsourcing];
    newSelectedRows[index] = !newSelectedRows[index];
    setSelectedRows_Outsourcing(newSelectedRows);
  };

  const handleSelectAllCheckboxChange_Outsourcing = () => {
    setSelectAll_Outsourcing(!selectAll_Outsourcing);
    const newSelectedRows = new Array(dataOrder.length).fill(
      !selectAll_Outsourcing
    );
    setSelectedRows_Outsourcing(newSelectedRows);
  };

  return (
    <div className="">
      <MonthYearPicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        className="ml-4 bg-white w-64"
      />
      {/* Order */}
      <div
        id="contentInvoiceDetail"
        className={` relative bg-main-theme pb-5 h-full ${
          isShowAsideFilter ? "col-span-10" : "col-span-full"
        }`}
      >
        {/* control area */}
        <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4  bg-white rounded-[16px] overflow-x-auto">
          <div className="grid  gap-2 items-center w-full overflow-auto ">
            <div className="flex items-center justify-between">
              <div className="mt-1 px-6 flex flex-row items-center">
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
                <span className="font-bold"> {t_order("title.orders")}</span>
              </div>

              <div className="flex flex-row">
                <Button
                  onClick={() => updateState({ isShowFormNewOrder: true })}
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 21 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.75 9.9H11.55V13.5H9.45V9.9H5.25V8.1H9.45V4.5H11.55V8.1H15.75M10.5 0C9.12112 0 7.75574 0.232792 6.48182 0.685084C5.2079 1.13738 4.05039 1.80031 3.07538 2.63604C1.10625 4.32387 0 6.61305 0 9C0 11.3869 1.10625 13.6761 3.07538 15.364C4.05039 16.1997 5.2079 16.8626 6.48182 17.3149C7.75574 17.7672 9.12112 18 10.5 18C13.2848 18 15.9555 17.0518 17.9246 15.364C19.8938 13.6761 21 11.3869 21 9C21 7.8181 20.7284 6.64778 20.2007 5.55585C19.6731 4.46392 18.8996 3.47177 17.9246 2.63604C16.9496 1.80031 15.7921 1.13738 14.5182 0.685084C13.2443 0.232792 11.8789 0 10.5 0Z"
                        fill="white"
                      />
                    </svg>
                  }
                >
                  {t_order("button.add")}
                </Button>

                <Button
                  onClick={() => updateState({ isShowDeleteModal_Order: true })}
                  className="bg-red ml-2"
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 18C6.98044 18 4.56408 17.0518 2.78249 15.364C1.00089 13.6761 0 11.3869 0 9C0 6.61305 1.00089 4.32387 2.78249 2.63604C4.56408 0.948212 6.98044 0 9.5 0C12.0196 0 14.4359 0.948212 16.2175 2.63604C17.9991 4.32387 19 6.61305 19 9C19 11.3869 17.9991 13.6761 16.2175 15.364C14.4359 17.0518 12.0196 18 9.5 18ZM14.25 8.1H4.75V9.9H14.25V8.1Z"
                        fill="white"
                      />
                    </svg>
                  }
                >
                  {t_order("button.delete")}
                </Button>
              </div>
            </div>
          </div>
          <table id="invoiceTable" className="w-full">
            <thead>
              <tr>
                <th className="w-[1%]">
                  <input
                    type="checkbox"
                    checked={selectAll_Order}
                    onChange={handleSelectAllCheckboxChange_Order}
                  />
                </th>
                <th className="w-[10%]">No</th>
                <th className="w-[20%]">
                  {t_order("header_table_order.order_date")}
                </th>
                <th className="w-[25%]">
                  {t_order("header_table_order.Company_name")}
                </th>
                <th className="w-[10%]">JPY</th>
                <th className="w-[10%]">VND</th>
                <th className="w-[10%]">USD</th>
                <th className="w-[10%]">
                  {t_order("header_table_order.Action")}
                </th>
                <th className="w-[1%]"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td colSpan={100}></td>
              </tr>

              {dataOrder.map((rowDataOrder, index) => (
                <tr key={index}>
                  <td className="w-[3%]">
                    <input
                      type="checkbox"
                      checked={selectedRows_Order[index]}
                      onChange={() => handleRowCheckboxChange_Order(index)}
                    />
                  </td>
                  <td className="w-[10%]" name="tb_no">
                    {rowDataOrder.No}
                  </td>
                  <td className="w-[10%]" name="tb_date">
                    {rowDataOrder.Date_Order}
                  </td>
                  <td className="w-[10%]" name="tb_name">
                    {rowDataOrder.Company_Name}
                  </td>
                  <td className="w-[10%]" name="tb_jyp">
                    {rowDataOrder.JPY}
                  </td>
                  <td className="w-[10%] overflow-x-hidden" name="tb_vnd">
                    {rowDataOrder.VND}
                  </td>
                  <td
                    className="max-w-[10%] min-w-[10%] w-[10%] overflow-x-hidden overflow-scroll"
                    name="tb_usd"
                  >
                    {rowDataOrder.USD}
                  </td>
                  <td className="w-[8%]" name="tb_action">
                    <div className=" flex justify-center py-1 mx-1 bg-white  border-gray-500/50 border rounded-sm ">
                      <svg
                       onClick={() =>
                          updateState({ isShowFormEditOrder: true })
                        }
                        className="cursor-pointer"
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
                          fill="#FFC107"
                        />
                        <path
                          d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
                          fill="black"
                          fillOpacity="0.2"
                        />
                      </svg>
                      <div className=" border border-gray-400 mx-2 "></div>

                      <svg
                        className="cursor-pointer"
                        onClick={() =>
                          updateState({ isShowDeleteModal_Order: true })
                        }
                        width="19"
                        height="19"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                          fill="#F44336"
                        />
                        <path
                          d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                          fill="black"
                          fillOpacity="0.2"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="w-[1%]"></td>
                </tr>
              ))}

              <tr className="bg-main-theme h-[0px] py-0 my-0">
                <td colSpan={100}></td>
              </tr>
            </tbody>
          </table>
          <div className=" flex-1  flex justify-end mt-5">
            {/* flex-shrink-0 */}
            <Pagination />
          </div>
        </div>
      </div>

      {/* Payment Management */}
      <div
        id="contentInvoiceDetail"
        className={` relative bg-main-theme pb-5 h-full ${
          isShowAsideFilter ? "col-span-10" : "col-span-full"
        }`}
      >
        {/* control area */}
        <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4  bg-white rounded-[16px] overflow-x-auto ">
          <div className="grid  gap-2 items-center w-full overflow-auto ">
            <div className="flex items-center justify-between">
              <div className="mt-1 px-6 flex flex-row items-center">
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
                  {t_order("title.Payment_management")}
                </span>
              </div>

              <div className="flex flex-row">
                <Button
                  onClick={() => updateState({ isShowFormNewPayment: true })}
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 21 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.75 9.9H11.55V13.5H9.45V9.9H5.25V8.1H9.45V4.5H11.55V8.1H15.75M10.5 0C9.12112 0 7.75574 0.232792 6.48182 0.685084C5.2079 1.13738 4.05039 1.80031 3.07538 2.63604C1.10625 4.32387 0 6.61305 0 9C0 11.3869 1.10625 13.6761 3.07538 15.364C4.05039 16.1997 5.2079 16.8626 6.48182 17.3149C7.75574 17.7672 9.12112 18 10.5 18C13.2848 18 15.9555 17.0518 17.9246 15.364C19.8938 13.6761 21 11.3869 21 9C21 7.8181 20.7284 6.64778 20.2007 5.55585C19.6731 4.46392 18.8996 3.47177 17.9246 2.63604C16.9496 1.80031 15.7921 1.13738 14.5182 0.685084C13.2443 0.232792 11.8789 0 10.5 0Z"
                        fill="white"
                      />
                    </svg>
                  }
                >
                  {t_order("button.add")}
                </Button>

                <Button
                  onClick={() =>
                    updateState({ isShowDeleteModal_Payment: true })
                  }
                  className="bg-red ml-2"
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 18C6.98044 18 4.56408 17.0518 2.78249 15.364C1.00089 13.6761 0 11.3869 0 9C0 6.61305 1.00089 4.32387 2.78249 2.63604C4.56408 0.948212 6.98044 0 9.5 0C12.0196 0 14.4359 0.948212 16.2175 2.63604C17.9991 4.32387 19 6.61305 19 9C19 11.3869 17.9991 13.6761 16.2175 15.364C14.4359 17.0518 12.0196 18 9.5 18ZM14.25 8.1H4.75V9.9H14.25V8.1Z"
                        fill="white"
                      />
                    </svg>
                  }
                >
                  {t_order("button.delete")}
                </Button>
              </div>
            </div>
          </div>
          <table id="invoiceTable" className="w-full">
            <thead>
              <tr>
                <th className="w-[3%]">
                  <input
                    type="checkbox"
                    checked={selectAll_Payment}
                    onChange={handleSelectAllCheckboxChange_Payment}
                  />
                </th>
                <th className="w-[10%]">No</th>
                <th className="w-[20%]">
                  {t_order("header_table_order.Date_of_payment")}
                </th>
                <th className="w-[25%]">
                  {t_order("header_table_order.Company_name")}
                </th>
                <th className="w-[10%]">JPY</th>
                <th className="w-[10%]">VND</th>
                <th className="w-[10%]">USD</th>
                <th className="w-[10%]">
                  {t_order("header_table_order.Action")}
                </th>
                <th className="w-[1%]"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td colSpan={100}></td>
              </tr>

              {data_Payment.map((rowData_Payment, index) => (
                <tr key={index}>
                  <td className="w-[1%]">
                    <input
                      type="checkbox"
                      checked={selectedRows_Payment[index]}
                      onChange={() => handleRowCheckboxChange_Payment(index)}
                    />
                  </td>
                  <td className="w-[10%]" name="tb_no">
                    {rowData_Payment.No}
                  </td>
                  <td className="w-[10%]" name="tb_date">
                    {rowData_Payment.Date_of_payment}
                  </td>
                  <td className="w-[10%]" name="tb_name">
                    {rowData_Payment.Company_Name}
                  </td>
                  <td className="w-[10%]" name="tb_jyp">
                    {rowData_Payment.JPY}
                  </td>
                  <td className="w-[10%] overflow-x-hidden" name="tb_vnd">
                    {rowData_Payment.VND}
                  </td>
                  <td
                    className="max-w-[10%] min-w-[10%] w-[10%] overflow-x-hidden overflow-scroll"
                    name="tb_usd"
                  >
                    {rowData_Payment.USD}
                  </td>
                  <td className="w-[8%]" name="tb_action">
                    <div className=" flex justify-center py-1 mx-1 bg-white  border-gray-500/50 border rounded-sm ">
                      <svg
                       onClick={() =>
                          updateState({  isShowFormEditPayment: true })
                        }
                        className="cursor-pointer"
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
                          fill="#FFC107"
                        />
                        <path
                          d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
                          fill="black"
                          fillOpacity="0.2"
                        />
                      </svg>
                      <div className=" border border-gray-400 mx-2 "></div>

                      <svg
                        className="cursor-pointer"
                        onClick={() =>
                          updateState({ isShowDeleteModal_Payment: true })
                        }
                        width="19"
                        height="19"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                          fill="#F44336"
                        />
                        <path
                          d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                          fill="black"
                          fillOpacity="0.2"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="w-[1%]"></td>
                </tr>
              ))}

              <tr className="bg-main-theme h-[0px] py-0 my-0">
                <td colSpan={100}></td>
              </tr>
            </tbody>
          </table>
          <div className=" flex-1  flex justify-end mt-5">
            {/* flex-shrink-0 */}
            <Pagination />
          </div>
        </div>
      </div>

      {/* Outsourcing cost */}
      <div
        id="contentInvoiceDetail"
        className={` relative bg-main-theme pb-5 h-full ${
          isShowAsideFilter ? "col-span-10" : "col-span-full"
        }`}
      >
        {/* control area */}
        <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4 bg-white rounded-[16px]">
          <div className="grid gap-2 items-center w-full overflow-auto">
            <div className="flex items-center justify-between">
              <div className="mt-1 px-6 flex flex-row items-center">
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
                  {t_order("title.Outsourcing_cost")}
                </span>
              </div>

              <div className="flex flex-row">
                <Button
                  onClick={() =>
                    updateState({ isShowFormNewOutsourcing: true })
                  }
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 21 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.75 9.9H11.55V13.5H9.45V9.9H5.25V8.1H9.45V4.5H11.55V8.1H15.75M10.5 0C9.12112 0 7.75574 0.232792 6.48182 0.685084C5.2079 1.13738 4.05039 1.80031 3.07538 2.63604C1.10625 4.32387 0 6.61305 0 9C0 11.3869 1.10625 13.6761 3.07538 15.364C4.05039 16.1997 5.2079 16.8626 6.48182 17.3149C7.75574 17.7672 9.12112 18 10.5 18C13.2848 18 15.9555 17.0518 17.9246 15.364C19.8938 13.6761 21 11.3869 21 9C21 7.8181 20.7284 6.64778 20.2007 5.55585C19.6731 4.46392 18.8996 3.47177 17.9246 2.63604C16.9496 1.80031 15.7921 1.13738 14.5182 0.685084C13.2443 0.232792 11.8789 0 10.5 0Z"
                        fill="white"
                      />
                    </svg>
                  }
                >
                  {t_order("button.add")}
                </Button>

                <Button
                  onClick={() =>
                    updateState({ isShowDeleteModal_Outsourcing: true })
                  }
                  className="bg-red ml-2"
                  icon={
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 19 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.5 18C6.98044 18 4.56408 17.0518 2.78249 15.364C1.00089 13.6761 0 11.3869 0 9C0 6.61305 1.00089 4.32387 2.78249 2.63604C4.56408 0.948212 6.98044 0 9.5 0C12.0196 0 14.4359 0.948212 16.2175 2.63604C17.9991 4.32387 19 6.61305 19 9C19 11.3869 17.9991 13.6761 16.2175 15.364C14.4359 17.0518 12.0196 18 9.5 18ZM14.25 8.1H4.75V9.9H14.25V8.1Z"
                        fill="white"
                      />
                    </svg>
                  }
                >
                  {t_order("button.delete")}
                </Button>
              </div>
            </div>
          </div>
          <table id="invoiceTable" className="w-full">
            <thead>
              <tr>
                <th className="w-[3%]">
                  <input
                    type="checkbox"
                    checked={selectAll_Outsourcing}
                    onChange={handleSelectAllCheckboxChange_Outsourcing}
                  />
                </th>
                <th className="w-[10%]">No</th>
                <th className="w-[20%]">
                  {t_order("header_table_order.Outsourced_project")}
                </th>
                <th className="w-[25%]">
                  {t_order("header_table_order.Company_name")}
                </th>
                <th className="w-[10%]">JPY</th>
                <th className="w-[10%]">VND</th>
                <th className="w-[10%]">USD</th>
                <th className="w-[10%]">
                  {t_order("header_table_order.Action")}
                </th>
                <th className="w-[1%]"></th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td colSpan={100}></td>
              </tr>

              {data_Outsourcing.map((rowData_Outsourcing, index) => (
                <tr key={index}>
                  <td className="w-[1%]">
                    <input
                      type="checkbox"
                      checked={selectedRows_Outsourcing[index]}
                      onChange={() =>
                        handleRowCheckboxChange_Outsourcing(index)
                      }
                    />
                  </td>
                  <td className="w-[10%]" name="tb_no">
                    {rowData_Outsourcing.No}
                  </td>
                  <td className="w-[10%]" name="tb_Outsourcing_Project">
                    {rowData_Outsourcing.Outsourcing_Project}
                  </td>
                  <td className="w-[10%]" name="tb_name">
                    {rowData_Outsourcing.Company_Name}
                  </td>
                  <td className="w-[10%]" name="tb_jyp">
                    {rowData_Outsourcing.JPY}
                  </td>
                  <td className="w-[10%] overflow-x-hidden" name="tb_vnd">
                    {rowData_Outsourcing.VND}
                  </td>
                  <td
                    className="max-w-[10%] min-w-[10%] w-[10%] overflow-x-hidden overflow-scroll"
                    name="tb_usd"
                  >
                    {rowData_Outsourcing.USD}
                  </td>
                  <td className="w-[8%]" name="tb_action">
                    <div className=" flex justify-center py-1 mx-1 bg-white  border-gray-500/50 border rounded-sm ">
                      <svg
                       onClick={() =>
                          updateState({isShowFormEditOutsourcing: true })
                        }
                        className="cursor-pointer"
                        width="19"
                        height="19"
                        viewBox="0 0 19 19"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
                          fill="#FFC107"
                        />
                        <path
                          d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
                          fill="black"
                          fillOpacity="0.2"
                        />
                      </svg>
                      <div className=" border border-gray-400 mx-2 "></div>

                      <svg
                        className="cursor-pointer"
                        onClick={() =>
                          updateState({ isShowDeleteModal_Outsourcing: true })
                        }
                        width="19"
                        height="19"
                        viewBox="0 0 16 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                          fill="#F44336"
                        />
                        <path
                          d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                          fill="black"
                          fillOpacity="0.2"
                        />
                      </svg>
                    </div>
                  </td>
                  <td className="w-[1%]"></td>
                </tr>
              ))}

              <tr className="bg-main-theme h-[0px] py-0 my-0">
                <td colSpan={100}></td>
              </tr>
            </tbody>
          </table>
          <div className=" flex-1  flex justify-end mt-5">
            {/* flex-shrink-0 */}
            <Pagination />
          </div>
        </div>
      </div>
      <AddOrderForm
        // eslint-disable-next-line no-undef
        visible={isShowFormNewOrder}
        t={t_order}
        cancel={() => {
          updateState({ isShowFormNewOrder: false });
        }}
      />
      <AddPaymentManagementForm
        // eslint-disable-next-line no-undef
        visible={isShowFormNewPayment}
        t={t_order}
        cancel={() => {
          updateState({ isShowFormNewPayment: false });
        }}
      />
      <AddOutsourcingForm
        // eslint-disable-next-line no-undef
        visible={isShowFormNewOutsourcing}
        t={t_order}
        cancel={() => {
          updateState({ isShowFormNewOutsourcing: false });
        }}
      />
      <EditOrderForm
        // eslint-disable-next-line no-undef
        visible={isShowFormEditOrder}
        t={t_order}
        cancel={() => {
          updateState({ isShowFormEditOrder: false });
        }}
      />
      <EditPaymentManagementForm
        // eslint-disable-next-line no-undef
        visible={isShowFormEditPayment}
        t={t_order}
        cancel={() => {
          updateState({ isShowFormEditPayment: false });
        }}
      />
      <EditOutsourcingForm
        // eslint-disable-next-line no-undef
        visible={isShowFormEditOutsourcing}
        t={t_order}
        cancel={() => {
          updateState({ isShowFormEditOutsourcing: false });
        }}
      />
      <DeleteOrder
        // eslint-disable-next-line no-undef
        visible={isShowDeleteModal_Order}
        t={t_order}
        cancel={() => {
          updateState({ isShowDeleteModal_Order: false });
        }}
      />
      <DeleteOutsourcing
        // eslint-disable-next-line no-undef
        visible={isShowDeleteModal_Outsourcing}
        t={t_order}
        cancel={() => {
          updateState({ isShowDeleteModal_Outsourcing: false });
        }}
      />
      <DeletePaymentManagement
        // eslint-disable-next-line no-undef
        visible={isShowDeleteModal_Payment}
        t={t_order}
        cancel={() => {
          updateState({ isShowDeleteModal_Payment: false });
        }}
      />
    </div>
  );
};

export default Order;
