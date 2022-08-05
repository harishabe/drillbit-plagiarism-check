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
    CompareDocIcon
} from '../../assets/icon';

const SidebarInstructor = [
    {
        "icon": <DashboardIcon />,
        "activeIcon": <DashboardWhiteIcon />,
        "name": "Dashboard",
        "path": "/dashboard",
        "pathList": ["/dashboard"],
        "layout": "/instructor",
    },
    {
        "icon": <ClassIcon />,
        "activeIcon": <ClassWhiteIcon />,
        "name": "My Classes",
        "path": "/myclasses",
        "pathList": ["/myclasses", "/my-assignment"],
        "layout": "/instructor",
    },
    {
        "icon": <FolderIcon />,
        "activeIcon": <FolderWhiteIcon />,
        "name": "My Folders",
        "path": "/myfolder",
        "pathList": ["/myfolder"],
        "layout": "/instructor",
    },
    {
        "icon": <RepositoryIcon />,
        "activeIcon": <RepositoryWhiteIcon />,
        "name": "Repository",
        "path": "/repository",
        "pathList": ["/repository"],
        "layout": "/instructor",
    },
    // {
    //     "icon": <CompareDocIcon />,
    //     "activeIcon": <IntegrationWhiteIcon />,
    //     "name": "Compare Doc",
    //     "path": "/comparedoc",
    //     "pathList": ["/comparedoc"],
    //     "layout": "/instructor",
    // }
];

export default SidebarInstructor;