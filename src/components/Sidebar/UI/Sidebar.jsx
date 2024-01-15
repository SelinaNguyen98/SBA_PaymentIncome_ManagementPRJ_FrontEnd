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
export default function SideBar() {
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
    useState(false);
  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };
  useEffect(() => {
    setIsHiddenInvoiceManagement(false);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      case "Account Category":
        setIsHiddenInvoiceManagement(true);
        navigate("/sidebar/Account_Category");
        break;
      case "Account Category Group":
        setIsHiddenInvoiceManagement(true);
        navigate("/sidebar/Account_Category_Group");
        break;
      case "Invoice Management":
        // Navigate to the appropriate route
        setIsHiddenInvoiceManagement(false);
        navigate("/sidebar/InvoiceDetails");
        break;
      case t(`navHeader.invoiceDetails`):
        // Navigate to the appropriate route
        setIsHiddenInvoiceManagement(false);
        navigate("/sidebar/InvoiceDetails");
        break;
      case t(`navHeader.accountAnalytics`):
        // Navigate to the appropriate route
        setIsHiddenInvoiceManagement(false);
        navigate("/sidebar/Account_Annalytics");
        break;
      case t(`navHeader.orders`):
        // Navigate to the appropriate route
        setIsHiddenInvoiceManagement(false);
        navigate("/sidebar/Order");
        break;
      case "Profit and Loss Report":
        setIsHiddenInvoiceManagement(true);
        navigate("/sidebar/PL_Report");
        break;
      case "Balance Sheet Report":
        setIsHiddenInvoiceManagement(true);
        navigate("/sidebar/BS_Report");
        break;
      // Add more cases for other options
      default:
        break;
    }
  };

  const handleLogout = () => {
    // Add logic for logout
    // Example: clear local storage, perform API request, etc.
    navigate("/");
  };

  return (
    <div className="flex flex-row bg-main-theme h-full overflow-auto">
      <div className="px-4 pt-7 flex flex-col gap-36 bg-[#121C3E]">
        <div className="px-4 relative mb-8">
          <img src={logo} alt="" className="h-20 w-44" />
          <img className="absolute top-[65px]" src={comName} alt="" />
        </div>
        <ul className="flex flex-col gap-4" ref={refUl}>
          <li
            className="bg-yellow-400 mb-3 min-h-9 rounded-md p-1 min-w-56 cursor-pointer"
            onClick={(e) => selectOption(e)}
          >
            <i className="fa-solid fa-file-lines "></i>
            <span className="w-3 inline-block"></span>
            Account Category
          </li>
          <li
            className="bg-yellow-400 mb-3 min-h-9 rounded-md p-1 min-w-56 cursor-pointer"
            onClick={(e) => selectOption(e)}
          >
            <i className="fa-solid fa-table-cells-large"></i>
            <span className="w-3 inline-block"></span>
            Account Category Group
          </li>
          <li
            className="bg-yellow-400 mb-3 min-h-9 rounded-md p-1 min-w-56 cursor-pointer"
            onClick={(e) => selectOption(e)}
          >
            <i className="fa-regular fa-credit-card"></i>
            <span className="w-3 inline-block"></span>
            Invoice Management
          </li>
          <li
            className="bg-yellow-400 mb-3 min-h-9 rounded-md p-1 min-w-56 cursor-pointer"
            onClick={(e) => selectOption(e)}
          >
            <i className="fa-solid fa-book-open"></i>
            <span className="w-3 inline-block"></span>
            Profit and Loss Report
          </li>
          <li
            className="bg-yellow-400 mb-3 min-h-9 rounded-md p-1 min-w-56 cursor-pointer"
            onClick={(e) => selectOption(e)}
          >
            <i className="fa-solid fa-book-open"></i>
            <span className="w-3 inline-block"></span>
            Balance Sheet Report
          </li>
        </ul>
        <div className="relative items-center">
          <button
            className="text-white bg-red-900 rounded-lg h-7 w-28 text-lg absolute bottom-3 left-16 "
            onClick={handleLogout}
          >
            <i className="fa-solid fa-power-off"></i>Log out
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
                                  selectOption(e);
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
                        selectOption(e);
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
