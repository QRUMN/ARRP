import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Container,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

const menuItems = [
  { text: 'Home', icon: HomeIcon, path: '/' },
  { text: 'Services', icon: BuildIcon, path: '/services' },
  { text: 'About', icon: InfoIcon, path: '/about' },
  { text: 'Contact', icon: ContactSupportIcon, path: '/contact' },
];

const Navbar = () => {
  const theme = useTheme();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(33, 150, 243, 0.08)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(33, 150, 243, 0.04)',
                },
              }}
            >
              <ListItemIcon>
                <item.icon 
                  sx={{ 
                    color: location.pathname === item.path ? 
                      theme.palette.primary.main : 
                      theme.palette.text.secondary 
                  }} 
                />
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{
                  color: location.pathname === item.path ? 
                    theme.palette.primary.main : 
                    theme.palette.text.primary
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="sticky" color="inherit">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              color: theme.palette.primary.main,
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            RoofPro
          </Typography>

          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="account"
            component={RouterLink}
            to="/profile"
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
