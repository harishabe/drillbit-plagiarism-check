import { Button } from "@mui/material";
import styled from "styled-components";

export const PaginationContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;

export const ErrorMessageContainer = styled.div`
  color: #ff0000;
  font-size: 15px;
  text-align: center;
`;

export const StatusColor = styled.div`
  color: ${(props) => props.textColor};
  background: ${(props) => props.color};
  width: 100%;
  padding: 5px 20px;
  text-align: center;
  border-radius: 5px;
  font-weight: 600;
  font-size: 14px;
`;

export const PlagiarismGrammarContainer = styled.div`
  color: ${(props) => props.textColor};
  background: ${(props) => props.color};
  width: 100%;
  padding: 5px 5px;
  text-align: center;
  border-radius: 5px;
  font-weight: 600;
`;

export const CardStatusColor = styled.div`
  display: inline-flex;
  color: ${(props) => props.textColor};
  background: ${(props) => props.color};
  padding: 1px 12px;
  text-align: center;
  border-radius: 5px;
`;

export const StyledButtonIcon = styled(Button)({
  padding: "4px 4px !important",
  minWidth: "2rem !important",
  color: "#666666 !important",
  border: "1px solid #666666 !important",
  ":hover": {
    background: "#3672ff !important",
    color: "#fff !important",
    border: "1px solid #3672ff !important",
  },
});

export const StyledButtonRedIcon = styled(Button)({
  padding: "4px 4px !important",
  minWidth: "2rem !important",
  color: "#666666 !important",
  border: "1px solid #666666 !important",
  ":hover": {
    background: "#e9596f !important",
    color: "#fff !important",
    border: "1px solid #e9596f !important",
  },
});

export const StyledButtonGreenIcon = styled(Button)({
  padding: "4px 4px !important",
  minWidth: "2rem !important",
  color: "#666666 !important",
  border: "1px solid #666666 !important",
  ":hover": {
    background: "#38BE62 !important",
    color: "#fff !important",
    border: "1px solid #38BE62 !important",
  },
});

export const AddButtonBottom = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999;
`;

export const MultiSelectTableAction = styled.div`
  background:#fff;
  padding-top:5px;
  padding-left:5px;
  border-radius:5px;
  margin-bottom:10px;
`;
