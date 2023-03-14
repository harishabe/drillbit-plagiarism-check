import {
    DashboardIcon,
    DashboardWhiteIcon,
    ClassIcon,
    ClassWhiteIcon
} from '../../assets/icon';

const SidebarSupplier = [
    {
        "icon": <DashboardIcon />,
        "activeIcon": <DashboardWhiteIcon />,
        "name": "Dashboard",
        "path": "/dashboard",
        "layout": "/supplier",
    },
    {
        "icon": <ClassIcon />,
        "activeIcon": <ClassWhiteIcon />,
        "name": "Extreme",
        "path": "/extreme",
        "layout": "/supplier",
    },
    {
        "icon": <ClassIcon />,
        "activeIcon": <ClassWhiteIcon />,
        "name": "Pro",
        "path": "/pro",
        "layout": "/supplier",
    },
    {
        "icon": <ClassIcon />,
        "activeIcon": <ClassWhiteIcon />,
        "name": "Customers",
        "path": "/customers",
        "layout": "/supplier",
    }
];

export default SidebarSupplier;