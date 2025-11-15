import React, { useState, useMemo } from 'react';
import { ASSETS } from '../constants';
import { Asset, AssetCategory, Alert, AlertCondition, User } from '../types';
import { getAssetAnalysis } from '../services/geminiService';

import { 
  Container, Box, Typography, Button, Grid, Tabs, Tab, Card, CardContent,
  Stack, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Select, MenuItem, FormControl, InputLabel, List, ListItem, ListItemText,
  IconButton, CircularProgress, Link
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface DashboardScreenProps {
  user: User;
  onLogout: () => void;
  onShowProfile: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ user, onLogout, onShowProfile }) => {
  const [activeCategory, setActiveCategory] = useState<AssetCategory>(user.preferences.defaultCategory);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isAlertModalOpen, setAlertModalOpen] = useState(false);
  
  const [isAnalysisModalOpen, setAnalysisModalOpen] = useState(false);
  const [analysisContent, setAnalysisContent] = useState('');
  const [isAnalysisLoading, setAnalysisLoading] = useState(false);

  const [alertTargetPrice, setAlertTargetPrice] = useState('');
  const [alertCondition, setAlertCondition] = useState<AlertCondition>(AlertCondition.Above);

  const assets = useMemo(() => ASSETS[activeCategory], [activeCategory]);
  
  const handleSetAlertClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setAlertTargetPrice(asset.price.toString());
    setAlertCondition(AlertCondition.Above);
    setAlertModalOpen(true);
  };

  const handleCreateAlert = () => {
    if (!selectedAsset || !alertTargetPrice) return;
    const newAlert: Alert = {
      id: `${selectedAsset.symbol}-${Date.now()}`,
      asset: selectedAsset,
      condition: alertCondition,
      targetPrice: parseFloat(alertTargetPrice),
    };
    setAlerts(prev => [...prev, newAlert]);
    setAlertModalOpen(false);
  };

  const handleDeleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };
  
  const handleGetAnalysis = async (asset: Asset) => {
    setSelectedAsset(asset);
    setAnalysisModalOpen(true);
    setAnalysisLoading(true);
    const result = await getAssetAnalysis(asset.name, asset.symbol, asset.category);
    setAnalysisContent(result);
    setAnalysisLoading(false);
  };
  
  const formatPrice = (price: number, category: AssetCategory) => {
      const options = {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: category === AssetCategory.Forex ? 4 : 2,
          maximumFractionDigits: category === AssetCategory.Crypto && price < 1 ? 6 : (category === AssetCategory.Forex ? 4 : 2),
      };
      return new Intl.NumberFormat('en-US', options).format(price);
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Market Dashboard
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button onClick={onShowProfile}>Profile</Button>
          <Button onClick={onLogout} variant="outlined">Logout</Button>
        </Stack>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={8}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={activeCategory} onChange={(e, newValue) => setActiveCategory(newValue)}>
              {Object.values(AssetCategory).map(category => (
                <Tab key={category} label={category} value={category} />
              ))}
            </Tabs>
          </Box>

          <Stack spacing={3}>
            {assets.map(asset => (
              <Card key={asset.symbol}>
                <CardContent sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                  <Box>
                    <Typography variant="h6" fontWeight="bold">{asset.name} ({asset.symbol})</Typography>
                    <Typography color="text.secondary">{formatPrice(asset.price, asset.category)}</Typography>
                  </Box>
                  <Stack direction="row" spacing={2} alignItems="center">
                      <Typography fontWeight="medium" color={asset.change >= 0 ? 'success.main' : 'error.main'}>
                          {asset.change >= 0 ? '+' : ''}{asset.change.toFixed(2)}%
                      </Typography>
                      <Button variant="outlined" size="small" onClick={() => handleSetAlertClick(asset)}>Set Alert</Button>
                      <Button size="small" onClick={() => handleGetAnalysis(asset)}>AI Analysis</Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                My Alerts
              </Typography>
              {alerts.length === 0 ? (
                <Typography color="text.secondary">You have no active alerts.</Typography>
              ) : (
                <List disablePadding>
                  {alerts.map(alert => (
                    <ListItem 
                      key={alert.id} 
                      sx={{ bgcolor: 'background.default', mb: 1, borderRadius: 1 }}
                      secondaryAction={
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteAlert(alert.id)}>
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemText 
                        primary={alert.asset.symbol}
                        secondary={`Alert if price is ${alert.condition} ${formatPrice(alert.targetPrice, alert.asset.category)}`}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Dialog open={isAlertModalOpen} onClose={() => setAlertModalOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Set Alert for {selectedAsset?.symbol}</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{pt: 1}}>
            <Typography>
              Current Price: <Box component="span" fontWeight="bold">{selectedAsset ? formatPrice(selectedAsset.price, selectedAsset.category) : ''}</Box>
            </Typography>
            <FormControl fullWidth>
                <InputLabel>Condition</InputLabel>
                <Select
                    value={alertCondition}
                    label="Condition"
                    onChange={e => setAlertCondition(e.target.value as AlertCondition)}
                >
                    <MenuItem value={AlertCondition.Above}>Price is Above</MenuItem>
                    <MenuItem value={AlertCondition.Below}>Price is Below</MenuItem>
                </Select>
            </FormControl>
            <TextField 
              label="Target Price" 
              type="number" 
              value={alertTargetPrice}
              onChange={e => setAlertTargetPrice(e.target.value)}
              required
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setAlertModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateAlert} variant="contained">Create Alert</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isAnalysisModalOpen} onClose={() => setAnalysisModalOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>AI Analysis for {selectedAsset?.name}</DialogTitle>
        <DialogContent>
            {isAnalysisLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Typography 
                    component="div" 
                    sx={{
                        '& h1, & h2, & h3, & strong': { fontWeight: 'bold' },
                        '& ul': { pl: 2 },
                    }}
                    dangerouslySetInnerHTML={{ __html: analysisContent.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} 
                />
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setAnalysisModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DashboardScreen;