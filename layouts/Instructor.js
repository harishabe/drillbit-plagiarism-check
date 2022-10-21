import * as React from 'react';
import { styled } from '@mui/material/styles';
import Hidden from '@mui/material/Hidden';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import NavBar from '../components/navbar/navbar';
import SideBar from './SideBar';
import MobileMenu from './MobileMenu';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Instructor = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SideBar open={open} />
      <NavBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <Box
        component='main'
        sx={{ flexGrow: 1, p: 2 }}
        style={{ background: '#E5E5E5' }}
      >
        <Hidden mdDown implementation='css'>
          <DrawerHeader />
        </Hidden>
        <Hidden mdUp implementation='css'>
          <MobileMenu />
        </Hidden>
        {children}
      </Box>
    </Box>
  );
};

export default Instructor;
