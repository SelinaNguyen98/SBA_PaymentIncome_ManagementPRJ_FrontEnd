/* eslint-disable no-undef */
// // eslint-disable-next-line no-unused-vars
// import React, { useContext, useEffect, useState } from "react";
// import Button from "../../../../Utils/Button";
// import { AppContext } from "../../../../Utils/contexts/app.context";
// import MonthYearPicker from "../../../../Utils/MonthYearPicker";
// import Pagination from "../../../../Utils/Pagination";
// import AddOrderForm from "./Dialog/AddOrderForm";
// import AddOutsourcingForm from "./Dialog/AddOutsourcingForm";
// import AddPaymentManagementForm from "./Dialog/AddPaymentManagementForm";
// import EditOrderForm from "./Dialog/EditOrderForm";
// import EditOutsourcingForm from "./Dialog/EditOutsourcingForm";
// import EditPaymentManagementForm from "./Dialog/EditPaymentManagementForm";
// import DeleteOrder from "./Dialog/DeleteOrder";
// // eslint-disable-next-line no-unused-vars
// import DeleteOutsourcing from "./Dialog/DeleteOutsourcing";
// // eslint-disable-next-line no-unused-vars
// import DeletePaymentManagement from "./Dialog/DeletePaymentManagement";
// import { useTranslation } from "react-i18next";
// // eslint-disable-next-line react/prop-types
// const Order = () => {
//   const { t } = useTranslation();
//   const t_order = t;
//   const { isShowAsideFilter } = useContext(AppContext);

//   // eslint-disable-next-line no-unused-vars
//   const [state, setState] = useState({
//     isShowDeleteModal_Order: false,
//     isShowDeleteModal_Payment: false,
//     isShowDeleteModal_Outsourcing: false,
//     isShowFormNewOrder: false,
//     isShowFormNewPayment: false,
//     isShowFormNewOutsourcing: false,
//     isShowFormEditOrder: false,
//     isShowFormEditPayment: false,
//     isShowFormEditOutsourcing: false,
//   });
//   // eslint-disable-next-line no-unused-vars
//   const {
//     isShowDeleteModal_Order,
//     isShowDeleteModal_Payment,
//     isShowDeleteModal_Outsourcing,
//     isShowFormNewOrder,
//     isShowFormNewPayment,
//     isShowFormNewOutsourcing,
//     isShowFormEditOrder,
//     isShowFormEditPayment,
//     isShowFormEditOutsourcing,
//   } = state;
//   const updateState = (data) => setState(() => ({ ...state, ...data }));
//   // eslint-disable-next-line no-unused-vars
//   const [selectedDate, setSelectedDate] = useState(new Date());

//   useEffect(() => {
//     console.log(selectedDate);
//   }, [selectedDate]);

//   //ORDER
//   // eslint-disable-next-line no-unused-vars
//   const [dataOrder, setDataOrder] = useState([
//     {
//       No: 1,
//       Date_Order: "2022-01-01",
//       Company_Name: "John Doe",
//       JPY: 9,
//       VND: 1,
//       USD: 1,
//     },
//     {
//       No: 2,
//       Date_Order: "2022-01-01",
//       Company_Name: "John Doe",
//       JPY: 9,
//       VND: 1,
//       USD: 1,
//     },
//     {
//       No: 3,
//       Date_Order: "2022-01-01",
//       Company_Name: "John Doe",
//       JPY: 9,
//       VND: 1,
//       USD: 1,
//     },
//     {
//       No: 4,
//       Date_Order: "2022-01-01",
//       Company_Name: "John Doe",
//       JPY: 9,
//       VND: 1,
//       USD: 1,
//     },
//     {
//       No: 5,
//       Date_Order: "2022-01-01",
//       Company_Name: "John Doe",
//       JPY: 9,
//       VND: 1,
//       USD: 1,
//     },
//   ]);

//   const [selectedRows_Order, setSelectedRows_Order] = useState([]);
//   const [selectAll_Order, setSelectAll_Order] = useState(false);

//   const handleRowCheckboxChange_Order = (index) => {
//     const newSelectedRows = [...selectedRows_Order];
//     newSelectedRows[index] = !newSelectedRows[index];
//     setSelectedRows_Order(newSelectedRows);
//   };

//   const handleSelectAllCheckboxChange_Order = () => {
//     setSelectAll_Order(!selectAll_Order);
//     const newSelectedRows = new Array(dataOrder.length).fill(!selectAll_Order);
//     setSelectedRows_Order(newSelectedRows);
//   };

//   //PAYMENT MANAGEMENT
//   // eslint-disable-next-line no-unused-vars
//   const [data_Payment, setData_Payment] = useState([
//     {
//       No: 1,
//       Date_of_payment: "2023-01-01",
//       Company_Name: "John Doe",
//       JPY: 9,
//       VND: 1,
//       USD: 1,
//     },
//     {
//       No: 2,
//       Date_of_payment: "2023-01-01",
//       Company_Name: "John Doe",
//       JPY: 9,
//       VND: 1,
//       USD: 1,
//     },
//     {
//       No: 3,
//       Date_of_payment: "2023-01-01",
//       Company_Name: "John Doe",
//       JPY: 9,
//       VND: 1,
//       USD: 1,
//     },
//     {
//       No: 4,
//       Date_of_payment: "2023-01-01",
//       Company_Name: "John Doe",
//       JPY: 9,
//       VND: 1,
//       USD: 1,
//     },
//     {
//       No: 5,
//       Date_of_payment: "2023-01-01",
//       Company_Name: "John Doe",
//       JPY: 9,
//       VND: 1,
//       USD: 1,
//     },
//   ]);

//   const [selectedRows_Payment, setSelectedRows_Payment] = useState([]);
//   const [selectAll_Payment, setSelectAll_Payment] = useState(false);

