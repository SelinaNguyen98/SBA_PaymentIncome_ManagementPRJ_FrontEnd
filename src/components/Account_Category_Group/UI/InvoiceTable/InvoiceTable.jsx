import Button from "../../../Button";

export default function InvoiceTable() {
  return (
    <div className="ml-4 mr-3 mt-3 pl-6 pr-3 pt-3 pb-4 bg-white rounded-[16px]">
      <div className="grid grid-cols-12 gap-8 items-center ">
        
      </div>
      <table className=" w-full h-full bg-white mt-2 pt-2 " style={{}}>
        <thead className=" text-sm bg-main-theme ">
          <tr>
            <th></th>
            <th>NO</th>
            <th>REPORT TYPE</th>
            <th>GROUP CATEGORY</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
              {/* Firsh row is like padding-top */}
              <tr className="bg-main-theme">
                <td colSpan={100}></td>
              </tr>

              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <tr key={index}>
                    {/* First column of each row is like padding-left */}
                    <td className=" w-[1%]"></td>

                    {/* DATA MAIN*/}
                    <td className=" w-[10%]" name="tb_no">
                      </td>
                    <td className=" w-[10%]" name="tb_report">
                      </td>
                    <td className=" w-[10%]" name="tb_group">
                      </td>
                    {/* Last column of each row is like padding-right */}
                    <td className=" w-[1%]"></td>
                  </tr>
                ))}

              {/* Last row is like padding-bottom */}
              <tr className=" bg-main-theme h-[0px] py-0 my-0">
                <td colSpan={100}></td>
              </tr>
            </tbody>
      </table>
    </div>
  );
}
