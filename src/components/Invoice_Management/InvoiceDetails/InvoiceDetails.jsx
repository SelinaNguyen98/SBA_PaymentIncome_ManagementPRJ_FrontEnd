import "../../../Utils/style.css";
import NavHeader from "../../NavHeader";
// import InvoiceTable from "./InvoiceTable";
import Button from "../../Button";
import InvoiceDetailFooter from "./InvoicDetailFooter/InvoiceDetailFooter";
import "./styles.css";
import { useContext, useState } from "react";
import { AppContext } from "../../../Utils/contexts/app.context";
import Modal from "../../Modal/Modal";
import NewPaymentForm from "./NewPaymentForm";

export default function InvoiceDetails() {
  const { isShowAsideFilter } = useContext(AppContext);
  // const [isShowConfirmModal, setShowConfirmModal] = useState(false);
  // const [isShowFormNewPayment, setShowFormNewPayment] = useState(true);

  const [state, setState] = useState({
    isShowConfirmModal: false,
    isShowFormNewPayment: false,
  });
  const { isShowConfirmModal, isShowFormNewPayment } = state;

  const updateState = (data) => setState(() => ({ ...state, ...data }));

  return (
    <div className={`grid grid-cols-12 gap-0 bg-main-theme`}>
      {isShowAsideFilter && (
        <div className="col-span-2  bg-red p-3	">
          <button>Toggle modal</button>
        </div>
      )}
      <div
        id="contentInvoiceDetail"
        className={` relative bg-main-theme pb-5     ${
          isShowAsideFilter ? "col-span-10" : "col-span-12"
        }`}
      >
        {/* heder */}
        <NavHeader />

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
          Invoice Details
        </div>

        {/* control area */}
        <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4  bg-white rounded-[16px] ">
          <div className="grid grid-cols-12 gap-8 items-center ">
            <input
              type="date"
              className="col-span-12 lg:col-span-2 rounded-lg font-medium border-black border-2 px-2 py-1 "
            />

            <div className=" col-span-12 lg:col-span-7 bg-main-theme items-center py-1 rounded-md ">
              <div className="grid grid-cols-9 items-center px-5 ">
                <div className="font-medium lg:col-span-4 col-span-12 ">
                  JPY
                  <input
                    type="number "
                    className="bg-white mx-2 min-w-[150px] shadow-sm rounded-md"
                  />
                </div>
                <div className="font-medium lg:col-span-4 col-span-12">
                  USD
                  <input
                    type="number"
                    className="bg-white mx-2 min-w-[150px] shadow-sm rounded-md"
                  />
                </div>

                <Button
                  className="col-span-12 lg:col-span-1 flex-shrink-0 px-1 my-1"
                  onClick={() => {}}
                  data-modal-target="crud-modal"
                  data-modal-toggle="crud-modal"
                >
                  SAVE
                </Button>
              </div>
            </div>

            <div className="flex col-span-12 lg:col-span-3 items-center justify-end">
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
                ADD NEW
              </Button>

              <Button
                onClick={() => {
                  updateState({ isShowConfirmModal: true });
                }}
                className="bg-red ml-2 "
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
                DELETE
              </Button>
            </div>
          </div>

          {/* table data */}
          <table id="invoiceTable" className="">
            <thead>
              <tr>
                <th></th>
                <th>No</th>
                <th>Date</th>
                <th>Name</th>
                <th>JPY</th>
                <th>VND</th>
                <th>USD</th>
                <th>JOURNAL</th>
                <th>INVOICE</th>
                <th>PAY</th>
                <th>ACTION</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr className="">
                <td colSpan={100}></td>
              </tr>

              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <tr key={index}>
                    <td></td>
                    <td>dsfs</td>
                    <td>sdf</td>
                    <td>sdf</td>
                    <td>sdf</td>
                    <td>sdf</td>
                    <td>UsdfSD</td>
                    <td>sdf</td>
                    <td>sdf</td>
                    <td>PAY</td>
                    <td>sdf</td>
                    <td></td>
                  </tr>
                ))}

              <tr className=" bg-main-theme h-[0px] py-0 my-0">
                <td colSpan={100}></td>
              </tr>
            </tbody>
          </table>

          {/* InvoiceDetailFooter */}
          <InvoiceDetailFooter />
        </div>

        <Modal
          visible={isShowConfirmModal}
          // cancel={() => {
          //   setShowConfirmModal(false);
          // }}
        >
          <div className=" bg-white m-2 py-4 px-5 border-red-500 border-[3px] rounded-2xl  flex  flex-col  ">
            <span className=" uppercase mx-auto px-auto text-center bg-white-500/80 py-1 px-2 text-red-500 font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
              delete Invoice detail
            </span>

            <div className=" text-center pt-5 px-2 text-red-600 font-bold text-sm rounded-full  ">
              Are you sure you want to delete this payment ?
            </div>

            <div className="flex items-center justify-center space-x-5  px-4 mt-6 mb-7 ">
              <Button
                onClick={() => {
                  // setShowConfirmModal(false);
                }}
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

        <NewPaymentForm
          visible={isShowFormNewPayment}
          cancel={() => {
            updateState({ isShowFormNewPayment: false });
          }}
        />
      </div>
    </div>
  );
}
