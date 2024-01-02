import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Utils/output.css";
import InvoiceDetails from "./components/Invoice_Management/InvoiceDetails/InvoiceDetails.jsx";
import { AppProvider } from "./Utils/contexts/app.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <InvoiceDetails />
  // </React.StrictMode>

  <AppProvider>
    <InvoiceDetails />
    {/* <MonthYearPicker></MonthYearPicker> */}
  </AppProvider>
);
