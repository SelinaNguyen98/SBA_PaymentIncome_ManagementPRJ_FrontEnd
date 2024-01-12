import { createContext, useState } from "react";

const initialAppContext = {
  isShowAsideFilter: true,
  toggleAsideFilter: () => null,

  toast: null,
  showToast: () => null,
  // setShowAsideFilter: () => null
};
export const AppContext = createContext(initialAppContext);

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [isShowAsideFilter, setShowAsideFilter] = useState(
    initialAppContext.isShowAsideFilter
  );

  const toggleAsideFilter = () => {
    setShowAsideFilter((prev) => !prev);
    console.log(isShowAsideFilter);
  };

  //State quản lý Toast thông báo
  const [toast, setToast] = useState(null);
  const showToast = (message, type) => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // const showToastType = {
    // success: (message) => showToast(message, "success"),
    // delete: (message) => showToast(message, "delete"),
  // };
  ////////////

  return (
    <AppContext.Provider
      value={{
        isShowAsideFilter,
        toggleAsideFilter,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