//   const handleRowCheckboxChange_Payment = (index) => {
//     const newSelectedRows = [...selectedRows_Payment];
//     newSelectedRows[index] = !newSelectedRows[index];
//     setSelectedRows_Payment(newSelectedRows);
//   };

//   const handleSelectAllCheckboxChange_Payment = () => {
//     setSelectAll_Payment(!selectAll_Payment);
//     const newSelectedRows = new Array(dataOrder.length).fill(
//       !selectAll_Payment
//     );
//     setSelectedRows_Payment(newSelectedRows);
//   };

//   //OUTSOURCING COST
//   // eslint-disable-next-line no-unused-vars
//   const [data_Outsourcing, setData_Outsourcing] = useState([
//     {
//       No: 1,
//       Outsourcing_Project: "Management",
//       Company_Name: "John Doe",
//       JPY: 9,
//       VND: 1,
//       USD: 1,
//     },
//     {
//       No: 2,
//       Outsourcing_Project: "Management",
//       Company_Name: "John Doe",
//       JPY: 9,
//       VND: 1,
//       USD: 1,
//     },
//     {
//       No: 3,
//       Outsourcing_Project: "Management",
//       Company_Name: "John Doe",
//       JPY: 9,
//       VND: 1,
//       USD: 1,
//     },
//     {
//       No: 4,
//       Outsourcing_Project: "Management",
//       Company_Name: "John Doe",
//       JPY: 9,
//       VND: 1,
//       USD: 1,
//     },
//     {
//       No: 5,
//       Outsourcing_Project: "Management",
//       Company_Name: "John Doe",
//       JPY: 9,
//       VND: 1,
//       USD: 1,
//     },
//   ]);

//   const [selectedRows_Outsourcing, setSelectedRows_Outsourcing] = useState([]);
//   const [selectAll_Outsourcing, setSelectAll_Outsourcing] = useState(false);

//   const handleRowCheckboxChange_Outsourcing = (index) => {
//     const newSelectedRows = [...selectedRows_Outsourcing];
//     newSelectedRows[index] = !newSelectedRows[index];
//     setSelectedRows_Outsourcing(newSelectedRows);
//   };

//   const handleSelectAllCheckboxChange_Outsourcing = () => {
//     setSelectAll_Outsourcing(!selectAll_Outsourcing);
//     const newSelectedRows = new Array(dataOrder.length).fill(
//       !selectAll_Outsourcing
//     );
//     setSelectedRows_Outsourcing(newSelectedRows);
//   };
//   const [page, setPage] = useState(1);
//   const handleChangePage = (newPage) => {
//     // Implement your logic for changing the page here
//     setPage(newPage);
//     console.log(`Changing to page ${newPage}`);
//   };

//   return (
//     <div className="">
//       <MonthYearPicker
//         selectedDate={selectedDate}
//         setSelectedDate={setSelectedDate}
//         className="ml-4 bg-white w-64"
//       />
//       {/* Order */}
//       <div
//         id="contentInvoiceDetail"
//         className={` relative bg-main-theme pb-5 h-full
//         col-span-full
//        `}
//       >
//         {/* control area */}
//         <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4  bg-white rounded-[16px] overflow-x-auto">
//           <div className="grid  gap-2 items-center w-full overflow-auto ">
//             <div className="flex items-center justify-between">
//               <div className="mt-1 px-6 flex flex-row items-center">
//                 <svg
//                   viewBox="0 0 34 27"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 mr-2"
//                 >
//                   <path
//                     d="M32.006 0.00320557C28.7713 0.186782 22.342 0.854977 18.373 3.28456C18.0991 3.4522 17.9439 3.75029 17.9439 4.06196V25.5404C17.9439 26.2222 18.6894 26.6531 19.318 26.3367C23.4016 24.2813 29.3073 23.7206 32.2274 23.5671C33.2244 23.5146 33.9994 22.7153 33.9994 21.7573V1.81536C34 0.769977 33.0933 -0.0581833 32.006 0.00320557ZM15.6264 3.28456C11.658 0.854977 5.22868 0.187372 1.99396 0.00320557C0.906667 -0.0581833 0 0.769977 0 1.81536V21.7579C0 22.7165 0.775035 23.5157 1.77201 23.5677C4.6933 23.7212 10.602 24.2825 14.6855 26.339C15.3124 26.6548 16.0556 26.2245 16.0556 25.5445V4.05133C16.0556 3.73907 15.9009 3.45279 15.6264 3.28456Z"
//                     fill="black"
//                   />
//                 </svg>
//                 <span className="font-bold"> {t_order("title.orders")}</span>
//               </div>

//               <div className="flex flex-row">
//                 <Button
//                   onClick={() => updateState({ isShowFormNewOrder: true })}
//                   icon={
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 21 18"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M15.75 9.9H11.55V13.5H9.45V9.9H5.25V8.1H9.45V4.5H11.55V8.1H15.75M10.5 0C9.12112 0 7.75574 0.232792 6.48182 0.685084C5.2079 1.13738 4.05039 1.80031 3.07538 2.63604C1.10625 4.32387 0 6.61305 0 9C0 11.3869 1.10625 13.6761 3.07538 15.364C4.05039 16.1997 5.2079 16.8626 6.48182 17.3149C7.75574 17.7672 9.12112 18 10.5 18C13.2848 18 15.9555 17.0518 17.9246 15.364C19.8938 13.6761 21 11.3869 21 9C21 7.8181 20.7284 6.64778 20.2007 5.55585C19.6731 4.46392 18.8996 3.47177 17.9246 2.63604C16.9496 1.80031 15.7921 1.13738 14.5182 0.685084C13.2443 0.232792 11.8789 0 10.5 0Z"
//                         fill="white"
//                       />
//                     </svg>
//                   }
//                 >
//                   {t_order("button.add")}
//                 </Button>

