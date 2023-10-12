import { useMemo, type FC } from 'react';
import { Grid, TextField } from '@mui/material';

import { useCampaignContext } from 'hooks/useCampaignContext';
import { changeCampaignInfo } from 'components/CampaignManager/actions';

const CampaignInfoTab: FC = () => {
  const {
    state: { information, isShowMessage },
    dispatch,
  } = useCampaignContext();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      changeCampaignInfo({
        ...information,
        [e.target.name]: e.target.value,
      }),
    );
  };

  const invalidFieldName = useMemo(() => {
    return isShowMessage && !information.name.trim();
  }, [isShowMessage, information.name]);

  return (
    <Grid container spacing={2} className='CampaignInfoTab-container'>
      <Grid item xs={12}>
        <TextField
          required
          name='name'
          value={information.name}
          id='campaign-name'
          label='Tên chiến dịch'
          type='text'
          variant='standard'
          fullWidth
          sx={{ margin: '8px' }}
          onChange={handleNameChange}
          {...(invalidFieldName && { error: true, helperText: 'Dư liệu không hợp lệ' })}
        />
        <TextField
          name='describe'
          id='campaign-description'
          label='Mô Tả'
          type='text'
          variant='standard'
          fullWidth
          sx={{ margin: '8px' }}
          onChange={handleNameChange}
        />
      </Grid>
    </Grid>
  );
};

export default CampaignInfoTab;
