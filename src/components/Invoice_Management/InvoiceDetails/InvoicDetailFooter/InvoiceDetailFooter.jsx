// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Pagination from "../../../../Utils/Pagination";

// eslint-disable-next-line react/prop-types
export default function InvoiceDetailFooter({
  changePage,
  page,
  totalPage,
  totalUSD,
  totalVND,
  totalJPY,
}) {
  // eslint-disable-next-line react/prop-types
  const { t } = useTranslation();

  const t_invoice = t;
  return (
    <div className=" flex flex-wrap gap-4 items-center py-1">
      <span className="font-bold">{t_invoice("title.total_of_month")}</span>
      <div className="flex items-start gird grid-cols-12 gap-2 flex-1 max-lg:space-y-2  max-[680px]:flex-col">
        <div className=" inline-flex mx-3 ">
          JPY
          {/* <span className=" bg-main-theme max-w-[100px] ml-2  ">{totalUSD}</span> */}
          <span type="text" className=" bg-main-theme max-w-[100px] ml-2  ">
            {totalJPY}
          </span>
        </div>
        <div className=" inline-flex mx-3 ">
          VND
          <span type="text" className=" bg-main-theme  max-w-[100px] ml-2 ">
            {totalVND}
          </span>
        </div>
        <div className=" inline-flex mx-3 ">
          USD
          <span type="text" className=" bg-main-theme  max-w-[100px] ml-2">
            {totalUSD}
          </span>
        </div>
      </div>
      <div className="  h-[40px] justify-end">
        {totalPage && (
          <Pagination
            totalPage={totalPage}
            page={page}
            changePage={changePage}
          />
        )}
      </div>
    </div>
  );
}
