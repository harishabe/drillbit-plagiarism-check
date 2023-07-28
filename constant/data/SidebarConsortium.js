import {
    DashboardIcon,
    DashboardWhiteIcon,
    ClassIcon,
    ClassWhiteIcon
} from '../../assets/icon';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';

const SidebarConsortium = [
    {
        "icon": <DashboardIcon />,
        "activeIcon": <DashboardWhiteIcon />,
        "name": "Dashboard",
        "path": "/dashboard",
        "layout": "/consortium",
    },
    {
        "icon": <ClassIcon />,
        "activeIcon": <ClassWhiteIcon />,
        "name": "Extreme",
        "path": "/extreme",
        "layout": "/consortium",
    },
    {
        "icon": <CreditCardOutlinedIcon fontSize='small' />,
        "activeIcon": <CreditCardOutlinedIcon fontSize='small' />,
        "name": "Pro",
        "path": "/pro",
        "layout": "/consortium",
    },
];

export default SidebarConsortium;