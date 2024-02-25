import React, { useState, useEffect, useCallback } from 'react';
import './filter-checkbox/filter-checkbox.css';
import './search-form.css';
import FilterCheckbox from './filter-checkbox/filter-checkbox';
import { useFormWithValidation } from '../../../hooks/useFormWithValidation';

function SearchForm({ onSubmit, loadSearchStateFromLocalStorage }) {
  const [isChecked, setIsChecked] = useState(false);
  const { values, setValues, handleChange, errors, setErrors } = useFormWithValidation();

  const handleLoadSearchStateFromLocalStorage = useCallback(() => {
    return loadSearchStateFromLocalStorage();
  }, [loadSearchStateFromLocalStorage]);

  useEffect(() => {
    const searchState = handleLoadSearchStateFromLocalStorage();
    if (searchState) {
      setIsChecked(searchState.isChecked || false);
      setValues({ ...values, name: searchState.query || '' });
    }
  }, [setValues]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!values.name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        film: 'Нужно ввести ключевое слово',
      }));
      return;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      film: '',
    }));

    onSubmit(values.name, isChecked);
  };

  return (
    <section className='search-form'>
      <form className='search-form__form' onSubmit={handleSubmit} noValidate>
        <div className='search-form__input-container'>
          <input
            name='name'
            type='text'
            required={true}
            placeholder='Фильм'
            className='search-form__input'
            value={values.name || ''}
            onChange={handleChange}
          />
          <label className='search-form__icon' />
          <button
            type='submit'
            className='search-form__button'
          />
        </div>
        {errors.film && <span className='search-form__error'>{errors.film}</span>}
        <FilterCheckbox
          isChecked={isChecked}
          handleCheckboxChange={handleCheckboxChange}
        />
      </form>
    </section>
  );
}

export default SearchForm;
