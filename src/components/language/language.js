import React from 'react';
import './language.scss';
import { useTranslation } from 'react-i18next';
import viFlag from '../../assets/img/flag_vi.png';
import enFlag from '../../assets/img/flag_en.png';

export default function Language() {
  
  const { t, i18n } = useTranslation();
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  return(
    <React.Fragment>
      <div className='lang-group'>
        <img src={viFlag} alt='vi-flag' onClick={() => changeLanguage('vi')} />
        <img src={enFlag} alt='en-flag' onClick={() => changeLanguage('en')}/>
      </div>

      <span className='current-lang'>{t('lang')}</span>
    </React.Fragment>
  )
}