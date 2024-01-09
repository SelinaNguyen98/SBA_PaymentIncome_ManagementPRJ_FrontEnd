// eslint-disable-next-line no-undef, no-unused-vars
import { React, useContext, useEffect, useState } from "react";
import "../../Utils/style.css";
import "../Invoice_Management/InvoiceDetails/styles.css";
import { AppContext } from "../../Utils/contexts/app.context";
import { useTranslation } from "react-i18next";
import { PiTranslateFill } from "react-icons/pi";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { locales } from "../../Utils/i18n/i18n";
import "../../Utils/style.css";
import Popover from "../../Utils/Popover";
import classNames from "classnames";
import InvoiceDetails from "./InvoiceDetails";
import Order from "./Orders/UI/Order";
import Account_Annalytics from "./Account_Annalytics/UI/Account_Annalytics";

const Invoice_Managment = () => {
  var isHiddenMainButton = false;
  const { isShowAsideFilter } = useContext(AppContext);
  // Chuyển đổi ngôn ngữ
  const { i18n, t } = useTranslation();
  const currentLanguage = locales[i18n.language];
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const { toggleAsideFilter } = useContext(AppContext);
  /**
   * TO DO
   * khi nao co router thay vao
   */
  // const location = useLocation();
  // const customProp = location.state?.customProp || "top1";
  const [activeButton, setActiveButton] = useState("invoiceDetails");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = screenWidth <= 850;

  return (
    <div className="grid grid-cols-12 bg-main-theme h-full">
      {isShowAsideFilter && (
        <div className="col-span-2  bg-[#111c3e] p-3">
          <button>Toggle modal</button>
        </div>
      )}
      <div
        id="contentInvoiceDetail"
        className={` relative bg-main-theme pb-5 ${
          isShowAsideFilter ? "col-span-10" : "col-span-full"
        }`}
      >
        <div className="flex flex-row gap-4 items-center mt-2 px-5 py-2 bg-main-theme">
          <div className="col-span-12 lg:col-span-1 lg:justify-center justify-start flex items-center px-1">
            {/* TO DO icon swich sidebar */}
            <svg
              onClick={toggleAsideFilter}
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
            } px-5 items-center w-full ${isHiddenMainButton ? "hidden" : ""}`}
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
                                onClick={() => {
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
                  <IoMdArrowDropdownCircle className="mt-1"/>
                      {activeButton === "invoiceDetails" && (
                        t(`navHeader.invoiceDetails`)
                      )}
                      {activeButton === "accountAnalytics" && (
                       t(`navHeader.accountAnalytics`)
                      )}
                      {activeButton === "orders" && (
                        t(`navHeader.orders`)
                      )}
            
                  </Popover>
                </button>
              ) : (
                ["invoiceDetails", "accountAnalytics", "orders"].map(
                  (buttonName) => (
                    <button
                      key={buttonName}
                      className={classNames(
                        `col-span-4 rounded-[20px] border-black border-2  py-1 font-bold shadow-sm text-center max-[750px]:text-sm ${
                          activeButton === buttonName ? "bg-yellow" : "bg-white"
                        }`,
                        { "bg-yellow-bold": activeButton === buttonName }
                      )}
                      onClick={() => setActiveButton(buttonName)}
                    >
                      {t(`navHeader.${buttonName}`)}
                    </button>
                  )
                )
              )}
            </div>
          </div>
        </div>
        <div className="">
          {activeButton === "invoiceDetails" && <InvoiceDetails t={t} />}
          {activeButton === "accountAnalytics" && <Account_Annalytics t={t} />}
          {activeButton === "orders" && <Order t={t} />}
        </div>
      </div>
    </div>
  );
};

export default Invoice_Managment;