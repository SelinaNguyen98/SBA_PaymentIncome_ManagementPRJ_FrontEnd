import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Utils/output.css";
import InvoiceDetails from "./components/Invoice_Management/InvoiceDetails";
import InvoiceTable from "./components/Invoice_Management/InvoiceDetails/InvoiceTable";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <InvoiceDetails />
  </React.StrictMode>
);
