import React from 'react';
import { Typography, Paper, Container } from '@material-ui/core';
import { useTheme } from '../../contexts/ThemeContext';

const PrivacyPolicy = () => {
  const { themeConfig } = useTheme();

  return (
    <Container maxWidth="md" style={{ padding: '2rem 0' }}>
      <Paper style={{ padding: '2rem', backgroundColor: themeConfig['card-background'] }}>
        <Typography variant="h4" gutterBottom style={{ color: themeConfig['text-primary'] }}>
          Privacy Policy
        </Typography>
        
        <Typography variant="body1" paragraph style={{ color: themeConfig['text-secondary'] }}>
          At PrivacyGram, we take your privacy seriously. This policy explains what data we collect,
          how we use it, and your rights regarding your information.
        </Typography>
        
        <Typography variant="h6" gutterBottom style={{ color: themeConfig['text-primary'], marginTop: '1.5rem' }}>
          Data Collection
        </Typography>
        <Typography variant="body1" paragraph style={{ color: themeConfig['text-secondary'] }}>
          We only collect the minimum data required to provide our service:
        </Typography>
        <ul style={{ color: themeConfig['text-secondary'] }}>
          <li>Your Instagram username and profile information (only with your permission)</li>
          <li>Authentication tokens to maintain your session</li>
          <li>App preferences like theme selection</li>
        </ul>
        
        <Typography variant="h6" gutterBottom style={{ color: themeConfig['text-primary'], marginTop: '1.5rem' }}>
          Data Usage
        </Typography>
        <Typography variant="body1" paragraph style={{ color: themeConfig['text-secondary'] }}>
          Your data is used solely to provide the Instagram client functionality. We do not:
        </Typography>
        <ul style={{ color: themeConfig['text-secondary'] }}>
          <li>Sell or share your data with third parties</li>
          <li>Track your activity outside our app</li>
          <li>Use your data for advertising or analytics</li>
        </ul>
        
        <Typography variant="h6" gutterBottom style={{ color: themeConfig['text-primary'], marginTop: '1.5rem' }}>
          Data Storage
        </Typography>
        <Typography variant="body1" paragraph style={{ color: themeConfig['text-secondary'] }}>
          All data is stored locally on your device whenever possible. Authentication tokens are
          securely stored and automatically expire according to Instagram's API policies.
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
