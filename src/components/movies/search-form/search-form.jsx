import React from 'react';
import './search-form.css';
import FilterCheckbox from './filter-checkbox/filter-checkbox';
import { useFormWithValidation } from '../../../hooks/useFormWithValidation';

function SearchForm({ onSubmit }) {
  const { values, handleChange, errors, setErrors } = useFormWithValidation();

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
      film: '', // Очищаем ошибку поля film
    }));

    onSubmit();
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
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;
