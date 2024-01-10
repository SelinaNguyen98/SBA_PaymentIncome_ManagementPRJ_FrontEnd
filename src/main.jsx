// eslint-disable-next-line no-unused-vars
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./Utils/output.css";

import { AppProvider } from "./Utils/contexts/app.context.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <InvoiceDetails />
  // </React.StrictMode>

  <AppProvider>
    {/* <Invoice_Management /> */}
    <App/>


  </AppProvider>
);
