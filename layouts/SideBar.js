import * as React from 'react';
import Link from "next/link";
import Tooltip from '@mui/material/Tooltip';
import classNames from "classnames";
import Hidden from '@mui/material/Hidden';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { useRouter } from "next/router";
import ListItemIcon from '@mui/material/ListItemIcon';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { DrillBitLogo, DrillBitSymbolLogo } from '../assets/icon';
import { Role } from '../constant/data';
import {
    SidebarAdmin,
    SidebarInstructor,
    SidebarStudent,
    SidebarSuperAdmin,
    SidebarProAdmin,
    SidebarProUser,
    SidebarSupplier,
    SidebarConsortium,
} from '../constant/data';
import { getItemSessionStorage } from '../utils/RegExp'

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
    activeClass: {
        backgroundColor: '#014dfa !important',
        color: '#fff !important',
    },
    white: {
        color: '#fff !important'
    },
    menuClass: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: '24px',
        fontStyle: 'normal',
        color: '#666',
        letterSpacing: '0.5px'
    },
    logoSymbol: {
        width: '125px'
    },
    shadow: {
        boxShadow: '0 3px 6px rgb(0 0 0 / 9%), 0 3px 6px rgb(0 0 0 / 19%)'
    }
}));

const StyledList = styled(List)({
    '& .MuiListItemButton-root:hover': {
        transform: 'scale(1.06)',
        transition: 'all 0.3s ease-out',
        borderRadius: 'none !important',
        borderBottom: '2px solid #014dfa'
    },
});

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const SideBar = ({ open }) => {

    const classes = useStyles();
    const [sidebarItem, setSidebarItem] = React.useState();
    const router = useRouter();

    function activeRoute(routeName, name) {
        if (router.pathname === '/extream/instructor/my-assignment' && name === 'My Classes') {
            return true;
        } else if (router.pathname === '/extream/instructor/folderSubmission' && name === 'My Folders') {
            return true;
        } else if (router.pathname === '/extream/instructor/uploadFileFolderSubmission' && name === 'My Folders') {
            return true;
        } else if (router.pathname === '/extream/instructor/addBulkStudent' && name === 'My Classes') {
            return true;
        } else if (router.pathname === '/extream/admin/addBulkInstructor' && name === 'Instructors') {
            return true;
        } else if (router.pathname === '/extream/instructor/mysubmissions' && name === 'My Classes') {
            return true;
        } else if (router.pathname === '/extream/instructor/uploadFile' && name === 'My Classes') {
            return true;
        } else if (router.pathname === '/extream/student/myassignments' && name === 'My Classes') {
            return true;
        } else if (router.pathname === '/extream/student/myassignment-details' && name === 'My Classes') {
            return true;
        } else if (router.pathname === '/extream/admin/uploadFileRepository' && name === 'Repository') {
            return true;
        } else if (router.pathname === '/extream/instructor/uploadFileRepository' && name === 'Repository') {
            return true;
        } else if (router.pathname === '/pro/user/folderSubmission' && name === 'My Folders') {
            return true;
        } else if (router.pathname === '/pro/user/uploadFile/englishFile' && name === 'My Folders') {
            return true;
        } else if (router.pathname === '/pro/user/uploadFile/nonEnglishFile' && name === 'My Folders') {
            return true;
        } else if (router.pathname === '/pro/user/uploadFile/regionalFile' && name === 'My Folders') {
            return true;
        } else if (router.pathname === '/pro/user/uploadFile/nonEnglishFile' && name === 'My Folders') {
            return true;
        } else if (router.pathname === '/pro/user/uploadFileRepository' && name === 'Repository') {
            return true;
        } else if (router.pathname === '/pro/admin/uploadFileRepository' && name === 'Repository') {
            return true;
        } else if (router.pathname === '/pro/admin/addBulkUser' && name === 'Users') {
            return true;
        } else if (router.pathname === '/extream/instructor/uploadFile/nonEnglishFile' && name === 'My Classes') {
            return true;
        } else if (router.pathname === '/extream/instructor/uploadFile/englishFile' && name === 'My Classes') {
            return true;
        } else if (router.pathname === '/extream/student/uploadFile/englishFile' && name === 'My Classes') {
            return true;
        } else if (router.pathname === '/extream/student/uploadFile/nonEnglishFile' && name === 'My Classes') {
            return true;
        } else if (router.pathname === '/extream/instructor/uploadFileFolder' && name === 'My Classes') {
            return true;
        } else if (router.pathname === '/extream/instructor/uploadFileFolder/englishFile' && name === 'My Folders') {
            return true;
        } else if (router.pathname === '/extream/instructor/uploadFileFolder/nonEnglishFile' && name === 'My Folders') {
            return true;
        } else if (router.pathname === '/super/proUser' && name === 'Pro') {
            return true;
        } else if (router.pathname === '/super/extremeInstructor' && name === 'Extreme') {
            return true;
        } else if (router.pathname === '/super/resellerExtreme' && name === 'Reseller') {
            return true;
        } else if (router.pathname === '/supplier/profile/accountinfo') {
            return false;
        } else if (router.pathname === '/consortium/profile/accountinfo') {
            return false;
        } else if (router.pathname === '/supplier/profile/changepassword') {
            return false;
        } else if (router.pathname === '/consortium/profile/changepassword') {
            return false;
        } else {
            return router.route.indexOf(routeName) > -1 ? true : false;
        }
    }

    React.useEffect(() => {
        let role = getItemSessionStorage('role');
        if (role === 'admin' && router.pathname.split('/')[1] === 'extream' && router.pathname.split('/')[2] === Role?.admin) {
            setSidebarItem(SidebarAdmin);
        } else if (role === 'admin' && router.pathname.split('/')[1] === 'extream' && router.pathname.split('/')[2] === Role?.instructor) {
            setSidebarItem(SidebarInstructor);
        } else if (role === 'admin') {
            setSidebarItem(SidebarAdmin);
        } else if (role === 'instructor') {
            setSidebarItem(SidebarInstructor);
        } else if (role === 'student') {
            setSidebarItem(SidebarStudent);
        } else if (role === 'drillbit') {
            setSidebarItem(SidebarSuperAdmin);
        } else if (role === 'lim-admin' && router.pathname.split('/')[1] === 'pro' && router.pathname.split('/')[2] === 'admin') {
            setSidebarItem(SidebarProAdmin);
        } else if (role === 'lim-admin' && router.pathname.split('/')[1] === 'pro' && router.pathname.split('/')[2] === 'user') {
            setSidebarItem(SidebarProUser);
        } else if (role === 'lim-instructor' && router.pathname.split('/')[1] === 'pro' && router.pathname.split('/')[2] === 'user') {
            setSidebarItem(SidebarProUser);
        } else if (role === 'reseller') {
            setSidebarItem(SidebarSupplier);
        } else if (role === 'consortium') {
            setSidebarItem(SidebarConsortium);
        }
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box className={classes.shadow}>
                <Hidden mdDown implementation="css">
                    <Drawer variant="permanent" open={open}>
                        <DrawerHeader>
                            {open ? <DrillBitLogo /> : <div className={classes.logoSymbol}><DrillBitSymbolLogo /></div>}
                        </DrawerHeader>
                        <List>
                            {sidebarItem?.map((text, key) => {
                                let active = activeRoute(text.layout + text.path, text.name);
                                const whiteFontClasses = classNames({
                                    [" " + classes.activeClass]:
                                        activeRoute(text.layout + text.path, text.name)
                                });
                                return (
                                    <Tooltip title={!open ? text.name : ''} arrow>
                                        <StyledList>
                                            <Link href={text.layout + text.path} key={text.name}>
                                                <a className={classes.link} >
                                                    <ListItemButton
                                                        style={{ margin: '10px 15px 0', borderRadius: '4px' }}
                                                        className={whiteFontClasses}
                                                        sx={{
                                                            minHeight: 58,
                                                            justifyContent: open ? 'initial' : 'center',
                                                            px: 2.5
                                                        }}
                                                    >
                                                        <ListItemIcon
                                                            className={whiteFontClasses}
                                                            sx={{
                                                                minWidth: 0,
                                                                mr: open ? 3 : 'auto',
                                                                justifyContent: 'center',
                                                            }}
                                                        >
                                                            {active ? text.activeIcon : text.icon}
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={text.name}
                                                            className={classNames(classes.menuClass, whiteFontClasses)}
                                                            sx={{ opacity: open ? 1 : 0 }}
                                                        />
                                                    </ListItemButton>
                                                </a>
                                            </Link>
                                        </StyledList>
                                    </Tooltip>
                                );
                            })}
                        </List>
                    </Drawer>
                </Hidden>
            </Box>
        </Box>
    );
}

export default SideBar;