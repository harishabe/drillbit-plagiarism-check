import React from 'react';
import styled from 'styled-components';
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel';
import PropTypes from 'prop-types';


export const LabelContainer = styled.div`
    border-bottom:2px solid gray;
    margin-bottom:10px;
`;

const LabelCaption = ({
    field
}) => {
    return (
        <LabelContainer>
            <InputLabel>
                <Typography sx={{ color: '#282828', fontWeight: '600', mb: '10px' }}>{field.label}</Typography>
            </InputLabel>
        </LabelContainer>
    )
};

LabelCaption.propTypes = {
    field: PropTypes.any
}

export default LabelCaption;