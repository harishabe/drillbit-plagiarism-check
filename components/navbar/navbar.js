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
import { getItemSessionStorage, setItemSessionStorage, clearSessionStorage } from '../../utils/RegExp';
import { BASE_URL } from '../../utils/BaseUrl';
import END_POINTS from '../../utils/EndPoints'
import { Role } from '../../constant/data';
import { PROFILE_ROLE } from '../../constant/data/Constant';
import EllipsisText from '../ellipsis/EllipsisText';
import SubTitle1 from '../typography/SubTitle1';

const drawerWidth = 165;

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
    const [profileRole, setProfileRole] = React.useState('');
    const [switchRole, setSwitchRole] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [path, setPath] = React.useState('');
    const [Sso, setSso] = React.useState(false);
    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = (event) => {
        event.preventDefault();
        setAnchorEl(null);
        clearSessionStorage();
        window.location.href = '/auth/login';
        window.location.replace(window?.location?.origin + window?.location?.pathname);
    };

    const handleSsoLogout = (event) => {
        event.preventDefault();
        setAnchorEl(null);
        clearSessionStorage();
        window.location.href = BASE_URL + END_POINTS.SSO_LOGOUT;
    };

    const switchToUser = (e, switchRole) => {
        e.preventDefault();
        if (switchRole === Role.instructor) {
            setSwitchRole('instructor');
            setItemSessionStorage('switchRole', 'instructor');
            router.push('/extream/instructor/dashboard');
        } else {
            setSwitchRole('admin');
            setItemSessionStorage('switchRole', 'admin');
            router.push('/extream/admin/dashboard');
        }
    };

    const switchToProUser = (e, switchProRole) => {
        e.preventDefault();
        if (switchProRole === 'lim-instructor') {
            setSwitchRole('user');
            setItemSessionStorage('switchProRole', 'user');
            router.push('/pro/user/dashboard');
        } else {
            setSwitchRole('admin');
            setItemSessionStorage('switchProRole', 'admin');
            router.push('/pro/admin/dashboard');
        }
    };


    React.useEffect(() => {
        let userName = getItemSessionStorage('name');
        let userRole = getItemSessionStorage('role');
        let email = getItemSessionStorage('email');
        let switchExtreamRole = getItemSessionStorage('switchRole');
        let switchProRole = getItemSessionStorage('switchProRole');
        setSso(getItemSessionStorage('SSO'));
        setName(userName);
        setRole(userRole);
        setEmail(email);
        if ((userRole === Role?.proAdmin) && (router.pathname.split('/')[1] === 'pro') && (router.pathname.split('/')[2] === 'admin')) {
            setPath('/pro/admin');
            setProfileRole(PROFILE_ROLE.ADMIN);
        } else if ((userRole === Role?.proUser || Role?.proAdmin) && (switchProRole === 'user' || switchProRole === null) && (router.pathname.split('/')[2] === 'user')) {
            setPath('/pro/user');
            setProfileRole(PROFILE_ROLE.USER);
        } else if ((userRole === Role?.student)) {
            setPath('/extream/' + userRole);
            setProfileRole(PROFILE_ROLE.STUDENT);
        } else if ((userRole === Role?.super)) {
            setPath('/super/');
            setProfileRole(PROFILE_ROLE.SUPER);
        } else if ((userRole === Role?.admin) && (router.pathname.split('/')[1] === 'extream') && (router.pathname.split('/')[2] === 'admin')) {
            setPath('/extream/admin');
            setProfileRole(PROFILE_ROLE.ADMIN);
        } else if ((userRole === Role?.instructor || Role?.admin) && (switchExtreamRole === Role?.instructor || switchExtreamRole === null) && (router.pathname.split('/')[2] === 'instructor')) {
            setPath('/extream/instructor');
            setProfileRole(PROFILE_ROLE.INSTRUCTOR);
        } else if ((userRole === Role?.supplier)) {
            setPath('/supplier/');
            setProfileRole(PROFILE_ROLE.RESELLER);
        } else if ((userRole === Role?.consortium)) {
            setPath('/consortium/');
            setProfileRole(PROFILE_ROLE.CONSORTIUM);
        }
    }, [, router, switchRole]);

    return (
        <>
            <Hidden mdDown implementation="css">
                <AppBar position="fixed" open={ open } color="appbar" style={ { zIndex: 999 } }>
                    <Box sx={ { boxShadow: 1 } }>
                        <Hidden mdDown implementation="css">
                            <Toolbar>
                                <Box sx={ { display: { xs: 'none', md: 'flex' } } }>
                                    <Tooltip title='Menu' arrow>
                                        <IconButton
                                            color="inherit"
                                            aria-label="open drawer"
                                            onClick={ handleDrawerOpen }
                                            edge="start"
                                            sx={ {
                                                marginRight: 5,
                                                ...(open && { display: 'block' }),
                                            } }
                                        >
                                            <ToggleBarIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Box sx={ { flexGrow: 1 } } />
                                <Box sx={ { display: { xs: 'none', md: 'flex' } } }>
                                    <Divider orientation="vertical" flexItem />
                                    <div style={ { display: 'block', marginLeft: '15px', marginRight: '15px' } }>
                                        <div style={ { fontSize: '16px', fontWeight: 400, lineHeight: '24px', maxWidth: '128px' } }>
                                            { name !== undefined ? <EllipsisText value={ name } /> : <Skeleton /> }
                                        </div>
                                        <div style={ { fontSize: '12px', fontWeight: 400, color: '#666', letterSpacing: '0.4px', textAlign: 'right', textTransform: 'capitalize' } }>
                                            { profileRole }
                                        </div>
                                    </div>

                                    <div style={ { marginLeft: '15px', marginRight: '15px', cursor: 'pointer' } }>
                                        <Avatar onClick={ handleProfileClick } alt="Remy Sharp" sx={ { width: 45, height: 45, background: '#68C886', color: '#fff' } }>
                                            { name && name.charAt(0)?.toUpperCase() }
                                        </Avatar>
                                    </div>
                                    <IconButton
                                        onClick={ handleProfileClick }
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
                anchorEl={ anchorEl }
                id="account-menu"
                open={ openProfile }
                onClose={ handleClose }
                onClick={ handleClose }
                PaperProps={ {
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
                } }
                transformOrigin={ { horizontal: 'right', vertical: 'top' } }
                anchorOrigin={ { horizontal: 'right', vertical: 'bottom' } }
            >
                <MenuItem style={ { paddingTop: '0px', paddingBottom: '0px', width: 328, boxShadow: 'none', maxWidth: '100%', background: '#fff' } }>
                    <Avatar alt={ name } style={ { width: '56px', height: '56px', background: '#68C886', color: '#fff' } }>
                        { name && name.charAt(0)?.toUpperCase() }
                    </Avatar>
                    <ListItemText
                        primary={ <EllipsisText value={ name } /> }
                        secondary={ <EllipsisText value={ email } /> }
                    />
                </MenuItem>
                <Divider style={ { marginLeft: '10px', marginRight: '10px' } } />
                { (router.pathname.split('/')[1] === 'extream' && role === Role?.admin && ((getItemSessionStorage('switchRole') === null || getItemSessionStorage('switchRole') === 'admin') || (getItemSessionStorage('switchRole') === null || getItemSessionStorage('switchRole') === 'instructor'))) &&
                    <>
                    <MenuItem style={ { paddingTop: '0px', paddingBottom: '0px' } } onClick={ (e) => switchToUser(e, router.pathname.split('/')[2] === Role?.admin ? 'instructor' : 'admin') }>
                        <ListItemIcon>
                            <SwitchAccountIcon />
                        </ListItemIcon>
                        <ListItemText
                            style={ { padding: '5px 15px' } }
                            primary="Switch account"
                            secondary={ `Switch to ${router.pathname.split('/')[2] === Role?.admin ? 'instructor' : 'admin'}` }
                        />
                    </MenuItem>
                        <Divider style={ { marginLeft: '10px', marginRight: '10px' } } />
                    </>
                }
                { (router.pathname.split('/')[1] === 'pro' && role === Role?.proAdmin &&
                    ((getItemSessionStorage('switchRole') === null || getItemSessionStorage('switchRole') === 'lim-admin') || (getItemSessionStorage('switchRole') === null || getItemSessionStorage('switchRole') === 'lim-instructor'))) &&
                    <>
                    <MenuItem style={ { paddingTop: '0px', paddingBottom: '0px' } } onClick={ (e) => switchToProUser(e, router.pathname.split('/')[2] === Role?.admin ? 'lim-instructor' : 'lim-admin') }>
                        <ListItemIcon>
                            <SwitchAccountIcon />
                        </ListItemIcon>
                        <ListItemText
                            style={ { padding: '5px 15px' } }
                            primary="Switch account"
                            secondary={ `Switch to ${router.pathname.split('/')[2] === Role?.admin ? 'user' : 'admin'}` }
                        />
                    </MenuItem>
                        <Divider style={ { marginLeft: '10px', marginRight: '10px' } } />
                    </>
                }
                <MenuItem style={ { paddingTop: '0px', paddingBottom: '0px' } } onClick={ () => [router.push(`${path}/profile/accountinfo`), setAnchorEl(null)] }>
                    <ListItemIcon>
                        <AccountIcon />
                    </ListItemIcon>
                    <ListItemText style={ { padding: '5px 15px' } } primary="Account info" secondary="Account details" />
                </MenuItem>
                <Divider style={ { marginLeft: '10px', marginRight: '10px' } } />

                { role !== Role?.supplier && role !== Role?.consortium &&
                    <>
                    <MenuItem style={ { paddingTop: '0px', paddingBottom: '0px' } } onClick={ () => [router.push(`${path}/profile/help`), setAnchorEl(null)] }>
                        <ListItemIcon>
                            <HelpIcon />
                        </ListItemIcon>
                        <ListItemText style={ { padding: '5px 15px' } } primary="Help" secondary="PDF / Video" />
                    </MenuItem>
                    <Divider style={ { marginLeft: '10px', marginRight: '10px' } } />
                    </>
                }

                <MenuItem style={ { paddingTop: '0px', paddingBottom: '0px' } } onClick={ () => [router.push(`${path}/profile/changepassword`), setAnchorEl(null)] }>
                    <ListItemIcon>
                        <ChangePwdIcon />
                    </ListItemIcon>
                    <ListItemText style={ { padding: '5px 15px' } } primary="Change password" secondary="Email" />
                </MenuItem>
                { Sso ?
                    <MenuItem style={ { paddingTop: '0px', paddingBottom: '0px', marginTop: '18px' } } >
                        <Button variant="contained" fullWidth color="primary" onClick={ handleSsoLogout }>Log out</Button>
                    </MenuItem> :
                    <MenuItem style={ { paddingTop: '0px', paddingBottom: '0px', marginTop: '18px' } } onClick={ handleLogout } >
                        <Button variant="contained" fullWidth color="primary" >Log out</Button>
                    </MenuItem>
                }

                <div style={ { textAlign: 'right', padding: '0px 15px' } }>
                    <SubTitle1 title="v.2.1.0" />
                </div>
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
