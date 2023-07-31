import {
    DashboardIcon,
    DashboardWhiteIcon,
    ClassIcon,
    ClassWhiteIcon
} from '../../assets/icon';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AddCardIcon from '@mui/icons-material/AddCard';


const SidebarSupplier = [
    {
        "icon": <DashboardIcon />,
        "activeIcon": <DashboardWhiteIcon />,
        "name": "Dashboard",
        "path": "/dashboard",
        "layout": "/supplier",
    },
    {
        "icon": <ClassIcon />,
        "activeIcon": <ClassWhiteIcon />,
        "name": "Extreme",
        "path": "/extreme",
        "layout": "/supplier",
    },
    {
        "icon": <CreditCardOutlinedIcon fontSize='small' />,
        "activeIcon": <CreditCardOutlinedIcon fontSize='small' />,
        "name": "Pro",
        "path": "/pro",
        "layout": "/supplier",
    },
    {
        "icon": <AddCardIcon fontSize='small' />,
        "activeIcon": <AddCardIcon fontSize='small' />,
        "name": "Customers",
        "path": "/customers",
        "layout": "/supplier",
    }
];

export default SidebarSupplier;