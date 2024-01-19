import {
    DashboardIcon,
    ClassIcon,
    DashboardWhiteIcon,
    ClassWhiteIcon,
    SettingsIcon,
    SettingsWhiteIcon,
    RepositoryIcon,
    RepositoryWhiteIcon,
    IntegrationIcon,
    IntegrationWhiteIcon
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
        "icon": <IntegrationIcon />,
        "activeIcon": <IntegrationWhiteIcon />,
        "name": "Settings",
        "path": "/settings",
        "pathList": ["/settings"],
        "layout": "/extream/student",
    },
    {
        "icon": <IntegrationIcon />,
        "activeIcon": <IntegrationWhiteIcon />,
        "name": "Announcements",
        "path": "/announcements",
        "pathList": ["/announcements"],
        "layout": "/extream/student",
    },
];

export default SidebarStudent;