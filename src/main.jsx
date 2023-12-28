import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Utils/output.css";
import InvoiceDetails from "./components/Invoice_Management/InvoiceDetails";
import Pagination from "./components/Invoice_Management/InvoiceDetails/Pagination/Pagination.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InvoiceDetails />
    {/* <Pagination ></Pagination> */}
  </React.StrictMode>
);
