// Order.js
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../../../Utils/contexts/app.context";
import Button from "../../../../Utils/Button";
import Pagination from "../../../../Utils/Pagination";
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
import { useTranslation } from "react-i18next";
import MonthYearPicker from "../../../../Utils/MonthYearPicker";
import Modal from "../../../../Utils/Modal/Modal";
import { useNavigate } from "react-router-dom";
import {
  getOrderByYearAndMonths,
  getPaymentByYearAndMonths,
  getOutsourcingByYearAndMonths,
  deleteOrderByIds,
  getExChangeRateByMonthYear,
  deletePaymentByIds,
  deleteOutsourcingByIds,
} from "../Controller"; // Import the deleteOrderByIds function
import "./style.css";

const Order = () => {
  const controller = new AbortController();
  const { showToast } = useContext(AppContext);
  const { t } = useTranslation();
  const t_order = t;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [state, setState] = useState({
    isShowWarringModal: false,
    dataExRate: null,
    isShowDeleteModal_Order: false,
    isShowFormNewOrder: false,
    isShowFormEditOrder: false,
    selectedRowOrder_Edit: null,
    isShowFormNewPayment: false,
    isShowDeleteModal_Payment: false,
    isShowFormEditPayment: false,
    selectedRowPayment_Edit: null,
    isShowDeleteModal_Outsourcing: false,
    isShowFormNewOutsourcing: false,
    isShowFormEditOutsourcing: false,
    selectedRowOutsourcing_Edit: null,
  });
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
  const formatNumberSeparator = (input) => {
    // Convert input to a string
    input = input.toString();

    // Remove non-numeric characters from the input value
    let numericValue = input.replace(/[^0-9]/g, "");

    // Remove leading zeros
    numericValue =
      numericValue === "0" || numericValue === "" || numericValue === null
        ? "0"
        : numericValue.replace(/^0+/, "");

    // Format the input value with commas as thousand separators
    return numericValue.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  };

  const [idExRate, setIdRate] = useState(false);

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
        updateState({ dataExRate: response?.data[0].id });
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

  const navigator = useNavigate();
  const handleNotFoundIdExRate = () => {
    // 1. check condition if idExChageRate dont exist || null || '' || undefine
    // 2. if false =>

    let state = {
      month: selectedDate.getMonth() + 1,
      year: selectedDate.getFullYear(),
    };
    navigator("/home/InvoiceDetails", { state });

    console.log(selectedDate.getFullYear() + "-" + selectedDate.getMonth() + 1);

    // updateState({ isShowFormNewOrder: true })
  };
  const updateState = (data) =>
    setState((prevState) => ({ ...prevState, ...data }));

  //Order
  const [isLoading_Order, setIsLoading_Order] = useState(true);
  const [dataOrder, setDataOrder] = useState([]);
  const [selectedRows_Order, setSelectedRows_Order] = useState([]);
  const [currentPage_Order, setCurrentPage_Order] = useState(1);
  const [totalPages_Order, setTotalPages_Order] = useState(1);
  const [selectedOrderIds, setSelectedOrderIds] = useState([]); // New state to store selected order IDs

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
    setIsLoading_Order(true);
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

            // Thêm cột thứ tự vào mỗi order
            const newData = response.orders.map((order, index) => ({
              ...order,
              orderNumber: (currentPage_Order - 1) * 5 + index + 1,
            }));
            
            return newData || [];
          });
          console.log("huhu",dataOrder);
          
          setTotalPages_Order(response.pagination.total_pages);

          // Check và cập nhật selectedRows_Order dựa trên selectedOrderIds
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
        console.log("Invalid response format:", response);
        setDataOrder([]);
        setTotalPages_Order(1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataOrder([]);
      setTotalPages_Order(1);
    } finally {
      setIsLoading_Order(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(state.dataExRate);
      fetchData_Order();
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [currentPage_Order, selectedOrderIds]);

  

  //Payment
  const [isLoading_Payment, setIsLoading_Payment] = useState(true);
  const [dataPayment, setDataPayment] = useState([]);
  const [selectedRows_Payment, setSelectedRows_Payment] = useState([]);
  const [currentPage_Payment, setCurrentPage_Payment] = useState(1);
  const [totalPages_Payment, setTotalPages_Payment] = useState(1);
  const [selectedPaymentIds, setSelectedPaymentIds] = useState([]);
  const handleRowCheckboxChange_Payment = (index) => {
    const paymentId = dataPayment[index].id;
    const newSelectedRows = [...selectedRows_Payment];
    newSelectedRows[index] = !newSelectedRows[index];
    setSelectedRows_Payment(newSelectedRows);

    setSelectedPaymentIds((prevSelectedPaymentIds) => {
      if (newSelectedRows[index]) {
        return [...prevSelectedPaymentIds, paymentId];
      } else {
        return prevSelectedPaymentIds.filter((id) => id !== paymentId);
      }
    });
  };
  const [selectAllPages_Payment, setSelectAllPages_Payment] = useState([false]);
  const handleSelectAllCheckboxChange_Payment = () => {
    // Use the current page to determine the index in the array
    const pageIndex = currentPage_Payment - 1;

    setSelectAllPages_Payment((prevSelectAllPages) => {
      const newSelectAllPages = [...prevSelectAllPages];
      newSelectAllPages[pageIndex] = !newSelectAllPages[pageIndex];
      return newSelectAllPages;
    });

    const newSelectedRows = new Array(dataPayment.length).fill(
      !selectAllPages_Payment[pageIndex]
    );
    setSelectedRows_Payment(newSelectedRows);

    setSelectedPaymentIds((prevSelectedPaymentIds) => {
      if (!selectAllPages_Payment[pageIndex]) {
        // If selecting all, concatenate all order IDs from the current page
        const currentPagePaymentIds = dataPayment.map((payment) => payment.id);
        return [...prevSelectedPaymentIds, ...currentPagePaymentIds];
      } else {
        // If deselecting all, remove all order IDs from the current page
        return prevSelectedPaymentIds.filter(
          (id) => !dataPayment.map((payment) => payment.id).includes(id)
        );
      }
    });
  };
  const handleChangePage_Payment = (newPage) => {
    setCurrentPage_Payment(newPage);
  };
  // eslint-disable-next-line no-unused-vars
  const deletePayment = async () => {
    try {
      await deletePaymentByIds(selectedPaymentIds);
      // Clear selected order IDs after successful deletion
      setSelectedPaymentIds([]);
      setCurrentPage_Payment(1);
      fetchData_Payment();
      updateState({ isShowDeleteModal_Payment: false });
      showToast.success("Delete successfully!");
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };
  const fetchData_Payment = async () => {
    setIsLoading_Payment(true);
    try {
      const response = await getPaymentByYearAndMonths(
        selectedDate,
        currentPage_Payment
      );

      console.log("API Response:", response);

      if (response && response.pagination) {
        if (response.payment_orders === null) {
          setTotalPages_Payment(1);
          setCurrentPage_Payment(1);
        } else {
          setDataPayment((prevData) => {
            console.log("Previous Data:", prevData);

            // Thêm cột thứ tự vào mỗi payment_order
            const newData = response.payment_orders.map(
              (payment_order, index) => ({
                ...payment_order,
                paymentNumber: (currentPage_Payment - 1) * 5 + index + 1,
              })
            );

            return newData || [];
          });

          setTotalPages_Payment(response.pagination.total_pages);

          // Check và cập nhật selectedRows_Payment dựa trên selectedPaymentIds
          const newSelectedRows = new Array(
            response.payment_orders.length
          ).fill(false);
          response.payment_orders.forEach((payment_order, index) => {
            if (selectedPaymentIds.includes(payment_order.id)) {
              newSelectedRows[index] = true;
            }
          });

          setSelectedRows_Payment(newSelectedRows);
          // setSelectedRow_Payment([]);
        }
      } else {
        console.error("Invalid response format:", response);
        setDataPayment([]);
        setTotalPages_Payment(1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataPayment([]);
      setTotalPages_Payment(1);
    } finally {
      setIsLoading_Payment(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(state.dataExRate);
      fetchData_Payment();
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [currentPage_Payment, selectedPaymentIds]);

  //Outsourcing
  const [isLoading_Outsourcing, setIsLoading_Outsourcing] = useState(true);
  const [dataOutsourcing, setDataOutsourcing] = useState([]);
  const [selectedRows_Outsourcing, setSelectedRows_Outsourcing] = useState([]);
  const [currentPage_Outsourcing, setCurrentPage_Outsourcing] = useState(1);
  const [totalPages_Outsourcing, setTotalPages_Outsourcing] = useState(1);
  const [selectedOutsourcingIds, setSelectedOutsourcingIds] = useState([]);
  const handleRowCheckboxChange_Outsourcing = (index) => {
    const outsourcingId = dataOutsourcing[index].id;
    const newSelectedRows = [...selectedRows_Outsourcing];
    newSelectedRows[index] = !newSelectedRows[index];
    setSelectedRows_Outsourcing(newSelectedRows);

    setSelectedOutsourcingIds((prevSelectedOutsourcingIds) => {
      if (newSelectedRows[index]) {
        return [...prevSelectedOutsourcingIds, outsourcingId];
      } else {
        return prevSelectedOutsourcingIds.filter((id) => id !== outsourcingId);
      }
    });
  };
  const [selectAllPages_Outsourcing, setSelectAllPages_Outsourcing] = useState([
    false,
  ]);
  const handleSelectAllCheckboxChange_Outsourcing = () => {
    // Use the current page to determine the index in the array
    const pageIndex = currentPage_Outsourcing - 1;

    setSelectAllPages_Outsourcing((prevSelectAllPages) => {
      const newSelectAllPages = [...prevSelectAllPages];
      newSelectAllPages[pageIndex] = !newSelectAllPages[pageIndex];
      return newSelectAllPages;
    });

    const newSelectedRows = new Array(dataOutsourcing.length).fill(
      !selectAllPages_Outsourcing[pageIndex]
    );
    setSelectedRows_Outsourcing(newSelectedRows);

    setSelectedOutsourcingIds((prevSelectedOutsourcingIds) => {
      if (!selectAllPages_Outsourcing[pageIndex]) {
        // If selecting all, concatenate all order IDs from the current page
        const currentPageOutsourcingIds = dataOutsourcing.map(
          (outsourcing) => outsourcing.id
        );
        return [...prevSelectedOutsourcingIds, ...currentPageOutsourcingIds];
      } else {
        // If deselecting all, remove all order IDs from the current page
        return prevSelectedOutsourcingIds.filter(
          (id) =>
            !dataOutsourcing.map((outsourcing) => outsourcing.id).includes(id)
        );
      }
    });
  };
  const handleChangePage_Outsourcing = (newPage) => {
    setCurrentPage_Outsourcing(newPage);
  };
  // eslint-disable-next-line no-unused-vars
  const deleteOutsourcing = async () => {
    try {
      await deleteOutsourcingByIds(selectedOutsourcingIds);
      // Clear selected order IDs after successful deletion
      setSelectedOutsourcingIds([]);
      setCurrentPage_Outsourcing(1);
      fetchData_Outsourcing();
      updateState({ isShowDeleteModal_Outsourcing: false });
      showToast.success("Delete successfully!");
    } catch (error) {
      console.error("Error deleting Outsourcing:", error);
    }
  };
  const fetchData_Outsourcing = async () => {
    setIsLoading_Outsourcing(true);
    try {
      const response = await getOutsourcingByYearAndMonths(
        selectedDate,
        currentPage_Outsourcing
      );

      console.log("API Response:", response);

      if (response && response.pagination) {
        if (response.outsourcing === null) {
          setTotalPages_Outsourcing(1);
          setCurrentPage_Outsourcing(1);
        } else {
          setDataOutsourcing((prevData) => {
            console.log("Previous Data:", prevData);

            // Thêm cột thứ tự vào mỗi outsourcing
            const newData = response.outsourcing.map((outsourcing, index) => ({
              ...outsourcing,
              outsourcingNumber: (currentPage_Outsourcing - 1) * 5 + index + 1,
            }));

            return newData || [];
          });

          setTotalPages_Outsourcing(response.pagination.total_pages);

          // Check và cập nhật selectedRows_Outsourcing dựa trên selectedOutsourcingIds
          const newSelectedRows = new Array(response.outsourcing.length).fill(
            false
          );
          response.outsourcing.forEach((outsourcing, index) => {
            if (selectedOutsourcingIds.includes(outsourcing.id)) {
              newSelectedRows[index] = true;
            }
          });

          setSelectedRows_Outsourcing(newSelectedRows);
          // setSelectedRow_Outsourcing([]);
          console.log(response.outsourcing);
        }
      } else {
        console.error("Invalid response format:", response);
        setDataOutsourcing([]);
        setTotalPages_Outsourcing(1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataOutsourcing([]);
      setTotalPages_Outsourcing(1);
    } finally {
      setIsLoading_Outsourcing(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(state.dataExRate);
      fetchData_Outsourcing();
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [currentPage_Outsourcing, selectedOutsourcingIds]);

  useEffect(() => {
    const fetchData = () => {
      fetchExchangeRate();
      fetchData_Order();
      fetchData_Payment();
      fetchData_Outsourcing();
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [selectedDate]);

  return (
    <div className="">
      <MonthYearPicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        className="ml-4 bg-white w-64"
      />
      <div className="h-[800px] max-[1500px]:h-[620px] overflow-auto mt-2">
      {/* ORDER */}
      <div
        id=""
        className={` relative bg-main-theme pb-5
        col-span-full
       `}
      >
        {/* control area */}
        <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4  bg-white rounded-[16px] overflow-x-auto">
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
                      console.log(idExRate);
                      console.log(state.dataExRate);
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
          <div className="h-[350px] max-[1600px]:h-[250px] overflow-y-auto overflow-x-auto mt-4 text-sm">
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
                  <th className="w-12">JPY</th>
                  <th className="w-24">VND</th>
                  <th className="w-24">USD</th>
                  <th className="w-24">
                    {t_order("header_table_order.Action")}
                  </th>
                  <th className="w-1"></th>
                </tr>
              </thead>
              <tbody>
                {isLoading_Order && (
                  <tr>
                    <td colSpan={100} className="h-full">
                      <div className="flex justify-center items-center h-full">
                        <div className="loader"></div>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Render table rows when data is available */}
                {!isLoading_Order && (
                  <React.Fragment>
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
                              onChange={() =>
                                handleRowCheckboxChange_Order(index)
                              }
                            />
                          </td>
                          <td className="w-8" name="tb_no">
                            {rowDataOrder.orderNumber}
                          </td>
                          <td className="w-24" name="tb_date">
                            <input
                              className="text-center"
                              readOnly
                              value={
                                (rowDataOrder.order_date || "").split(" ")[0]
                              }
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
                              value={formatNumber(rowDataOrder.jpy)}
                            />
                          </td>
                          <td className="w-32" name="tb_vnd">
                            <input
                              className="text-center"
                              readOnly
                              value={formatNumberSeparator(rowDataOrder.vnd)}
                            />
                          </td>
                          <td className="w-32" name="tb_usd">
                            <input
                              className="text-center"
                              readOnly
                              value={formatNumber(rowDataOrder.usd)}
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
                                onClick={() => {
                                  updateState({
                                    isShowDeleteModal_Order: true,
                                  });
                                  console.log(index);
                                  handleRowCheckboxChange_Order(index);
                                }}
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
                  </React.Fragment>
                )}
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

      {/*PAYMENT*/}

      <div
        id=""
        className={` relative bg-main-theme pb-5 
        col-span-full
       `}
      >
        {/* control area */}
        <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4  bg-white rounded-[16px] overflow-x-auto">
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
                  {" "}
                  {t_order("title.Payment_management")}
                </span>
              </div>
              <div className="flex flex-row">
                <Button
                  // onClick={() => updateState({ isShowFormNewPayment: true })}
                  onClick={() => {
                    console.log(idExRate);
                    if (idExRate === false) {
                      updateState({ isShowWarringModal: true });
                    } else {
                      console.log(idExRate);
                      console.log(state.dataExRate);
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
          <div className="h-[350px] max-[1600px]:h-[250px] overflow-y-auto overflow-x-auto mt-4 text-sm">
            <table id="Table_Order" className="w-full">
              <thead>
                <tr>
                  <th className="w-1">
                    <input
                      type="checkbox"
                      checked={selectAllPages_Payment[currentPage_Payment - 1]}
                      onChange={handleSelectAllCheckboxChange_Payment}
                    />
                  </th>
                  <th className="w-8">No</th>
                  <th className="w-24">
                    {t_order("header_table_order.Date_of_payment")}
                  </th>
                  <th className="w-32">
                    {t_order("header_table_order.Company_name")}
                  </th>
                  <th className="w-24">JPY</th>
                  <th className="w-24">VND</th>
                  <th className="w-24">USD</th>
                  <th className="w-24">
                    {t_order("header_table_order.Action")}
                  </th>
                  <th className="w-1"></th>
                </tr>
              </thead>
              <tbody>
                {/* Conditionally render the loading spinner within tbody */}
                {isLoading_Payment && (
                  <tr>
                    <td colSpan={100} className="h-full">
                      <div className="flex justify-center items-center h-full">
                        <div className="loader"></div>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Render table rows when data is available */}
                {!isLoading_Payment && (
                  <React.Fragment>
                    <tr className="">
                      <td colSpan={100}></td>
                    </tr>
                    {dataPayment && dataPayment.length > 0 ? (
                      dataPayment.map((rowDataPayment, index) => (
                        <tr key={index}>
                          <td className="w-3">
                            <input
                              type="checkbox"
                              checked={selectedRows_Payment[index]}
                              onChange={() =>
                                handleRowCheckboxChange_Payment(index)
                              }
                            />
                          </td>
                          <td className="w-8" name="tb_no">
                            {rowDataPayment.paymentNumber}
                          </td>
                          <td className="w-24" name="tb_date">
                            <input
                              className="text-center"
                              readOnly
                              value={
                                (rowDataPayment.payment_date || "").split(
                                  " "
                                )[0]
                              }
                            />
                          </td>
                          <td className="w-32" name="tb_name">
                            <input
                              className="text-center"
                              readOnly
                              value={rowDataPayment.company_name}
                            />
                          </td>
                          <td className="w-32" name="tb_jyp">
                            <input
                              className="text-center"
                              readOnly
                              value={formatNumber(rowDataPayment.jpy)}
                            />
                          </td>
                          <td className="w-32" name="tb_vnd">
                            <input
                              className="text-center"
                              readOnly
                              value={formatNumberSeparator(rowDataPayment.vnd)}
                            />
                          </td>
                          <td className="w-32" name="tb_usd">
                            <input
                              className="text-center"
                              readOnly
                              value={formatNumber(rowDataPayment.usd)}
                            />
                          </td>
                          <td className="w-8" name="tb_action">
                            <div className=" flex justify-center py-1 mx-1 bg-white  border-gray-500/50 border rounded-sm ">
                              <svg
                                onClick={() => {
                                  updateState({ isShowFormEditPayment: true });
                                  console.log(rowDataPayment);
                                  updateState({
                                    selectedRowPayment_Edit: rowDataPayment,
                                  });
                                  updateState({
                                    selectedRowPaymnet_Edit: rowDataPayment,
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
                                onClick={() => {
                                  updateState({
                                    isShowDeleteModal_Payment: true,
                                  });
                                  console.log(index);
                                  handleRowCheckboxChange_Payment(index);
                                }}
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
                  </React.Fragment>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex-1 flex justify-end mt-5">
            <Pagination
              changePage={handleChangePage_Payment}
              page={currentPage_Payment}
              totalPage={totalPages_Payment}
            />
          </div>
        </div>
      </div>

      {/* OUTSOURCING */}

      <div
        id=""
        className={` relative bg-main-theme pb-5 
        col-span-full
       `}
      >
        {/* control area */}
        <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4  bg-white rounded-[16px] overflow-x-auto">
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
                  onClick={() => {
                    console.log(idExRate);
                    if (idExRate === false) {
                      updateState({ isShowWarringModal: true });
                    } else {
                      console.log(idExRate);
                      console.log(state.dataExRate);
                      updateState({ isShowFormNewOutsourcing: true });
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
          <div className="h-[350px] max-[1600px]:h-[250px] overflow-y-auto overflow-x-auto mt-4 text-sm">
            <table id="Table_Order" className="w-full">
              <thead>
                <tr>
                  <th className="w-1">
                    <input
                      type="checkbox"
                      checked={
                        selectAllPages_Outsourcing[currentPage_Outsourcing - 1]
                      }
                      onChange={handleSelectAllCheckboxChange_Outsourcing}
                    />
                  </th>
                  <th className="w-8">No</th>
                  <th className="w-44">
                    {t_order("header_table_order.Outsourced_project")}
                  </th>
                  <th className="w-32">
                    {t_order("header_table_order.Company_name")}
                  </th>
                  <th className="w-24">JPY</th>
                  <th className="w-24">VND</th>
                  <th className="w-24">USD</th>
                  <th className="w-24">
                    {t_order("header_table_order.Action")}
                  </th>
                  <th className="w-1"></th>
                </tr>
              </thead>
              <tbody>
                 {/* Conditionally render the loading spinner within tbody */}
                 {isLoading_Outsourcing && (
                  <tr>
                    <td colSpan={100} className="h-full">
                      <div className="flex justify-center items-center h-full">
                        <div className="loader"></div>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Render table rows when data is available */}
                {!isLoading_Outsourcing && (
                  <React.Fragment>
                  <tr className="">
                  <td colSpan={100}></td>
                </tr>
                {dataOutsourcing && dataOutsourcing.length > 0 ? (
                  dataOutsourcing.map((rowDataOutsourcing, index) => (
                    <tr key={index}>
                      <td className="w-3">
                        <input
                          type="checkbox"
                          checked={selectedRows_Outsourcing[index]}
                          onChange={() =>
                            handleRowCheckboxChange_Outsourcing(index)
                          }
                        />
                      </td>
                      <td className="w-8" name="tb_no">
                        {rowDataOutsourcing.outsourcingNumber}
                      </td>
                      <td className="w-24" name="tb_date">
                        <input
                          className="text-center"
                          readOnly
                          value={rowDataOutsourcing.outsourced_project}
                        />
                      </td>
                      <td className="w-32" name="tb_name">
                        <input
                          className="text-center"
                          readOnly
                          value={rowDataOutsourcing.company_name}
                        />
                      </td>
                      <td className="w-32" name="tb_jyp">
                        <input
                          className="text-center"
                          readOnly
                          value={formatNumber(rowDataOutsourcing.jpy)}
                        />
                      </td>
                      <td className="w-32" name="tb_vnd">
                        <input
                          className="text-center"
                          readOnly
                          value={formatNumberSeparator(rowDataOutsourcing.vnd)}
                        />
                      </td>
                      <td className="w-32" name="tb_usd">
                        <input
                          className="text-center"
                          readOnly
                          value={formatNumber(rowDataOutsourcing.usd)}
                        />
                      </td>
                      <td className="w-8" name="tb_action">
                        <div className=" flex justify-center py-1 mx-1 bg-white  border-gray-500/50 border rounded-sm ">
                          <svg
                            onClick={() => {
                              updateState({ isShowFormEditOutsourcing: true });
                              console.log(rowDataOutsourcing);
                              updateState({
                                selectedRowOutsourcing_Edit: rowDataOutsourcing,
                              });
                              updateState({
                                selectedRowOutsourcing_Edit: rowDataOutsourcing,
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
                            onClick={() => {
                              updateState({
                                isShowDeleteModal_Outsourcing: true,
                              });
                              console.log(index);
                              handleRowCheckboxChange_Outsourcing(index);
                            }}
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
                  </React.Fragment>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex-1 flex justify-end mt-5">
            <Pagination
              changePage={handleChangePage_Outsourcing}
              page={currentPage_Outsourcing}
              totalPage={totalPages_Outsourcing}
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
                  handleNotFoundIdExRate();
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
      {state.isShowFormNewOrder && (
        <AddOrderForm
          visible={state.isShowFormNewOrder}
          t={t_order}
          cancel={() => updateState({ isShowFormNewOrder: false })}
          selectedDate={selectedDate}
          exchangeRateId={state.dataExRate}
          changeFirstPage={() => {
            showToast.success("Add new order successfully!");
            updateState({ isShowFormNewOrder: false });
            setCurrentPage_Order(1);
            fetchData_Order();
          }}
        />
      )}
      {state.isShowFormNewPayment && (
        <AddPaymentManagementForm
          visible={state.isShowFormNewPayment}
          t={t_order}
          cancel={() => updateState({ isShowFormNewPayment: false })}
          selectedDate={selectedDate}
          exchangeRateId={state.dataExRate}
          changeFirstPage={() => {
            showToast.success("Add new payment successfully!");
            updateState({ isShowFormNewPayment: false });
            setCurrentPage_Payment(1);
            fetchData_Payment();
          }}
        />
      )}
      {state.isShowFormNewOutsourcing && (
        <AddOutsourcingForm
          visible={state.isShowFormNewOutsourcing}
          t={t_order}
          cancel={() => updateState({ isShowFormNewOutsourcing: false })}
          selectedDate={selectedDate}
          exchangeRateId={state.dataExRate}
          changeFirstPage={() => {
            showToast.success("Add new Outsourcing successfully!");
            updateState({ isShowFormNewOutsourcing: false });
            setCurrentPage_Outsourcing(1);
            fetchData_Outsourcing();
          }}
        />
      )}
      {state.isShowFormEditOrder && (
        <EditOrderForm
          invoiceOrder={state.selectedRowOrder_Edit}
          visible={state.isShowFormEditOrder}
          t={t_order}
          selectedDate={selectedDate}
          exchangeRateId={state.dataExRate}
          cancel={() => {
            updateState({
              isShowFormEditOrder: false,
              selectedRowOrder_Edit: null,
            });
            //fetchData_Order();
          }}
          show_result={() => {
            showToast.success("Edit successfully!");
            fetchData_Order();
          }}
        />
      )}
      {state.isShowFormEditPayment && (
        <EditPaymentManagementForm
          invoicePayment={state.selectedRowPayment_Edit}
          visible={state.isShowFormEditPayment}
          t={t_order}
          selectedDate={selectedDate}
          exchangeRateId={state.dataExRate}
          cancel={() => {
            updateState({
              isShowFormEditPayment: false,
              selectedRowPayment_Edit: null,
            });
            //fetchData_Payment();
          }}
          show_result={() => {
            showToast.success("Edit successfully!");
            fetchData_Payment();
          }}
        />
      )}
      {state.isShowFormEditOutsourcing && (
        <EditOutsourcingForm
          invoiceOutsourcing={state.selectedRowOutsourcing_Edit}
          visible={state.isShowFormEditOutsourcing}
          t={t_order}
          selectedDate={selectedDate}
          exchangeRateId={state.dataExRate}
          cancel={() => {
            updateState({
              isShowFormEditOutsourcing: false,
              selectedRowOutsourcing_Edit: null,
            });
            //fetchData_Outsourcing();
          }}
          show_result={() => {
            showToast.success("Edit successfully!");
            fetchData_Outsourcing();
          }}
        />
      )}
      <DeleteOrder
        visible={state.isShowDeleteModal_Order}
        t={t_order}
        cancel={() => {
          setSelectedOrderIds([]);
          updateState({ isShowDeleteModal_Order: false });
        }}
        deleteOrder={deleteOrder} // Pass the deleteOrder function to the DeleteOrder component
      />
      <DeletePaymentManagement
        // eslint-disable-next-line no-undef
        visible={state.isShowDeleteModal_Payment}
        t={t_order}
        cancel={() => {
          setSelectedPaymentIds([]);
          updateState({ isShowDeleteModal_Payment: false });
        }}
        deletePayment={deletePayment}
      />
      <DeleteOutsourcing
        // eslint-disable-next-line no-undef
        visible={state.isShowDeleteModal_Outsourcing}
        t={t_order}
        cancel={() => {
          setSelectedOutsourcingIds([]);
          updateState({ isShowDeleteModal_Outsourcing: false });
        }}
        deleteOutsourcing={deleteOutsourcing}
      />
    </div></div>
  );
};

export default Order;
