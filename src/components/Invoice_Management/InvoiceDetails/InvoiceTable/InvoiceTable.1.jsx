import Button from "../../../Button";

export default function InvoiceTable() {
  return (
    <div className="ml-4 mr-3 mt-3 pl-6 pr-3 pt-3 pb-4 bg-white rounded-[16px]">
      <div className="grid grid-cols-12 gap-8 items-center ">
        <input
          type="date"
          className="col-span-12 lg:col-span-2 rounded-lg font-medium border-black border-2 px-2 py-1 "
        />

        <div className=" col-span-12 lg:col-span-7 bg-main-theme items-center justify-around px-4 mx-2 py-1 rounded-md ">
          <div className="grid grid-cols-12 gap-4 items-center justify-center ">
            <div className="font-medium lg:col-span-5 col-span-12 ">
              JPY
              <input
                type="number "
                className="bg-white mx-2 min-w-[150px] shadow-sm rounded-md"
              />
            </div>
            <div className="font-medium lg:col-span-5 col-span-12">
              USD
              <input
                type="number"
                className="bg-white mx-2 min-w-[150px] shadow-sm rounded-md"
              />
            </div>

            <Button className="col-span-12 lg:col-span-2 flex-shrink-0 ">
              SAVE
            </Button>
          </div>
        </div>

        <div className="flex col-span-12 lg:col-span-3  items-center justify-end">
          <Button
            icon={
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
            }
          >
            ADD NEW
          </Button>

          <Button
            className="bg-red ml-2 "
            icon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.5 18C6.98044 18 4.56408 17.0518 2.78249 15.364C1.00089 13.6761 0 11.3869 0 9C0 6.61305 1.00089 4.32387 2.78249 2.63604C4.56408 0.948212 6.98044 0 9.5 0C12.0196 0 14.4359 0.948212 16.2175 2.63604C17.9991 4.32387 19 6.61305 19 9C19 11.3869 17.9991 13.6761 16.2175 15.364C14.4359 17.0518 12.0196 18 9.5 18ZM14.25 8.1H4.75V9.9H14.25V8.1Z"
                  fill="white"
                />
              </svg>
            }
          >
            DELETE
          </Button>
        </div>
      </div>
      <table className=" w-full bg-white mt-2 pt-2">
        <thead className=" uppercase text-sm rounded--   bg-main-theme font-medium bg-main-theme  ">
          <tr>
            <th className=" font-medium">No</th>
            <th className=" font-medium">Date</th>
            <th className=" font-medium">Name</th>
            <th className=" font-medium">JPY</th>
            <th className=" font-medium">VND</th>
            <th className=" font-medium">USD</th>
            <th className=" font-medium">JOURNAL</th>
            <th className=" font-medium">INVOICE</th>
            <th className=" font-medium">PAY</th>
            <th className=" font-medium">ACTION</th>
          </tr>
        </thead>
        tbody
      </table>
    </div>
  );
}
