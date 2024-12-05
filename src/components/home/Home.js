import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import EngineeringIcon from '@mui/icons-material/Engineering';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SecurityIcon from '@mui/icons-material/Security';

const HeroSection = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '80vh',
  display: 'flex',
  alignItems: 'center',
  backgroundImage: 'url("https://github.com/OpalBridgeAi/Uploads/blob/main/roofing%20repair%20v2.png?raw=true")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  }
}));

const services = [
  {
    title: 'Roof Inspection',
    description: 'Comprehensive inspection of your roof\'s condition with detailed reports.',
    icon: EngineeringIcon,
  },
  {
    title: 'Emergency Service',
    description: '24/7 emergency response for urgent roof repairs and maintenance.',
    icon: ScheduleIcon,
  },
  {
    title: 'Quality Guarantee',
    description: 'All our work is backed by our satisfaction guarantee.',
    icon: SecurityIcon,
  },
];

const features = [
  'Professional and certified inspectors',
  'Detailed digital reports with photos',
  'Quick response time',
  'Competitive pricing',
  'Insurance claim assistance',
  'Warranty on all repairs',
];

const Home = () => {
  const theme = useTheme();

  return (
    <Box>
      <HeroSection>
        <Container maxWidth="lg">
          <Box
            sx={{
              position: 'relative',
              color: 'white',
              textAlign: { xs: 'center', md: 'left' },
              py: 8,
            }}
          >
            <Typography
              variant="h1"
              sx={{
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
              }}
            >
              Expert Roof Inspection & Repair
            </Typography>
            <Typography
              variant="h5"
              sx={{ mb: 4, maxWidth: '600px', mx: { xs: 'auto', md: 0 } }}
            >
              Professional roof assessment and maintenance services to protect your home
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={RouterLink}
              to="/schedule"
              sx={{
                py: 2,
                px: 4,
                fontSize: '1.1rem',
              }}
            >
              Schedule Inspection
            </Button>
          </Box>
        </Container>
      </HeroSection>

      {/* Services Section */}
      <Box sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 6 }}
          >
            Our Services
          </Typography>
          <Grid container spacing={4}>
            {services.map((service) => (
              <Grid item xs={12} md={4} key={service.title}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <service.icon
                    sx={{
                      fontSize: 60,
                      color: theme.palette.primary.main,
                      mb: 2,
                    }}
                  />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h3"
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                    >
                      {service.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom>
                Why Choose Us?
              </Typography>
              <Typography variant="body1" paragraph>
                We provide comprehensive roof inspection and repair services with a focus on quality and customer satisfaction.
              </Typography>
              <Grid container spacing={2}>
                {features.map((feature) => (
                  <Grid item xs={12} key={feature}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckCircleOutlineIcon
                        sx={{ color: theme.palette.primary.main, mr: 1 }}
                      />
                      <Typography variant="body1">{feature}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/about"
                sx={{ mt: 4 }}
              >
                Learn More
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://github.com/OpalBridgeAi/Uploads/blob/main/roofing%20repair%20v2.png?raw=true"
                alt="Roof inspection"
                sx={{
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
