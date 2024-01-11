/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/Sidebar/UI";
import BS_Report from "./components/BS_Report/UI/BS_Report";
import InvoiceDetails from "./components/Invoice_Management/InvoiceDetails";
import Invoice_Managment from "./components/Invoice_Management/Invoice_Managment";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="flex flex-row">
      {/* <SideBar /> */}
      <div className="bg-red-50 w-4/5">
        <BrowserRouter>
          <Routes>
            <Route path="/payment" element={<InvoiceDetails />} />
            <Route />
            <Route>
              <Route />
              <Route />
              <Route />
              <Route />
              <Route />
              <Route />
              <Route />
              <Route />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
