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
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';

const SidebarSuperAdmin = [
  {
    icon: <DashboardIcon />,
    activeIcon: <DashboardWhiteIcon />,
    name: 'Dashboard',
    path: '/dashboard',
    layout: '/super',
  },
  {
    icon: <ClassIcon />,
    activeIcon: <ClassWhiteIcon />,
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
    icon: <ClassIcon />,
    activeIcon: <ClassWhiteIcon />,
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
    icon: <SupportAgentOutlinedIcon />,
    activeIcon: <SupportAgentOutlinedIcon />,
    name: 'Ticket',
    path: '/ticket',
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
