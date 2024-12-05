import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BuildIcon from '@mui/icons-material/Build';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ScheduleIcon from '@mui/icons-material/Schedule';

const services = [
  {
    title: 'Roof Inspection',
    description: 'Professional assessment of your roof\'s condition with detailed reports.',
    icon: EngineeringIcon,
    action: 'Schedule Inspection',
  },
  {
    title: 'Repair & Maintenance',
    description: 'Expert repairs and maintenance to extend your roof\'s lifespan.',
    icon: BuildIcon,
    action: 'Get Quote',
  },
  {
    title: 'Emergency Service',
    description: '24/7 emergency response for urgent roof repairs.',
    icon: HomeRepairServiceIcon,
    action: 'Emergency Call',
  },
  {
    title: 'Free Estimate',
    description: 'Get a detailed estimate for your roofing project.',
    icon: ScheduleIcon,
    action: 'Schedule Now',
  },
];

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleSchedule = () => {
    // TODO: Implement scheduling functionality
    console.log('Schedule clicked');
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
          color: 'white',
          py: 8,
          mb: 6,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" component="h1" gutterBottom>
            Professional Roofing Services
          </Typography>
          <Typography variant="h5" component="h2" sx={{ mb: 4 }}>
            Expert roof repairs, maintenance, and installations
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={handleSchedule}
            sx={{
              py: 2,
              px: 4,
              fontSize: '1.2rem',
              backgroundColor: 'white',
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.grey[100],
              },
            }}
          >
            Schedule Free Estimate
          </Button>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={service.title}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4],
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2,
                      }}
                    >
                      <Icon
                        sx={{
                          fontSize: 48,
                          color: theme.palette.primary.main,
                        }}
                      />
                    </Box>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h3"
                      align="center"
                    >
                      {service.title}
                    </Typography>
                    <Typography align="center" color="text.secondary">
                      {service.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleSchedule}
                    >
                      {service.action}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
