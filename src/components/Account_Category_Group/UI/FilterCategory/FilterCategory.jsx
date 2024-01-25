// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FilterCategory = () => {
 const [selectedOption, setSelectedOption] = useState('');
 const [searchTerm, setSearchTerm] = useState('');
 const { t } = useTranslation();

 const handleOptionChange = (changeEvent) => {
    setSelectedOption(changeEvent.target.value);
 };
 const handleSearchChange = (changeEvent) => {
    setSearchTerm(changeEvent.target.value);
 };

 const filterCategories = [
  { label: t('tittlePage.allCandidates'), value: 'allCandidates' },
  { label: t('tittlePage.account'), value: 'account' },
  { label: t('tittlePage.report'), value: 'report' },
 ];

 return (
    <div>
      <select
  id="categoryFilter"
  value={selectedOption}
  onChange={handleOptionChange}
  style={{ width: '200px', height: '35px', backgroundColor: 'midnightblue', color: 'white', borderRadius: '10px', }}
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
<div style={{ position: 'relative', display: 'inline-block' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
        style={{
          padding: '8px 30px 8px 10px', // Adjust padding as needed
          width: '400px', // Adjust width as needed
          borderRadius: '5px', // Adjust border-radius for rounded corners
          border: '1px solid #ccc', // Add border for better visibility
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px', // Adjust right position as needed
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
      >
        &#128269; {/* Magnifying glass icon */}
      </span>
    </div>
    </div>
 );
};

export default FilterCategory;