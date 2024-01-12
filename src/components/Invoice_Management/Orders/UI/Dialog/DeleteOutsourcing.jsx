// eslint-disable-next-line no-unused-vars
import React from "react";
import Button from "../../../../../Utils/Button";
import Modal from "../../../../../Utils/Modal";

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function DeleteOutsourcing({ visible, cancel, t }) {
  const t_delete = t;
  return (
    <Modal visible={visible}>
      <div className=" bg-white m-2 py-4 px-5 border-red-500 border-[3px] rounded-2xl  flex  flex-col  ">
        <span className=" uppercase mx-auto px-auto text-center bg-white-500/80 py-1 px-2 text-red-500 font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
          {t_delete("delete_order.delete_outsourcing_cost")}
        </span>

        <div className=" text-center pt-5 px-2 text-red-600 font-bold text-sm rounded-full  ">
          {t_delete("delete_order.content_delete")}
        </div>

        <div className="flex items-center justify-center space-x-5  px-4 mt-6 mb-7 ">
          <Button onClick={() => {}} className={" bg-red py-2 px-6"}>
            {t_delete("button.confirm")}
          </Button>
          <Button
            onClick={cancel}
            className={" border-red-500 bg-white border-2 py-2 min-w-[150px] "}
          >
            <span className=" text-red-500  uppercase ">
              {" "}
              {t_delete("button.cancel")}
            </span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
