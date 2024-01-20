import { createContext, useState } from "react";

const initialAppContext = {
  // isShowAsideFilter: true,
  // toggleAsideFilter: () => null,

  toast: null,
  showToast: () => null,
  // setShowAsideFilter: () => null
};
export const AppContext = createContext(initialAppContext);

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  // const [isShowAsideFilter, setShowAsideFilter] = useState(
  //   initialAppContext.isShowAsideFilter
  // );

  // const toggleAsideFilter = () => {
  //   setShowAsideFilter((prev) => !prev);
  //   console.log(isShowAsideFilter);
  // };

  //State quản lý Toast thông báo
  const [toast, setToast] = useState(null);
  const showCustomToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };
  const showToast = {
    success: (message) => {
      showCustomToast(message, "success");
    },
    error: (message) => {
      showCustomToast(message, "error");
    },
  };

  return (
    <AppContext.Provider
      value={{
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
