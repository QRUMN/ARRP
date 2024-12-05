import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text visibility
  }
}));

const ContentBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  color: '#fff',
  padding: theme.spacing(4),
  maxWidth: '800px',
  margin: '0 auto',
  textAlign: 'center',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(1.5, 4),
  fontSize: '1.1rem',
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

const Home = () => {
  return (
    <>
      <HeroSection>
        <ContentBox>
          <Typography variant="h2" component="h1" gutterBottom>
            Expert Roof Inspection & Repair
          </Typography>
          <Typography variant="h5" gutterBottom>
            Professional roof assessment and maintenance services to protect your home
          </Typography>
          <StyledButton variant="contained" color="primary" size="large">
            Schedule Inspection
          </StyledButton>
        </ContentBox>
      </HeroSection>

      {/* Additional content sections can be added here */}
    </>
  );
};

export default Home;
