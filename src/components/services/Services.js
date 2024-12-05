import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  useTheme,
} from '@mui/material';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import EngineeringIcon from '@mui/icons-material/Engineering';
import HandymanIcon from '@mui/icons-material/Handyman';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SecurityIcon from '@mui/icons-material/Security';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const services = [
  {
    title: 'Roof Inspection',
    description: 'Comprehensive assessment of your roof\'s condition using advanced inspection techniques.',
    icon: EngineeringIcon,
  },
  {
    title: 'Maintenance & Repair',
    description: 'Professional repair services for all types of roof damage, from minor leaks to major repairs.',
    icon: HomeRepairServiceIcon,
  },
  {
    title: 'Emergency Services',
    description: '24/7 emergency response for urgent roof repairs and storm damage.',
    icon: ScheduleIcon,
  },
  {
    title: 'Preventive Maintenance',
    description: 'Regular maintenance programs to extend your roof\'s lifespan and prevent future issues.',
    icon: HandymanIcon,
  },
  {
    title: 'Insurance Claims',
    description: 'Expert assistance with insurance claims and documentation for roof damage.',
    icon: AttachMoneyIcon,
  },
  {
    title: 'Quality Guarantee',
    description: 'All our work is backed by our satisfaction guarantee and warranty protection.',
    icon: SecurityIcon,
  },
];

const ServiceCard = ({ title, description, icon: Icon }) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Icon sx={{ 
            fontSize: 40, 
            color: theme.palette.primary.main,
            mr: 2 
          }} />
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

const Services = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            mb: 4,
            fontWeight: 700,
            textAlign: 'center'
          }}
        >
          Our Services
        </Typography>
        
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.title}>
              <ServiceCard {...service} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
