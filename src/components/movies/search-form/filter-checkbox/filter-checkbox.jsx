import React, { useState } from 'react';
import './filter-checkbox.css';

function FilterCheckbox() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className='search-form__input-container search-form__input-container_type_checkbox'>
      <input
        id='short-films-checkbox'
        name='short-films'
        type='checkbox'
        className='search-form__checkbox'
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor='short-films-checkbox' className='search-form__text'>
        Короткометражки
      </label>
    </div>
  );
}

export default FilterCheckbox;
