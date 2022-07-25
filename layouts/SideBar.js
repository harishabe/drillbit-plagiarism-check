import * as React from 'react';
import Link from "next/link";
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

import {
    SidebarAdmin,
    SidebarInstructor,
    SidebarStudent,
    SidebarSuperAdmin
} from '../constant/data';

const drawerWidth = 240;

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
        if (router.pathname === '/instructor/myclasstables' && name === 'My Classes') {
            return true;
        } else if (router.pathname === '/instructor/studentlist' && name === 'My Folders') {
            return true;
        } else {
            return router.route.indexOf(routeName) > -1 ? true : false;
        }
    }

    React.useEffect(() => {
        let role = localStorage.getItem('role');
        if (role === 'admin') {
            setSidebarItem(SidebarAdmin);
        } else if (role === 'instructor') {
            setSidebarItem(SidebarInstructor);
        } else if (role === 'student') {
            setSidebarItem(SidebarStudent);
        } else if (role === 'drillbit') {
            setSidebarItem(SidebarSuperAdmin);
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
                                    <Link href={text.layout + text.path} key={key}>
                                        <a>
                                            <ListItemButton
                                                style={{ margin: '10px 15px 0', borderRadius: '4px' }}
                                                className={whiteFontClasses}
                                                key={text}
                                                sx={{
                                                    minHeight: 58,
                                                    justifyContent: open ? 'initial' : 'center',
                                                    px: 2.5,
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