import * as React from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Hidden from '@mui/material/Hidden';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Button, Skeleton, Tooltip } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import {
    ToggleBarIcon,
    DownArrowIcon,
    ChangePwdIcon,
    SwitchAccountIcon,
    AccountIcon,
    HelpIcon
} from '../../assets/icon';
import { getItemLocalStorage, setItemLocalStorage } from '../../utils/RegExp';
import { Role } from '../../constant/data';
import EllipsisText from '../ellipsis/EllipsisText';
import SubTitle1 from '../typography/SubTitle1';
import { PRO_ADMIN, PRO_USER } from '../../constant/data/Constant';

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),

    ...(!open && {
        width: 'calc(100% - 64px)',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const NavBar = ({
    open,
    handleDrawerOpen
}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openProfile = Boolean(anchorEl);
    const router = useRouter();
    const [name, setName] = React.useState('');
    const [role, setRole] = React.useState('');
    const [switchRole, setSwitchRole] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [path, setPath] = React.useState('');

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.clear();
        window.location.href = '/auth/login';
    };

    const switchToUser = (e, role) => {
        e.preventDefault();
        if (switchRole === role) {
            setSwitchRole('instructor');
            setItemLocalStorage('switchRole', 'instructor');
            router.push('/extream/instructor/dashboard');
        } else {
            setSwitchRole('admin');
            setItemLocalStorage('switchRole', 'admin');
            router.push('/extream/admin/dashboard');
        }
    };

    React.useEffect(() => {
        let userName = getItemLocalStorage('name');
        let userRole = getItemLocalStorage('role');
        let email = getItemLocalStorage('email');
        let switchRoles = getItemLocalStorage('role') !== Role.instructor && getItemLocalStorage('switchRole') === null && getItemLocalStorage('role') !== Role.student ? 'admin' : getItemLocalStorage('switchRole');
        setName(userName);
        setRole(userRole);
        setEmail(email);
        setSwitchRole(switchRoles);
        if (userRole === Role?.proAdmin) {
            setRole(PRO_ADMIN);
            setPath('/pro/admin');
        } else if (userRole === Role?.proUser) {
            setRole(PRO_USER);
            setPath('/pro/user');
        } else if ((userRole === Role?.admin || Role?.instructor || Role?.student) && (switchRole === null)) {
            setPath('/extream/' + userRole);
        } else if ((userRole === Role?.admin || Role?.instructor || Role?.student) && (switchRole === 'admin')) {
            setPath('/extream/admin');
        } else if ((userRole === Role?.admin || Role?.instructor || Role?.student) && (switchRole === 'instructor')) {
            setPath('/extream/instructor');
        }
    }, [, switchRole]);

    return (
        <>
            <Hidden mdDown implementation="css">
                <AppBar position="fixed" open={open} color="appbar" style={{ zIndex: 999 }}>
                    <Box sx={{ boxShadow: 1 }}>
                        <Hidden mdDown implementation="css">
                            <Toolbar>
                                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                    <Tooltip title='Menu' arrow>
                                        <IconButton
                                            color="inherit"
                                            aria-label="open drawer"
                                            onClick={handleDrawerOpen}
                                            edge="start"
                                            sx={{
                                                marginRight: 5,
                                                ...(open && { display: 'block' }),
                                            }}
                                        >
                                            <ToggleBarIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Box sx={{ flexGrow: 1 }} />
                                <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                    <Divider orientation="vertical" flexItem />
                                    <div style={{ display: 'block', marginLeft: '15px', marginRight: '15px' }}>
                                        <div style={{ fontSize: '16px', fontWeight: 400, lineHeight: '24px' }}>
                                            {name !== undefined ? <EllipsisText value={name} charLength={12} /> : <Skeleton />}
                                        </div>
                                        <div style={{ fontSize: '12px', fontWeight: 400, color: '#666', letterSpacing: '0.4px', textAlign: 'right' }}>
                                            {switchRole !== null ? switchRole?.charAt(0)?.toUpperCase() + switchRole?.slice(1) : role?.charAt(0)?.toUpperCase() + role?.slice(1)}
                                        </div>
                                    </div>

                                    <div style={{ marginLeft: '15px', marginRight: '15px', cursor: 'pointer' }}>
                                        <Avatar onClick={handleProfileClick} alt="Remy Sharp" sx={{ width: 45, height: 45, background: '#68C886', color: '#fff' }}>
                                            {name && name.charAt(0)}
                                        </Avatar>
                                    </div>
                                    <IconButton
                                        onClick={handleProfileClick}
                                        color="inherit"
                                        aria-label="open dr awer"
                                        edge="start"
                                    >
                                        <DownArrowIcon />
                                    </IconButton>
                                </Box>
                            </Toolbar>
                        </Hidden>
                    </Box>
                </AppBar>
            </Hidden>
            <Menu
                anchorEl={anchorEl}
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
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Paper sx={{ width: 328, boxShadow: 'none', maxWidth: '100%' }}>
                    <MenuList style={{ paddingBottom: '0px' }}>
                        <MenuItem style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                            <Avatar alt={name} style={{ width: '56px', height: '56px', background: '#68C886', color: '#fff' }}>
                                {name && name.charAt(0)}
                            </Avatar>
                            <ListItemText
                                primary={<EllipsisText value={name} charLength={20} />}
                                secondary={<EllipsisText value={email} charLength={20} />}
                            />
                        </MenuItem>
                        <Divider style={{ marginLeft: '10px', marginRight: '10px' }} />
                        {role === Role?.admin &&
                            <>
                                <MenuItem style={{ paddingTop: '0px', paddingBottom: '0px' }} onClick={(e) => switchToUser(e, role)}>
                                    <ListItemIcon>
                                        <SwitchAccountIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        style={{ padding: '5px 15px' }}
                                        primary="Switch account"
                                        secondary={`Switch to ${switchRole === Role?.admin ? 'instructor' : 'admin'}`}
                                    />
                                </MenuItem>
                                <Divider style={{ marginLeft: '10px', marginRight: '10px' }} />
                            </>
                        }
                        <MenuItem style={{ paddingTop: '0px', paddingBottom: '0px' }} onClick={(e) => router.push(`${path}/profile/accountinfo`)}>
                            <ListItemIcon>
                                <AccountIcon />
                            </ListItemIcon>
                            <ListItemText style={{ padding: '5px 15px' }} primary="Account info" secondary="Account details" />
                        </MenuItem>
                        <Divider style={{ marginLeft: '10px', marginRight: '10px' }} />
                        <MenuItem style={{ paddingTop: '0px', paddingBottom: '0px' }} onClick={(e) => router.push(`${path}/profile/help`)}>
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <ListItemText style={{ padding: '5px 15px' }} primary="Help" secondary="PDF / Video" />
                        </MenuItem>
                        <Divider style={{ marginLeft: '10px', marginRight: '10px' }} />
                        <MenuItem style={{ paddingTop: '0px', paddingBottom: '0px' }} onClick={(e) => router.push(`${path}/profile/changepassword`)}>
                            <ListItemIcon>
                                <ChangePwdIcon />
                            </ListItemIcon>
                            <ListItemText style={{ padding: '5px 15px' }} primary="Change password" secondary="Email" />
                        </MenuItem>
                        <MenuItem style={{ paddingTop: '0px', paddingBottom: '0px', marginTop: '18px' }}>
                            <Button variant="contained" fullWidth color="primary" onClick={handleLogout}>Log out</Button>
                        </MenuItem>

                        <div style={{ textAlign: 'right', padding: '0px 15px' }}>
                            <SubTitle1 title="v.2.0.0" />
                        </div>
                    </MenuList>
                </Paper>
            </Menu>
        </>
    );
};

const mapStateToProps = (state) => ({
    dashboardData: state?.adminDashboard?.data?.userProfileLite,
    instructorDashboardData: state?.instructorDashboard?.data?.userProfileLite,
    studentData: state?.studentClasses?.dashboardData?.userProfileLite,
});

export default connect(mapStateToProps, {})(NavBar);
