import {
    DashboardIcon,
    ClassIcon,
    IntegrationIcon,
    ReportIcon,
    DashboardWhiteIcon,
    ClassWhiteIcon,
    ReportWhiteIcon,
    IntegrationWhiteIcon,
    RepositoryIcon,
    RepositoryWhiteIcon,
} from '../../assets/icon';

const SidebarProAdmin = [
    {
        "icon": <DashboardIcon />,
        "activeIcon": <DashboardWhiteIcon />,
        "name": "Dashboard",
        "path": "/dashboard",
        "layout": "/pro/admin",
    },
    {
        "icon": <ClassIcon />,
        "activeIcon": <ClassWhiteIcon />,
        "name": "Users",
        "path": "/users",
        "layout": "/pro/admin",
    },
    {
        "icon": <ReportIcon />,
        "activeIcon": <ReportWhiteIcon />,
        "name": "Reports",
        "path": "/reports",
        "layout": "/pro/admin",
    },
    {
        "icon": <RepositoryIcon />,
        "activeIcon": <RepositoryWhiteIcon />,
        "name": "Repository",
        "path": "/repository",
        "pathList": ["/repository"],
        "layout": "/pro/admin",
    },
    {
        "icon": <IntegrationIcon />,
        "activeIcon": <IntegrationWhiteIcon />,
        "name": "Integrations",
        "path": "/integration",
        "layout": "/pro/admin",
    },
    {
        "icon": <IntegrationIcon />,
        "activeIcon": <IntegrationWhiteIcon />,
        "name": "Settings",
        "path": "/settings",
        "pathList": ["/settings"],
        "layout": "/pro/admin",
    },
    {
        "icon": <IntegrationIcon />,
        "activeIcon": <IntegrationWhiteIcon />,
        "name": "Announcement",
        "path": "/announcements",
        "pathList": ["/announcements"],
        "layout": "/pro/admin",
    },
];

export default SidebarProAdmin;