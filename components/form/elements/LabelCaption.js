import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


export const LabelContainer = styled.div`
    margin-bottom:10px;
    display:flex;
    justify-content:center;
    algin-items:center;
`;

const LabelCaption = ({
    field
}) => {
    return (
        <LabelContainer>
            {field.label}
        </LabelContainer>
    );
};

LabelCaption.propTypes = {
    field: PropTypes.any
};

export default LabelCaption;