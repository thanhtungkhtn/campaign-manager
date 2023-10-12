import { useMemo } from 'react';
import { Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';

import { changeSubCampaign } from 'components/CampaignManager/actions';
import { useCampaignContext } from 'hooks/useCampaignContext';

const SubCampaignInfo = () => {
  const {
    state: { subCampaigns, subCampaignSelectedId, isShowMessage },
    dispatch,
  } = useCampaignContext();

  const currentCampaign = useMemo(() => {
    const campaignIndex = subCampaigns.findIndex((campaign) => campaign.id === subCampaignSelectedId);
    return subCampaigns[campaignIndex];
  }, [subCampaigns, subCampaignSelectedId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const isChangeStatus = type === 'checkbox';

    dispatch(
      changeSubCampaign({
        ...currentCampaign,
        [name]: isChangeStatus ? !currentCampaign.status : value,
      }),
    );
  };

  return (
    <Grid container sx={{ overflow: 'auto', paddingBottom: '2px' }} style={{ padding: '8px 8px 0px' }}>
      <Grid item style={{ padding: 8 }} xs={8}>
        <TextField
          name='name'
          onChange={handleChange}
          value={currentCampaign.name}
          required
          id='sub-campaign-name'
          label='Tên chiến dịch con'
          type='text'
          variant='standard'
          fullWidth
          error={isShowMessage && !currentCampaign.name.trim()}
        />
      </Grid>
      <Grid item style={{ padding: 4, alignItems: 'center', justifyContent: 'center', display: 'flex' }} xs={4}>
        <FormControlLabel
          control={<Checkbox checked={currentCampaign.status} onChange={handleChange} name='status' />}
          label='Đang hoạt động'
          sx={{
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      </Grid>
    </Grid>
  );
};

SubCampaignInfo.propTypes = {};

export default SubCampaignInfo;
