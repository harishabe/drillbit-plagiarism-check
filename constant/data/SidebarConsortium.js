import {
    DashboardIcon,
    DashboardWhiteIcon,
    ClassIcon,
    ClassWhiteIcon
} from '../../assets/icon';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import styled from 'styled-components';

const StyledCreditCardOutlinedIcon = styled(CreditCardOutlinedIcon)(() => ({
    fontSize: '22px',
    margin: '-3px'
}));

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
        "icon": <StyledCreditCardOutlinedIcon />,
        "activeIcon": <StyledCreditCardOutlinedIcon />,
        "name": "Pro",
        "path": "/pro",
        "layout": "/consortium",
    },
];

export default SidebarConsortium;