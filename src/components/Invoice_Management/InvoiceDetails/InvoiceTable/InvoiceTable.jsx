import React from "react";

export default function InvoiceTable() {
  return (
    <div className="ml-4 mr-3 mt-3 pl-6 pr-3 pt-3 pb-4 bg-white rounded-[16px]">
      <div className="grid grid-cols-12 gap-4 items-center py-2  ">
        <input
          type="date"
          className="col-span-12 lg:col-span-2 rounded-lg border-black border-2 px-2 py-1 "
        />

        <div className="flex col-span-12 lg:col-span-6 bg-main-theme items-center justify-around px-2 py-2 rounded-md ">
          <div className=" ">
            JPY
            <input type="number" className="bg-white mx-2 mr-4 w-[150px]" />
          </div>
          <div className="">
            USD
            <input type="number" className="bg-white mx-2 w-[150px]" />
          </div>

          <button className="bg-green px-3 py-1 rounded-[18px] text-white text-sm font-bold">
            SAVE
          </button>
        </div>

        <div className=" flex col-span-12 lg:col-span-4 border items-center justify-end">
          <button className="bg-green px-3 py-1 rounded-[18px] text-white text-sm font-bold mx-3  flex justify-center items-center flex-shrink-0  ">
            <svg
              width="16"
              height="16"
              viewBox="0 0 21 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.75 9.9H11.55V13.5H9.45V9.9H5.25V8.1H9.45V4.5H11.55V8.1H15.75M10.5 0C9.12112 0 7.75574 0.232792 6.48182 0.685084C5.2079 1.13738 4.05039 1.80031 3.07538 2.63604C1.10625 4.32387 0 6.61305 0 9C0 11.3869 1.10625 13.6761 3.07538 15.364C4.05039 16.1997 5.2079 16.8626 6.48182 17.3149C7.75574 17.7672 9.12112 18 10.5 18C13.2848 18 15.9555 17.0518 17.9246 15.364C19.8938 13.6761 21 11.3869 21 9C21 7.8181 20.7284 6.64778 20.2007 5.55585C19.6731 4.46392 18.8996 3.47177 17.9246 2.63604C16.9496 1.80031 15.7921 1.13738 14.5182 0.685084C13.2443 0.232792 11.8789 0 10.5 0Z"
                fill="white"
              />
            </svg>
            <span className=" flex-shrink-0"> ADD NEW</span>
          </button>
          <button className="bg-green px-3 py-1 rounded-[18px] text-white text-sm font-bold mx-3 bg-red w-full flex justify-center items-center ">
            ADD DELETE
          </button>
        </div>
      </div>
      <table className=" h-[400px] w-full bg-main-theme"></table>
    </div>
  );
}
