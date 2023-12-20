import React, { useEffect, useState } from 'react';
import i18n from '../pages/i18n';
import Cookies from 'js-cookie';
import CountryFlag from 'react-country-flag';
import { Select, MenuItem, FormControl } from '@mui/material'
import { getCookie } from '../utils/RegExp';

const countries = [
    { code: 'en', name: 'English', country_code: 'gb' },
    { code: 'es', name: 'Español', country_code: 'es' },
    { code: 'fr', name: 'Français', country_code: 'fr' },
];

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
        Cookies.set('i18next', languageCode, { expires: 365 });
        setInitialLanguage(languageCode);
    };

    return (
        <FormControl>
            <Select
                id="language-select"
                onChange={ handleChange }
                value={initialLanguage}
                size='small'
            >
                { countries.map((country) => (
                    <MenuItem key={ country.code } value={ country.code }>
                        <CountryFlag countryCode={ country.country_code } svg 
                        style={ { marginRight: '8px' } } />
                        {' '}{ country.name }
                    </MenuItem>
                )) }
            </Select>
        </FormControl>
    );
};

export default LanguageSwitcher;