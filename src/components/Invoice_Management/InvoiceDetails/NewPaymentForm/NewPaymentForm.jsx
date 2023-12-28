import React from "react";
import Button from "../../../Button";
import Modal from "../../../Modal";

const InputCustomComponent = ({ label, children }) => {
  return (
    <div className=" grid lg:grid-cols-12  gap-y-1  my-7">
      <label className="lg:col-span-3">{label}</label>
      <div className=" lg:col-span-9 ml-3">
        {/* {React.createElement(
          children.type,
          {
            ...children.props,
            className: `${children.props.className} w-full`,
          },
          children.props.children
        )} */}
        {children}
      </div>
    </div>
  );
};

export default function NewPaymentForm({ visible, cancel, ok }) {
  //   const elementInputComponent = ({ lable, children }) => {
  //     return (
  //       <div className=" grid lg:grid-cols-12">
  //         <label className="lg:col-span-3">{lable}</label>
  //         <div className=" lg:col-span-12">{children}</div>
  //       </div>
  //     );
  //   };
  return (
    <Modal visible={visible}>
      <div className=" bg-white m-2 py-4 px-5 border-red-500 border-[3px] rounded-2xl  flex  flex-col  ">
        <span className=" uppercase  py-1 mx-auto my-3 px-12 text-center bg-white-500/80    font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
          new payment
        </span>

        <form className="  px-4 ">
          <InputCustomComponent label={"Date (dd/mm/yyyy)"}>
            <input type="text" className=" bg-main-theme w-full"></input>
          </InputCustomComponent>
          <InputCustomComponent label={"Date (dd/mm/yyyy)"}>
            <input type="text" className=" bg-main-theme w-full"></input>
          </InputCustomComponent>
          <InputCustomComponent label={"Date (dd/mm/yyyy)"}>
            <input type="text" className=" bg-main-theme w-full"></input>
          </InputCustomComponent>
        </form>

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
            onClick={cancel}
            className={" border-red-500 bg-white border-2   py-2 px-6"}
          >
            <span className=" text-red-500  ml-1 font-medium uppercase">
              Cancel
            </span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
