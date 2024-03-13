// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/app.context";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Toast() {
  // Sử dụng useContext để lấy thông tin về toast từ AppContext
  const { toast } = useContext(AppContext);

  // Xác định loại toast (success hoặc error), mặc định là success nếu không có loại nào được xác định
  const type = toast?.type || "success"; // 'success' | 'error'

  return (
    <>
      {/* Kiểm tra nếu có toast thì hiển thị */}
      {toast && (
        <AnimatePresence>
          {/* Sử dụng Framer Motion để thực hiện hiệu ứng khi hiển thị toast */}
          <motion.div
            className=" fixed min-w-[200px] top-0 right-0 z-[9999]  box-border  "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
          >
            <div
              className={`flex items-center bg-white  border-[3px] 
            border-r-0  rounded-l-[50px] pt-1 px-3 min-h-5 box-border font-medium
             ${type === "success" ? "border-success text-success" : ""}
             ${type === "error" ? "border-red-500 text-red" : ""}
            `}
            >
              {/* Hiển thị biểu tượng thành công nếu là toast success */}
              {type == "success" && (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 19 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    d="M2 12.2218L6.28571 19.0363L17 2"
                    stroke="#3CA745"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              {/* Hiển thị biểu tượng lỗi nếu là toast error */}
              {type === "error" && (
                <HiOutlineExclamationCircle size={22} className="mr-2" />
              )}

              {/* Hiển thị nội dung thông báo hoặc "Successfully!" nếu không có nội dung */}
              {toast?.message || "Successfully!"}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}
