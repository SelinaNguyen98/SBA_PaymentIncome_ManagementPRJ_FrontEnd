/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Pagination from "../Pagination";
import Pagination2 from "../Pagination2";

export default function InvoiceDetailFooter() {
  return (
    <div className=" mt-3">
      <div className=" flex flex-wrap gap-4 items-center">
        
        {/*  max-lg:space-y-2  */}
        {/* <div className=" items-center gird grid-cols-12 gap-2 flex-1 max-lg:space-y-2 ">
        </div> */}
        <div className=" flex-1  flex justify-end">
          {/* flex-shrink-0 */}
          <Pagination2 />
        </div>
      </div>
    </div>
  );
}
