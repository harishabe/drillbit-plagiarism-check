import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';

const CreateDrawer = ({
    children,
    title
}) => {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
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
                    <Tooltip title={title} arrow>
                        <Fab onClick={toggleDrawer(anchor, true)} color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <Box style={{ padding: '25px' }}
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