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
    name: 'Super Admin',
    path: '/myclasses',
    layout: '/super',
  },
];

export default SidebarSuperAdmin;
