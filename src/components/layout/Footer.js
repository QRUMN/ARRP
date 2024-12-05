import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import RoofingIcon from '@mui/icons-material/Roofing';

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: theme.palette.secondary.main,
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <RoofingIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                Roof Restore Pro
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Professional roof inspection and repair services to protect your most valuable asset.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="LinkedIn">
                <LinkedInIcon />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Link
                component={RouterLink}
                to="/"
                color="inherit"
                sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: theme.palette.primary.light } }}
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/services"
                color="inherit"
                sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: theme.palette.primary.light } }}
              >
                Services
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                color="inherit"
                sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: theme.palette.primary.light } }}
              >
                About Us
              </Link>
              <Link
                component={RouterLink}
                to="/contact"
                color="inherit"
                sx={{ mb: 1, textDecoration: 'none', '&:hover': { color: theme.palette.primary.light } }}
              >
                Contact
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              1234 Roofing Street
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              San Francisco, CA 94105
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: (555) 123-4567
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: info@roofrestorepro.com
            </Typography>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} Roof Restore Pro. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
