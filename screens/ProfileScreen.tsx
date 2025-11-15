import React, { useState } from 'react';
import { User, AssetCategory, NotificationSound, DataTimeRange } from '../types';
import { Container, Card, CardContent, Typography, Button, Stack, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


interface ProfileScreenProps {
  user: User;
  onSave: (updatedUser: User) => void;
  onBack: () => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onSave, onBack }) => {
  const [preferences, setPreferences] = useState(user.preferences);

  const handleSave = () => {
    onSave({ ...user, preferences });
  };
  
  const handlePreferenceChange = (key: keyof typeof preferences, value: string) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Container component="main" maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Box sx={{ width: '100%', alignSelf: 'flex-start', mb: 2 }}>
        <Button onClick={onBack} startIcon={<ArrowBackIcon />}>
            Back to Dashboard
        </Button>
      </Box>
      <Card sx={{ width: '100%', p: 2 }}>
        <CardContent>
          <Stack spacing={2} alignItems="center" sx={{ mb: 4 }}>
            <Typography component="h1" variant="h4" fontWeight="bold">
              User Profile
            </Typography>
            <Typography color="text.secondary">
              Manage your account and preferences
            </Typography>
          </Stack>
          
          <Stack spacing={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>Account Details</Typography>
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="body2" color="text.secondary">Full Name</Typography>
                        <Typography>{user.name}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" color="text.secondary">Email Address</Typography>
                        <Typography>{user.email}</Typography>
                    </Box>
                </Stack>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>Preferences</Typography>
                <Stack spacing={3} sx={{ mt: 2 }}>
                    <FormControl fullWidth>
                      <InputLabel>Default Asset Category</InputLabel>
                      <Select 
                        label="Default Asset Category"
                        value={preferences.defaultCategory}
                        onChange={(e) => handlePreferenceChange('defaultCategory', e.target.value)}
                      >
                        {Object.values(AssetCategory).map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                      </Select>
                    </FormControl>
                    
                    <FormControl fullWidth>
                      <InputLabel>Notification Sound</InputLabel>
                      <Select 
                        label="Notification Sound"
                        value={preferences.notificationSound}
                        onChange={(e) => handlePreferenceChange('notificationSound', e.target.value)}
                      >
                        {Object.values(NotificationSound).map(sound => <MenuItem key={sound} value={sound}>{sound}</MenuItem>)}
                      </Select>
                    </FormControl>

                    <FormControl fullWidth>
                      <InputLabel>Default Data Time Range</InputLabel>
                      <Select 
                        label="Default Data Time Range"
                        value={preferences.dataTimeRange}
                        onChange={(e) => handlePreferenceChange('dataTimeRange', e.target.value)}
                      >
                        {Object.values(DataTimeRange).map(range => <MenuItem key={range} value={range}>{range}</MenuItem>)}
                      </Select>
                    </FormControl>
                </Stack>
              </CardContent>
            </Card>
            <Button onClick={handleSave} variant="contained" size="large">Save Changes</Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProfileScreen;