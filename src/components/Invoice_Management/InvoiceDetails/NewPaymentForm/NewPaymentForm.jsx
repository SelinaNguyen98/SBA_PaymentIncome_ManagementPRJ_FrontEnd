import React from "react";
import Button from "../../../../Utils/Button";
import Modal from "../../../../Utils/Modal";

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function NewPaymentForm({ visible, cancel, ok }) {
  return (
    <Modal visible={visible}>
      <div className="flex flex-col bg-white m-2 py-5 px-12  rounded-2xl">
        <span className=" uppercase  py-1 mx-auto my-3 px-12 text-center bg-white-500/80    font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
          new payment
        </span>

        <form className="px-4 mt-5">
          <InputCustomComponent label={"Date (dd/mm/yyyy)"}>
            <input type="text" className=" bg-main-theme w-full"></input>
          </InputCustomComponent>
          <InputCustomComponent label={"Name)"}>
            <input type="text" className=" bg-main-theme w-full"></input>
          </InputCustomComponent>
          <InputCustomComponent label={"VND"}>
            <input type="text" className=" bg-main-theme w-full"></input>
          </InputCustomComponent>
          <InputCustomComponent label={"Note"}>
            <textarea
              type="text"
              rows={4}
              className=" bg-main-theme w-full overflow-y-scroll resize-none"
            ></textarea>
            {/* <input type="text"  className=" bg-main-theme w-full"></input> */}
          </InputCustomComponent>
          <InputCustomComponent label={"Journal"}>
            <input type="text" className=" bg-main-theme w-full"></input>
          </InputCustomComponent>
          <InputCustomComponent label={"Invoice"}>
            <input type="text" className=" bg-main-theme w-full"></input>
          </InputCustomComponent>
          <InputCustomComponent label={"Pay"}>
            <input type="text" className=" bg-main-theme w-full"></input>
          </InputCustomComponent>
        </form>

        <div className="flex items-center justify-around  mt-6 mb-7  ">
          {/* <div className="  "> */}
          <Button
            onClick={() => {
              // setShowConfirmModal(false);
            }}
            className={" py-2 border-2 border-gray min-w-[150px]"}
          >
            save
          </Button>
          <Button
            onClick={cancel}
            className={" border-red-500 bg-white border-2 py-2 min-w-[150px] "}
          >
            <span className=" text-red-500  uppercase ">Cancel</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// eslint-disable-next-line react/prop-types
const InputCustomComponent = ({ label, children }) => {
  return (
    <div className=" grid lg:grid-cols-12  gap-y-2 mb-4">
      <label className="lg:col-span-3">{label}</label>
      <div className=" lg:col-span-9 ml-3">
        {React.createElement(
          // eslint-disable-next-line react/prop-types
          children.type,
          {
            // eslint-disable-next-line react/prop-types
            ...children.props,
            // eslint-disable-next-line react/prop-types
            className: `${children.props.className} w-full py-1 rounded-sm px-2 `,
          },
          // eslint-disable-next-line react/prop-types
          children.props.children
        )}
        {/* {children} */}
      </div>
    </div>
  );
};