//                 <Button
//                   onClick={() => updateState({ isShowDeleteModal_Order: true })}
//                   className="bg-red ml-2"
//                   icon={
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 19 18"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M9.5 18C6.98044 18 4.56408 17.0518 2.78249 15.364C1.00089 13.6761 0 11.3869 0 9C0 6.61305 1.00089 4.32387 2.78249 2.63604C4.56408 0.948212 6.98044 0 9.5 0C12.0196 0 14.4359 0.948212 16.2175 2.63604C17.9991 4.32387 19 6.61305 19 9C19 11.3869 17.9991 13.6761 16.2175 15.364C14.4359 17.0518 12.0196 18 9.5 18ZM14.25 8.1H4.75V9.9H14.25V8.1Z"
//                         fill="white"
//                       />
//                     </svg>
//                   }
//                 >
//                   {t_order("button.delete")}
//                 </Button>
//               </div>
//             </div>
//           </div>
//           <table id="invoiceTable" className="w-full">
//             <thead>
//               <tr>
//                 <th className="w-[1%]">
//                   <input
//                     type="checkbox"
//                     checked={selectAll_Order}
//                     onChange={handleSelectAllCheckboxChange_Order}
//                   />
//                 </th>
//                 <th className="w-[10%]">No</th>
//                 <th className="w-[20%]">
//                   {t_order("header_table_order.order_date")}
//                 </th>
//                 <th className="w-[25%]">
//                   {t_order("header_table_order.Company_name")}
//                 </th>
//                 <th className="w-[10%]">JPY</th>
//                 <th className="w-[10%]">VND</th>
//                 <th className="w-[10%]">USD</th>
//                 <th className="w-[10%]">
//                   {t_order("header_table_order.Action")}
//                 </th>
//                 <th className="w-[1%]"></th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="">
//                 <td colSpan={100}></td>
//               </tr>

//               {dataOrder.map((rowDataOrder, index) => (
//                 <tr key={index}>
//                   <td className="w-[3%]">
//                     <input
//                       type="checkbox"
//                       checked={selectedRows_Order[index]}
//                       onChange={() => handleRowCheckboxChange_Order(index)}
//                     />
//                   </td>
//                   <td className="w-[10%]" name="tb_no">
//                     {rowDataOrder.No}
//                   </td>
//                   <td className="w-[10%]" name="tb_date">
//                     {rowDataOrder.Date_Order}
//                   </td>
//                   <td className="w-[10%]" name="tb_name">
//                     {rowDataOrder.Company_Name}
//                   </td>
//                   <td className="w-[10%]" name="tb_jyp">
//                     {rowDataOrder.JPY}
//                   </td>
//                   <td className="w-[10%] overflow-x-hidden" name="tb_vnd">
//                     {rowDataOrder.VND}
//                   </td>
//                   <td
//                     className="max-w-[10%] min-w-[10%] w-[10%] overflow-x-hidden overflow-scroll"
//                     name="tb_usd"
//                   >
//                     {rowDataOrder.USD}
//                   </td>
//                   <td className="w-[8%]" name="tb_action">
//                     <div className=" flex justify-center py-1 mx-1 bg-white  border-gray-500/50 border rounded-sm ">
//                       <svg
//                         onClick={() =>
//                           updateState({ isShowFormEditOrder: true })
//                         }
//                         className="cursor-pointer"
//                         width="19"
//                         height="19"
//                         viewBox="0 0 19 19"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
//                           fill="#FFC107"
//                         />
//                         <path
//                           d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
//                           fill="black"
//                           fillOpacity="0.2"
//                         />
//                       </svg>
//                       <div className=" border border-gray-400 mx-2 "></div>

//                       <svg
//                         className="cursor-pointer"
//                         onClick={() =>
//                           updateState({ isShowDeleteModal_Order: true })
//                         }
//                         width="19"
//                         height="19"
//                         viewBox="0 0 16 18"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
//                           fill="#F44336"
//                         />
//                         <path
//                           d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
//                           fill="black"
//                           fillOpacity="0.2"
//                         />
//                       </svg>
//                     </div>
//                   </td>
//                   <td className="w-[1%]"></td>
//                 </tr>
//               ))}

//               <tr className="bg-main-theme h-[0px] py-0 my-0">
//                 <td colSpan={100}></td>
//               </tr>
//             </tbody>
//           </table>
//           <div className=" flex-1  flex justify-end mt-5">
//             {/* flex-shrink-0 */}
//             <Pagination
//               changePage={handleChangePage}
//               page={page} // Pass your current page value
//               totalPage={5} // Pass your total page value
//             />
//           </div>
//         </div>
//       </div>

//       {/* Payment Management */}
//       <div
//         id="contentInvoiceDetail"
//         className={` relative bg-main-theme pb-5 h-full ${
//           isShowAsideFilter ? "col-span-10" : "col-span-full"
//         }`}
//       >
//         {/* control area */}
//         <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4  bg-white rounded-[16px] overflow-x-auto ">
//           <div className="grid  gap-2 items-center w-full overflow-auto ">
//             <div className="flex items-center justify-between">
//               <div className="mt-1 px-6 flex flex-row items-center">
//                 <svg
//                   viewBox="0 0 34 27"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 mr-2"
//                 >
//                   <path
//                     d="M32.006 0.00320557C28.7713 0.186782 22.342 0.854977 18.373 3.28456C18.0991 3.4522 17.9439 3.75029 17.9439 4.06196V25.5404C17.9439 26.2222 18.6894 26.6531 19.318 26.3367C23.4016 24.2813 29.3073 23.7206 32.2274 23.5671C33.2244 23.5146 33.9994 22.7153 33.9994 21.7573V1.81536C34 0.769977 33.0933 -0.0581833 32.006 0.00320557ZM15.6264 3.28456C11.658 0.854977 5.22868 0.187372 1.99396 0.00320557C0.906667 -0.0581833 0 0.769977 0 1.81536V21.7579C0 22.7165 0.775035 23.5157 1.77201 23.5677C4.6933 23.7212 10.602 24.2825 14.6855 26.339C15.3124 26.6548 16.0556 26.2245 16.0556 25.5445V4.05133C16.0556 3.73907 15.9009 3.45279 15.6264 3.28456Z"
//                     fill="black"
//                   />
//                 </svg>
//                 <span className="font-bold">
//                   {t_order("title.Payment_management")}
//                 </span>
//               </div>

