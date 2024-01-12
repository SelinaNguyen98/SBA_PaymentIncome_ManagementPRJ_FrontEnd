import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './Utils/output.css'
import { AppProvider } from "./Utils/contexts/app.context.jsx";
import InvoiceDetails from "./components/Account_Category/UI/InvoiceDetails.jsx";
import GroupDetails from "./components/Account_Category/UI/GroupDetails.jsx";



ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <AppProvider>
  <InvoiceDetails />
</AppProvider>
)
