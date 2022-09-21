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
    name: 'Ref Product',
    path: '/refproduct',
    layout: '/super',
  },
  {
    icon: <ClassIcon />,
    activeIcon: <ClassWhiteIcon />,
    name: 'Extrem Product',
    path: '/extremproduct',
    layout: '/super',
  },
  {
    icon: <ClassIcon />,
    activeIcon: <ClassWhiteIcon />,
    name: 'Reports',
    path: '/report',
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
