import {
  DashboardIcon,
  ClassIcon,
  DashboardWhiteIcon,
  ClassWhiteIcon,
} from '../../assets/icon';

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
    name: 'Reports',
    path: '/reports',
    layout: '/super',
  },
  {
    icon: <ClassIcon />,
    activeIcon: <ClassWhiteIcon />,
    name: 'Settings',
    path: '/settings',
    layout: '/super',
  },
];

export default SidebarSuperAdmin;
