import React from 'react';
import styled from 'styled-components';
import { StatusDotIcon } from '../../assets/icon';
import { Title1 } from '../../components';

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
            <StatusDotIcon color={ color } /> <SubTitleStyle><Title1 title={ title?.charAt(0).toUpperCase() + title?.slice(1).substring(0, title?.length).toLowerCase() } /></SubTitleStyle>
        </InlineAlign>
    );
};

export default StatusDot;
