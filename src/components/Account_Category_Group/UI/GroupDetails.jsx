import "../../../Utils/style.css";
// eslint-disable-next-line no-unused-vars
import NavHeader from "../../NavHeader";
import { useTranslation } from "react-i18next";
import "./styles.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Utils/contexts/app.context";
import { getGroup} from "../Controller";
import InvoiceDetailFooter from "./InvoiceDetailFooter";
import Pagination from "../../../Utils/Pagination";

export default function GroupDetails() {
  const { isShowAsideFilter } = useContext(AppContext);
  const { t } = useTranslation();
  const [idExRate, setIdRate] = useState(null);

  const triggerData = () => {
    setDataChangeTrigger(!dataChangeTrigger);
  };
  const { showToast } = useContext(AppContext);

  const [state, setState] = useState({
    isShowConfirmModal: false,
    isShowFormNewPayment: false,
    isShowEditModal: false,
    isShowDeleteModal: false,
    isShowAcptDelete: false,
    isShowNoAcptEdit: false,
  });

  

  // Pagination state
  const [paginationState, setPaginationState] = useState({
    currentPage: 1,
    totalPage: 1,
  });

  // Callback function for page change
  const changePage = (newPage) => {
    fetchGroup(newPage);
  };

  useEffect(() => {
    fetchGroup(1); // Fetch initial data on component mount
  }, []);

  // Fetch group data with pagination
  async function fetchGroup(page) {
    try {
      const response = await getGroup(page);
      if (!response || !response.groups) {
        console.error("Invalid response format:", response);
        return;
      }

      const { groups, pagination } = response;

      const totalPage = pagination?.total_pages || 0;

      // Update pagination state
      setPaginationState({
        currentPage: page,
        totalPage: totalPage,
      });

      // Update table data
      setStateTable({
        dataTable: response,
        totalPage: totalPage,
      });
    } catch (error) {
      // Handle errors
      console.error("Error fetching group data:", error);
    }
  }

  // Render pagination component
  const renderPagination = () => {
    return (
      <Pagination
        currentPage={paginationState.currentPage}
        totalPage={paginationState.totalPage}
        onPageChange={changePage}
      />
    );
  };
  const [stateTable, setStateTable] = useState({
    page: 1,
    totalPage: 1,
    dataTable: [],
    selectedRowData: null,
  });
  
  const {
    totalPage,
    dataTable,
    selectedRowData,
    page,
  } = stateTable;
  
  const updateStateTable = (dataTable) =>
    setStateTable(() => ({ ...stateTable, ...dataTable }));
    
  // const { isShowEditModal, isShowDeleteModal } = states;
  const updateState = (data) =>
  setStateControl(() => ({ ...stateControl, ...data }));  const [selectedOption, setSelectedOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const handleOptionChange = (event) => {
    const newSelectedOption = event.target.value;

    // Reset the search term when a new option is selected
    setSearchTerm("");

    // Update the selected option state
    setSelectedOption(newSelectedOption);

    // Add any other logic you need based on the selected option
    // ...
  };

  useEffect(() => {
    try{
      fetchGroup()
    }catch(error){
      console.log(error);
    }
  }, []);

  async function fetchGroup() {
    try {
      const response = await getGroup(page);
      console.log(response);
       if (!response || !response.groups) {
        console.error('Invalid response format:', response);
        return;
      }
  
      const { groups, pagination } = response;
  
      const totalPage = pagination?.total_pages || 0;
  
      updateStateTable({
        dataTable: response,
        totalPage: response?.pagination?.total_pages,
      });
    } catch (error) {
      if (error.isAxiosError) {
        // AxiosError details
        console.error('AxiosError:', error.toJSON());
      } else {
        // Other types of errors
        console.error('Error fetching category data:', error);
      }
    }

    useEffect(() => {
      console.log("Filter change effect");
      console.log(page);
      isFilterApplied.current = true;
      updateStateTable({ page: 1 });
    },[page]);
  
    useEffect(() => {
      if (isFilterApplied.current && page !== 1) {
        return;
      }
  
      console.log("Main effect");
      
    }, [page]);
  
    function changePage(page) {
      isFilterApplied.current = false;
      updateStateTable({ page: page });
    }
  }
  
  

  const handleSearchChange = (event) => {
    // Update the search term state
    setSearchTerm(event.target.value);

    // Add any other logic you need based on the search term
    // ...
  };

  const filterCategories = [
    { label: t("titlePage.allCandidates"), value: "allCandidates" },
    { label: t("titlePage.accountCategoryGroup"), value: "account" },
    { label: t("titlePage.reportType"), value: "report" },
  ];
  
  const renderSearchInput = () => {
    const commonStyle = {
      width: "400px",
      height: "50px",
      borderRadius: "0px 10px 10px 0px",
      border: "1px solid #ccc",
    };
  
    if (selectedOption === "report") {
      const uniqueValues = [...new Set(dataTable?.groups?.map((group) => group.report_type))];
      const options = uniqueValues.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ));
  
      return (
        <select
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ ...commonStyle, backgroundColor: "white", color: "black" }}
        >
          {options}
        </select>
      );
    } else if (selectedOption === "account") {
      const uniqueValues = [...new Set(dataTable?.groups?.map((group) => group.name))];
      const options = uniqueValues.map((value, index) => (
        <option key={index} value={value}>
          {value}
        </option>
      ));
  
      return (
        <select
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ ...commonStyle, backgroundColor: "white", color: "black" }}
        >
          {options}
        </select>
      );
    } else {
      return (
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={t("titlePage.searchPlaceholder")}
          style={{ ...commonStyle, backgroundColor: "white", color: "black" }}
        />
      );
    }
  };

  const renderTable = () => {
    // Check if dataTable is defined and has a 'groups' property
    if (!dataTable || !dataTable.groups) {
      return <p>No data available</p>; // Or any other appropriate message or UI
    }
  
    // Filter the data based on the selected value
    const filteredData = dataTable.groups.filter((group) => {
      if (selectedOption === "report") {
        return group.report_type.toLowerCase().includes(searchTerm.toLowerCase());
      } else if (selectedOption === "account") {
        return group.name.toLowerCase().includes(searchTerm.toLowerCase());
      }
      // If no specific option is selected, display all rows that match the search term
      return (
        group.report_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  
    return (
      <table id="invoiceTable" className="w-full">
        {/* ... Your existing table structure ... */}
        <thead>
          {/* ... Your existing table header ... */}
          <tr>
          <th className="w-[5%]"></th>
          <th className="w-[30%] ">{t("titlePage.thNO")}</th>
          <th className="w-[30%]">{t("titlePage.thReport")}</th>
          <th className="w-[30%]">{t("titlePage.thGroup")}</th>
          <th className="w-[5%]"></th>
        </tr>
        </thead>
        <tbody>
          {/* First row is like padding-top */}
          <tr className="">
            <td colSpan={100}></td>
          </tr>
          {/* Map through the filtered data instead of all groups */}
          {filteredData.map((group, index) => (
            <tr key={index}>
              <td className=" w-[5%]"></td>
              <td name="tb_no">{group?.id}</td>
              <td name="tb_report">{group?.report_type}</td>
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
    );
  };
  

  const tableContainerStyle = {
    height: "700px", // Adjust the height as needed
  };

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
          <div className="mt-1 px-6 flex flex-shrink-0 items-center ">
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
              <div style={{ display: "inline-block", marginLeft: "75px",position: "relative" }}></div>
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
                          selectedOption === category.value ? "white" : "white",
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
          <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4 bg-white rounded-[16px]" style={tableContainerStyle}>
           {renderTable()}
           <div style={{ position: 'absolute', bottom: 0, right: 0 }}>
{renderPagination()}</div>
          </div>
          </div>
        </div>
      </div>
    </div> 
    </div>
  );
}
