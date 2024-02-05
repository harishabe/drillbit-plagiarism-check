import {
    DashboardIcon,
    ClassIcon,
    StudentIcon,
    StudentWhiteIcon,
    ReportIcon,
    DashboardWhiteIcon,
    ClassWhiteIcon,
    ReportWhiteIcon,
    RepositoryIcon,
    RepositoryWhiteIcon,
    SettingsIcon,
    SettingsWhiteIcon,
    IntegrationInstructionIcon,
    IntegrationInstructionWhiteIcon
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
        "icon": <IntegrationInstructionIcon />,
        "activeIcon": <IntegrationInstructionWhiteIcon />,
        "name": "Integrations",
        "path": "/integration",
        "layout": "/extream/admin",
    },
    // {
    //     "icon": <RepositoryIcon />,
    //     "activeIcon": <RepositoryWhiteIcon />,
    //     "name": "Ticket",
    //     "path": "/createticket",
    //     "pathList": ["/createticket"],
    //     "layout": "/extream/admin",
    // },
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