//               <div className="flex flex-row">
//                 <Button
//                   onClick={() => updateState({ isShowFormNewPayment: true })}
//                   icon={
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 21 18"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M15.75 9.9H11.55V13.5H9.45V9.9H5.25V8.1H9.45V4.5H11.55V8.1H15.75M10.5 0C9.12112 0 7.75574 0.232792 6.48182 0.685084C5.2079 1.13738 4.05039 1.80031 3.07538 2.63604C1.10625 4.32387 0 6.61305 0 9C0 11.3869 1.10625 13.6761 3.07538 15.364C4.05039 16.1997 5.2079 16.8626 6.48182 17.3149C7.75574 17.7672 9.12112 18 10.5 18C13.2848 18 15.9555 17.0518 17.9246 15.364C19.8938 13.6761 21 11.3869 21 9C21 7.8181 20.7284 6.64778 20.2007 5.55585C19.6731 4.46392 18.8996 3.47177 17.9246 2.63604C16.9496 1.80031 15.7921 1.13738 14.5182 0.685084C13.2443 0.232792 11.8789 0 10.5 0Z"
//                         fill="white"
//                       />
//                     </svg>
//                   }
//                 >
//                   {t_order("button.add")}
//                 </Button>

//                 <Button
//                   onClick={() =>
//                     updateState({ isShowDeleteModal_Payment: true })
//                   }
//                   className="bg-red ml-2"
//                   icon={
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 19 18"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M9.5 18C6.98044 18 4.56408 17.0518 2.78249 15.364C1.00089 13.6761 0 11.3869 0 9C0 6.61305 1.00089 4.32387 2.78249 2.63604C4.56408 0.948212 6.98044 0 9.5 0C12.0196 0 14.4359 0.948212 16.2175 2.63604C17.9991 4.32387 19 6.61305 19 9C19 11.3869 17.9991 13.6761 16.2175 15.364C14.4359 17.0518 12.0196 18 9.5 18ZM14.25 8.1H4.75V9.9H14.25V8.1Z"
//                         fill="white"
//                       />
//                     </svg>
//                   }
//                 >
//                   {t_order("button.delete")}
//                 </Button>
//               </div>
//             </div>
//           </div>
//           <table id="invoiceTable" className="w-full">
//             <thead>
//               <tr>
//                 <th className="w-[3%]">
//                   <input
//                     type="checkbox"
//                     checked={selectAll_Payment}
//                     onChange={handleSelectAllCheckboxChange_Payment}
//                   />
//                 </th>
//                 <th className="w-[10%]">No</th>
//                 <th className="w-[20%]">
//                   {t_order("header_table_order.Date_of_payment")}
//                 </th>
//                 <th className="w-[25%]">
//                   {t_order("header_table_order.Company_name")}
//                 </th>
//                 <th className="w-[10%]">JPY</th>
//                 <th className="w-[10%]">VND</th>
//                 <th className="w-[10%]">USD</th>
//                 <th className="w-[10%]">
//                   {t_order("header_table_order.Action")}
//                 </th>
//                 <th className="w-[1%]"></th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="">
//                 <td colSpan={100}></td>
//               </tr>

//               {data_Payment.map((rowData_Payment, index) => (
//                 <tr key={index}>
//                   <td className="w-[1%]">
//                     <input
//                       type="checkbox"
//                       checked={selectedRows_Payment[index]}
//                       onChange={() => handleRowCheckboxChange_Payment(index)}
//                     />
//                   </td>
//                   <td className="w-[10%]" name="tb_no">
//                     {rowData_Payment.No}
//                   </td>
//                   <td className="w-[10%]" name="tb_date">
//                     {rowData_Payment.Date_of_payment}
//                   </td>
//                   <td className="w-[10%]" name="tb_name">
//                     {rowData_Payment.Company_Name}
//                   </td>
//                   <td className="w-[10%]" name="tb_jyp">
//                     {rowData_Payment.JPY}
//                   </td>
//                   <td className="w-[10%] overflow-x-hidden" name="tb_vnd">
//                     {rowData_Payment.VND}
//                   </td>
//                   <td
//                     className="max-w-[10%] min-w-[10%] w-[10%] overflow-x-hidden overflow-scroll"
//                     name="tb_usd"
//                   >
//                     {rowData_Payment.USD}
//                   </td>
//                   <td className="w-[8%]" name="tb_action">
//                     <div className=" flex justify-center py-1 mx-1 bg-white  border-gray-500/50 border rounded-sm ">
//                       <svg
//                         onClick={() =>
//                           updateState({ isShowFormEditPayment: true })
//                         }
//                         className="cursor-pointer"
//                         width="19"
//                         height="19"
//                         viewBox="0 0 19 19"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
//                           fill="#FFC107"
//                         />
//                         <path
//                           d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
//                           fill="black"
//                           fillOpacity="0.2"
//                         />
//                       </svg>
//                       <div className=" border border-gray-400 mx-2 "></div>

