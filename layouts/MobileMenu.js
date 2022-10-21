import * as React from 'react';
import classNames from "classnames";
import { makeStyles } from '@mui/styles';
import { useRouter } from "next/router";
import Link from "next/link";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import {
    ToggleBarIcon
} from '../assets/icon';
import {
    SidebarAdmin,
    SidebarInstructor,
    SidebarStudent
} from '../constant/data';


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

}));

const MobileMenu = () => {

    const classes = useStyles();

    const router = useRouter();

    const [state, setState] = React.useState({
        right: false,
    });

    const [sidebarItem, setSidebarItem] = React.useState();

    function activeRoute(routeName) {
        return router.route.indexOf(routeName) > -1 ? true : false;
    }

    React.useEffect(() => {
        let role = sessionStorage.getItem('role');
        if (role === 'admin') {
            setSidebarItem(SidebarAdmin);
        } else if (role === 'instructor') {
            setSidebarItem(SidebarInstructor);
        } else if (role === 'student') {
            setSidebarItem(SidebarStudent);
        }
    }, [])

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {sidebarItem?.map((text, key) => {
                    let active = activeRoute(text.layout + text.path);
                    const whiteFontClasses = classNames({
                        [" " + classes.activeClass]:
                            activeRoute(text.layout + text.path)
                    });
                    return (
                        <Link href={text.layout + text.path} key={key}>
                            <a>
                                <ListItemButton style={{ margin: '10px 15px 0', borderRadius: '4px' }}
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
            <Divider />
        </Box>
    );

    return (
        <Box
            display="flex"
            justifyContent="right"
            alignItems="right"
        >
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <IconButton
                        onClick={toggleDrawer(anchor, true)}
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                    >
                        <ToggleBarIcon />
                    </IconButton>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </Box>
    );
}

export default MobileMenu;