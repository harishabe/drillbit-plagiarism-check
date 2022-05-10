import {
    DashboardIcon,
    ClassIcon,
    FolderIcon,
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
        "layout": "/instructor",
    },
    {
        "icon": <ClassIcon />,
        "activeIcon": <ClassWhiteIcon />,
        "name": "My Classes",
        "path": "/myclasses",   
        "layout": "/instructor",
    },
    {
        "icon": <FolderIcon />,
        "name": "My Folders",
        "path": "/myfolder",
        "layout": "/instructor",
    },
    {
        "icon": <RepositoryIcon />,
        "activeIcon": <RepositoryWhiteIcon />,
        "name": "Repository",
        "path": "/repository",
        "layout": "/instructor",
    },
    {
        "icon": <CompareDocIcon />,
        "activeIcon": <IntegrationWhiteIcon />,
        "name": "Compare Doc",
        "path": "/comparedoc",
        "layout": "/instructor",
    }
];

export default SidebarInstructor;