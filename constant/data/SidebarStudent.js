import {
    DashboardIcon,
    ClassIcon,
    DashboardWhiteIcon,
    ClassWhiteIcon,
    RepositoryIcon,
    RepositoryWhiteIcon,
    SettingsIcon,
    SettingsWhiteIcon
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
    },
    {
        "icon": <RepositoryIcon />,
        "activeIcon": <RepositoryWhiteIcon />,
        "name": "Ticket",
        "path": "/createticket",
        "pathList": ["/createticket"],
        "layout": "/extream/student",
    },
    {
        "icon": <SettingsIcon />,
        "activeIcon": <SettingsWhiteIcon />,
        "name": "Settings",
        "path": "/settings",
        "pathList": ["/settings"],
        "layout": "/extream/student",
    },
];

export default SidebarStudent;