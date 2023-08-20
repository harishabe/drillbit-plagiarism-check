import * as React from "react";
import styled from "styled-components";
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const WarningContainer = styled.div`
  padding: 5px 60px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  margin-top: 20px;
`;

const MarginTop = styled.div`
  margin-top: 10px;
  color: #454745;
  font-weight: 600;
`;

const WarningDialog = ({
  isOpen,
  message,
  warningIcon,
  handleYes,
  handleNo,
}) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={handleNo}>
        <DialogTitle>
          <Tooltip title="close" arrow>
            <IconButton
              aria-label="close"
              onClick={handleNo}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <WarningContainer>
              <div>{warningIcon}</div>
              <MarginTop>{message}</MarginTop>
              <ButtonContainer>
                <Button
                  onClick={handleNo}
                  variant="outlined"
                  style={{ marginRight: "10px" }}
                >
                  No
                </Button>
                <Button onClick={handleYes} variant="contained">
                  Yes
                </Button>
              </ButtonContainer>
            </WarningContainer>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WarningDialog;
