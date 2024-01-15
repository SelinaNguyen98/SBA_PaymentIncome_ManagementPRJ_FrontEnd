// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "../../../Utils/style.css";
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import img from "../../../assets/Images/bg_1.jpeg";
import logo from "../../../assets/Images/Logo_SBA.png";
import comName from "../../../assets/Images/Frame 17.png";
import Popover from "../../../Utils/Popover";
import { PiTranslateFill } from "react-icons/pi";
// eslint-disable-next-line no-unused-vars
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { locales } from "../../../Utils/i18n/i18n";
function Login() {
  // eslint-disable-next-line no-unused-vars
  const { i18n, t } = useTranslation();
  const currentLanguage = locales[i18n.language];
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Gọi API đăng nhập bằng axios hoặc phương thức bạn sử dụng
      // const response = await axios.post('/api/login', { email: values.email, password: values.password });
      // Xử lý response và điều hướng nếu cần
      // ...
      // Điều hướng sau khi đăng nhập thành công
      navigate("/sidebar");
    } catch (error) {
      setError(
        "Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin đăng nhập."
      );
    }
  };

  return (
    <div>
      {/* Thanh header màu xanh */}
      {/* Màn hình mờ */}
      <div className="relative">
        <div className="flex justify-center items-center h-screen">
          <img
            src={img}
            alt=""
            className="absolute w-full h-full object-cover z-40"
          />
          <div className="fixed top-0 left-0 w-full h-full bg-gray-500 opacity-60 z-50"></div>
          <div className="fixed top-0 w-full z-50">
            {/* Thanh header màu xanh */}
            <div className="bg-[#16205e] p-4 text-white text-center flex flex-row justify-between">
              <div id="header" className="px-4 relative">
                <img src={logo} alt="" className="h-10 w-20 ml-3" />
                <img
                  className="absolute top-[32px] h-4 w-23"
                  src={comName}
                  alt=""
                />
              </div>
              <Popover
              className="flex items-center cursor-pointer ml-2"
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
          </div>
          {/* Hộp thoại đăng nhập */}
          <div className="absolute w-96 bg-[#16205e] p-4 rounded-3xl z-50 mt-20 shadow-2xl ">
            <h1 className="text-[#e23d31] font-bold text-xl text-center mb-4">
              WELCOME TO STARBOARD ASIA
            </h1>
            <div className="text-center text-sm font-bold mb-4 text-white animate-pulse">
              Please Login To Continue
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white mb-2">
                Account
              </label>
              <input
                type="text"
                id="email"
                className="w-full border rounded-3xl p-2 bg-white text-[#16205e] placeholder-[#16205e]::placeholder"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                placeholder="Your account"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-white mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full border rounded-3xl p-2 bg-white text-[#16205e] placeholder-[#16205e]::placeholder"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                placeholder="Your password"
              />
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="flex justify-center">
              <button
                className="bg-[#e23d31] text-white rounded-full px-24 py-2"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
