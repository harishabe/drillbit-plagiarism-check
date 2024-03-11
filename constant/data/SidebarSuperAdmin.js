import {
  DashboardIcon,
  ClassIcon,
  DashboardWhiteIcon,
  ClassWhiteIcon,
  ReportIcon,
  ReportWhiteIcon,
  IntegrationIcon,
  IntegrationWhiteIcon,
  RepositoryIcon,
  RepositoryWhiteIcon
} from '../../assets/icon';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import PaymentIcon from '@mui/icons-material/Payment';
import styled from 'styled-components';

const StyledCreditCardOutlinedIcon = styled(CreditCardOutlinedIcon)(() => ({
  fontSize: '22px',
  marginLeft: '-3px'
}));

const StyledPaymentIcon = styled(PaymentIcon)(() => ({
  fontSize: '22px',
  margin: '-3px'
}));

const SidebarSuperAdmin = [
  {
    icon: <DashboardIcon />,
    activeIcon: <DashboardWhiteIcon />,
    name: 'Dashboard',
    path: '/dashboard',
    layout: '/super',
  },
  {
    icon: <StyledCreditCardOutlinedIcon />,
    activeIcon: <StyledCreditCardOutlinedIcon />,
    name: 'Pro',
    path: '/refproduct',
    layout: '/super',
  },
  {
    icon: <ClassIcon />,
    activeIcon: <ClassWhiteIcon />,
    name: 'Extreme',
    path: '/extremproduct',
    layout: '/super',
  },
  {
    icon: <StyledPaymentIcon />,
    activeIcon: <StyledPaymentIcon />,
    name: 'Reseller',
    path: '/resellerproduct',
    layout: '/super',
  },
  {
    icon: <ReportIcon />,
    activeIcon: <ReportWhiteIcon />,
    name: 'Reports',
    path: '/reports',
    layout: '/super',
  },
  {
    icon: <RepositoryIcon />,
    activeIcon: <RepositoryWhiteIcon />,
    name: 'Repository',
    path: '/repository',
    layout: '/super',
  },
  {
    "icon": <RepositoryIcon/>,
    "activeIcon": <RepositoryWhiteIcon />,
    "name": "Ticket",
    "path": "/createticket",
    "pathList": ["/createticket"],
    "layout": "/super",
},
  {
    icon: <IntegrationIcon />,
    activeIcon: <IntegrationWhiteIcon />,
    name: 'Settings',
    path: '/settings',
    layout: '/super',
  },
];

export default SidebarSuperAdmin;
