import styled from 'styled-components';
import {Button} from '@mui/material'

export const PaginationContainer = styled.div`
    margin-top:25px;
    display:flex;
    justify-content:center;
`;

export const ErrorMessageContainer = styled.div`
    color:#ff0000;
    font-size:15px;
    text-align:center;  
`;

export const StatusColor = styled.div`
    color:${(props) => props.textColor};
    background: ${(props) => props.color};
    width:100%;
    padding: 5px 20px;
    text-align: center;
    border-radius: 5px;
    font-weight:600;
`;

export const PlagiarismGrammarContainer = styled.div`
    color:${(props) => props.textColor};
    background: ${(props) => props.color};
    width:100%;
    padding: 5px 5px;
    text-align: center;
    border-radius: 5px;
    font-weight:600;
`;

export const CardStatusColor = styled.div`
    display: inline-flex;
    color:${(props) => props.textColor};
    background: ${(props) => props.color};
    padding: 5px 20px;
    text-align: center;
    border-radius: 5px;
`;

export const StyledButtonIcon = styled(Button)({
    padding:'4px 4px', 
    minWidth: '2rem', 
    color:'#666666', 
    border:'1px solid #666666'
})

export const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
    z-index: 999;
`;