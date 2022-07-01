import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import Heading from '../typography/heading';
import { IconButton } from '@mui/material';
import { CloseIcon } from './../../assets/icon';
import styled from 'styled-components'

const CloseButtonCenter = styled.div`
    text-align:right
`;

const CreateDrawer = ({
    children,
    title,
    showDrawer,
    isShowAddIcon
}) => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: showDrawer,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    {isShowAddIcon &&
                        <Tooltip title={title} arrow>
                            <Fab onClick={toggleDrawer(anchor, true)} color="primary" aria-label="add">
                                <AddIcon />
                            </Fab>
                        </Tooltip>}
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <CloseButtonCenter>
                            <IconButton onClick={toggleDrawer(anchor, false)}>
                                <CloseIcon />
                            </IconButton>
                        </CloseButtonCenter>
                        <Box style={{ padding: '0px 25px' }}
                            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 500 }}
                            role="presentation"
                        >
                            {children}
                        </Box>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}

export default CreateDrawer;