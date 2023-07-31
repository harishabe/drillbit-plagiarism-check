import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';

const StyledInputLabel = styled(InputLabel)(() => ({
   fontWeight:'600 !important',
}));


const LinkField = ({
    field
}) => {
    return (
        <div align={field.align}>
            <StyledInputLabel>
                <Link href={field.path}>
                    {field.label}
                </Link>
            </StyledInputLabel>
        </div>
    );
};

LinkField.propTypes = {
    field: PropTypes.any
};

export default LinkField;