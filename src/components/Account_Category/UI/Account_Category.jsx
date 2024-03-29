/* eslint-disable no-constant-condition */
/* eslint-disable no-unused-vars */
import "../../../Utils/style.css";
import { useTranslation } from "react-i18next";
import Button from "../../../Utils/Button";
import "./styles.css";
import { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../../../Utils/contexts/app.context";
import Modal from "../../../Utils/Modal";
import NewCategory from "./NewCategory/NewCategory";
import EditCategory from "./EditCategory/EditCategory";
import { deleteCategory, getCategory, getGroupCategory } from "../Controller";
import Pagination from "../../../Utils/Pagination";

const feild = {
  allCandidates: "allCandidates",
  report: "report",
  group: "group",
};

export default function Account_Category() {
  // const { isShowAsideFilter } = useContext(AppContext);
  const { t } = useTranslation();
  const { showToast } = useContext(AppContext);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [state, setState] = useState({
    isShowConfirmModal: false,
    isShowFormNewCategory: false,
    isShowEditModal: false,
    isShowDeleteModal: false,
    isShowAcptDelete: false,
    isShowNoAcptEdit: false,
  });

  const {
    isShowConfirmModal,
    isShowFormNewCategory,
    isShowEditModal,
    isShowAcptDelete,
    isShowNoAcptEdit,
  } = state;

  const [stateTable, setStateTable] = useState({
    page: 1,
    totalPage: 0,
    dataTable: null,
    selectedListRowsData: [],
    isSelectedAllDataInvoice: false,
  });
  
  const updateStateTable = (dataTable) =>
    setStateTable(() => ({ ...stateTable, ...dataTable }));
  const isFilterApplied = useRef(false);
  function changePage(page) {
    isFilterApplied.current = false;
    updateStateTable({ page: page });
  }
  const updateState = (data) => setState(() => ({ ...state, ...data }));
  const [selectedOption, setSelectedOption] = useState("allCandidates");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRowData, setSelectedRowData] = useState(null);
  // const [selectedRows_Category, setSelectedRows_Category] = useState([]);
  const [currentPage_Category, setCurrentPage_Category] = useState(1);
  const [totalPages_Category, setTotalPages_Category] = useState(1);
  // const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);

  const [filer, setFilter] = useState({
    name: null,
    group_id: null,
    report_type: null,
    search: null,
  });

  const handleChangePage_Category = (newPage, filer) => {
    fetchCategory(newPage, filer);
    setCurrentPage_Category(newPage);
  };

  const handleDelete = async () => {
    try {
      if (selectedRowData?.id == null || selectedRowData?.id == undefined)
        // throw new Error("");
        return;

      const response = await deleteCategory(selectedRowData?.id);

      // 1. Kiem tra du lieu co phai trang cuoi cung hay khong
      //    1.1 neu dau tien  cua trang >1 thi  set page ve page - 1
      //    1.2 nê dau tien cua trang 1 thi set ve 1
      // 2. Kiem tra neu khong phai dong dau tien thi loafd lai vs dataTriger thay doi

      // if(dataCategory.length == 1 && currentPage_Category >= totalPages_Category &&  )
      // if (currentPage_Category == totalPages_Category && dataCategory.length == 1 && currentPage_Category != 1) {
      //   handleChangePage_Category(currentPage_Category - 1);
      //   return;
      // }
      if (currentPage_Category == totalPages_Category && dataCategory.length == 1 && currentPage_Category != 1) {
        handleChangePage_Category(currentPage_Category - 1);
        return;
    }
      showToast.success(t("announce.deleted_successfully"));
      trigger()
      console.log(response);
    } catch (error) {
      if (
        error.response.data.message == "The category has generated transactions"
      ) {
        setIsShowDeleteModal(true);
      }
      console.log(error);
    } finally {
      updateState({ isShowAcptDelete: false });
    }
  };

  const [triggerData, setTriggerData] = useState(false)

  const trigger = () => {
    setTriggerData((prev)=> !prev) 
  }

  useEffect(() => {
    try {
      fetchCategory(currentPage_Category, "");
      fetchGetCategoriesPL();
    } catch (error) {
      console.log(error);
    }
  }, [ triggerData]);

  const fetchCategory = async (newPage, filer) => {
    try {
      const response = await getCategory(newPage || 1, filer);
      setDataCategory(response.categories || []);
      setTotalPages_Category(response.pagination.total_pages);
    } catch (error) {
      setTotalPages_Category(1);
      setCurrentPage_Category(1);
      console.log(error);
    }
  };

  const [groups, setGroups] = useState([]);
  const fetchGetCategoriesPL = async () => {
    try {
      const response = await getGroupCategory();
      setGroups(response.groups);
      console.log(response.groups);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionChange = (event) => {
    const newSelectedOption = event.target.value;
    let newFilter = {
      name: null,
      group_name: null,
      report_type: null,
      search: null,
    };
    setSearchTerm("");
    setSelectedOption(newSelectedOption);

    // switch (newSelectedOption) {
    //   case feild.report: {
    //     newFilter = {
    //       name: null,
    //       group_name: null,
    //       report_type: "pl",
    //       search: null,
    //     };
    //     break;
    //   }
    // }

    setFilter(newFilter);
    handleChangePage_Category(1, newFilter);
  };

  const handleOptionReportChange = (event) => {
    const reportType = event.target.value;
    console.log(reportType);
    let newFilter = {
      name: null,
      group_id: null,
      report_type: reportType,
      search: null,
    };

    setFilter(newFilter);
    handleChangePage_Category(1, newFilter);
  };

  const handleOptionGroupChange = (event) => {
    const groupId = event.target.value;
    console.log(groupId);
    let newFilter = {
      name: null,
      group_id: groupId,
      report_type: null,
      search: null,
    };

    setFilter(newFilter);
    handleChangePage_Category(1, newFilter);
  };

  const handleClickSearch = () => {
    let newFilter = {
      name: null,
      group_id: null,
      report_type: null,
      search: searchTerm,
    };

    setFilter(newFilter);
    handleChangePage_Category(1, newFilter);
  };

  const renderSearchInput = () => {
    switch (selectedOption) {
      case "report": {
        return (
          <select
            onChange={handleOptionReportChange}
            className=" outline-none w-[30vw] h-[50px]  pl-[10px] rounded-r-[10px] flex bg-white border-solid border border-[#ccc]
            focus-within:shadow-md transition-shadow duration-250"
          >
            <option value={""}>{t("button.Select_all")}</option>
            <option value={"pl"}>{t("title.PL_report")}</option>
            <option value={"bs"}>{t("title.BS_report")}</option>
          </select>
        );
      }
      
      case "group": {
        return (
          <select
            onChange={handleOptionGroupChange}
            className=" outline-none w-[30vw] h-[50px]  pl-[10px] rounded-r-[10px] flex bg-white border-solid border border-[#ccc]
            focus-within:shadow-md transition-shadow duration-250 "
          >
            <option value="" selected>{t("button.Select_all")}</option>
            {groups.map((group, index) => {
              return (
                <option value={group?.id} key={index}>
                  {group?.name}
                </option>
              );
            })}
          </select>
        );
      }

      case "allCandidates" :
      case "" :  
      {
        return (
          <div
            className=" w-[30vw] h-[50px] pl-[10px] rounded-r-[10px] flex bg-white border-solid border border-[#ccc]
            focus-within:shadow-md transition-shadow duration-250 "
          >
            <input
              type="text"
              className=" flex-1 outline-none  "
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder={t("titlePage.searchPlaceholder")}
            />
            <button
              className=" ml-auto w-[50px] transition-transform hover:scale-125 "
              onClick={handleClickSearch}
            >
              🔍
            </button>
          </div>
        );
      }
    }
  };

  return (
    <div className={`grid grid-cols-12  bg-main-theme h-screen`}>
      <div
        id="contentInvoiceDetail"
        className={` relative bg-main-theme pb-5 col-span-full`}
      >
        {/* Lable */}
        <div className="mt-1 px-2.5 flex flex-shrink-0 items-center">
          <div
            style={{
              display: "inline-block",
              fontWeight: "bold",
              paddingRight: "20px",
            }}
          >
            <svg
              viewBox="0 0 34 27"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-9 h-9 ml-4 mr-2"
            >
              <path
                d="M32.006 0.00320557C28.7713 0.186782 22.342 0.854977 18.373 3.28456C18.0991 3.4522 17.9439 3.75029 17.9439 4.06196V25.5404C17.9439 26.2222 18.6894 26.6531 19.318 26.3367C23.4016 24.2813 29.3073 23.7206 32.2274 23.5671C33.2244 23.5146 33.9994 22.7153 33.9994 21.7573V1.81536C34 0.769977 33.0933 -0.0581833 32.006 0.00320557ZM15.6264 3.28456C11.658 0.854977 5.22868 0.187372 1.99396 0.00320557C0.906667 -0.0581833 0 0.769977 0 1.81536V21.7579C0 22.7165 0.775035 23.5157 1.77201 23.5677C4.6933 23.7212 10.602 24.2825 14.6855 26.339C15.3124 26.6548 16.0556 26.2245 16.0556 25.5445V4.05133C16.0556 3.73907 15.9009 3.45279 15.6264 3.28456Z"
                fill="black"
              />
            </svg>
          </div>
          <span style={{ fontWeight: "bold" ,marginRight: "40px", }}>
            {t("titlePage.accountCategory")}
          </span>

          {/* <div style={{ display: "flex", alignItems: "center" }}> */}
          <div id="search-container"
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                width: "30%", 
                maxWidth: "400px"
                }}>
            <select
              id="categoryFilter"
              className="category-filter"
              value={selectedOption}
              onChange={handleOptionChange}
              style={{
                width: "50%",
                height: "50px",
                backgroundColor: "midnightblue",
                color: "white",
                borderRadius: "10px 0px 0px 10px",
              }}
            >
                <option
                  key={1}
                  value={"allCandidates"}
                  style={{
                    backgroundColor:
                      selectedOption === "allCandidates" ? "white" : "white",
                    color: "black",
                  }}
                >
                  {t("titlePage.allCandidates")}
                </option>
                <option
                  key={2}
                  value={"group"}
                  style={{
                    backgroundColor: selectedOption === "group" ? "white" : "white",
                    color: "black",
                  }}
                >
                  {t("titlePage.thGroup")}
                </option>
                <option
                  key={3}
                  value={"report"}
                  style={{
                    backgroundColor:
                      selectedOption === "report" ? "white" : "white",
                    color: "black",
                  }}
                >
                  {t("titlePage.reportType")}
                </option>
            </select>
            {/* </div> */}
            <div className="relative flex-1" style={{ position: "relative", display: "inline-block", width: "40%" }}>
              {renderSearchInput()}
            </div>
          </div>
        </div>

        {/* control area */}
        <div className="ml-4 mr-3 mt-4 pl-6 pr-3 pt-4 pb-4 bg-white rounded-[16px] w-[95%]">
          <div className=" w-full overflow-auto col-span-12 lg:col-span-3 flex  justify-end items-end">
            <Button
              onClick={() => updateState({ isShowFormNewCategory: true })}
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 21 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.75 9.9H11.55V13.5H9.45V9.9H5.25V8.1H9.45V4.5H11.55V8.1H15.75M10.5 0C9.12112 0 7.75574 0.232792 6.48182 0.685084C5.2079 1.13738 4.05039 1.80031 3.07538 2.63604C1.10625 4.32387 0 6.61305 0 9C0 11.3869 1.10625 13.6761 3.07538 15.364C4.05039 16.1997 5.2079 16.8626 6.48182 17.3149C7.75574 17.7672 9.12112 18 10.5 18C13.2848 18 15.9555 17.0518 17.9246 15.364C19.8938 13.6761 21 11.3869 21 9C21 7.8181 20.7284 6.64778 20.2007 5.55585C19.6731 4.46392 18.8996 3.47177 17.9246 2.63604C16.9496 1.80031 15.7921 1.13738 14.5182 0.685084C13.2443 0.232792 11.8789 0 10.5 0Z"
                    fill="white"
                  />
                </svg>
              }
            >
              {t("button.add")}
            </Button>

            {/* <Button
              onClick={() => {
                updateState({ isShowConfirmModal: true });
              }}
              className="bg-red ml-2 "
              icon={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.5 18C6.98044 18 4.56408 17.0518 2.78249 15.364C1.00089 13.6761 0 11.3869 0 9C0 6.61305 1.00089 4.32387 2.78249 2.63604C4.56408 0.948212 6.98044 0 9.5 0C12.0196 0 14.4359 0.948212 16.2175 2.63604C17.9991 4.32387 19 6.61305 19 9C19 11.3869 17.9991 13.6761 16.2175 15.364C14.4359 17.0518 12.0196 18 9.5 18ZM14.25 8.1H4.75V9.9H14.25V8.1Z"
                    fill="white"
                  />
                </svg>
              }
            >
              {t("button.delete")}
            </Button> */}
          </div>

          {/* table data */}
          <table id="invoiceTable" className="w-full">
            <thead>
              <tr>
                <th className=" w-[1%]"></th>
                <th className=" w-[1%]">
                  {/* <input
                    type="checkbox"
                    className=""
                    id="selectAllCheckbox"
                    onClick={handleSelectAll}
                  /> */}
                </th>
                <th className=" w-[4%]">{t("titlePage.thNO")}</th>
                <th className=" w-[30%]">{t("titlePage.thName")}</th>
                <th className=" w-[28%]">{t("titlePage.thGroup")}</th>
                <th className=" w-[28%]">{t("titlePage.thReport")}</th>
                <th className=" w-[16%]">{t("titlePage.thAction")}</th>
                <th className=" w-[1%]"></th>
              </tr>
            </thead>
            <tbody>
              {/* Firsh row is like padding-top */}
              <tr className="">
                <td colSpan={100}></td>
              </tr>

              {dataCategory &&
                dataCategory.map((category, index) => (
                  <tr key={index}>
                    <td className=" w-[1%]"></td>

                    {/* DATA MAIN*/}
                    <td
                      className="text-left w-[1%] border-r-0 custom-no-border"
                      name="tb_no"
                    >
                      {/* <input type="checkbox" name="tb_no" /> */}
                    </td>
                    <td
                      className=" w-[4%] border-none custom-no-border"
                      name="tb_name"
                    >
                      {(currentPage_Category - 1) * 10 + index + 1}
                    </td>
                    <td className=" w-[30%]" name="tb_name">
                      {category?.name}
                    </td>
                    <td className=" w-[28%]" name="tb_group">
                      {category?.group_name}
                    </td>
                    <td className=" w-[28%]" name="tb_report">
                      {category?.report_type == "pl"
                          ? "Profit and Loss Report"
                          : null}
                        {category?.report_type == "bs"
                          ? "Balance Sheet Report"
                          : null}
                    </td>
                    <td className=" w-[16%]" name="tb_action">
                      <div className=" flex justify-center py-1 mx-1 bg-white  border-gray-500/50 border rounded-sm ">
                        <button
                          onClick={() => {
                            setSelectedRowData(category);
                            updateState({ isShowEditModal: true });
                          }}
                        >
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 19 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
                              fill="#FFC107"
                            />
                            <path
                              d="M16.3 6.175L12.05 1.975L13.45 0.575C13.8333 0.191667 14.3043 0 14.863 0C15.4217 0 15.8923 0.191667 16.275 0.575L17.675 1.975C18.0583 2.35833 18.2583 2.821 18.275 3.363C18.2917 3.905 18.1083 4.36733 17.725 4.75L16.3 6.175ZM14.85 7.65L4.25 18.25H0V14L10.6 3.4L14.85 7.65Z"
                              fill="black"
                              fillOpacity="0.2"
                            />
                          </svg>
                        </button>
                        <div className=" border border-gray-400 mx-2 "></div>
                        <button
                          className=""
                          onClick={() => {
                            setSelectedRowData(category);
                            updateState({ isShowAcptDelete: true });
                          }}
                        >
                          <svg
                            width="19"
                            height="19"
                            viewBox="0 0 16 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                              fill="#F44336"
                            />
                            <path
                              d="M3 18C2.45 18 1.979 17.804 1.587 17.412C1.195 17.02 0.999333 16.5493 1 16V3H0V1H5V0H11V1H16V3H15V16C15 16.55 14.804 17.021 14.412 17.413C14.02 17.805 13.5493 18.0007 13 18H3ZM5 14H7V5H5V14ZM9 14H11V5H9V14Z"
                              fill="black"
                              fillOpacity="0.2"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className=" w-[1%]"></td>
                  </tr>
                ))}
              <tr className=" bg-main-theme h-[0px] py-0 my-0">
                <td colSpan={100}></td>
              </tr>
            </tbody>
          </table>
          {/* <InvoiceDetailFooter />   */}
          <div className=" flex-1 flex justify-end" style={{ marginTop: '10px' }}>
            <Pagination
              changePage={(value) => handleChangePage_Category(value, filer)}
              page={currentPage_Category}
              totalPage={totalPages_Category}
            />
          </div>
        </div>

        {isShowConfirmModal && (
          <Modal visible={isShowConfirmModal}>
            <div className=" bg-white m-2 py-4 px-5 border-red-500 border-[3px] rounded-2xl  flex  flex-col  ">
              <span className=" uppercase mx-auto px-auto text-center bg-white-500/80 py-1 px-2 text-red-500 font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
                {t("notification_account_category.titleDeleteCategory")}
              </span>
              <div className="text-center pt-5 px-2 font-bold text-sm">
                <p
                  className="text-red-600 mb-0"
                  dangerouslySetInnerHTML={{
                    __html: t(
                      "notification_account_category.deleteCategory"
                    ).replace("1", "<br />"), 
                  }}
                />
              </div>

              <div className="flex items-center justify-center space-x-5  px-4 mt-6 mb-7 ">
                {/* <Button onClick={() => {}} className={" bg-red py-2 px-6"}>
                  Confirm
                </Button> */}
                <Button
                  onClick={() => {
                    updateState({ isShowConfirmModal: false });
                  }}
                  className={" border-red-500 bg-white border-2   py-2 px-6"}
                >
                  <span className=" text-red-500  ml-1 font-medium uppercase">
                    OK
                  </span>
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {isShowDeleteModal && (
          <Modal visible={isShowDeleteModal}>
            <div className=" bg-white m-2 py-4 px-5 border-red-500 border-[3px] rounded-2xl  flex  flex-col  ">
              <span className=" uppercase mx-auto px-auto text-center bg-white-500/80 py-1 px-2 text-red-500 font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
                {t("notification_account_category.titleDeleteCategory")}
              </span>
              <div className="text-center pt-5 px-2 font-bold text-sm">
                <p
                  className="text-red-600 mb-0"
                  dangerouslySetInnerHTML={{
                    __html: t(
                      "notification_account_category.delete1Category"
                    ).replace("1", "<br />"),
                  }}
                />
              </div>

              <div className="flex items-center justify-center space-x-5  px-4 mt-6 mb-7 ">
                <Button
                  onClick={() => {
                    // updateState({ isShowDeleteModal: false });
                    setIsShowDeleteModal(false);
                  }}
                  className={" border-red-500 bg-white border-2   py-2 px-6"}
                >
                  <span className=" text-red-500  ml-1 font-medium uppercase">
                    OK
                  </span>
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {isShowAcptDelete && (
          <Modal visible={isShowAcptDelete}>
            <div className=" bg-white m-2 py-4 px-5 border-red-500 border-[3px] rounded-2xl  flex  flex-col  ">
              <span className=" uppercase mx-auto px-auto text-center bg-white-500/80 py-1 px-2 text-red-500 font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
                {t("notification_account_category.titleDeleteCategory")}
              </span>
              <div className="text-center pt-5 px-2 font-bold text-sm">
                <p className="text-red-600 mb-0">
                  {t("notification_account_category.acptDeleteCategory")}
                </p>
                {/* {selectedRowData.id} */}
              </div>

              <div className="flex items-center justify-center space-x-5  px-4 mt-6 mb-7 ">
                <Button
                  onClick={
                    () => handleDelete()
                    // updateState({ isShowAcptDelete: false });
                  }
                  className={" border-red-500 bg-red border-2   py-2 px-6"}
                >
                  <span className=" text-white-500 ml-1 font-medium uppercase">
                    {t("button.confirm")}
                  </span>
                </Button>
                <Button
                  onClick={() => {
                    updateState({ isShowAcptDelete: false });
                  }}
                  className={" border-red-500 bg-white border-2   py-2 px-6"}
                >
                  <span className=" text-red-500  ml-1 font-medium uppercase">
                    {t("button.cancel")}
                  </span>
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {isShowFormNewCategory && (
          <NewCategory
            visible={isShowFormNewCategory}
            cancel={() => {
              updateState({ isShowFormNewCategory: false });
              trigger()
            }}
            ok={() => {
              handleChangePage_Category(1, filer);
              updateState({ isShowFormNewCategory: false });
              // trigger()
            }}
          />
        )}

        {isShowNoAcptEdit && (
          <Modal visible={isShowNoAcptEdit}>
            <div className=" bg-white m-2 py-4 px-5 border-red-500 border-[3px] rounded-2xl  flex  flex-col  ">
              <span className=" uppercase mx-auto px-auto text-center bg-white-500/80 py-1 px-2 text-red-500 font-bold text-sm rounded-full shadow-inner border-1 border border-black/20 top-box">
                {t("notification_account_category.titleEditCategory")}
              </span>
              <div className="text-center pt-5 px-2 font-bold text-sm">
                <p
                  className="text-red-600 mb-0"
                  dangerouslySetInnerHTML={{
                    __html: t(
                      "notification_account_category.editCategory"
                    ).replace("1", "<br />"),
                  }}
                />
              </div>

              <div className="flex items-center justify-center space-x-5  px-4 mt-6 mb-7 ">
                <Button
                  onClick={() => {
                    updateState({ isShowNoAcptEdit: false });
                  }}
                  className={" border-red-500 bg-white border-2   py-2 px-6"}
                >
                  <span className=" text-red-500  ml-1 font-medium uppercase">
                    OK
                  </span>
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {isShowEditModal && (
          <EditCategory
            // invoicePayment={selectedRowData}
            category={selectedRowData}
            visible={isShowEditModal}
            cancel={() => {
              updateState({
                isShowEditModal: false,
                // selectedRowData: null
              });
              trigger()
            }}
              ok={() => {
                handleChangePage_Category( currentPage_Category, filer);
                updateState({ isShowEditModal: false });
                }}
          />
        )}
      </div>
    </div>
  );
}
