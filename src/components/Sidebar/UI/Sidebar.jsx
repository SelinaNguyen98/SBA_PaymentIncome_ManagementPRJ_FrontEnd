// eslint-disable-next-line no-unused-vars
import { React, useRef, useContext, useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "../../../assets/Images/Logo_SBA.png";
import comName from "../../../assets/Images/Frame 17.png";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { locales } from "../../../Utils/i18n/i18n";
import Popover from "../../../Utils/Popover";
import { PiTranslateFill } from "react-icons/pi";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
export default function SideBar() {
  const [isHiddenSidebar, setIsHiddenSidebar] = useState(false);
  const handleToggleSidebar = () => {
    setIsHiddenSidebar(!isHiddenSidebar);
  };
  var isHiddenMainButton = false;
  // Chuyển đổi ngôn ngữ
  const { i18n, t } = useTranslation();
  const currentLanguage = locales[i18n.language];
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  /**
   * TO DO
   * khi nao co router thay vao
   */
  // const location = useLocation();
  // const customProp = location.state?.customProp || "top1";
  const [activeButton, setActiveButton] = useState("invoiceDetails");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isHiddenInvoiceManagement, setIsHiddenInvoiceManagement] =
    useState(true);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  const location = useLocation();
  useEffect(() => {
    const dbh = async () => {
      const token = localStorage.getItem("token");
     console.log(token);
      if (!token) {
        navigate("/");
        return;
      }
      const currentPath = location.pathname;

      if (
        currentPath.includes("/home/InvoiceDetails") ||
        currentPath.includes("/home/Account_Annalytics") ||
        currentPath.includes("/home/Order")
      ) {
        setIsHiddenInvoiceManagement(false);
      } else {
        setIsHiddenInvoiceManagement(true);
      }
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    };
    dbh();
  }, [location.pathname]);

  const isMobile = screenWidth <= 850;

  const refUl = useRef(null);
  const navigate = useNavigate();

  const selectOption = (e) => {
    for (let el of refUl.current.children) {
      el.classList =
        "bg-[#121C3E] mb-3 min-h-9 rounded-md p-1 min-w-56 text-white";
    }
    e.currentTarget.classList =
      "bg-yellow-400 mb-3 min-h-9 rounded-md p-1 min-w-56";

    // Add logic to navigate based on the selected option if needed
    const selectedOption = e.currentTarget.innerText.trim();
    switch (selectedOption) {
      // eslint-disable-next-line no-duplicate-case
      case t(`title.accountCategory`):
        setIsHiddenInvoiceManagement(true);
        navigate("/home/Account_Category");
        break;
      case t(`title.accountCategoryGroup`):
        setIsHiddenInvoiceManagement(true);
        navigate("/home/Account_Category_Group");
        break;
      case t(`title.Invoice_Management`):
        // Navigate to the appropriate route
        setIsHiddenInvoiceManagement(false);
        navigate("/home/InvoiceDetails");
        break;
      case t(`title.PL_report`):
        setIsHiddenInvoiceManagement(true);
        navigate("/home/PL_Report");
        break;
      case t(`title.BS_report`):
        setIsHiddenInvoiceManagement(true);
        navigate("/home/BS_Report");
        break;
      // Add more cases for other options
      default:
        break;
    }
  };

  const selectOption_Invoice = (e) => {
    // Add logic to navigate based on the selected option if needed
    const selectOption = e.currentTarget.innerText.trim();
    switch (true) {
      case selectOption === t(`navHeader.invoiceDetails`) ||
        selectOption === "INVOICE DETAILS":
        // Navigate to the appropriate route
        setIsHiddenInvoiceManagement(false);
        navigate("/home/InvoiceDetails");
        break;
      case selectOption === t(`navHeader.accountAnalytics`) ||
        selectOption === "ACCOUNT ANALYTICS":
        // Navigate to the appropriate route
        setIsHiddenInvoiceManagement(false);
        navigate("/home/Account_Annalytics");
        break;
      case selectOption === t(`navHeader.orders`) || selectOption === "ORDERS":
        // Navigate to the appropriate route
        setIsHiddenInvoiceManagement(false);
        navigate("/home/Order");
        break;
      default:
        break;
    }
    console.log(e.currentTarget.innerText.trim());
  };

  const handleLogout = () => {
    // Add logic for logout
    // Example: clear local storage, perform API request, etc.
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex flex-row bg-main-theme h-full overflow-auto">
      <div
        className={`px-4 pt-7 flex flex-col gap-36 bg-[#121C3E]  ${
          isHiddenSidebar ? "hidden" : ""
        }`}
      >
        <div className="px-4 relative mb-8">
          <img src={logo} alt="" className="h-20 w-44" />
          <img className="absolute top-[65px]" src={comName} alt="" />
        </div>
        <ul className="flex flex-col gap-8" ref={refUl}>
          <li
            className="text-white mb-3 min-h-9 rounded-md p-1 min-w-56 cursor-pointer"
            onClick={(e) => selectOption(e)}
          >
            <i className="fa-solid fa-file-lines "></i>
            <span className="w-3 inline-block"></span>
            {t(`title.accountCategory`)}
          </li>
          <li
            className="text-white mb-3 min-h-9 rounded-md p-1 min-w-56 cursor-pointer"
            onClick={(e) => selectOption(e)}
          >
            <i className="fa-solid fa-table-cells-large"></i>
            <span className="w-3 inline-block"></span>
            {t(`title.accountCategoryGroup`)}
          </li>
          <li
            className="text-white mb-3 min-h-9 rounded-md p-1 min-w-56 cursor-pointer"
            onClick={(e) => selectOption(e)}
          >
            <i className="fa-regular fa-credit-card"></i>
            <span className="w-3 inline-block"></span>
            {t(`title.Invoice_Management`)}
          </li>
          <li
            className="text-white mb-3 min-h-9 rounded-md p-1 min-w-56 cursor-pointer"
            onClick={(e) => selectOption(e)}
          >
            <i className="fa-solid fa-book-open"></i>
            <span className="w-3 inline-block"></span>
            {t(`title.PL_report`)}
          </li>
          <li
            className="text-white mb-3 min-h-9 rounded-md p-1 min-w-56 cursor-pointer"
            onClick={(e) => selectOption(e)}
          >
            <i className="fa-solid fa-book-open"></i>
            <span className="w-3 inline-block"></span>
            {t(`title.BS_report`)}
          </li>
        </ul>
        <div className="relative items-center">
          <button
            className="text-white bg-red-900 rounded-lg h-8 w-32 text-lg absolute bottom-3 left-12 "
            onClick={handleLogout}
          >
            <i className="fa-solid text-red fa-power-off"></i>
            <span className="ml-2">{t("button.Log_out")}</span>
          </button>
        </div>
      </div>
      <div
        id="contentInvoiceDetail"
        className="w-full h-full mb-20 max-[1000px]:mb-56 max-[568px]:mb-96"
      >
        <div className="flex flex-row gap-4 items-center mt-2 px-5 py-2 bg-main-theme">
          <div className="col-span-12 lg:col-span-1 lg:justify-center justify-start flex items-center px-1">
            {/* TO DO icon swich sidebar */}
            <svg
              className="w-9 h-9 cursor-pointer flex-shrink-0"
              viewBox="0 0 49 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleToggleSidebar}
            >
              <rect width="45" height="8" rx="4" fill="black" />
              <rect y="14" width="49" height="9" rx="4.5" fill="black" />
              <rect y="29" width="34" height="8" rx="4" fill="black" />
            </svg>

            <Popover
              className="flex items-center cursor-pointer ml-2 "
              renderPopover={
                <div className=" bg-yellow rounded-[12px]">
                  <div className="flex flex-col items-center justify-center px-4 py-2  ">
                    <button
                      className="flex items-center py-2 px-3 rounded-[16px] text-left font-bold text-sm uppercase bg-white w-[106px] justify-between"
                      onClick={() => changeLanguage("en")}
                    >
                      <span>English</span>
                      <span
                        className={`ml-2 ${
                          currentLanguage === "en" ? "" : "hidden"
                        }`}
                      >
                        <svg
                          viewBox="0 0 19 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                        >
                          <path
                            d="M2 8.6L6.28571 13L17 2"
                            stroke="#3CA745"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    <button
                      className="flex items-center py-2 px-3 mt-2 rounded-[16px] text-left font-bold text-sm uppercase bg-white w-full justify-between"
                      onClick={() => changeLanguage("jp")}
                    >
                      <span className=""> 日本語</span>
                      <span
                        className={`ml-2 ${
                          currentLanguage === "jp" ? "" : "hidden"
                        }`}
                      >
                        <svg
                          viewBox="0 0 19 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                        >
                          <path
                            d="M2 8.6L6.28571 13L17 2"
                            stroke="#3CA745"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              }
            >
              <PiTranslateFill
                className="w-10 h-10 cursor-pointer flex-shrink-0"
                // onClick={handleLanguageSwitch}
              />
            </Popover>
          </div>
          <div
            className={`${
              isMobile ? "col-span-12" : "col-span-9"
            } px-5 items-center w-full ${isHiddenMainButton ? "hidden" : ""} ${
              isHiddenInvoiceManagement ? "hidden" : ""
            }`}
          >
            <div className="grid grid-cols-12 gap-4 items-center mt-2 px-5 py-2 bg-main-theme">
              {isMobile ? (
                <button
                  className={classNames(
                    "col-span-12 rounded-[20px] border-black border-2 lg:mx-5 lg:px-3 py-1 font-bold shadow-sm text-center bg-yellow"
                  )}
                >
                  <Popover
                    className="col-span-4 lg:mx-5 lg:px-3 py-1 font-bold shadow-sm text-center flex justify-center gap-2"
                    renderPopover={
                      <div className="bg-white border-black border-2 rounded-[12px] justify-center item-center w-[450px] max-[800px]:w-[400px]  max-[750px]:w-[300px]">
                        <div className="flex flex-col items-center justify-center px-4 py-2">
                          {["invoiceDetails", "accountAnalytics", "orders"].map(
                            (buttonName) => (
                              <button
                                key={buttonName}
                                className={classNames(
                                  `flex items-center py-2 px-3 mt-2 rounded-[16px] text-left font-bold text-sm uppercase w-full justify-center ${
                                    activeButton === buttonName
                                      ? "bg-yellow"
                                      : "bg-white"
                                  }`,
                                  {
                                    "bg-yellow-bold":
                                      activeButton === buttonName,
                                  }
                                )}
                                onClick={(e) => {
                                  selectOption_Invoice(e);
                                  setActiveButton(buttonName);
                                }}
                              >
                                {t(`navHeader.${buttonName}`)}
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    }
                  >
                    <IoMdArrowDropdownCircle className="mt-1" />
                    {activeButton === "invoiceDetails" &&
                      t(`navHeader.invoiceDetails`)}
                    {activeButton === "accountAnalytics" &&
                      t(`navHeader.accountAnalytics`)}
                    {activeButton === "orders" && t(`navHeader.orders`)}
                  </Popover>
                </button>
              ) : (
                ["invoiceDetails", "accountAnalytics", "orders"].map(
                  (buttonName) => (
                    <button
                      key={buttonName}
                      className={classNames(
                        `col-span-4 rounded-[20px] border-black border-2  py-1 font-bold shadow-sm text-center max-[750px]:text-sm ${
                          activeButton === buttonName
                            ? "bg-yellow "
                            : "bg-white"
                        }`,
                        { "bg-yellow-bold": activeButton === buttonName }
                      )}
                      onClick={(e) => {
                        selectOption_Invoice(e);
                        setActiveButton(buttonName);
                      }}
                    >
                      {t(`navHeader.${buttonName}`)}
                    </button>
                  )
                )
              )}
            </div>
          </div>
        </div>
        <div className="bg-main-theme w-full ">
          <Outlet className="z-0 h-full" />
        </div>
      </div>
    </div>
  );
}
