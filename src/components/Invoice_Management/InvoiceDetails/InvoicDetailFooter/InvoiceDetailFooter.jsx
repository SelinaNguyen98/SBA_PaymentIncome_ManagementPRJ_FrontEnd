// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Pagination from "../../../../Utils/Pagination";

export default function InvoiceDetailFooter({ changePage, page, totalPage }) {
  // eslint-disable-next-line react/prop-types
  const { t } = useTranslation();

  const t_invoice = t;
  return (
    <div className=" mt-3">
      <div className=" flex flex-wrap gap-4 items-center">
        <span className="font-bold">{t_invoice("title.total_of_month")}</span>
        <div className="flex items-center gird grid-cols-12 gap-2 flex-1 max-lg:space-y-2  max-[680px]:flex-col">
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
          <Pagination
            totalPage={totalPage}
            page={page}
            changePage={changePage}
          />
        </div>
      </div>
    </div>
  );
}
