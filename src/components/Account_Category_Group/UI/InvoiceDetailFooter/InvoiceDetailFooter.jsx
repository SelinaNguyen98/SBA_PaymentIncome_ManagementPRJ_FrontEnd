// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Pagination from "../../../../Utils/Pagination";
import Pagination2 from "../../../Account_Category/UI/Pagination2";


// eslint-disable-next-line react/prop-types
export default function InvoiceDetailFooter() {
    return (
      <div className=" mt-3">
        <div className=" flex flex-wrap gap-4 items-center">
          
          {/*  max-lg:space-y-2  */}
          {/* <div className=" items-center gird grid-cols-12 gap-2 flex-1 max-lg:space-y-2 ">
          </div> */}
          <div className=" flex-1  flex justify-end">
            {/* flex-shrink-0 */}
            <Pagination/>
          </div>
        </div>
      </div>
    );
  }