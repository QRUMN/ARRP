import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  IconButton,
  useTheme,
  Avatar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const ActionCard = ({ icon: Icon, title, to, primary }) => {
  const theme = useTheme();
  return (
    <Card
      component={RouterLink}
      to={to}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        color: 'inherit',
        backgroundColor: primary ? theme.palette.primary.main : theme.palette.background.paper,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <Icon 
        sx={{ 
          fontSize: 40, 
          mb: 1,
          color: primary ? 'white' : theme.palette.primary.main 
        }} 
      />
      <Typography 
        variant="h6" 
        align="center"
        sx={{ 
          color: primary ? 'white' : theme.palette.text.primary,
          fontWeight: 600
        }}
      >
        {title}
      </Typography>
    </Card>
  );
};

const QuickAction = ({ icon: Icon, label }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Avatar
        sx={{
          bgcolor: theme.palette.background.paper,
          color: theme.palette.primary.main,
          width: 56,
          height: 56,
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Icon />
      </Avatar>
      <Typography variant="body2" color="text.secondary" align="center">
        {label}
      </Typography>
    </Box>
  );
};

const Home = () => {
  const theme = useTheme();

  const quickActions = [
    { icon: AddIcon, label: 'New', to: '/new-inspection' },
    { icon: HistoryIcon, label: 'History', to: '/history' },
    { icon: SearchIcon, label: 'Search', to: '/search' },
    { icon: NotificationsIcon, label: 'Alerts', to: '/alerts' },
  ];

  return (
    <Box sx={{ pb: 8, bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Box 
        sx={{ 
          pt: 3, 
          pb: 4, 
          px: 2,
          background: 'linear-gradient(180deg, rgba(33,150,243,0.1) 0%, rgba(33,150,243,0) 100%)',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
            Welcome back
          </Typography>
          <Typography variant="body1" color="text.secondary">
            What would you like to do today?
          </Typography>
        </Container>
      </Box>

      {/* Quick Actions */}
      <Container maxWidth="sm">
        <Box sx={{ mb: 4 }}>
          <Grid container spacing={3} justifyContent="space-between">
            {quickActions.map((action) => (
              <Grid item key={action.label}>
                <QuickAction {...action} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Main Actions */}
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ActionCard
              icon={HomeRepairServiceIcon}
              title="Schedule Inspection"
              to="/schedule"
              primary
            />
          </Grid>
          <Grid item xs={12}>
            <ActionCard
              icon={CalendarMonthIcon}
              title="View Appointments"
              to="/appointments"
            />
          </Grid>
        </Grid>

        {/* Recent Activity Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ px: 1 }}>
            Recent Activity
          </Typography>
          <Card sx={{ p: 3 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              No recent inspections
            </Typography>
          </Card>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
