import {
    DashboardIcon,
    ClassIcon,
    DashboardWhiteIcon,
    ClassWhiteIcon
} from '../../assets/icon';

const SidebarStudent = [
    {
        "icon": <DashboardIcon />,
        "activeIcon": <DashboardWhiteIcon />,
        "name": "Dashboard",
        "path": "/dashboard",
        "layout": "/student",
    },
    {
        "icon": <ClassIcon />,
        "activeIcon": <ClassWhiteIcon />,
        "name": "My Classes",
        "path": "/myclasses",
        "layout": "/student",
    }
];

export default SidebarStudent;