import { Grid, TableContainer, Typography } from '@mui/material';

import AdsList from 'components/AdsList';
import SubCampaignInfo from './SubCampaignInfo';
import SubCampaignsList from './SubCampaignsList';

const SubCampaignTab = () => {
  return (
    <Grid
      container
      direction='row'
      className='SubCampaignTab-container'
      sx={{
        display: 'flex',
        flexDirection: { md: 'column' },
        margin: { md: 0 },
        padding: { md: 0 },
        maxWidth: { md: '100vw' },
      }}
    >
      <SubCampaignsList />
      <Grid item xs={12} sx={{ marginTop: '16px' }}>
        <SubCampaignInfo />

        <TableContainer component={'div'}>
          <Typography
            variant='h6'
            component='h6'
            sx={{
              color: 'inherit',
              whiteSpace: 'normal',
              wordBreak: 'break-all',
              padding: '16px',
              textAlign: 'left',
              marginTop: '16',
            }}
          >
            DANH SÁCH QUẢNG CÁO
          </Typography>

          <AdsList />
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default SubCampaignTab;
