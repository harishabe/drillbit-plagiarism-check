import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";


export const LabelContainer = styled.div`
    margin-bottom:10px;
    display:flex;
    justify-content:center;
    algin-items:center;
`;

const LabelCaption = ({
    field
}) => {
    const { t } = useTranslation();
    return (
        <LabelContainer>
            <b>{ t(`FORM_COMPONENT.${field.id}.label`) }</b>
        </LabelContainer>
    );
};

LabelCaption.propTypes = {
    field: PropTypes.any
};

export default LabelCaption;