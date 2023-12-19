import React from 'react';
import i18n from '../pages/i18n';

// const countries = [
//     { code: 'en', name: 'English', country_code: 'gb' },
//     { code: 'es', name: 'Español', country_code: 'es' },
//     { code: 'fr', name: 'Français', country_code: 'fr' }
// ]

const LanguageSwitcher = () => {

    return (
        <div>
            <button onClick={ () => i18n?.changeLanguage('en') }>English</button>
            <button onClick={ () => i18n?.changeLanguage('es') }>Español</button>
            <button onClick={ () => i18n?.changeLanguage('fr') }>Français</button>
        </div>
    );
}

export default LanguageSwitcher;
