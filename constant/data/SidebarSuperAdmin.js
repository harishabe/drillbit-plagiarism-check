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

const SidebarSuperAdmin = [
  {
    icon: <DashboardIcon />,
    activeIcon: <DashboardWhiteIcon />,
    name: 'Dashboard',
    path: '/dashboard',
    layout: '/super',
  },
  {
    icon: <CreditCardOutlinedIcon fontSize='small' />,
    activeIcon: <CreditCardOutlinedIcon fontSize='small' />,
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
    icon: <PaymentIcon fontSize='small' />,
    activeIcon: <PaymentIcon fontSize='small' />,
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
    icon: <IntegrationIcon />,
    activeIcon: <IntegrationWhiteIcon />,
    name: 'Settings',
    path: '/settings',
    layout: '/super',
  },
];

export default SidebarSuperAdmin;
