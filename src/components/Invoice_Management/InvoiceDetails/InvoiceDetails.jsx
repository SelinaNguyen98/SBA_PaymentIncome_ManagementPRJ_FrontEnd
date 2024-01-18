import "../../../Utils/style.css";
import "./styles.css";

// eslint-disable-next-line no-unused-vars
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppContext } from "../../../Utils/contexts/app.context";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Button from "../../../Utils/Button";
import InvoiceDetailFooter from "./InvoicDetailFooter/InvoiceDetailFooter";
import Modal from "../../../Utils/Modal/Modal";
import NewPaymentForm from "./NewPaymentForm";
import MonthYearPicker from "../../../Utils/MonthYearPicker";
import EditPaymentForm from "./EditPaymentForm";

import { formatStringMonthYearToDate } from "../../../Utils/utils/maths";
import {
  createExChangeRate,
  deletePaymentById,
  getExChangeRateByMonthYear,
  getPaymentsByYearAndMonths,
} from "./Controller";

export default function InvoiceDetails() {
  const { t } = useTranslation();
  const t_invoicedetails = t;
  const [dataChangeTrigger, setDataChangeTrigger] = useState(false);

  const { showToast } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm();

  // const handleSaveRate = handleSubmit((data) => {

  // });

  // state theo doi cac modal
  const [stateControl, setStateControl] = useState({
    isShowConfirmModal: false,
    isShowFormNewPayment: false,
    isShowFormEditPayment: false,
  });

  const { isShowConfirmModal, isShowFormNewPayment, isShowFormEditPayment } =
    stateControl;

  const updateState = (data) =>
    setStateControl(() => ({ ...stateControl, ...data }));

  // Bao gom tong so trang, page, du lieu table dang duoc chon
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    return formatStringMonthYearToDate(month, year);
  }); //

  const [stateTable, setStateTable] = useState({
    page: 1,
    totalPage: 0,
    dataTable: null,
    selectedRowData: null, // single delete
    selectedListRowsData: [],
    isSelectedAllDataInvoice: false,
  });

  const {
    totalPage,
    dataTable,
    selectedRowData,
    selectedListRowsData,
    isSelectedAllDataInvoice,
    page,
  } = stateTable;

  const updateStateTable = (dataTable) =>
    setStateTable(() => ({ ...stateTable, ...dataTable }));

  /// Handle Checkbox funtion
  const handleRowCheckboxChange_Invoice = (index) => {
    const newSelectedRows = [...selectedListRowsData];
    newSelectedRows[index] = !newSelectedRows[index];
    updateStateTable({ selectedListRowsData: newSelectedRows });
  };

  const handleSelectAllCheckboxChange_Invoice = () => {
    const tmpIsSelectedAllDataInvoice = !isSelectedAllDataInvoice;

    const newSelectedRows = new Array(dataTable?.payments.length).fill(
      tmpIsSelectedAllDataInvoice
    );
    updateStateTable({
      isSelectedAllDataInvoice: tmpIsSelectedAllDataInvoice,
      selectedListRowsData: newSelectedRows,
    });
  };

  // const [page, setPage] = useState(1);
  const isFilterApplied = useRef(false);

  // TODO fake  data here
  const fetchInvoices = async () => {
    try {
      const response = await getPaymentsByYearAndMonths(
        selectedDate.getMonth() + 1,
        selectedDate.getFullYear(),
        page
      );

      // if (page > response?.pagination?.total_pages)
      //   changePage(response?.pagination?.total_pages - 1);
      updateStateTable({
        dataTable: response,
        totalPage: response?.pagination?.total_pages,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchExchangeRate = async () => {
    try {
      const [status, response] = await getExChangeRateByMonthYear(
        selectedDate.getMonth() + 1,
        selectedDate.getFullYear()
      );
      console.log(response);
      // Khong co gia tri duoc lay ta
      if (status == 200 && response.success == false) {
        setValue("idExRate", null);
        setValue("jpy", null);
        setValue("usd", null);
        console.log("khong co cai chi ca");
        return;
      }
      setValue("idExRate", response?.data[0].id);
      setValue("jpy", parseFloat(response?.data[0].jpy).toFixed(4));
      setValue("usd", parseFloat(response?.data[0].usd).toFixed(4));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSaveRate = async (data) => {
    console.log(data);
    try {
      const response = await createExChangeRate(
        selectedDate.getMonth() + 1,
        selectedDate.getFullYear(),
        data.jpy,
        data.usd,
        data.idExRate
      );

      // setValue("idExRate", response?.data?.id || null);
      // console.log(response?.message)
      showToast(response?.message);
      setDataChangeTrigger(!dataChangeTrigger);

      // fetchExchangeRate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      if (selectedRowData?.id == null || selectedRowData?.id == undefined)
        throw new Error("");
      const response = await deletePaymentById(selectedRowData?.id);

      // 1. Kiem tra du lieu co phai trang cuoi cung hay khong
      //    1.1 neu dau tien  cua trang >1 thi  set page ve page - 1
      //    1.2 nê dau tien cua trang 1 thi set ve 1
      // 2. Kiem tra neu khong phai dong dau tien thi loafd lai vs dataTriger thay doi

      // if(dataTable?.payments.length == 1 && page >= totalPage &&  )
      if (page == totalPage && dataTable?.payments.length == 1 && page != 1) {
        changePage(page - 1);
        return;
      }
      setDataChangeTrigger(!dataChangeTrigger);

      updateState({ isShowConfirmModal: false });
      showToast("Delete  successfully!");
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      updateState({ isShowConfirmModal: false });
    }
  };

  useEffect(() => {
    console.log("Filter change effect");
    isFilterApplied.current = true;
    updateStateTable({ page: 1 });
  }, [selectedDate]);

  useEffect(() => {
    if (isFilterApplied.current && page !== 1) {
      return;
    }

    console.log("Main effect");

    fetchInvoices();
    fetchExchangeRate();
  }, [selectedDate, page, dataChangeTrigger]);

  function changePage(page) {
    isFilterApplied.current = false;
    updateStateTable({ page: page });
  }

  return (
    <div
      id="invoiceDetailTable"
      className={` relative bg-main-theme pb-5 h-full `}
    >
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
        {t_invoicedetails("navHeader.invoiceDetails")}
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
                <div className="flex flex-row bg-main-theme items-center py-1 rounded-md ">
                  <form
                    className="items-center px-5 flex flex-row "
                    onSubmit={handleSubmit(fetchSaveRate)}
                  >
                    <div className="font-medium ">
                      JPY
                      <input
                        type="number"
                        step="0.0001"
                        defaultValue={0}
                        className="bg-white mx-2 min-w-[150px] shadow-sm rounded-md px-1"
                        {...register("jpy", {
                          number: "This field is number",
                          required: "This field is required",
                        })}
                      />
                    </div>
                    <div className="font-medium">
                      USD
                      <input
                        type="number"
                        step="0.0001"
                        defaultValue={0}
                        className="bg-white mx-2 min-w-[150px] shadow-sm rounded-md px-1"
                        {...register("usd", {
                          number: "This field is number",
                          required: "This field is required",
                        })}
                      />
                    </div>

                    <Button
                      className="col-span-12 lg:col-span-1 flex-shrink-0 px-1 my-1"
                      // type="submit"
                      data-modal-target="crud-modal"
                      data-modal-toggle="crud-modal"
                    >
                      {t_invoicedetails("button.save")}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
            {/* <span> {errors?.usd?.message}</span>
            <span> {errors.usd?.message}</span> */}

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
                {t_invoicedetails("button.add")}
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
                {t_invoicedetails("button.delete")}
              </Button>
            </div>
          </div>
        </div>

        {/* table data */}
        <div className="h-[430px] 2xl-plus:h-[600px]">
          <table id="invoiceDetailTable" className="table-fixed mt-1 h-auto">
            <thead>
              <tr>
                <th className="w-[2%]">
                  <input
                    type="checkbox"
                    checked={isSelectedAllDataInvoice}
                    onChange={handleSelectAllCheckboxChange_Invoice}
                  />
                </th>
                <th className=" w-[3%]"> NO</th>
                <th className=" w-[10%]">
                  {t_invoicedetails("page_payment_detail.date")}
                </th>
                <th className=" w-[10%]">
                  {t_invoicedetails("page_payment_detail.name")}
                </th>
                <th className=" w-[8%]"> JPY</th>
                <th className=" w-[8%]"> VND</th>
                <th className=" w-[8%]"> USD</th>
                <th className=" w-[10%]">
                  {t_invoicedetails("page_payment_detail.note")}
                </th>
                <th className=" w-[10%]">
                  {t_invoicedetails("page_payment_detail.journal")}
                </th>
                <th className=" w-[16%] ">
                  {t_invoicedetails("page_payment_detail.invoice")}
                </th>
                <th className=" w-[8%]">
                  {t_invoicedetails("page_payment_detail.pay")}
                </th>
                <th className=" w-[6%]">ACTION</th>
                <th className=" w-[1%]"></th>
              </tr>
            </thead>
            <tbody>
              {/* Firsh row is like padding-top */}
              <tr>
                <td colSpan={100}></td>
              </tr>

              {dataTable?.payments &&
                dataTable?.payments.map((invoicePayment, index) => (
                  <tr
                    key={index}
                    className="h-[35px] 2xl-plus:h-[50px] text-sm text-[13px] p-2"
                  >
                    {/* <tr key={index}> */}
                    {/* First column of each row is like padding-left */}
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedListRowsData[index]}
                        onChange={() => handleRowCheckboxChange_Invoice(index)}
                      />
                    </td>

                    {/* DATA MAIN*/}
                    <td name="tb_no">{invoicePayment?.id}</td>
                    <td name="tb_date">
                      <input
                        className="text-center"
                        readOnly
                        value={
                          (invoicePayment?.payment_date || "").split(" ")[0]
                        }
                      />
                    </td>
                    <td name="tb_name">
                      <input readOnly value={invoicePayment?.name} />
                    </td>
                    <td name="tb_jyp">
                      <input readOnly value={invoicePayment?.jpy} />
                    </td>
                    <td name="tb_vnd">
                      <input readOnly value={invoicePayment?.cost} />
                    </td>
                    <td name="tb_usd">
                      <input readOnly value={invoicePayment?.usd} />
                    </td>
                    <td name="tb_note">
                      <input readOnly value={invoicePayment?.note} />
                    </td>
                    <td name="tb_journal">
                      <input readOnly value={invoicePayment?.category?.name} />
                    </td>
                    <td name="tb_invoice">
                      <input readOnly value={invoicePayment?.invoice} />
                    </td>
                    <td name="tb_pay">
                      <input readOnly value={invoicePayment?.pay}  className="text-center" />
                    </td>
                    <td name="tb_action">
                      <div className=" flex justify-center py-1 mx-1 bg-white  border-gray-500/50 border rounded-sm  ">
                        {/* Icon Edit */}
                        <svg
                          onClick={() => {
                            updateState({ isShowFormEditPayment: true });
                            updateStateTable({
                              selectedRowData: invoicePayment,
                            });
                          }}
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" cursor-pointer"
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
                        <div className=" border border-gray-400 mx-0.5 "></div>

                        <svg
                          onClick={() => {
                            updateState({ isShowConfirmModal: true });
                            updateStateTable({
                              selectedRowData: invoicePayment,
                            });
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

                    {/* Last column of each row is like padding-right */}
                    <td></td>
                  </tr>
                ))}

              <tr className=" bg-main-theme h-[0px] py-0 my-0 ">
                <td colSpan={100}></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* InvoiceDetailFooter */}
        <InvoiceDetailFooter
          totalUSD={dataTable?.total_usd}
          totalVND={dataTable?.total_cost}
          totalJPY={dataTable?.total_jpy}
          totalPage={totalPage}
          page={page}
          changePage={changePage}
        />
      </div>
      {isShowConfirmModal && (
        <Modal visible={isShowConfirmModal}>
          <div className=" bg-white m-2 py-4 px-5 border-red-500 border-[3px] rounded-2xl  flex flex-col">
            <span className=" uppercase mx-auto px-auto text-center bg-white-500/80 py-1 px-2 text-red-500 font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
              delete Invoice detail
            </span>

            <div className=" text-center pt-5 px-2 text-red-600 font-bold text-sm rounded-full  ">
              Are you sure you want to delete this payment ?
            </div>

            <div className="flex items-center justify-center space-x-5  px-4 mt-6 mb-7 ">
              <Button
                onClick={() => handleDelete()}
                className={" bg-red py-2 px-6"}
              >
                Confirm
              </Button>
              <Button
                onClick={() => {
                  updateState({ isShowConfirmModal: false });
                }}
                className={" border-red-500 bg-white border-2   py-2 px-6"}
              >
                <span className=" text-red-500  ml-1 font-medium uppercase">
                  Cancel
                </span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
      {isShowFormNewPayment && (
        <NewPaymentForm
          visible={isShowFormNewPayment}
          cancel={() => {
            updateState({ isShowFormNewPayment: false });
          }}
        />
      )}

      {isShowFormEditPayment && (
        <EditPaymentForm
          invoicePayment={selectedRowData}
          visible={isShowFormEditPayment}
          cancel={() => {
            updateState({
              isShowFormEditPayment: false,
              selectedRowData: null,
            });
          }}
        />
      )}
    </div>
  );
}
