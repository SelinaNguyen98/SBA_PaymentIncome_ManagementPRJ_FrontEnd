import "../../../Utils/style.css";
import "./styles.css";

// eslint-disable-next-line no-unused-vars
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../Utils/contexts/app.context";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import Button from "../../../Utils/Button";
import InvoiceDetailFooter from "./InvoicDetailFooter/InvoiceDetailFooter";
import Modal from "../../../Utils/Modal/Modal";
import NewPaymentForm from "./NewPaymentForm";
import MonthYearPicker from "../../../Utils/MonthYearPicker";
import EditPaymentForm from "./EditPaymentForm";

import {
  formatFloatToCustomString,
  formatNumberSeparator,
  formatStringMonthYearToDate,
} from "../../../Utils/utils/maths";
import { deletePaymentById, getPaymentsByYearAndMonths } from "./Controller";
import ExRateComponent from "./ExRateComponent";
import { useLocation } from "react-router-dom";

export default function InvoiceDetails() {
  const { t } = useTranslation();

  const [dataChangeTrigger, setDataChangeTrigger] = useState(false);
  const [idExRate, setIdRate] = useState(null);
  // const {
  //   register,
  //   handleSubmit,
  //   // eslint-disable-next-line no-unused-vars
  //   setError,
  //   setValue,
  //   // eslint-disable-next-line no-unused-vars
  //   formState: { errors },
  // } = useForm();
  const triggerData = () => {
    setDataChangeTrigger(!dataChangeTrigger);
  };

  const { showToast } = useContext(AppContext);

  // state theo doi cac modal
  const [stateControl, setStateControl] = useState({
    isShowConfirmModal: false,
    isShowFormNewPayment: false,
    isShowFormEditPayment: false,
    isShowWarringModal: false,
  });

  const {
    isShowConfirmModal,
    isShowFormNewPayment,
    isShowFormEditPayment,
    isShowWarringModal,
  } = stateControl;

  const updateState = (data) =>
    setStateControl(() => ({ ...stateControl, ...data }));

  const location = useLocation();
  const { state } = useLocation();

  const [selectedDate, setSelectedDate] = useState(() => {
    if (state) {
      const { month, year } = state;
      return formatStringMonthYearToDate(month, year);
    }
    const today = new Date();
    const monthT = today.getMonth() + 1;
    const yearT = today.getFullYear();
    return formatStringMonthYearToDate(monthT, yearT);
  }); //

  useEffect(() => {
    // Access the state object directly
    const { state } = location;

    // Check if state is defined before accessing its properties
    if (state) {
      const { month, year } = state;
      console.log("Month:", month);
      console.log("Year:", year);
    }
  }, [location.state]);

  // Bao gom tong so trang, page, du lieu table dang duoc chon
  const [stateTable, setStateTable] = useState({
    page: 1,
    totalPage: 1,
    dataTable: [],
    selectedRowData: null, // single delete
    //selectedListRowsData: [], //selectedRows_Order
   // isSelectedAllDataInvoice: false, //selectAllPages_Order
    // idExRate: null,
  });
  const [selectedListRowsData, setSelectedListRowsData] = useState([]);
  const [isSelectedAllDataInvoice, setIsSelectedAllDataInvoice] = useState([false]);
  const [selectedInvoicIds, setSelectedInvoiceIds] = useState([]); 
  const {
    totalPage,
    dataTable,
    selectedRowData,
    //selectedListRowsData,
    //isSelectedAllDataInvoice,
    page,
  } = stateTable;

  const updateStateTable = (dataTable) =>
    setStateTable(() => ({ ...stateTable, ...dataTable }));

  /// Handle Checkbox funtion
  const handleRowCheckboxChange_Invoice = (index) => {
    console.log(dataTable.payments[index].id)
    const invoiceId = dataTable.payments[index].id;
    console.log(selectedListRowsData);
    const newSelectedRows = [...selectedListRowsData];
    newSelectedRows[index] = !newSelectedRows[index];
    setSelectedListRowsData(newSelectedRows);
    setSelectedInvoiceIds((prevSelectedInvoiceIds) => {
      if (newSelectedRows[index]) {
        return [...prevSelectedInvoiceIds, invoiceId];
      } else {
        return prevSelectedInvoiceIds.filter((id) => id !== invoiceId);
      }
    });
  };


   const handleSelectAllCheckboxChange_Invoice = () => {
    // Use the current page to determine the index in the array
    const pageIndex = page - 1;

    setIsSelectedAllDataInvoice((prevSelectAllPages) => {
      const newSelectAllPages = [...prevSelectAllPages];
      newSelectAllPages[pageIndex] = !newSelectAllPages[pageIndex];
      return newSelectAllPages;
    });

    const newSelectedRows = new Array(dataTable.length).fill(
      !isSelectedAllDataInvoice[pageIndex]
    );
    setSelectedListRowsData(newSelectedRows);

    setSelectedInvoiceIds((prevSelectedInvoiceIds) => {
      if (!isSelectedAllDataInvoice[pageIndex]) {
        // If selecting all, concatenate all order IDs from the current page
        const currentPageInvoiceIds = dataTable.payments.map((invoice) => invoice.id);
        return [...prevSelectedInvoiceIds, ...currentPageInvoiceIds];
      } else {
        // If deselecting all, remove all order IDs from the current page
        return prevSelectedInvoiceIds.filter(
          (id) => !dataTable.payments.map((invoice) => invoice.id).includes(id)
        );
      }
    });
  };

  // const [page, setPage] = useState(1);
  const isFilterApplied = useRef(false);
  // const childInputExRateRef = useRef(null);

  // const focusChildInput = (ref) => {
  //   if (ref && ref.current) {
  //     ref.current.focus();
  //   }
  // };

  // TODO fake  data here
  const fetchInvoices = async () => {
    try {
      const response = await getPaymentsByYearAndMonths(
        selectedDate.getMonth() + 1,
        selectedDate.getFullYear(),
        page
      );

      updateStateTable({
        dataTable: response,
        totalPage: response?.pagination?.total_pages,
      });
       // Check and update selectedRows_Order based on selectedOrderIds
       const newSelectedRows = new Array(response.orders.length).fill(false);
       response.orders.forEach((invoice, index) => {
         if (selectedListRowsData.includes(invoice.id)) {
           newSelectedRows[index] = true;
         }
       });
       setSelectedListRowsData(newSelectedRows);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      console.log(selectedInvoicIds);
      const response = await deletePaymentById(selectedInvoicIds);
      setSelectedInvoiceIds([])
      // 1. Kiem tra du lieu co phai trang cuoi cung hay khong
      //    1.1 neu dau tien  cua trang >1 thi  set page ve page - 1
      //    1.2 nê dau tien cua trang 1 thi set ve 1
      // 2. Kiem tra neu khong phai dong dau tien thi loafd lai vs dataTriger thay doi
      fetchInvoices();
      // if(dataTable?.payments.length == 1 && page >= totalPage &&  )
      if (page == totalPage && dataTable?.payments.length == 1 && page != 1) {
        changePage(page - 1);
        return;
      }
      setDataChangeTrigger(!dataChangeTrigger);

      updateState({ isShowConfirmModal: false });
      showToast.success("Delete  successfully!");
      console.log(response);
      updateState({
        page: 1,
      });
    } catch (error) {
      console.log(error);
    } finally {
      updateState({ isShowConfirmModal: false });
    }
  };

  useEffect(() => {
    console.log("Filter change effect");
    console.log(page);
    isFilterApplied.current = true;
    updateStateTable({ page: 1 });
  }, [selectedDate]);

  useEffect(() => {
    if (isFilterApplied.current && page !== 1) {
      return;
    }

    console.log("Main effect");
    fetchInvoices();
  }, [selectedDate, page, dataChangeTrigger,selectedInvoicIds]);

  function changePage(page) {
    isFilterApplied.current = false;
    updateStateTable({ page: page });
  }

  return (
    <div className={` relative bg-main-theme pb-5 h-screen `}>
      {/* Lable */}
      <div className="mt-1 px-6 flex flex-shrink-0 items-center font-bold ">
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
        {t("navHeader.invoiceDetails")}
      </div>
      {/* control area */}
      <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4   bg-white rounded-[16px] ">
        <div className="grid  gap-2 items-center w-full ">
          <div className="flex items-center justify-between gap-2 flex-row max-[1390px]:flex-col">
            <div className="mt-1 px-6 flex flex-row items-center">
              <div className="gap-2 items-center flex flex-row max-[1000px]:flex-col">
                <MonthYearPicker
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  className="col-span-12 lg:col-span-2 max-[1000px]:w-full"
                />
                <ExRateComponent
                  t={t}
                  // fetchSaveRate={fetchSaveRate}
                  selectedDate={selectedDate}
                  triggerData={triggerData}
                  updateParentIdExRate={setIdRate}
                />
              </div>
            </div>

            <div className="flex flex-row">
              <Button
                onClick={() => {
                  console.log(idExRate);
                  if (idExRate === null) {
                    updateState({ isShowWarringModal: true });
                  } else {
                    updateState({ isShowFormNewPayment: true });
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
                {t("button.add")}
              </Button>

              <Button
                onClick={() => updateState({ isShowConfirmModal: true })}
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
                {t("button.delete")}
              </Button>
            </div>
          </div>
        </div>

        {/* table data */}
        <div className=" h-[430px] 2xl-plus:h-[600px] mt-2 overflow-x-auto ">
          <table className=" table-fixed  border-hidden w-full  min-w-[1000px]    ">
            <thead className="  py-2 bg-main-theme text-[11px] 2xl-plus:text-[16px] uppercase ">
              {/* Warring: The first tag td be liked left padding */}
              <th className="w-[2%] py-2 rounded-l-[10px]">
                <input
                  type="checkbox"
                  checked={isSelectedAllDataInvoice[page - 1]}
                  onChange={handleSelectAllCheckboxChange_Invoice}
                />
              </th>
              <th className=" w-[3%]"> NO</th>
              <th className=" w-[10%]">{t("page_payment_detail.date")}</th>
              <th className=" w-[10%]">{t("page_payment_detail.name")}</th>
              <th className=" w-[8%]"> JPY</th>
              <th className=" w-[8%]"> VND</th>
              <th className=" w-[8%]"> USD</th>
              <th className=" w-[10%]">{t("page_payment_detail.note")}</th>
              <th className=" w-[10%]">{t("page_payment_detail.journal")}</th>
              <th className=" w-[16%] ">{t("page_payment_detail.invoice")}</th>
              <th className=" w-[8%]">{t("page_payment_detail.pay")}</th>
              <th className=" w-[6%]">ACTION</th>

              {/* Warring: The last tag td be liked left padding */}
              <th className=" w-[1%]  rounded-r-[10px]"></th>
            </thead>
            <tbody className=" bg-main-theme">
              {/* Warring: First row like the margin between thead and tbody  */}
              <tr className="bg-white h-2 border-hidden"></tr>

              {/*Warring: Second row is like padding-top */}
              <tr>
                <td
                  colSpan={100}
                  className=" h-2 bg-main-theme  rounded-t-[10px] border border-main-theme   "
                ></td>
              </tr>

              {dataTable?.payments &&
                dataTable?.payments.map((invoicePayment, index) => (
                  <tr
                    key={index}
                    className="h-[35px] 2xl-plus:h-[50px] text-[14px] 2xl-plus:text-[18px] 2xl-plus:p-2 "
                  >
                    {/* Warring:  First column of each row is like padding-left */}
                    <td className=" text-center border-hidden  border-gray-300 overflow-hidden whitespace-nowrap overflow-ellipsis">
                      <input
                        className="outline-none bg-transparent w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
                        type="checkbox"
                        checked={selectedListRowsData[index]}
                        onChange={() => handleRowCheckboxChange_Invoice(index)} />
                    </td>

                    {/* TODO DATA MAIN*/}
                    <td
                      className=" pl-3 pr-2 bg-main-theme text-center border border-gray-300 overflow-hidden "
                      name="tb_no"
                    >
                      {(page - 1) * 10 + index + 1}
                      {/* {invoicePayment?.id} */}
                    </td>
                    <td
                      className="pl-3 pr-2 bg-main-theme  text-center border border-gray-300 overflow-hidden whitespace-nowrap overflow-ellipsis"
                      name="tb_date"
                    >
                      <input
                        className=" text-center outline-none bg-transparent w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
                        readOnly
                        value={(invoicePayment?.payment_date || "").split(" ")[0]} />
                    </td>
                    <td
                      className=" pl-3 pr-2 bg-main-theme  text-center border border-gray-300 overflow-hidden whitespace-nowrap overflow-ellipsis"
                      name="tb_name"
                    >
                      <input
                        className=" outline-none bg-transparent w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
                        readOnly
                        value={invoicePayment?.name || ""}
                      />
                    </td>
                    <td
                      className=" pl-3 pr-2 bg-main-theme  text-center border border-gray-300 overflow-hidden whitespace-nowrap overflow-ellipsis"
                      name="tb_jyp"
                    >
                      <input
                        className=" outline-none bg-transparent w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
                        readOnly
                        value={formatFloatToCustomString(invoicePayment?.jpy)}
                      />
                    </td>
                    <td
                      className="pl-3 pr-2 bg-main-theme  text-center border border-gray-300 overflow-hidden whitespace-nowrap overflow-ellipsis"
                      name="tb_vnd"
                    >
                      <input
                        className=" outline-none bg-transparent w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
                        readOnly
                        value={formatNumberSeparator(
                          invoicePayment?.cost.toString() || ""
                        )}
                      />
                    </td>
                    <td
                      className="pl-3 pr-2 bg-main-theme  text-center border border-gray-300 overflow-hidden whitespace-nowrap overflow-ellipsis"
                      name="tb_usd"
                    >
                      <input
                        className=" outline-none bg-transparent w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
                        readOnly
                        value={formatFloatToCustomString(invoicePayment?.usd)}
                      />
                    </td>
                    <td
                      className="pl-3 pr-2 bg-main-theme  text-center border border-gray-300 overflow-hidden whitespace-nowrap overflow-ellipsis"
                      name="tb_note"
                    >
                      <input
                        className=" outline-none bg-transparent w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
                        readOnly
                        value={invoicePayment?.note || ""}
                      />
                    </td>
                    <td
                      className="pl-3 pr-2 bg-main-theme  text-center border border-gray-300 overflow-hidden whitespace-nowrap overflow-ellipsis"
                      name="tb_journal"
                    >
                      <input
                        className=" outline-none bg-transparent w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
                        readOnly
                        value={invoicePayment?.category?.name || ""}
                      />
                    </td>
                    <td
                      className="pl-3 pr-2 bg-main-theme  text-center border border-gray-300 overflow-hidden whitespace-nowrap overflow-ellipsis"
                      name="tb_invoice"
                    >
                      <input
                        className=" outline-none bg-transparent w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
                        readOnly
                        value={invoicePayment?.invoice || ""}
                      />
                    </td>
                    <td
                      className="pl-3 pr-2 bg-main-theme  text-center border border-gray-300 overflow-hidden whitespace-nowrap overflow-ellipsis"
                      name="tb_pay"
                    >
                      <input
                        readOnly
                        value={invoicePayment?.pay || ""}
                        className="text-center  outline-none bg-transparent w-full overflow-hidden overflow-ellipsis whitespace-nowrap"
                      />
                    </td>
                    <td
                      className="pl-3 pr-2 bg-main-theme  text-center border border-gray-300 overflow-hidden whitespace-nowrap overflow-ellipsis"
                      name="tb_action"
                    >
                      <div className=" flex justify-center py-1 mx-1 bg-white  border-gray-500/50 border rounded-sm  ">
                        {/* Icon Edit */}
                        <svg
                          onClick={() => {
                            updateState({ isShowFormEditPayment: true });
                            updateStateTable({
                              selectedRowData: invoicePayment,
                            });
                          } }
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" cursor-pointer"
                        >
                          <path
                            d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
                            fill="#FFC107" />
                          <path
                            d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
                            fill="black"
                            fillOpacity="0.2" />
                        </svg>
                        <div className=" border border-gray-400 mx-0.5 "></div>

                        <svg
                          onClick={() => {
                            updateState({ isShowConfirmModal: true });
                            updateStateTable({
                              selectedRowData: invoicePayment,
                            });
                            handleRowCheckboxChange_Invoice(index);
                          }}
                          className=" cursor-pointer"
                          width="19"
                          height="19"
                          viewBox="0 0 16 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                            fill="#F44336" />
                          <path
                            d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                            fill="black"
                            fillOpacity="0.2" />
                        </svg>
                      </div>
                    </td>
                    {/* Warring: Last column of each row is like padding-right */}
                    <td className="px-10 pr-4 bg-main-theme text-center border-hidden"></td>
                  </tr>
                ))}

              {/* Warring:  Last row like tha padding bottom */}
              <tr>
                <td
                  colSpan={100}
                  className=" h-2 p-[5px]  rounded-b-[10px] border-hidden "
                ></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* InvoiceDetailFooter */}
        <InvoiceDetailFooter
          totalUSD={dataTable?.total_usd || 0}
          totalVND={dataTable?.total_cost || 0}
          totalJPY={dataTable?.total_jpy || 0}
          totalPage={totalPage}
          page={page}
          changePage={changePage}
        />
      </div>
      {isShowConfirmModal && (
        <Modal visible={isShowConfirmModal}>
          <div className=" bg-white m-2 py-4 px-5 border-red-500 border-[3px] rounded-2xl flex flex-col">
            <span className=" uppercase mx-auto px-auto text-center bg-white-500/80 py-1 px-2 text-red-500 font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
              {t("page_payment_detail.del_invoice_detail")}
            </span>

            <div className=" text-center pt-5 px-2 text-red-600 font-bold text-sm rounded-full  ">
              {t("page_payment_detail.del_invoice_content")}
            </div>

            <div className="flex items-center justify-center space-x-5  px-4 mt-6 mb-7 ">
              <Button
                onClick={() => handleDelete()}
                className={
                  " bg-red border-red-500 border-2 py-2 px-6 min-w-[120px]"
                }
              >
                {t("button.confirm")}
              </Button>
              <Button
                onClick={() => {
                  setSelectedInvoiceIds([]);
                  updateState({ isShowConfirmModal: false });
                }}
                className={
                  " border-red-500 bg-white border-2 py-2 px-6 min-w-[12px] "
                }
              >
                <span className=" text-red-500  ml-1 font-medium uppercase">
                  {t("button.cancel")}
                </span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {isShowFormNewPayment && (
        <NewPaymentForm
          visible={isShowFormNewPayment}
          selectedDate={selectedDate}
          exchangeRateId={idExRate}
          cancel={() => {
            updateState({ isShowFormNewPayment: false });
          }}
          changeFirstPage={() => {
            updateState({ isShowFormNewPayment: false });
            if (page != 1) {
              changePage(1);
            } else triggerData();
          }}
        />
      )}

      {isShowFormEditPayment && (
        <EditPaymentForm
          invoicePayment={selectedRowData}
          visible={isShowFormEditPayment}
          selectedDate={selectedDate}
          exchangeRateId={idExRate}
          cancel={() => {
            updateState({
              isShowFormEditPayment: false,
              selectedRowData: null,
            });
          }}
          triggerData={triggerData}
        />
      )}

      {isShowWarringModal && (
        <Modal visible={isShowWarringModal}>
          <div className=" bg-white m-2 py-4 px-5 border-red-500 border-[3px] rounded-2xl flex flex-col">
            <span className=" uppercase mx-auto px-auto text-center bg-white-500/80 py-1 px-2 text-red-500 font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
              {/* TODO */}
              WARRING
            </span>

            <div className=" text-center pt-5 px-2 text-red-600 font-bold text-sm rounded-full  ">
              {/* TODO */}
              EXCHAGE RATE ID of this months not found!
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
    </div>
  );
}