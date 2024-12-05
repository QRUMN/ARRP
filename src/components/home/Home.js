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
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`
            : `linear-gradient(45deg, ${theme.palette.custom.beige} 0%, ${theme.palette.custom.beige} 100%)`,
          color: theme.palette.mode === 'dark' ? 'white' : theme.palette.primary.main,
          py: { xs: 6, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ maxWidth: 'md', position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
                mb: 3,
              }}
            >
              Professional Roofing Services
            </Typography>
            <Typography 
              variant="h5" 
              component="h2" 
              sx={{ 
                mb: 4,
                color: theme.palette.text.secondary,
                maxWidth: 'sm',
              }}
            >
              Expert roof repairs, maintenance, and installations with quality guarantee
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSchedule}
              sx={{
                py: 2,
                px: 4,
                fontSize: '1.2rem',
              }}
            >
              Schedule Free Estimate
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
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
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[4],
                    },
                    bgcolor: theme.palette.mode === 'dark' 
                      ? 'background.paper' 
                      : '#ffffff',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
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
                          color: theme.palette.secondary.main,
                          mb: 2,
                        }}
                      />
                    </Box>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography 
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleSchedule}
                      sx={{
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                        },
                      }}
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
