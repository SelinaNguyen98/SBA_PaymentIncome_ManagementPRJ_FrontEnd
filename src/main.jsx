import React from "react";
import ReactDOM from "react-dom/client";
// eslint-disable-next-line no-unused-vars
import App from "./App.jsx";
import "./Utils/output.css";
// import InvoiceDetails from "./components/Invoice_Management/InvoiceDetails";
// import Invoice_Management from "./components/Invoice_Management/Invoice_Managment.jsx";
// import PL_Report from "./components/PL_Report/UI/PL_Report.jsx";
// import BS_Report from "./components/BS_Report/UI/BS_Report.jsx";
import { AppProvider } from "./Utils/contexts/app.context.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      {/* <Invoice_Management /> */}
      <App />
    </AppProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
