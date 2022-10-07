import React from 'react';
import Link from 'next/link';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

const LinkField = ({
    field
}) => {
    return (
        <div align={field.align}>
            <InputLabel>
                <Link href={field.path}>
                    {field.label}
                </Link>
            </InputLabel>
        </div>
    );
};

LinkField.propTypes = {
    field: PropTypes.any
};

export default LinkField;