import React from 'react';
import styled from 'styled-components';
import { StatusDotIcon } from '../../assets/icon';
import { EllipsisText } from '../../components';
import { Typography } from '@mui/material';

const InlineAlign = styled.div`
    display:flex
`;

const SubTitleStyle = styled.div`
    margin-top: -3px; 
    margin-left: 8px;
    text-transform: capitalize;
`;
const DotContainer = styled.div`
    margin-top: -2px; 
`;

const StatusDot = ({
    color,
    title
}) => {
    return (
        <InlineAlign>
            <DotContainer>
                <StatusDotIcon color={ color } />
            </DotContainer>
            <SubTitleStyle>
                <EllipsisText
                    variant='body2_1'
                    value={ title?.charAt(0).toUpperCase() + title?.slice(1).substring(0, title?.length).toLowerCase() }
                />
            </SubTitleStyle>
        </InlineAlign>
    );
};

export default StatusDot;
