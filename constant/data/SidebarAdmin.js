import {
    DashboardIcon,
    ClassIcon,
    StudentIcon,
    StudentWhiteIcon,
    IntegrationIcon,
    ReportIcon,
    DashboardWhiteIcon,
    ClassWhiteIcon,
    ReportWhiteIcon,
    IntegrationWhiteIcon,
    RepositoryIcon,
    RepositoryWhiteIcon,
    SettingsIcon,
    SettingsWhiteIcon
} from '../../assets/icon';

const SidebarAdmin = [
    {
        "icon": <DashboardIcon />,
        "activeIcon": <DashboardWhiteIcon />,
        "name": "Dashboard",
        "path": "/dashboard",
        "layout": "/extream/admin",
    },
    {
        "icon": <ClassIcon />,
        "activeIcon": <ClassWhiteIcon />,
        "name": "Instructors",
        "path": "/instructor",
        "layout": "/extream/admin",
    },
    {
        "icon": <StudentIcon />,
        "activeIcon": <StudentWhiteIcon />,
        "name": "Students",
        "path": "/students",
        "layout": "/extream/admin",
    },
    {
        "icon": <ReportIcon />,
        "activeIcon": <ReportWhiteIcon />,
        "name": "Reports",
        "path": "/reports",
        "layout": "/extream/admin",
    },
    {
        "icon": <RepositoryIcon />,
        "activeIcon": <RepositoryWhiteIcon />,
        "name": "Repository",
        "path": "/repository",
        "pathList": ["/repository"],
        "layout": "/extream/admin",
    },
    {
        "icon": <IntegrationIcon />,
        "activeIcon": <IntegrationWhiteIcon />,
        "name": "Integrations",
        "path": "/integration",
        "layout": "/extream/admin",
    },
    {
        "icon": <SettingsIcon />,
        "activeIcon": <SettingsWhiteIcon />,
        "name": "Settings",
        "path": "/settings",
        "pathList": ["/settings"],
        "layout": "/extream/admin",
    },
];

export default SidebarAdmin;