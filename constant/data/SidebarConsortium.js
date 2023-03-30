import {
    DashboardIcon,
    DashboardWhiteIcon,
    ClassIcon,
    ClassWhiteIcon
} from '../../assets/icon';

const SidebarConsortium = [
    {
        "icon": <DashboardIcon />,
        "activeIcon": <DashboardWhiteIcon />,
        "name": "Dashboard",
        "path": "/dashboard",
        "layout": "/consortium",
    },
    {
        "icon": <ClassIcon />,
        "activeIcon": <ClassWhiteIcon />,
        "name": "Extreme",
        "path": "/extreme",
        "layout": "/consortium",
    },
    {
        "icon": <ClassIcon />,
        "activeIcon": <ClassWhiteIcon />,
        "name": "Pro",
        "path": "/pro",
        "layout": "/consortium",
    },
];

export default SidebarConsortium;