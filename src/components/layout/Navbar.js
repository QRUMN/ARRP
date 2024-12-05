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
  Tooltip,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import InfoIcon from '@mui/icons-material/Info';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeMode } from '../../contexts/ThemeContext';

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
  const { darkMode, toggleDarkMode } = useThemeMode();

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
    <AppBar 
      position="sticky" 
      color="inherit" 
      sx={{
        backdropFilter: 'blur(20px)',
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(0, 0, 0, 0.8)' 
          : 'rgba(255, 255, 255, 0.8)',
      }}
    >
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

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title={darkMode ? 'Light mode' : 'Dark mode'}>
              <IconButton
                size="large"
                color="inherit"
                onClick={toggleDarkMode}
                sx={{ mr: 1 }}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
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
          </Box>
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
