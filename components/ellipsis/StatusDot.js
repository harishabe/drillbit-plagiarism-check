import React from 'react';
import styled from 'styled-components';
import { StatusDotIcon } from '../../assets/icon';
import { SubTitle } from '../../components';

const InlineAlign = styled.div`
    display:flex
`;

const SubTitleStyle = styled.div`
    margin-top: -8px; 
    margin-left: 8px;
    text-transform: capitalize;
`;

const StatusDot = ({
    color,
    title
}) => {
    return (
        <InlineAlign>
            <StatusDotIcon color={color} /> <SubTitleStyle><SubTitle title={title} /></SubTitleStyle>
        </InlineAlign>
    )
}

export default StatusDot
