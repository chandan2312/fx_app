import React from 'react';
import { Container, Card, CardContent, Typography, TextField, Button, Stack, Divider, Link, Box } from '@mui/material';
import GoogleIcon from '../components/icons/GoogleIcon';
import XIcon from '../components/icons/XIcon';

interface LoginScreenProps {
  onLogin: () => void;
  onShowSignup: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onShowSignup }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
      <Card sx={{ width: '100%', p: 2 }}>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Typography component="h1" variant="h4" fontWeight="bold">
              Welcome Back
            </Typography>
            <Typography color="text.secondary">
              Login to manage your market alerts
            </Typography>
          </Stack>

          {/* FIX: Box component was used without being imported. */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Stack spacing={3}>
              <TextField label="Email Address" type="email" required fullWidth />
              <TextField label="Password" type="password" required fullWidth />
              <Button type="submit" variant="contained" size="large" fullWidth>
                Login
              </Button>
            </Stack>
          </Box>
          
          <Divider sx={{ my: 3 }}>OR</Divider>

          <Stack spacing={2}>
              <Button variant="outlined" startIcon={<GoogleIcon />} fullWidth onClick={onLogin}>
                  Sign in with Google
              </Button>
              {/* FIX: The sx prop is not supported by the custom XIcon component. Replaced with standard height and width attributes. */}
              <Button variant="outlined" startIcon={<XIcon height={18} width={18} />} fullWidth onClick={onLogin}>
                  Sign in with X
              </Button>
          </Stack>

          <Typography align="center" sx={{ mt: 3 }} color="text.secondary">
            Don't have an account?{' '}
            <Link component="button" type="button" onClick={onShowSignup} variant="body2">
              Sign Up
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoginScreen;