import * as React from 'react';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import { Button } from '@mui/material';
import {
    ChangePwdIcon,
    SwitchAccountIcon,
    AccountIcon,
    HelpIcon
} from '../assets/icon';

const ProfileMenu = ({
    openProfile,
    handleLogout,
    anchorEl
}) => {
    const router = useRouter();

    const [anchorElemnt, setAnchorElemnt] = React.useState(anchorEl);

    const handleClose = () => {
        setAnchorElemnt(null);
    };

    return (
        <Menu
            anchorEl={anchorElemnt}
            id="account-menu"
            open={openProfile}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
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
                        top: 0,
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
                    <MenuItem style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                        <Avatar alt="Remy Sharp" style={{ width: '56px', height: '56px', background: '#68C886', color: '#fff' }}>
                            VJ
                        </Avatar>
                        <ListItemText style={{ padding: '5px 15px' }} primary="Vivek Jayanna" secondary="vivek.jayanna@drillbit.com" />
                    </MenuItem>
                    <Divider style={{ marginLeft: '10px', marginRight: '10px' }} />
                    <MenuItem style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                        <ListItemIcon>
                            <SwitchAccountIcon />
                        </ListItemIcon>
                        <ListItemText style={{ padding: '5px 15px' }} primary="Switch account" secondary="Switch to admin" />
                    </MenuItem>
                    <Divider style={{ marginLeft: '10px', marginRight: '10px' }} />
                    <MenuItem style={{ paddingTop: '0px', paddingBottom: '0px' }} onClick={(e) => router.push('/profile/accountinfo')}>
                        <ListItemIcon>
                            <AccountIcon />
                        </ListItemIcon>
                        <ListItemText style={{ padding: '5px 15px' }} primary="Account info" secondary="Account Settings" />
                    </MenuItem>
                    <Divider style={{ marginLeft: '10px', marginRight: '10px' }} />
                    <MenuItem style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                        <ListItemIcon>
                            <HelpIcon />
                        </ListItemIcon>
                        <ListItemText style={{ padding: '5px 15px' }} primary="Help" secondary="Help/ Guids/ FAQ" />
                    </MenuItem>
                    <Divider style={{ marginLeft: '10px', marginRight: '10px' }} />
                    <MenuItem style={{ paddingTop: '0px', paddingBottom: '0px' }} onClick={(e) => router.push('/profile/changepassword')}>
                        <ListItemIcon>
                            <ChangePwdIcon />
                        </ListItemIcon>
                        <ListItemText style={{ padding: '5px 15px' }} primary="Change password" secondary="Email" />
                    </MenuItem>
                    <Divider style={{ marginLeft: '10px', marginRight: '10px' }} />
                    <MenuItem style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                        <Button variant="contained" fullWidth color="primary" onClick={handleLogout}>Log out</Button>
                    </MenuItem>
                </MenuList>
            </Paper>
        </Menu>
    )
};

export default ProfileMenu;