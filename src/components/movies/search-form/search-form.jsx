import React from 'react';
import './search-form.css';
import FilterCheckbox from './filter-checkbox/filter-checkbox';

function SearchForm() {

  return (
    <section className='search-form'>
      <form className='search-form__form'>
        <div className='search-form__input-container'>
          <input
            name='film'
            type='text'
            placeholder='Фильм'
            className='search-form__input'
          />
          <label className='search-form__icon' />
          <button
            type='submit'
            className='search-form__button'
          />
        </div>
        <FilterCheckbox/>
      </form>
    </section>
  );
}

export default SearchForm;
