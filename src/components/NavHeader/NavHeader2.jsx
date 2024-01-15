import { useTranslation } from "react-i18next";
import { PiTranslateFill } from "react-icons/pi";
import { locales } from "../../Utils/i18n/i18n";

import "../../Utils/style.css";
import Popover from "../../Utils/Popover";
// eslint-disable-next-line no-unused-vars
import { Link, useLocation } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import classNames from "classnames";
import { useContext } from "react";
import { AppContext } from "../../Utils/contexts/app.context.jsx";

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function NavHeader2({ isHiddenMainButton = false }) {
  // Chuyển đổi ngôn ngữ
  // eslint-disable-next-line no-unused-vars
  const { i18n, t } = useTranslation();
  const currentLanguage = locales[i18n.language];
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // const { toggleAsideFilter } = useContext(AppContext);

  /**
   * TO DO
   * khi nao co router thay vao
   */
  // const location = useLocation();
  // const customProp = location.state?.customProp || "top1";
  // eslint-disable-next-line no-unused-vars
  const customProp = "invoiceDetails";

  return (
    <div className="grid grid-cols-10 gap-4 items-center mt-2 px-5 py-2 bg-main-theme">
      <div className="col-span-12 lg:col-span-1 lg:justify-center justify-start flex items-center px-1">
        {/* TO DO icon swich sidebar */}
        <svg
          // onClick={toggleAsideFilter}
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
            <div className=" rounded-[12px]">
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
      
    </div>
  );
}
