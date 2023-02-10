import {
    ClassIcon,
    StudentIcon,
    StudentWhiteIcon,
    ClassWhiteIcon
} from '../../assets/icon';

const SidebarSupplier = [
    {
        "icon": <ClassIcon />,
        "activeIcon": <ClassWhiteIcon />,
        "name": "Extream Product",
        "path": "/extreamProduct",
        "layout": "/supplier",
    },
    {
        "icon": <StudentIcon />,
        "activeIcon": <StudentWhiteIcon />,
        "name": "Pro Product",
        "path": "/proProduct",
        "layout": "/supplier",
    }
];

export default SidebarSupplier;