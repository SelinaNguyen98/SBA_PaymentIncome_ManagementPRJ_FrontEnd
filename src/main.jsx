import ReactDOM from "react-dom/client";
// eslint-disable-next-line no-unused-vars
import App from "./App.jsx";
import "./Utils/output.css";
// import InvoiceDetails from "./components/Invoice_Management/InvoiceDetails";
import Invoice_Management from "./components/Invoice_Management/Invoice_Managment.jsx";
import { AppProvider } from "./Utils/contexts/app.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   <InvoiceDetails />
  // </React.StrictMode>

  <AppProvider>
    <Invoice_Management />
    {/* <MonthYearPicker></MonthYearPicker> */}
  </AppProvider>
);
