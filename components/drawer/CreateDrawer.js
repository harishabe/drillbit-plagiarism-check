import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import Menu from '@mui/material/Menu';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { IconButton } from '@mui/material';
import { CloseIcon } from './../../assets/icon';
import styled from 'styled-components';
import { Role } from '../../constant/data';
import { getItemSessionStorage } from '../../utils/RegExp';

const CloseButtonCenter = styled.div`
    text-align:right
`;

const CreateDrawer = ({
    children,
    title,
    showDrawer,
    isShowAddIcon,
    options,
    handleMultiData,
    navigateToMultiFile,
    handleNavigateMultiFile,
    handleDrawerClose,
    handleCloseDrawer
}) => {
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: showDrawer,
    });

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        window.addEventListener('message', closeDrawer);
        return () => {
            window.removeEventListener('message', closeDrawer);
        };
    }, []);

    const closeDrawer = (e) => {
        if (e?.data?.type === 'MESSAGE_LENGTH_SUCCESS' && getItemSessionStorage('role') !== Role.super) {
            setState({ ...state, ['right']: false })
            if (handleCloseDrawer !== undefined) {
                handleCloseDrawer(false);
            }
        }
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
        if (handleDrawerClose !== undefined) {
            handleDrawerClose(open);
        }
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                anchorPosition={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        //top: '362px !important',
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            bottom: '-9px',
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Paper sx={{ width: 328, boxShadow: 'none', maxWidth: '100%' }}>
                    <MenuList>
                        {options?.map((item) => (
                            <div key={item.title}>
                                {item.handleFromCreateDrawer ?
                                    <MenuItem onClick={(e) => handleMultiData(e, item)} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText style={{ padding: '15px 15px' }} primary={item.title} />
                                    </MenuItem> :
                                    <MenuItem onClick={toggleDrawer('right', true)} style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText style={{ padding: '15px 15px' }} primary={item.title} />
                                    </MenuItem>}
                                <Divider style={{ marginLeft: '10px', marginRight: '10px' }} />
                            </div>
                        ))}
                    </MenuList>
                </Paper>
            </Menu>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    {isShowAddIcon &&
                        <Tooltip title={title} arrow>
                            {options?.length > 0 ?
                                <Fab onClick={handleClick} color="primary" aria-label="add">
                                    <AddIcon />
                                </Fab>
                                :
                                <Fab onClick={navigateToMultiFile ? handleNavigateMultiFile : toggleDrawer(anchor, true)} color="primary" aria-label="add">
                                    <AddIcon />
                                </Fab>}
                        </Tooltip>}
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <CloseButtonCenter>
                            <Tooltip title={ 'close' } arrow>
                                <IconButton onClick={ toggleDrawer(anchor, false) }>
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </CloseButtonCenter>

                        <Box style={ { padding: '0px 10px' } }
                            sx={ { width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 430 } }
                            role="presentation"
                        >
                            {children}
                        </Box>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
};

export default CreateDrawer;