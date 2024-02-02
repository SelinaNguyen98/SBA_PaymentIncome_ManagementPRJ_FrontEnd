// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
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
import { loginUser } from "../Controller";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function Login() {
  // eslint-disable-next-line no-unused-vars
  const { i18n, t } = useTranslation();
  const currentLanguage = locales[i18n.language];
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      if (!values.username && !values.password) {
        setError("Please fill in your account information and password!");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }
      if (!values.username) {
        setError("The Account field cannot be null!");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }
      if (!values.password) {
        setError("The Password field cannot be null!");
        setTimeout(() => {
          setError("");
        }, 3000);
        return;
      }

      // eslint-disable-next-line no-unused-vars
      const response = await loginUser(values.username, values.password);

      // Redirect after successful login
      navigate("/home");
    } catch (error) {
      setError("Login failed. Please check your login information again!");
      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      // setError("");
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Gọi hàm handleLogin khi phím Enter được nhấn
      handleLogin();
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);
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
            <div className="bg-[#16205e] p-4 text-white text-center flex flex-row justify-between ">
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
              {t("Login.Welcome")}
            </h1>
            <div className="text-center text-sm font-bold mb-4 text-white animate-pulse">
              {t("Login.Login")}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white mb-2">
                {t("Login.Account")}
              </label>
              <input
                type="text"
                id="username"
                className="w-full border rounded-3xl p-2 bg-white text-[#16205e] placeholder-[#16205e]::placeholder"
                value={values.username}
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
                onKeyPress={handleKeyPress} 
                placeholder={t("Login.placeHolder_Account")}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-white mb-2">
                {t("Login.Password")}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full border rounded-3xl p-2 bg-white text-[#16205e] placeholder-[#16205e]::placeholder"
                  value={values.password}
                  onChange={(e) =>
                    setValues({ ...values, password: e.target.value })
                  }
                  onKeyPress={handleKeyPress} 
                  placeholder={t("Login.placeHolder_Password")}
                />
                <div
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <FaEye size={20} />
                  ) : (
                    <FaEyeSlash size={20} />
                  )}
                </div>
              </div>
            </div>
            <div className="text-red-500 mb-4 text-[12px] min-h-2 text-center leading-5">
              {error}
            </div>

            <div className="flex justify-center">
              <button
                className="bg-[#e23d31] text-white rounded-full px-24 py-2"
                onClick={handleLogin}
              >
                {t("button.Login")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
