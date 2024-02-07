import {
    DashboardIcon,
    FolderIcon,
    FolderWhiteIcon,
    DashboardWhiteIcon,
    RepositoryIcon,
    RepositoryWhiteIcon,
    SettingsIcon,
    SettingsWhiteIcon
} from '../../assets/icon';

const SidebarProUser = [
    {
        "icon": <DashboardIcon />,
        "activeIcon": <DashboardWhiteIcon />,
        "name": "Dashboard",
        "path": "/dashboard",
        "pathList": ["/dashboard"],
        "layout": "/pro/user",
    },
    {
        "icon": <FolderIcon />,
        "activeIcon": <FolderWhiteIcon />,
        "name": "My Folders",
        "path": "/myfolder",
        "pathList": ["/myfolder"],
        "layout": "/pro/user",
    },
    {
        "icon": <RepositoryIcon />,
        "activeIcon": <RepositoryWhiteIcon />,
        "name": "Repository",
        "path": "/repository",
        "pathList": ["/repository"],
        "layout": "/pro/user",
    },
    // {
    //     "icon": <RepositoryIcon/>,
    //     "activeIcon": <RepositoryWhiteIcon />,
    //     "name": "Ticket",
    //     "path": "/createticket",
    //     "pathList": ["/createticket"],
    //     "layout": "/pro/user",
    // },
    {
        "icon": <SettingsIcon />,
        "activeIcon": <SettingsWhiteIcon />,
        "name": "Settings",
        "path": "/settings",
        "pathList": ["/settings"],
        "layout": "/pro/user",
    },
];

export default SidebarProUser;