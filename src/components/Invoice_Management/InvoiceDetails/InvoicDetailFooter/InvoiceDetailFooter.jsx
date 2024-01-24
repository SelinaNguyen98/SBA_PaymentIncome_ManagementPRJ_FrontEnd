// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Pagination from "../../../../Utils/Pagination";
import {
  // eslint-disable-next-line no-unused-vars
  formatInputToFloatStringSeparator,
} from "../../../../Utils/utils/maths";

// eslint-disable-next-line react/prop-types
export default function InvoiceDetailFooter({
  // eslint-disable-next-line react/prop-types
  changePage,
  // eslint-disable-next-line react/prop-types
  page,
  // eslint-disable-next-line react/prop-types
  totalPage,
  // eslint-disable-next-line react/prop-types
  totalUSD,
  // eslint-disable-next-line react/prop-types
  totalVND,
  // eslint-disable-next-line react/prop-types
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
          JPY:
          {/* <span className=" bg-main-theme max-w-[100px] ml-2  ">{totalUSD}</span> */}
          {/* <span type="text" className=" bg-main-theme w-[150px] ml-2  px-2  ">
            {formatFloatToCustomString(totalJPY)}
          </span> */}
          <input
            className=" bg-main-theme w-[150px] ml-2 px-2 "
            readOnly
            value={formatInputToFloatStringSeparator(totalJPY.toString())}
          ></input>
        </div>
        <div className=" inline-flex mx-3 ">
          VND:
          {/* <span type="text" className=" bg-main-theme w-[150px] ml-2  px-2  ">
            {formatNumberSeparator(totalVND.toString())}
          </span> */}
          <input
            className=" bg-main-theme w-[150px] ml-2 px-2 "
            readOnly
            value={formatInputToFloatStringSeparator(totalVND.toString())}
          ></input>
        </div>
        <div className=" inline-flex mx-3 ">
          USD:
          {/* <span type="text" className=" bg-main-theme w-[150px] ml-2  px-2  ">
            {formatFloatToCustomString(totalUSD)}
          </span> */}
          <input
            className=" bg-main-theme w-[150px] ml-2 px-2 "
            readOnly
            value={formatInputToFloatStringSeparator(totalUSD.toString())}
          ></input>
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
