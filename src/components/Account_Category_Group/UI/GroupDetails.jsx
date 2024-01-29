import "../../../Utils/style.css";
// eslint-disable-next-line no-unused-vars
import { useTranslation } from "react-i18next";
import "./styles.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Utils/contexts/app.context";
import { getGroup } from "../Controller";
import Pagination from "../../../Utils/Pagination";
export default function GroupDetails() {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [Parameters_name, setParameters_name] = useState("");
  const [Parameters_report, setParameters_report] = useState("");
  const handleOptionChange = (event) => {
    const newSelectedOption = event.target.value;
    setSearchTerm("");
    setSelectedOption(newSelectedOption);
    console.log();
    if (newSelectedOption == "allCandidates") {
      setParameters_report(null);
      setSearchTerm(null);
      console.log(searchTerm);
      fetchData();
    }
  };
  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    switch (newSearchTerm) {
      case "PL_Report":
        setParameters_name(null);
        setParameters_report("pl");
        fetchData();
        break;
      case "BS_Report":
        setParameters_name(null);
        setParameters_report("bs");
        fetchData();
        break;
      case "allCandidates":
        setParameters_report(null);
        setSearchTerm(null);
        fetchData();
        break;
      default:
        break;
    }
  };
  const handleSearchIconClick = () => {
    setParameters_name(searchTerm);
    fetchData();
  };
  const filterCategories = [
    { label: t("titlePage.allCandidates"), value: "allCandidates" },
    { label: t("titlePage.reportType"), value: "report" },
  ];
  const filterCategories1 = [
    { label: t("button.Select_all"), value: "allCandidates" },
    { label: t("title.PL_report"), value: "PL_Report" },
    { label: t("title.BS_report"), value: "BS_Report" },
  ];
  const renderSearchInput = () => {
    if (selectedOption === "report") {
      return (
        <select
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: "400px",
            height: "50px",
            backgroundColor: "white",
            color: "black",
            borderRadius: "0px 10px 10px 0px",
            border: "1px solid #ccc",
          }}
        >
          {filterCategories1.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      );
    } else {
      return (
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={t("titlePage.searchPlaceholder")}
          style={{
            width: "400px",
            height: "50px",
            borderRadius: "0px 10px 10px 0px",
            border: "1px solid #ccc",
          }}
        />
      );
    }
  };

  const [dataTable, setDataOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handleChangePage = (newPage) => {
    setCurrentPage(newPage);
  };
  const fetchData = async () => {
    try {
      const response = await getGroup(
        currentPage,
        Parameters_name,
        Parameters_report
      );
      console.log("API Response:", response);

      if (response && response.pagination) {
        if (response.groups === null) {
          setTotalPages(1);
          setCurrentPage(1);
        } else {
          setDataOrder((prevData) => {
            console.log("Previous Data:", prevData);
            return response.groups || [];
          });
          setTotalPages(response.pagination.total_pages);
        }
      } else {
        console.error("Invalid response format:", response);
        setDataOrder([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataOrder([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchData_Group = async () => {
      try {
        const response = await getGroup(
          currentPage,
          Parameters_name,
          Parameters_report
        );

        if (response && response.pagination) {
          if (response.groups === null) {
            setTotalPages(1);
            setCurrentPage(1);
          } else {
            setDataOrder((prevData) => response.groups || []);
            setTotalPages(response.pagination.total_pages);
          }
        } else {
          console.error("Invalid response format:", response);
          setDataOrder([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setDataOrder([]);
        setTotalPages(1);
      }
    };

    // Check if any relevant variable has changed
    if (currentPage || Parameters_name || Parameters_report || searchTerm) {
      fetchData_Group();
    }

    return () => {
      controller.abort();
    };
  }, [currentPage, Parameters_name, Parameters_report, searchTerm]);
  return (
    <div className="grid grid-cols-12 bg-main-theme h-full">
      <div
        id="contentInvoiceDetail"
        className={` relative bg-main-theme pb-5
       col-span-full
      }`}
      >
        <div className="">
          <div className="h-screen">
            <div
              id="contentInvoiceDetail"
              className={`relative bg-main-theme pb-5 col-span-full`}
            >
              <div className="mt-1 px-6 flex max-[1500px]:flex-col items-center ">
                <div className="flex flex-row">
                  {" "}
                  <svg
                    viewBox="0 0 34 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      d="M32.006 0.00320557C28.7713 0.186782 22.342 0.854977 18.373 3.28456C18.0991 3.4522 17.9439 3.75029 17.9439 4.06196V25.5404C17.9439 26.2222 18.6894 26.6531 19.318 26.3367C23.4016 24.2813 29.3073 23.7206 32.2274 23.5671C33.2244 23.5146 33.9994 22.7153 33.9994 21.7573V1.81536C34 0.769977 33.0933 -0.0581833 32.006 0.00320557ZM15.6264 3.28456C11.658 0.854977 5.22868 0.187372 1.99396 0.00320557C0.906667 -0.0581833 0 0.769977 0 1.81536V21.7579C0 22.7165 0.775035 23.5157 1.77201 23.5677C4.6933 23.7212 10.602 24.2825 14.6855 26.339C15.3124 26.6548 16.0556 26.2245 16.0556 25.5445V4.05133C16.0556 3.73907 15.9009 3.45279 15.6264 3.28456Z"
                      fill="black"
                    />
                  </svg>
                  <div style={{ fontWeight: "bold" }}>
                    {t("titlePage.groupDetail")}
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      marginLeft: "75px",
                      position: "relative",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    display: "flex",
                    positon: "relative",
                    alignItems: "center",
                    borderRadius: "15px",
                  }}
                >
                  <select
                    id="categoryFilter"
                    value={selectedOption}
                    onChange={handleOptionChange}
                    style={{
                      width: "200px",
                      height: "50px",
                      backgroundColor: "midnightblue",
                      color: "white",
                      borderRadius: "10px 0px 0px 10px",
                    }}
                  >
                    {filterCategories.map((category) => (
                      <option
                        key={category.value}
                        value={category.value}
                        style={{
                          backgroundColor:
                            selectedOption === category.value
                              ? "white"
                              : "white",
                          color: "black",
                        }}
                      >
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <div
                    style={{
                      borderLeft: "1px solid transparent",
                      height: "50px",
                    }}
                  ></div>
                  <div style={{ flex: 1, position: "relative" }}>
                    {renderSearchInput()}
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                      onClick={handleSearchIconClick}
                    >
                      {selectedOption === "report"
                        ? ""
                        : selectedOption === "account"
                        ? ""
                        : "🔍"}
                    </span>
                  </div>
                </div>
              </div>
              {/* control area */}
              <div className="relative h-[700px] max-[1600px]:h-[520px] ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4 bg-white rounded-[16px] overflow-x-hidden">
                <table id="invoiceTable" className="w-full">
                  <thead>
                    <tr>
                      <th className=" w-[5%]"></th>
                      <th className="w-[30%] ">{t("titlePage.thNO")}</th>
                      <th className="w-[30%]">{t("titlePage.thReport")}</th>
                      <th className="w-[30%]">{t("titlePage.thGroup")}</th>
                      <th className=" w-[5%]"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* First row is like padding-top */}
                    <tr className="">
                      <td colSpan={100}></td>
                    </tr>
                    {dataTable?.map((group, index) => (
                      <tr key={index}>
                        <td className=" w-[5%]"></td>
                        <td className="w-8" name="tb_no">
                          {(currentPage - 1) * 10 + index + 1}
                        </td>
                        <td name="tb_report">
                          {group?.report_type === "pl"
                            ? t("title.PL_report")
                            : t("title.BS_report")}
                        </td>

                        <td name="tb_group">{group?.name}</td>
                        <td className=" w-[5%]"></td>
                      </tr>
                    ))}
                    {/* Last row is like padding-bottom */}
                    <tr className="">
                      <td colSpan={100}></td>
                    </tr>
                  </tbody>
                </table>
                <div className="absolute bottom-0 right-0 mb-4 mr-4">
                  <Pagination
                    changePage={handleChangePage}
                    page={currentPage}
                    totalPage={totalPages}
                  />
                </div>
              </div>
              <div className="flex-1 flex justify-end mt-5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
