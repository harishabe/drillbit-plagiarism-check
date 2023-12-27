import React from 'react';
import Link from 'next/link';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

const LinkField = ({
    field
}) => {
    const { t } = useTranslation();
    return (
        <div align={field.align}>
            <InputLabel>
                <Link href={field.path}>
                    { t(`FORM_COMPONENT.${field.id}.label`) }
                </Link>
            </InputLabel>
        </div>
    );
};

LinkField.propTypes = {
    field: PropTypes.any
};

export default LinkField;