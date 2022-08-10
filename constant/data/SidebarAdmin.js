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
} from '../../assets/icon';

const SidebarAdmin = [
    {
        "icon": <DashboardIcon />,
        "activeIcon": <DashboardWhiteIcon />,
        "name": "Dashboard",
        "path": "/dashboard",
        "layout": "/admin",
    },
    {
        "icon": <ClassIcon />,
        "activeIcon": <ClassWhiteIcon />,
        "name": "Instructors",
        "path": "/instructor",
        "layout": "/admin",
    },
    {
        "icon": <StudentIcon />,
        "activeIcon": <StudentWhiteIcon />,
        "name": "Students",
        "path": "/students",
        "layout": "/admin",
    },
    {
        "icon": <ReportIcon />,
        "activeIcon": <ReportWhiteIcon />,
        "name": "Reports",
        "path": "/reports",
        "layout": "/admin",
    },
    {
        "icon": <RepositoryIcon />,
        "activeIcon": <RepositoryWhiteIcon />,
        "name": "Repository",
        "path": "/repository",
        "pathList": ["/repository"],
        "layout": "/admin",
    },
    {
        "icon": <IntegrationIcon />,
        "activeIcon": <IntegrationWhiteIcon />,
        "name": "Integration",
        "path": "/integration",
        "layout": "/admin",
    }
];

export default SidebarAdmin;