import {
    DashboardIcon,
    DashboardWhiteIcon,
    ClassIcon,
    ClassWhiteIcon
} from '../../assets/icon';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import AddCardIcon from '@mui/icons-material/AddCard';
import styled from 'styled-components';

const StyledCreditCardOutlinedIcon = styled(CreditCardOutlinedIcon)(() => ({
    fontSize: '22px',
    margin: '0px'
}));

const StyledAddCardIcon = styled(AddCardIcon)(() => ({
    fontSize: '22px',
    margin: '0px'
}));

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
        "icon": <StyledCreditCardOutlinedIcon />,
        "activeIcon": <StyledCreditCardOutlinedIcon />,
        "name": "Pro",
        "path": "/pro",
        "layout": "/supplier",
    },
    {
        "icon": <StyledAddCardIcon />,
        "activeIcon": <StyledAddCardIcon />,
        "name": "Customers",
        "path": "/customers",
        "layout": "/supplier",
    }
];

export default SidebarSupplier;