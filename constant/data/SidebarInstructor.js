import {
    DashboardIcon,
    ClassIcon,
    FolderIcon,
    FolderWhiteIcon,
    DashboardWhiteIcon,
    ClassWhiteIcon,
    IntegrationWhiteIcon,
    RepositoryIcon,
    RepositoryWhiteIcon,
    CompareDocIcon,
    SettingsIcon,
    SettingsWhiteIcon
} from '../../assets/icon';

const SidebarInstructor = [
    {
        "icon": <DashboardIcon />,
        "activeIcon": <DashboardWhiteIcon />,
        "name": "Dashboard",
        "path": "/dashboard",
        "pathList": ["/dashboard"],
        "layout": "/extream/instructor",
    },
    {
        "icon": <ClassIcon />,
        "activeIcon": <ClassWhiteIcon />,
        "name": "My Classes",
        "path": "/myclasses",
        "pathList": ["/myclasses", "/my-assignment"],
        "layout": "/extream/instructor",
    },
    {
        "icon": <FolderIcon />,
        "activeIcon": <FolderWhiteIcon />,
        "name": "My Folders",
        "path": "/myfolder",
        "pathList": ["/myfolder"],
        "layout": "/extream/instructor",
    },
    {
        "icon": <RepositoryIcon />,
        "activeIcon": <RepositoryWhiteIcon />,
        "name": "Repository",
        "path": "/repository",
        "pathList": ["/repository"],
        "layout": "/extream/instructor",
    },
    {
        "icon": <SettingsIcon />,
        "activeIcon": <SettingsWhiteIcon />,
        "name": "Settings",
        "path": "/settings",
        "pathList": ["/settings"],
        "layout": "/extream/instructor",
    },
    // {
    //     "icon": <CompareDocIcon />,
    //     "activeIcon": <IntegrationWhiteIcon />,
    //     "name": "Compare Doc",
    //     "path": "/comparedoc",
    //     "pathList": ["/comparedoc"],
    //     "layout": "/instructor",
    // }
    // {
    //     "icon": <RepositoryIcon />,
    //     "activeIcon": <RepositoryWhiteIcon />,
    //     "name": "Ticket",
    //     "path": "/createticket",
    //     "pathList": ["/createticket"],
    //     "layout": "/extream/instructor",
    // }
];

export default SidebarInstructor;