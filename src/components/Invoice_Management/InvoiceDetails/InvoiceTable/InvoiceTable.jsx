import Button from "../../../Button";
import "./styles.css";

export default function InvoiceTable() {
  return (
    <table id="invoiceTable" className="">
      <thead>
        <tr>
          <th></th>
          <th>No</th>
          <th>Date</th>
          <th>Name</th>
          <th>JPY</th>
          <th>VND</th>
          <th>USD</th>
          <th>JOURNAL</th>
          <th>INVOICE</th>
          <th>PAY</th>
          <th>ACTION</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr className="">
          <td colSpan={100}></td>
        </tr>

        {Array(10)
          .fill(0)
          .map((_, index) => (
            <tr key={index}>
              <td></td>
              <td>dsfs</td>
              <td>sdf</td>
              <td>sdf</td>
              <td>sdf</td>
              <td>sdf</td>
              <td>UsdfSD</td>
              <td>sdf</td>
              <td>sdf</td>
              <td>PAY</td>
              <td>sdf</td>
              <td></td>
            </tr>
          ))}

        <tr className=" bg-main-theme h-[0px] py-0 my-0">
          <td colSpan={100}></td>
        </tr>
      </tbody>
    </table>
  );
}