//                       <svg
//                         className="cursor-pointer"
//                         onClick={() =>
//                           updateState({ isShowDeleteModal_Payment: true })
//                         }
//                         width="19"
//                         height="19"
//                         viewBox="0 0 16 18"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
//                           fill="#F44336"
//                         />
//                         <path
//                           d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
//                           fill="black"
//                           fillOpacity="0.2"
//                         />
//                       </svg>
//                     </div>
//                   </td>
//                   <td className="w-[1%]"></td>
//                 </tr>
//               ))}

//               <tr className="bg-main-theme h-[0px] py-0 my-0">
//                 <td colSpan={100}></td>
//               </tr>
//             </tbody>
//           </table>
//           <div className=" flex-1  flex justify-end mt-5">
//             {/* flex-shrink-0 */}
//             <Pagination
//               changePage={handleChangePage}
//               page={1} // Pass your current page value
//               totalPage={5} // Pass your total page value
//             />
//           </div>
//         </div>
//       </div>

//       {/* Outsourcing cost */}
//       <div
//         id="contentInvoiceDetail"
//         className={` relative bg-main-theme pb-5 h-full ${
//           isShowAsideFilter ? "col-span-10" : "col-span-full"
//         }`}
//       >
//         {/* control area */}
//         <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4 bg-white rounded-[16px]">
//           <div className="grid gap-2 items-center w-full overflow-auto">
//             <div className="flex items-center justify-between">
//               <div className="mt-1 px-6 flex flex-row items-center">
//                 <svg
//                   viewBox="0 0 34 27"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="w-5 h-5 mr-2"
//                 >
//                   <path
//                     d="M32.006 0.00320557C28.7713 0.186782 22.342 0.854977 18.373 3.28456C18.0991 3.4522 17.9439 3.75029 17.9439 4.06196V25.5404C17.9439 26.2222 18.6894 26.6531 19.318 26.3367C23.4016 24.2813 29.3073 23.7206 32.2274 23.5671C33.2244 23.5146 33.9994 22.7153 33.9994 21.7573V1.81536C34 0.769977 33.0933 -0.0581833 32.006 0.00320557ZM15.6264 3.28456C11.658 0.854977 5.22868 0.187372 1.99396 0.00320557C0.906667 -0.0581833 0 0.769977 0 1.81536V21.7579C0 22.7165 0.775035 23.5157 1.77201 23.5677C4.6933 23.7212 10.602 24.2825 14.6855 26.339C15.3124 26.6548 16.0556 26.2245 16.0556 25.5445V4.05133C16.0556 3.73907 15.9009 3.45279 15.6264 3.28456Z"
//                     fill="black"
//                   />
//                 </svg>
//                 <span className="font-bold">
//                   {t_order("title.Outsourcing_cost")}
//                 </span>
//               </div>

//               <div className="flex flex-row">
//                 <Button
//                   onClick={() =>
//                     updateState({ isShowFormNewOutsourcing: true })
//                   }
//                   icon={
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 21 18"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M15.75 9.9H11.55V13.5H9.45V9.9H5.25V8.1H9.45V4.5H11.55V8.1H15.75M10.5 0C9.12112 0 7.75574 0.232792 6.48182 0.685084C5.2079 1.13738 4.05039 1.80031 3.07538 2.63604C1.10625 4.32387 0 6.61305 0 9C0 11.3869 1.10625 13.6761 3.07538 15.364C4.05039 16.1997 5.2079 16.8626 6.48182 17.3149C7.75574 17.7672 9.12112 18 10.5 18C13.2848 18 15.9555 17.0518 17.9246 15.364C19.8938 13.6761 21 11.3869 21 9C21 7.8181 20.7284 6.64778 20.2007 5.55585C19.6731 4.46392 18.8996 3.47177 17.9246 2.63604C16.9496 1.80031 15.7921 1.13738 14.5182 0.685084C13.2443 0.232792 11.8789 0 10.5 0Z"
//                         fill="white"
//                       />
//                     </svg>
//                   }
//                 >
//                   {t_order("button.add")}
//                 </Button>

//                 <Button
//                   onClick={() =>
//                     updateState({ isShowDeleteModal_Outsourcing: true })
//                   }
//                   className="bg-red ml-2"
//                   icon={
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 19 18"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M9.5 18C6.98044 18 4.56408 17.0518 2.78249 15.364C1.00089 13.6761 0 11.3869 0 9C0 6.61305 1.00089 4.32387 2.78249 2.63604C4.56408 0.948212 6.98044 0 9.5 0C12.0196 0 14.4359 0.948212 16.2175 2.63604C17.9991 4.32387 19 6.61305 19 9C19 11.3869 17.9991 13.6761 16.2175 15.364C14.4359 17.0518 12.0196 18 9.5 18ZM14.25 8.1H4.75V9.9H14.25V8.1Z"
//                         fill="white"
//                       />
//                     </svg>
//                   }
//                 >
//                   {t_order("button.delete")}
//                 </Button>
//               </div>
//             </div>
//           </div>
//           <table id="invoiceTable" className="w-full">
//             <thead>
//               <tr>
//                 <th className="w-[3%]">
//                   <input
//                     type="checkbox"
//                     checked={selectAll_Outsourcing}
//                     onChange={handleSelectAllCheckboxChange_Outsourcing}
//                   />
//                 </th>
//                 <th className="w-[10%]">No</th>
//                 <th className="w-[20%]">
//                   {t_order("header_table_order.Outsourced_project")}
//                 </th>
//                 <th className="w-[25%]">
//                   {t_order("header_table_order.Company_name")}
//                 </th>
//                 <th className="w-[10%]">JPY</th>
//                 <th className="w-[10%]">VND</th>
//                 <th className="w-[10%]">USD</th>
//                 <th className="w-[10%]">
//                   {t_order("header_table_order.Action")}
//                 </th>
//                 <th className="w-[1%]"></th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="">
//                 <td colSpan={100}></td>
//               </tr>

