// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/app.context";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function Toast() {
  const { toast } = useContext(AppContext);
  const type = toast?.type || "success"; // 'success' | 'error'
  return (
    <>
      {toast && (
        <AnimatePresence>
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
              {type === "error" && (
                <HiOutlineExclamationCircle size={22} className="mr-2" />
              )}

              {toast?.message || "Successfully!"}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
}