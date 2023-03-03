import React from 'react';
import styled from 'styled-components';
import FolderIcon from '@mui/icons-material/Folder';
import { EllipsisText } from '..';

const InlineAlign = styled.div`
    display:flex;
    color:#56B2EA;
`;

const SubTitleStyle = styled.div`
    margin-left: 8px;
`;

const FolderIconSmall = ({
    title,
    charLength
}) => {
    return (
        <InlineAlign>
            <FolderIcon fontSize='small' /> <SubTitleStyle><EllipsisText value={ title } charLength={ charLength } /></SubTitleStyle>
        </InlineAlign>
    );
};

export default FolderIconSmall;