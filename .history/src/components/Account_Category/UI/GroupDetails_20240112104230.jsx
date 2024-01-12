/* eslint-disable no-unused-vars */
import "../../../Utils/style.css";
import NavHeader from "../../NavHeader/NavHeader";
import { useTranslation } from "react-i18next";
import Button from "../../Button";
import "./styles.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../Utils/contexts/app.context";
import Pagination2 from "";

export default function InvoiceDetails() {

  const { isShowAsideFilter } = useContext(AppContext);
  const { t } = useTranslation();


  const [state, setState] = useState({
    isShowConfirmModal: false,
    isShowFormNewPayment: false,
  });

  const updateState = (data) => setState(() => ({ ...state, ...data }));
     const [selectedOption, setSelectedOption] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
   
    const handleOptionChange = (event) => {
      const newSelectedOption = event.target.value;
  
      // Reset the search term when a new option is selected
      setSearchTerm('');
  
      // Update the selected option state
      setSelectedOption(newSelectedOption);
  
      // Add any other logic you need based on the selected option
      // ...
    };
    const handleSearchChange = (event) => {
      // Update the search term state
      setSearchTerm(event.target.value);
  
      // Add any other logic you need based on the search term
      // ...
    };
   
    const filterCategories = [
      { label: t('titlePage.allCandidates'), value: 'allCandidates' },
      { label: t('titlePage.accountCategoryGroup'), value: 'account' },
      { label: t('titlePage.reportType'), value: 'report' }
    ];
    const filterCategories1 = [
      { label: t('titlePage.allCandidates'), value: 'allCandidates' },
      { label: t('titlePage.accountCategoryGroup'), value: 'account' },
      { label: t('titlePage.reportType'), value: 'report' },
      {label: 'typeXX', value: 'typeXX'},
      {label: 'typeYY', value: 'typeYY'},
      {label: 'typeXY', value: 'typeXY'}
    ];
    const renderSearchInput = () => {
      if (selectedOption === 'report') {
        return (
          <select
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              width: '300px',
              height: '40px',
              backgroundColor: 'white',
              color: 'black',
              borderRadius: '10px',
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
            placeholder={t('titlePage.searchPlaceholder')}
            style={{
              padding: '8px 30px 8px 10px',
              width: '300px',
              height: '40px',
              borderRadius: '15px',
              border: '1px solid #ccc'
            }}
          />
        );
      }
    }
  return (
    <div className={`grid grid-cols-12  bg-main-theme`}>
      {isShowAsideFilter && (
        <div className="col-span-2  bg-black p-3	">
          <button>Sidebar</button>
        </div>
      )}
      <div
        id="contentInvoiceDetail"
        className={` relative bg-main-theme pb-5     ${
          isShowAsideFilter ? "col-span-10" : "col-span-full"
        }`}
      >
        <NavHeader />
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
          <div style={{ display: 'inline-block', fontWeight: 'bold', paddingRight: '200px' } }>{t("titlePage.groupDetail")}
          &nbsp;
          <div style={{ display: 'inline-block', marginLeft: '30px' }}>
  <select
    id="categoryFilter"
    value={selectedOption}
    onChange={handleOptionChange}
    style={{ width: '200px', height: '40px', backgroundColor: 'midnightblue', color: 'white', borderRadius: '10px' }}
  >
    {filterCategories.map((category) => (
      <option
        key={category.value}
        value={category.value}
        style={{ backgroundColor: selectedOption === category.value ? 'white' : 'white', color: 'black' }}
      >
        {category.label}
      </option>
    ))}
  </select>
</div>
<div style={{ position: 'relative', display: 'inline-block' }}>
        {renderSearchInput()}
        <span
          style={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            cursor: 'pointer',
          }}
        >
          {selectedOption === 'report' ? '🔽' : '🔍'} {/* Dropdown or magnifying glass icon */}
        </span>
      </div></div>
        </div>
        
        {/* control area */}
        

          {/* table data */}
          <table id="invoiceTable" className=" w-full ">
            <thead>
              <tr>
                <th className=" w-[1%]"></th>
                <th className="w-[10%]">{t("titlePage.thNO")}</th>
                <th className="w-[10%]">{t("titlePage.thReport")}</th>
                <th className="w-[10%]">{t("titlePage.thGroup")}</th>
                <th className=" w-[1%]"></th>
              </tr>
            </thead>
            <tbody>
              {/* Firsh row is like padding-top */}
              <tr className="">
                <td colSpan={100}></td>
              </tr>
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <tr key={index}>
                    {/* First column of each row is like padding-left */}
                    <td className=" w-[1%]"></td>

                    {/* DATA MAIN*/}
                    <td className=" w-[10%]" name="tb_no">
                      404
                    </td>
                    <td className=" w-[10%]" name="tb_report">
                      not found
                    </td>
                    <td className=" w-[10%]" name="tb_group">
                      404
                    </td>
                    {/* Last column of each row is like padding-right */}
                    <td className=" w-[1%]"></td>
                  </tr>
                ))}
              {/* Last row is like padding-bottom */}
              <tr className=" bg-main-theme h-[0px] py-0 my-0">
                <td colSpan={100}></td>
              </tr>
            </tbody>
          </table>
          <Pagination2 />
        </div>
      </div>
  );
}
