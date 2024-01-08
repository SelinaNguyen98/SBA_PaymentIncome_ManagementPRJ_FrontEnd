import { createContext, useState } from "react";

const initialAppContext = {
  isShowAsideFilter: true,
  toggleAsideFilter: () => null,
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

  return (
    <AppContext.Provider
      value={{
        isShowAsideFilter,
        toggleAsideFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
