import React, { useEffect, useState } from 'react';
import i18n from '../pages/i18n';
import { getCookie } from '../utils/RegExp';
import { countries } from '../constant/data/Constant';

const LanguageSwitcher = () => {
    const [initialLanguage, setInitialLanguage] = useState('');

    const getInitialLanguage = () => {
        const cookieLanguage = getCookie('i18next');
        return countries.find((country) => country.code === cookieLanguage) ? cookieLanguage : 'en';
    };

    useEffect(() => {
        const storedLanguage = getCookie('i18next');
        if (storedLanguage) {
            setInitialLanguage(storedLanguage);
            i18n.changeLanguage(storedLanguage);
        } else {
            setInitialLanguage(getInitialLanguage());
        }
    }, []);

    const handleChange = (event) => {
        const languageCode = event.target.value;
        i18n.changeLanguage(languageCode);
        setInitialLanguage(languageCode);
    };

    return (
        <select
            onChange={ handleChange }
            value={ initialLanguage }
        >
            { countries.map((country) => (
                <option key={ country.code } value={ country.code }>{ country.name } -{ country.code }</option>
            )) }
        </select>
    );
};

export default LanguageSwitcher;