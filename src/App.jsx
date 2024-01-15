/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/Sidebar/UI/Sidebar";
import Login from "./components/Login/UI/Login";
import PL_Report from "./components/PL_Report/UI/PL_Report.jsx";
import BS_Report from "./components/BS_Report/UI/BS_Report.jsx";
import Account_Annalytics from "./components/Invoice_Management/Account_Annalytics/UI/Account_Annalytics";
import Order from "./components/Invoice_Management/Orders/UI/Order";
import InvoiceDetails from "./components/Invoice_Management/InvoiceDetails";
import Account_Category_Group from "./components/Account_Category_Group/UI/GroupDetails";
import Account_Category from "./components/Account_Category/UI/Account_Category";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route />
        <Route path="/" element={<Login />} />
        <Route path="/sidebar/*" element={<SideBar />}>
          <Route index element={<Account_Category/>} />
          <Route path="Account_Category" element={<Account_Category />} />
          <Route
            path="Account_Category_Group"
            element={<Account_Category_Group />}
          />
          <Route path="InvoiceDetails" element={<InvoiceDetails />} />
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
