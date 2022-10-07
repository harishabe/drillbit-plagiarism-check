import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


export const LabelContainer = styled.div`
    margin-bottom:10px;
`;

const LabelCaption = ({
    field
}) => {
    return (
        <LabelContainer>
            <b>{field.label}</b>
        </LabelContainer>
    );
};

LabelCaption.propTypes = {
    field: PropTypes.any
};

export default LabelCaption;