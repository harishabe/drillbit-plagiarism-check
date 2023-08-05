import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import FormJson from '../../constant/form/ticket-system-form.json';
import { FormComponent } from '../../components';
import Hidden from '@mui/material/Hidden';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import MuiAppBar from '@mui/material/AppBar'
import {
    Divider,
    IconButton,
    Box,
    Toolbar,
    Menu,
    MenuItem,
    Button,
    Skeleton,
    Tooltip,
    Grid,
    Typography,
    ListItemText,
    ListItemIcon,
} from '@mui/material';
import {
    ToggleBarIcon,
    DownArrowIcon,
    ChangePwdIcon,
    SwitchAccountIcon,
    AccountIcon,
    HelpIcon
} from '../../assets/icon';
import { getItemSessionStorage, setItemSessionStorage, clearSessionStorage, removeItemSessionStorage } from '../../utils/RegExp';
import { BASE_URL } from '../../utils/BaseUrl';
import END_POINTS from '../../utils/EndPoints'
import { Role } from '../../constant/data';
import { PROFILE_ROLE } from '../../constant/data/Constant';
import EllipsisText from '../ellipsis/EllipsisText';
import SubTitle1 from '../typography/SubTitle1';
import DialogModal from '../dialog/DialogModal';

const drawerWidth = 200;

