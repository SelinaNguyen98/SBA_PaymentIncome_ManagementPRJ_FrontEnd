import React, { useState } from "react";
import Pagination from "../Pagination";

export default function InvoiceDetailFooter({ queryConfig, totalPage }) {
  return (
    <div className=" mt-3">
      <div className=" flex flex-wrap gap-4 items-center">
        <span className="font-bold">Total of month</span>
        {/*  max-lg:space-y-2  */}
        <div className=" items-center gird grid-cols-12 gap-2 flex-1 max-lg:space-y-2 ">
          <div className=" inline-flex mx-3 ">
            JPY
            <input
              type="text"
              className=" bg-main-theme max-w-[100px] ml-2  "
            />
          </div>
          <div className=" inline-flex mx-3 ">
            VND
            <input
              type="text"
              className=" bg-main-theme  max-w-[100px] ml-2 "
            />
          </div>
          <div className=" inline-flex mx-3 ">
            USD
            <input
              type="text"
              className=" bg-main-theme  max-w-[100px] ml-2 "
            />
          </div>
        </div>
        <div className=" flex-1  flex justify-end">
          {/* flex-shrink-0 */}
          <Pagination totalPage={totalPage} queryConfig={queryConfig} />
        </div>
      </div>
    </div>
  );
}
