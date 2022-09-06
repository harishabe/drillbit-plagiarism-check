import styled from 'styled-components';

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
    display: inline-flex;
    color:${(props) => props.textColor};
    background: ${(props) => props.color};
    padding: 5px 20px;
    text-align: center;
    border-radius: 5px;
`;