//               {data_Outsourcing.map((rowData_Outsourcing, index) => (
//                 <tr key={index}>
//                   <td className="w-[1%]">
//                     <input
//                       type="checkbox"
//                       checked={selectedRows_Outsourcing[index]}
//                       onChange={() =>
//                         handleRowCheckboxChange_Outsourcing(index)
//                       }
//                     />
//                   </td>
//                   <td className="w-[10%]" name="tb_no">
//                     {rowData_Outsourcing.No}
//                   </td>
//                   <td className="w-[10%]" name="tb_Outsourcing_Project">
//                     {rowData_Outsourcing.Outsourcing_Project}
//                   </td>
//                   <td className="w-[10%]" name="tb_name">
//                     {rowData_Outsourcing.Company_Name}
//                   </td>
//                   <td className="w-[10%]" name="tb_jyp">
//                     {rowData_Outsourcing.JPY}
//                   </td>
//                   <td className="w-[10%] overflow-x-hidden" name="tb_vnd">
//                     {rowData_Outsourcing.VND}
//                   </td>
//                   <td
//                     className="max-w-[10%] min-w-[10%] w-[10%] overflow-x-hidden overflow-scroll"
//                     name="tb_usd"
//                   >
//                     {rowData_Outsourcing.USD}
//                   </td>
//                   <td className="w-[8%]" name="tb_action">
//                     <div className=" flex justify-center py-1 mx-1 bg-white  border-gray-500/50 border rounded-sm ">
//                       <svg
//                         onClick={() =>
//                           updateState({ isShowFormEditOutsourcing: true })
//                         }
//                         className="cursor-pointer"
//                         width="19"
//                         height="19"
//                         viewBox="0 0 19 19"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
//                           fill="#FFC107"
//                         />
//                         <path
//                           d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
//                           fill="black"
//                           fillOpacity="0.2"
//                         />
//                       </svg>
//                       <div className=" border border-gray-400 mx-2 "></div>

//                       <svg
//                         className="cursor-pointer"
//                         onClick={() =>
//                           updateState({ isShowDeleteModal_Outsourcing: true })
//                         }
//                         width="19"
//                         height="19"
//                         viewBox="0 0 16 18"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
//                           fill="#F44336"
//                         />
//                         <path
//                           d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
//                           fill="black"
//                           fillOpacity="0.2"
//                         />
//                       </svg>
//                     </div>
//                   </td>
//                   <td className="w-[1%]"></td>
//                 </tr>
//               ))}

//               <tr className="bg-main-theme h-[0px] py-0 my-0">
//                 <td colSpan={100}></td>
//               </tr>
//             </tbody>
//           </table>
//           <div className=" flex-1  flex justify-end mt-5">
//             {/* flex-shrink-0 */}
//             <Pagination
//               changePage={handleChangePage}
//               page={1} // Pass your current page value
//               totalPage={5} // Pass your total page value
//             />
//           </div>
//         </div>
//       </div>
//       <AddOrderForm
//         // eslint-disable-next-line no-undef
//         visible={isShowFormNewOrder}
//         t={t_order}
//         cancel={() => {
//           updateState({ isShowFormNewOrder: false });
//         }}
//       />
//       <AddPaymentManagementForm
//         // eslint-disable-next-line no-undef
//         visible={isShowFormNewPayment}
//         t={t_order}
//         cancel={() => {
//           updateState({ isShowFormNewPayment: false });
//         }}
//       />
//       <AddOutsourcingForm
//         // eslint-disable-next-line no-undef
//         visible={isShowFormNewOutsourcing}
//         t={t_order}
//         cancel={() => {
//           updateState({ isShowFormNewOutsourcing: false });
//         }}
//       />
//       <EditOrderForm
//         // eslint-disable-next-line no-undef
//         visible={isShowFormEditOrder}
//         t={t_order}
//         cancel={() => {
//           updateState({ isShowFormEditOrder: false });
//         }}
//       />
//       <EditPaymentManagementForm
//         // eslint-disable-next-line no-undef
//         visible={isShowFormEditPayment}
//         t={t_order}
//         cancel={() => {
//           updateState({ isShowFormEditPayment: false });
//         }}
//       />
//       <EditOutsourcingForm
//         // eslint-disable-next-line no-undef
//         visible={isShowFormEditOutsourcing}
//         t={t_order}
//         cancel={() => {
//           updateState({ isShowFormEditOutsourcing: false });
//         }}
//       />
//       <DeleteOrder
//         // eslint-disable-next-line no-undef
//         visible={isShowDeleteModal_Order}
//         t={t_order}
//         cancel={() => {
//           updateState({ isShowDeleteModal_Order: false });
//         }}
//       />
//       <DeleteOutsourcing
//         // eslint-disable-next-line no-undef
//         visible={isShowDeleteModal_Outsourcing}
//         t={t_order}
//         cancel={() => {
//           updateState({ isShowDeleteModal_Outsourcing: false });
//         }}
//       />
//       <DeletePaymentManagement
//         // eslint-disable-next-line no-undef
//         visible={isShowDeleteModal_Payment}
//         t={t_order}
//         cancel={() => {
//           updateState({ isShowDeleteModal_Payment: false });
//         }}
//       />
//     </div>
//   );
// };

// export default Order;

