import { useCallback } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import SubCampaignCard from '../SubCampaignCard';
import { useCampaignContext } from 'hooks/useCampaignContext';
import { addSubCampaign, selectedSubCampaign } from 'components/CampaignManager/actions';
import { getUniqueId } from 'utils';
import { SubCampaign } from 'types';
import { Colors } from 'constants/colors';

const SubCampaignsList = () => {
  const {
    state: { subCampaigns, subCampaignSelectedId, isShowMessage },
    dispatch,
  } = useCampaignContext();

  const handleAddSubCampaign = () => {
    const campaignDtos: SubCampaign = {
      id: getUniqueId('sub-campaign'),
      name: `Chiến dịch con ${subCampaigns.length + 1}`,
      status: true,
      ads: [
        {
          id: getUniqueId('ad'),
          name: 'Quảng cáo 1',
          quantity: 0,
        },
      ],
    };
    dispatch(addSubCampaign(campaignDtos));
    dispatch(selectedSubCampaign(campaignDtos.id));
  };

  const handleSelectSubCampaign = useCallback((subCampaignId: string) => {
    dispatch(selectedSubCampaign(subCampaignId));
  }, []);

  return (
    <Grid item sx={{ overflow: 'auto', paddingBottom: 2 }} xs={12}>
      <div style={{ display: 'flex' }}>
        <Box>
          <IconButton
            aria-label='add'
            sx={{ background: Colors.SoftPeach, color: Colors.Folly }}
            color='secondary'
            size='large'
            onClick={handleAddSubCampaign}
          >
            <AddIcon />
          </IconButton>
        </Box>

        {subCampaigns.map((subCampaign) => {
          return (
            <SubCampaignCard
              isShowMessage={isShowMessage}
              campaign={subCampaign}
              isActive={subCampaignSelectedId === subCampaign.id}
              selectSubCampaign={handleSelectSubCampaign}
              key={subCampaign.id}
            />
          );
        })}
      </div>
    </Grid>
  );
};

export default SubCampaignsList;
