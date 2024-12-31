// src/components/LanguageSelector.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('preferredLanguage', lng);
  };

  return (
    <div className="absolute top-4 right-4">
      <select 
        className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm border border-purple-200"
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
      >
        <option value="en">{t('language.en')}</option>
        <option value="fr">{t('language.fr')}</option>
        <option value="nl">{t('language.nl')}</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
