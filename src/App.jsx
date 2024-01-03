/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceDetails from "./components/Invoice_Management/InvoiceDetails/InvoiceDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="payment" element={<InvoiceDetails />} />
        <Route></Route>
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
  );
}

export default App;
