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
        "layout": "/extream/student",
    },
    {
        "icon": <ClassIcon />,
        "activeIcon": <ClassWhiteIcon />,
        "name": "My Classes",
        "path": "/myclasses",
        "layout": "/extream/student",
    }
];

export default SidebarStudent;