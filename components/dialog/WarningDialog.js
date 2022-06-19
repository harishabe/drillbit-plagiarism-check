import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const WarningContainer = styled.div`
    padding:15px 60px;
    text-align:center;
`;

const ButtonContainer = styled.div`
    margin-top:20px;
`;

const MarginTop = styled.div`
    margin-top:10px;
`;

const WarningDialog = ({
    isOpen,
    message,
    warningIcon,
    handleYes,
    handleNo
}) => {

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleNo}
            >
                <DialogContent>
                    <DialogContentText>
                        <WarningContainer>
                            <div>{warningIcon}</div>
                            <MarginTop>{message}</MarginTop>
                            <ButtonContainer>
                                <Button
                                    onClick={handleNo}
                                    variant="outlined"
                                    style={{ marginRight: '10px' }}>No</Button>
                                <Button
                                    onClick={handleYes}
                                    variant="contained">
                                    Yes
                                </Button>
                            </ButtonContainer>
                        </WarningContainer>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default WarningDialog;