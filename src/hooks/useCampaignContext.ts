import { useContext } from 'react';

import { CampaignContext } from 'components/CampaignManager';

export const useCampaignContext = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    console.log('ss');
    throw new Error('useCampaignContext must be used within a CampaignProvider');
  }
  return context;
};
