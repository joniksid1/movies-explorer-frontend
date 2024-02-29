import React from "react";
import sucsess from '../../images/sucsess.svg';
import fail from '../../images/fail.svg';
import './info-tool-tip.css';

function InfoToolTip({ isSucsessed, isOpen, onClose, onOverlayClick, error, action }) {

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={onOverlayClick}>
      <div className={`popup__container`}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        {isSucsessed && (<>
          <img src={sucsess} alt="Иконка успешной регистрации" className='popup__image' />
          <p className='popup__caption'>Вы успешно{'\n'}{action}!</p>
        </>)}
        {!isSucsessed && (<>
          <img src={fail} alt="Красный крест" className='popup__image' />
          <p className='popup__caption'>
            {error ? error.message || 'Что-то пошло не так! Попробуйте ещё раз.' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </p>
        </>)}
      </div>
    </div>
  );
}

export default InfoToolTip;
