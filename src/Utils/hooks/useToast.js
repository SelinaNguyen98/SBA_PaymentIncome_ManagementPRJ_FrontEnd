import { toast } from "react-toastify";
import "./../style.css";
import "react-toastify/dist/ReactToastify.css";

// src/Utils/style.css
const showToast = (message, className) => {
  toast(message, {
    className: className,
    bodyClassName: "body-toast-css",
    hideProgressBar: true,
    closeButton: false,
    autoClose: 1000000,
  });
};

const useToast = {
  success: (message) => showToast(message, "custom-toast-success"),
  error: (message) => showToast(message, "custom-toast-error"),
};

export default useToast;
