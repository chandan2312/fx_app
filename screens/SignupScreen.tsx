import React from 'react';
import { Container, Card, CardContent, Typography, TextField, Button, Stack, Divider, Link, Box } from '@mui/material';
import GoogleIcon from '../components/icons/GoogleIcon';
import XIcon from '../components/icons/XIcon';

interface SignupScreenProps {
  onSignupSuccess: () => void;
  onShowLogin: () => void;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ onSignupSuccess, onShowLogin }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSignupSuccess();
    };

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', alignItems: 'center', minHeight: '100vh' }}>
      <Card sx={{ width: '100%', p: 2 }}>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Typography component="h1" variant="h4" fontWeight="bold">
              Create Account
            </Typography>
            <Typography color="text.secondary">
              Get started with Market Alert Pro
            </Typography>
          </Stack>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Stack spacing={3}>
              <TextField label="Full Name" type="text" required fullWidth />
              <TextField label="Email Address" type="email" required fullWidth />
              <TextField label="Password" type="password" required fullWidth />
              <Button type="submit" variant="contained" size="large" fullWidth>
                Create Account
              </Button>
            </Stack>
          </Box>
          
          <Divider sx={{ my: 3 }}>OR</Divider>

          <Stack spacing={2}>
              <Button variant="outlined" startIcon={<GoogleIcon />} fullWidth onClick={onSignupSuccess}>
                  Sign up with Google
              </Button>
              {/* FIX: The sx prop is not supported by the custom XIcon component. Replaced with standard height and width attributes. */}
              <Button variant="outlined" startIcon={<XIcon height={18} width={18} />} fullWidth onClick={onSignupSuccess}>
                  Sign up with X
              </Button>
          </Stack>
        
          <Typography align="center" sx={{ mt: 3 }} color="text.secondary">
            Already have an account?{' '}
            <Link component="button" type="button" onClick={onShowLogin} variant="body2">
              Log In
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignupScreen;