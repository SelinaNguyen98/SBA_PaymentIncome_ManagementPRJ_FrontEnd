/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/Sidebar/UI/Sidebar";
import Invoice_Management from "./components/Invoice_Management/Invoice_Managment.jsx";
import PL_Report from "./components/PL_Report/UI/PL_Report.jsx";
import BS_Report from "./components/BS_Report/UI/BS_Report.jsx";
import Account_Annalytics from "./components/Invoice_Management/Account_Annalytics/UI/Account_Annalytics";
import Order from "./components/Invoice_Management/Orders/UI/Order";
import InvoiceDetails from "./components/Invoice_Management/InvoiceDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route />
        <Route path="/sidebar/*" element={<SideBar />}>
          <Route path="InvoiceDetails" element={<InvoiceDetails/>} />
          <Route path="Account_Annalytics" element={<Account_Annalytics />} />
          <Route path="Order" element={<Order />} />
          <Route path="PL_Report" element={<PL_Report />} />
          <Route path="BS_Report" element={<BS_Report />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