const useStyles = makeStyles(() => ({
    divider: {
        marginLeft: '10px',
        marginRight: '10px'
    },
    menuItem: {
        paddingTop: '0px',
        paddingBottom: '0px'
    },
    listItemText: {
        padding: '5px 15px'
    },
    profileMenuItem: {
        paddingTop: '0px',
        paddingBottom: '0px',
        width: 328,
        boxShadow: 'none',
        maxWidth: '100%',
        background: '#fff'
    },
    ssoLogout: {
        paddingTop: '0px',
        paddingBottom: '0px',
        marginTop: '18px'
    },
    subMenuItem: {
        marginTop: '8px',
        marginLeft: '10px',
        marginRight: '10px'
    }
}));

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
    const { handleSubmit, control, reset } = useForm({
        mode: 'all',
    });
    const classes = useStyles();
    const [subMenuanchorEl, setsubMenuAnchorEl] = useState(null);
    const [showTicketModal, setShowTicketModal] = useState(false);
    const subMenuopen = Boolean(subMenuanchorEl);
    const [anchorEl, setAnchorEl] = useState(null);
    const openProfile = Boolean(anchorEl);
    const router = useRouter();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [profileRole, setProfileRole] = useState('');
    const [switchRole, setSwitchRole] = useState('');
    const [email, setEmail] = useState('');
    const [path, setPath] = useState('');
    const [Sso, setSso] = useState(false);

    const handleProfileClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlesubMenuClose = () => {
        setsubMenuAnchorEl(null);
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
            removeItemSessionStorage('switchProRole')
            router.push('/extream/instructor/dashboard');
        } else {
            setSwitchRole('admin');
            setItemSessionStorage('switchRole', 'admin');
            removeItemSessionStorage('switchProRole')
            router.push('/extream/admin/dashboard');
        }
    };

    const switchToProUser = (e, switchProRole) => {
        e.preventDefault();
        if (switchProRole === 'lim-instructor') {
            setSwitchRole('user');
            setItemSessionStorage('switchProRole', 'user');
            removeItemSessionStorage('switchRole')
            router.push('/pro/user/dashboard');
        } else {
            setSwitchRole('admin');
            setItemSessionStorage('switchProRole', 'admin');
            removeItemSessionStorage('switchRole')
            router.push('/pro/admin/dashboard');
        }
    };

    const handleConsortium = (e, switchRole) => {
        e.preventDefault();
        removeItemSessionStorage('switchRole')
        removeItemSessionStorage('switchProRole')
        if (switchRole === Role?.consortium) {
            setPath('/consortium/');
            setProfileRole(PROFILE_ROLE.CONSORTIUM);
            router.push('/consortium/dashboard')
        } else {
            setPath('/supplier/');
            setProfileRole(PROFILE_ROLE.RESELLER);
            router.push('/supplier/dashboard')
        }
    }

    useEffect(() => {
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
        } else if ((userRole === Role?.supplier && !switchExtreamRole && !switchProRole)) {
            setPath('/supplier/');
            setProfileRole(PROFILE_ROLE.RESELLER);
        } else if ((userRole === Role?.supplier && switchExtreamRole === 'admin')) {
            setPath('/extream/admin');
            setProfileRole(PROFILE_ROLE.ADMIN);
        } else if ((userRole === Role?.supplier && switchExtreamRole === 'instructor')) {
            setPath('/extream/instructor');
            setProfileRole(PROFILE_ROLE.INSTRUCTOR);
        } else if ((userRole === Role?.supplier && switchProRole === 'admin')) {
            setPath('/pro/admin');
            setProfileRole(PROFILE_ROLE.ADMIN);
        } else if ((userRole === Role?.supplier && switchProRole === 'user')) {
            setPath('/pro/user');
            setProfileRole(PROFILE_ROLE.USER);
        } else if ((userRole === Role?.consortium && !switchExtreamRole && !switchProRole)) {
            setPath('/consortium/');
            setProfileRole(PROFILE_ROLE.CONSORTIUM);
        } else if ((userRole === Role?.consortium && switchExtreamRole === 'admin')) {
            setPath('/extream/admin');
            setProfileRole(PROFILE_ROLE.ADMIN);
        } else if ((userRole === Role?.consortium && switchExtreamRole === 'instructor')) {
            setPath('/extream/instructor');
            setProfileRole(PROFILE_ROLE.INSTRUCTOR);
        } else if ((userRole === Role?.consortium && switchProRole === 'admin')) {
            setPath('/pro/admin');
            setProfileRole(PROFILE_ROLE.ADMIN);
        } else if ((userRole === Role?.consortium && switchProRole === 'user')) {
            setPath('/pro/user');
            setProfileRole(PROFILE_ROLE.USER);
        }
    }, [, router, switchRole]);

    const handleTicketModalClose = () => {
        setShowTicketModal(false);
        reset();
    };

    const onSubmit = (data) => {
        console.log('data', data)
        const formData = new FormData();
        formData.append("priority", data?.priority?.name);
        formData.append("description", data.description);
        formData.append("issueCategory", data?.issueCategory?.name);
        formData.append("issueType", data?.issueType?.name);
        formData.append("customerContact", data.customerContact);
        formData.append("file", data?.file !== undefined && data?.file[0]);

        setShowTicketModal(false);
        reset();
    };

    const handleSupportClick = () => {
        setShowTicketModal(true)
    }

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
                                    { role !== Role?.super &&
                                        <Tooltip title='Technical support' arrow>
                                            <IconButton
                                                onClick={ handleSupportClick }
                                                sx={ { marginRight: '10px' } }
                                            >
                                                <SupportAgentOutlinedIcon fontSize='medium' />
                                            </IconButton>
                                        </Tooltip>
                                    }
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
                <MenuItem className={ classes.profileMenuItem }>
                    <Avatar alt={ name } style={ {
                        width: '56px',
                        height: '56px',
                        background: '#68C886',
                        color: '#fff'
                    } }>
                        { name && name.charAt(0)?.toUpperCase() }
                    </Avatar>
                    <ListItemText
                        primary={ <EllipsisText value={ name } /> }
                        secondary={ <EllipsisText value={ email } /> }
                    />
                </MenuItem>
                <Divider className={ classes.divider } />
                { (router.pathname.split('/')[1] === 'extream' && role === Role?.admin && ((getItemSessionStorage('switchRole') === null || getItemSessionStorage('switchRole') === 'admin') || (getItemSessionStorage('switchRole') === null || getItemSessionStorage('switchRole') === 'instructor'))) &&
                    <>
                    <MenuItem className={ classes.menuItem } onClick={ (e) => switchToUser(e, router.pathname.split('/')[2] === Role?.admin ? 'instructor' : 'admin') }>
                        <ListItemIcon>
                            <SwitchAccountIcon />
                        </ListItemIcon>
                        <ListItemText
                            className={ classes.listItemText }
                            primary="Switch account"
                            secondary={ `Switch to ${router.pathname.split('/')[2] === Role?.admin ? 'instructor' : 'admin'}` }
                        />
                    </MenuItem>
                    <Divider className={ classes.divider } />
                    </>
                }
                { (router.pathname.split('/')[1] === 'pro' && role === Role?.proAdmin &&
                    ((getItemSessionStorage('switchRole') === null || getItemSessionStorage('switchRole') === 'lim-admin') || (getItemSessionStorage('switchRole') === null || getItemSessionStorage('switchRole') === 'lim-instructor'))) &&
                    <>
                    <MenuItem className={ classes.menuItem } onClick={ (e) => switchToProUser(e, router.pathname.split('/')[2] === Role?.admin ? 'lim-instructor' : 'lim-admin') }>
                        <ListItemIcon>
                            <SwitchAccountIcon />
                        </ListItemIcon>
                        <ListItemText
                            className={ classes.listItemText }
                            primary="Switch account"
                            secondary={ `Switch to ${router.pathname.split('/')[2] === Role?.admin ? 'user' : 'admin'}` }
                        />
                    </MenuItem>
                    <Divider className={ classes.divider } />
                    </>
                }

                { ((role === Role?.consortium) || (role === Role?.supplier)) &&
                    <>
                    <MenuItem className={ classes.menuItem } onClick={ () => setsubMenuAnchorEl(true) }
                        >
                            <ListItemIcon>
                                <SwitchAccountIcon />
                            </ListItemIcon>
                            <ListItemText
                            className={ classes.listItemText }
                                primary="Switch account"
                                secondary="Switch to other roles"
                            />
                        </MenuItem>
                    <Divider className={ classes.divider } />
                    </>
                }
                <MenuItem className={ classes.menuItem } onClick={ () => [router.push(`${path}/profile/accountinfo`), setAnchorEl(null)] }>
                    <ListItemIcon>
                        <AccountIcon />
                    </ListItemIcon>
                    <ListItemText className={ classes.listItemText } primary="Account info" secondary="Account details" />
                </MenuItem>
                <Divider className={ classes.divider } />

                { role !== Role?.supplier && role !== Role?.consortium &&
                    <>
                    <MenuItem className={ classes.menuItem } onClick={ () => [router.push(`${path}/profile/help`), setAnchorEl(null)] }>
                        <ListItemIcon>
                            <HelpIcon />
                        </ListItemIcon>
                        <ListItemText className={ classes.listItemText } primary="Help" secondary="PDF / Video" />
                    </MenuItem>
                    <Divider className={ classes.divider } />
                    </>
                }

                <MenuItem className={ classes.menuItem } onClick={ () => [router.push(`${path}/profile/changepassword`), setAnchorEl(null)] }>
                    <ListItemIcon>
                        <ChangePwdIcon />
                    </ListItemIcon>
                    <ListItemText className={ classes.listItemText } primary="Change password" secondary="Email" />
                </MenuItem>
                { Sso ?
                    <MenuItem className={ classes.ssoLogout } >
                        <Button variant="contained" fullWidth color="primary" onClick={ handleSsoLogout }>Log out</Button>
                    </MenuItem> :
                    <MenuItem className={ classes.ssoLogout } onClick={ handleLogout } >
                        <Button variant="contained" fullWidth color="primary" >Log out</Button>
                    </MenuItem>
                }

                <div style={ { textAlign: 'right', padding: '0px 15px' } }>
                    <SubTitle1 title="v.2.1.0" />
                </div>
            </Menu>
            {
                subMenuopen &&
                <DialogModal
                        headingTitle={ "Manage Accounts" }
                    isOpen={ subMenuopen }
                    fullWidth="sm"
                    maxWidth="sm"
                    handleClose={ handlesubMenuClose }
                >
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                    >
                            <Grid item xs={ 6 }>
                                <Typography variant="h5" sx={ { ml: 2 } }>
                                    Extreme
                                </Typography>
                                <Divider className={ classes.subMenuItem } />
                                <MenuItem onClick={ (e) => [switchToUser(e, Role?.admin), setsubMenuAnchorEl(null)] }>
                                    <ListItemIcon>
                                        <GroupsOutlinedIcon fontSize='large' />
                                    </ListItemIcon>
                                    <ListItemText
                                        className={ classes.listItemText }
                                        primary="Admin (Extreme)"
                                    />
                                </MenuItem>
                                <Divider className={ classes.divider } />
                                <MenuItem onClick={ (e) => [switchToUser(e, Role?.instructor), setsubMenuAnchorEl(null)] }>
                                    <ListItemIcon>
                                        <PermIdentityOutlinedIcon fontSize='large' />
                                    </ListItemIcon>
                                    <ListItemText
                                        className={ classes.listItemText }
                                        primary="Instructor (Extreme)"
                                    />
                                </MenuItem>
                                <Divider className={ classes.divider } />
                            </Grid>
                            <Grid item xs={ 6 }>
                                <Typography variant="h5" sx={ { ml: 2 } }>
                                    Pro
                                </Typography>
                                <Divider className={ classes.subMenuItem } />
                                <MenuItem onClick={ (e) => [switchToProUser(e, Role?.proAdmin), setsubMenuAnchorEl(null)] }>
                                    <ListItemIcon>
                                        <GroupsOutlinedIcon fontSize='large' />
                                    </ListItemIcon>
                                    <ListItemText
                                        className={ classes.listItemText }
                                        primary="Admin (Pro)"
                                    />
                                </MenuItem>
                                <Divider className={ classes.divider } />
                                <MenuItem onClick={ (e) => [switchToProUser(e, Role?.proUser), setsubMenuAnchorEl(null)] }>
                                    <ListItemIcon>
                                        <PermIdentityOutlinedIcon fontSize='large' />
                                    </ListItemIcon>
                                    <ListItemText
                                        className={ classes.listItemText }
                                        primary="User (Pro)"
                                    />
                                </MenuItem>
                                <Divider className={ classes.divider } />
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                        { (getItemSessionStorage('role') === Role?.consortium || getItemSessionStorage('role') === Role?.supplier) && (getItemSessionStorage('switchRole') !== null || getItemSessionStorage('switchProRole') !== null) &&
                                <MenuItem onClick={ (e) => [handleConsortium(e, getItemSessionStorage('role') === Role?.consortium ? Role?.consortium : Role?.supplier), setsubMenuAnchorEl(null)] }>
                                    <ListItemIcon>
                                        <WestOutlinedIcon fontSize='medium' />
                                    </ListItemIcon>
                                <ListItemText
                                        className={ classes.listItemText }
                                        primary={ `Back to ${getItemSessionStorage('role') === Role?.consortium ? "Consortium" : "Reseller"} Dashboard` }
                                />
                            </MenuItem>
                        }
                        </Grid>

                </DialogModal>
            }
            {
                showTicketModal &&
                <DialogModal
                    headingTitle={ "Ticket Management System" }
                    isOpen={ showTicketModal }
                    fullWidth="sm"
                    maxWidth="sm"
                    handleClose={ handleTicketModalClose }
                >
                    <form onSubmit={ handleSubmit(onSubmit) }>
                        <Grid container>
                            { FormJson?.map((field, i) => (
                                <Grid key={ field?.name } item md={ 12 } >
                                    <FormComponent
                                        key={ i }
                                        field={ field }
                                        control={ control }
                                    />
                                </Grid>
                            )) }
                        </Grid>
                    </form>
                </DialogModal>
            }
        </>
    );
};

const mapStateToProps = (state) => ({
    dashboardData: state?.adminDashboard?.data?.userProfileLite,
    instructorDashboardData: state?.instructorDashboard?.data?.userProfileLite,
    studentData: state?.studentClasses?.dashboardData?.userProfileLite,
});

export default connect(mapStateToProps, {})(NavBar);
