import React from 'react';
import styled from 'styled-components';
import { EllipsisText } from '..';

const InlineAlign = styled.div`
    display:flex;
`;

const SubTitleStyle = styled.div`
    margin-left: 8px;
`;

const FolderIconSmall = ({
    component,
    title,
    charLength
}) => {
    return (
        <InlineAlign>
            { component } <SubTitleStyle><EllipsisText value={ title } charLength={ charLength } /></SubTitleStyle>
        </InlineAlign>
    );
};

export default FolderIconSmall;