// Order.js
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../../Utils/contexts/app.context";
import Button from "../../../../Utils/Button";
import Pagination from "../../../../Utils/Pagination";
import AddOrderForm from "./Dialog/AddOrderForm";
import EditOrderForm from "./Dialog/EditOrderForm";
import DeleteOrder from "./Dialog/DeleteOrder";
import { useTranslation } from "react-i18next";
import MonthYearPicker from "../../../../Utils/MonthYearPicker";
import Modal from "../../../../Utils/Modal/Modal";
import {
  getOrderByYearAndMonths,
  deleteOrderByIds,
  getExChangeRateByMonthYear,
} from "../Controller"; // Import the deleteOrderByIds function
import "./style.css";

const Component_Order = () => {
  const { showToast } = useContext(AppContext);
  const { t } = useTranslation();
  const t_order = t;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [state, setState] = useState({
    isShowDeleteModal_Order: false,
    isShowFormNewOrder: false,
    isShowFormEditOrder: false,
    isShowWarringModal: false,
    selectedRowOrder_Edit: null,
  });
  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const [idExRate, setIdRate] = useState(false);
  const [dataExRate, setDataExRate] = useState([]);

  const fetchExchangeRate = async () => {
    try {
      const [status, response] = await getExChangeRateByMonthYear(
        selectedDate.getMonth() + 1,
        selectedDate.getFullYear()
      );
      if (status == 200 && response.success == false) {
        console.log("Setting idExRate to false");
        setIdRate(false);
        return;
      } else {
        setDataExRate(response?.data[0].id);
        console.log(dataExRate);
        console.log(dataExRate);
        setIdRate(true);
        console.log("Setting idExRate to true");
      }
    } catch (error) {
      console.log("Error fetching exchange rate:", error);
      setIdRate(false);
    } finally {
      console.log("Final idExRate:", idExRate);
    }
  };
  //Order
  const [dataOrder, setDataOrder] = useState([]);
  const [selectedRows_Order, setSelectedRows_Order] = useState([]);
  const [currentPage_Order, setCurrentPage_Order] = useState(1);
  const [totalPages_Order, setTotalPages_Order] = useState(1);
  const [selectedOrderIds, setSelectedOrderIds] = useState([]); // New state to store selected order IDs

  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  const handleRowCheckboxChange_Order = (index) => {
    const orderId = dataOrder[index].id;
    const newSelectedRows = [...selectedRows_Order];
    newSelectedRows[index] = !newSelectedRows[index];
    setSelectedRows_Order(newSelectedRows);

    setSelectedOrderIds((prevSelectedOrderIds) => {
      if (newSelectedRows[index]) {
        return [...prevSelectedOrderIds, orderId];
      } else {
        return prevSelectedOrderIds.filter((id) => id !== orderId);
      }
    });
  };

  const [selectAllPages_Order, setSelectAllPages_Order] = useState([false]);
  const handleSelectAllCheckboxChange_Order = () => {
    // Use the current page to determine the index in the array
    const pageIndex = currentPage_Order - 1;

    setSelectAllPages_Order((prevSelectAllPages) => {
      const newSelectAllPages = [...prevSelectAllPages];
      newSelectAllPages[pageIndex] = !newSelectAllPages[pageIndex];
      return newSelectAllPages;
    });

    const newSelectedRows = new Array(dataOrder.length).fill(
      !selectAllPages_Order[pageIndex]
    );
    setSelectedRows_Order(newSelectedRows);

    setSelectedOrderIds((prevSelectedOrderIds) => {
      if (!selectAllPages_Order[pageIndex]) {
        // If selecting all, concatenate all order IDs from the current page
        const currentPageOrderIds = dataOrder.map((order) => order.id);
        return [...prevSelectedOrderIds, ...currentPageOrderIds];
      } else {
        // If deselecting all, remove all order IDs from the current page
        return prevSelectedOrderIds.filter(
          (id) => !dataOrder.map((order) => order.id).includes(id)
        );
      }
    });
  };

  const handleChangePage_Order = (newPage) => {
    setCurrentPage_Order(newPage);
  };

  // eslint-disable-next-line no-unused-vars
  const deleteOrder = async () => {
    try {
      await deleteOrderByIds(selectedOrderIds);
      // Clear selected order IDs after successful deletion
      setSelectedOrderIds([]);
      setCurrentPage_Order(1);
      fetchData_Order();
      updateState({ isShowDeleteModal_Order: false });
      showToast.success("Delete successfully!");
    } catch (error) {
      console.error("Error deleting orders:", error);
    }
  };
  const fetchData_Order = async () => {
    try {
      const response = await getOrderByYearAndMonths(
        selectedDate,
        currentPage_Order
      );

      console.log("API Response:", response);

      if (response && response.pagination) {
        if (response.orders === null) {
          setTotalPages_Order(1);
          setCurrentPage_Order(1);
        } else {
          setDataOrder((prevData) => {
            console.log("Previous Data:", prevData);
            return response.orders || [];
          });
          setTotalPages_Order(response.pagination.total_pages);

          // Check and update selectedRows_Order based on selectedOrderIds
          const newSelectedRows = new Array(response.orders.length).fill(false);
          response.orders.forEach((order, index) => {
            if (selectedOrderIds.includes(order.id)) {
              newSelectedRows[index] = true;
            }
          });
          setSelectedRows_Order(newSelectedRows);
          // setSelectedRow_Order([]);
        }
      } else {
        console.error("Invalid response format:", response);
        setDataOrder([]);
        setTotalPages_Order(1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataOrder([]);
      setTotalPages_Order(1);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
    fetchData_Order();
  }, [selectedDate, currentPage_Order, selectedOrderIds]);

  return (
    <div className="">
      <MonthYearPicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        className="ml-4 bg-white w-64"
      />

      <div
        id="contentInvoiceDetail"
        className={`relative bg-main-theme pb-5 h-full col-span-full`}
      >
        <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4 bg-white rounded-[16px] overflow-x-auto">
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
                <span className="font-bold"> {t_order("title.orders")}</span>
              </div>

              <div className="flex flex-row">
                <Button
                  // onClick={() => updateState({ isShowFormNewOrder: true })}
                  onClick={() => {
                    console.log(idExRate);
                    if (idExRate === false) {
                      updateState({ isShowWarringModal: true });
                    } else {
                      updateState({ isShowFormNewOrder: true });
                    }
                  }}
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
          <div className="h-[235px] overflow-y-auto overflow-x-auto mt-4 text-sm">
            <table id="Table_Order" className="w-full">
              <thead>
                <tr>
                  <th className="w-1">
                    <input
                      type="checkbox"
                      checked={selectAllPages_Order[currentPage_Order - 1]}
                      onChange={handleSelectAllCheckboxChange_Order}
                    />
                  </th>
                  <th className="w-8">No</th>
                  <th className="w-24">
                    {t_order("header_table_order.order_date")}
                  </th>
                  <th className="w-32">
                    {t_order("header_table_order.Company_name")}
                  </th>
                  <th className="w-32">JPY</th>
                  <th className="w-32">VND</th>
                  <th className="w-32">USD</th>
                  <th className="w-8">
                    {t_order("header_table_order.Action")}
                  </th>
                  <th className="w-1"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="">
                  <td colSpan={100}></td>
                </tr>
                {dataOrder && dataOrder.length > 0 ? (
                  dataOrder.map((rowDataOrder, index) => (
                    <tr key={index}>
                      <td className="w-3">
                        <input
                          type="checkbox"
                          checked={selectedRows_Order[index]}
                          onChange={() => handleRowCheckboxChange_Order(index)}
                        />
                      </td>
                      <td className="w-8" name="tb_no">
                        {rowDataOrder.id}
                      </td>
                      <td className="w-24" name="tb_date">
                        <input
                          className="text-center"
                          readOnly
                          value={(rowDataOrder.order_date || "").split(" ")[0]}
                        />
                      </td>
                      <td className="w-32" name="tb_name">
                        <input
                          className="text-center"
                          readOnly
                          value={rowDataOrder.company_name}
                        />
                      </td>
                      <td className="w-32" name="tb_jyp">
                        <input
                          className="text-center"
                          readOnly
                          value={formatNumber(Math.round(rowDataOrder.jpy))}
                        />
                      </td>
                      <td className="w-32" name="tb_vnd">
                        <input
                          className="text-center"
                          readOnly
                          value={formatNumber(Math.round(rowDataOrder.vnd))}
                        />
                      </td>
                      <td className="w-32" name="tb_usd">
                        <input
                          className="text-center"
                          readOnly
                          value={formatNumber(Math.round(rowDataOrder.usd))}
                        />
                      </td>
                      <td className="w-8" name="tb_action">
                        <div className=" flex justify-center py-1 mx-1 bg-white  border-gray-500/50 border rounded-sm ">
                          <svg
                            onClick={() => {
                              updateState({ isShowFormEditOrder: true });
                              console.log(rowDataOrder);
                              updateState({
                                selectedRowOrder_Edit: rowDataOrder,
                              });
                              updateState({
                                selectedRowOrder_Edit: rowDataOrder,
                              });
                            }}
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={100} className="text-center">
                      DATA NOT FOUND
                    </td>
                  </tr>
                )}

                <tr className="bg-main-theme h-[0px] py-0 my-0">
                  <td colSpan={100}></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex-1 flex justify-end mt-5">
            <Pagination
              changePage={handleChangePage_Order}
              page={currentPage_Order}
              totalPage={totalPages_Order}
            />
          </div>
        </div>
      </div>
      {state.isShowWarringModal && (
        <Modal visible={state.isShowWarringModal}>
          <div className=" bg-white m-2 py-4 px-5 border-red-500 border-[3px] rounded-2xl flex flex-col">
            <span className=" uppercase mx-auto px-auto text-center bg-white-500/80 py-1 px-2 text-red-500 font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
              {/* TODO */}
              WARRING
            </span>

            <div className=" text-center pt-5 px-2 text-red-600 font-bold text-sm rounded-full  ">
              {/* TODO */}
              EXCHAGE RATE DATA OF THIS MONTH DOES NOT EXIST!
            </div>

            <div className="flex items-center justify-center space-x-5  px-4 mt-6 mb-7 ">
              <Button
                onClick={() => {
                  const inputElement =
                    document.getElementById("inputExRateJPY");
                  if (inputElement) {
                    inputElement.focus();
                  }
                  updateState({ isShowWarringModal: false });
                }}
                className={
                  " bg-red border-red-500 border-2 py-2 px-6 min-w-[120px]"
                }
              >
                OK
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <AddOrderForm
        visible={state.isShowFormNewOrder}
        t={t_order}
        cancel={() => updateState({ isShowFormNewOrder: false })}
        selectedDate={selectedDate}
        exchangeRateId={dataExRate}
        changeFirstPage={() => {
          updateState({ isShowFormNewOrder: false });
          fetchData_Order();
        }}
      />
      <EditOrderForm
        invoiceOrder={state.selectedRowOrder_Edit}
        visible={state.isShowFormEditOrder}
        t={t_order}
        selectedDate={selectedDate}
        exchangeRateId={dataExRate}
        cancel={() => {
          updateState({
            isShowFormEditOrder: false,
            selectedRowOrder_Edit: null,
          });
          fetchData_Order();
        }}
      />
      <DeleteOrder
        visible={state.isShowDeleteModal_Order}
        t={t_order}
        cancel={() => updateState({ isShowDeleteModal_Order: false })}
        deleteOrder={deleteOrder} // Pass the deleteOrder function to the DeleteOrder component
      />
    </div>
  );
};

export default Component_Order;
