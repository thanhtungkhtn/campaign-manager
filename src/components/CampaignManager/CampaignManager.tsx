import React, { FormEvent, createContext, useCallback, useReducer } from 'react';
import { AppBar, Box, Button, Grid, Paper, Tab, Tabs } from '@mui/material';

import type { CampaignActions, Campaign, SubCampaign, Ad } from 'types';
import campaignReducer from './reducer';
import { CampaignTab, initialCampaignState } from 'constants/campaign';
import CampaignInfoTab from 'components/CampaignInfoTab';
import SubCampaignTab from 'components/SubCampaignTab';
import { CampaignValidation } from 'helpers/CampaignValidation';
import { triggerCampaignMessage } from './actions';

type CampaignContextType = {
  state: Campaign;
  dispatch: React.Dispatch<CampaignActions>;
};

export const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

interface TabPanelProps {
  children?: React.ReactNode;
  name: CampaignTab;
  active: boolean;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, name, active, ...other } = props;

  return (
    <div role='tabpanel' hidden={!active} id={`tabpanel-${name}`} aria-labelledby={`tab-${name}`} {...other}>
      {active && children}
    </div>
  );
}

const CampaignManager = () => {
  const [state, dispatch] = useReducer(campaignReducer, initialCampaignState);
  const [activeTab, setActiveTab] = React.useState(CampaignTab.INFO);

  const handleChange = useCallback((_: React.SyntheticEvent, tab: CampaignTab) => {
    setActiveTab(tab);
  }, []);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const validationHelper = new CampaignValidation();
    validationHelper.register(state);

    if (validationHelper.validationCampaign()) {
      alert('Vui lòng điền đúng và đầy đủ thông tin');
      dispatch(triggerCampaignMessage(true));
      return;
    }
    const results = {
      campaign: {
        information: {
          name: state.information.name,
          describe: state.information.describe,
        },
        subCampaigns: state.subCampaigns.map((subCampaign: SubCampaign) => {
          // Use object destructuring to omit the 'id' property from subCampaign
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { id, ...rest } = subCampaign;

          // Map through the ads array and omit the 'id' property from each ad
          const sanitizedAds = subCampaign.ads.map((ad: Ad) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id: adId, ...adRest } = ad;
            return adRest;
          });

          return {
            ...rest,
            ads: sanitizedAds,
          };
        }),
      },
    };

    alert(`Thêm thành công chiến dịch ${JSON.stringify(results)}`);
  }

  return (
    <CampaignContext.Provider value={{ state, dispatch }}>
      <form autoComplete='off' onSubmit={handleSubmit} noValidate>
        <Grid container style={{ paddingTop: 20 }}>
          <Grid item xs={12} sx={{ borderBottom: '1px solid gray' }}>
            <Box sx={{ display: 'flex', padding: '10px 20px', justifyContent: 'flex-end' }}>
              <Button variant='contained' type='submit'>
                SUBMIT
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Grid container style={{ flexGrow: 1, padding: 24 }}>
          <Grid item xs={12} component={Paper}>
            <AppBar
              position='static'
              elevation={4}
              color='primary'
              sx={{
                background: 'white',
                color: 'inherit',
                boxShadow: 'none',
                borderBottom: '1px solid rgb(224, 224, 224)',
              }}
            >
              <Tabs value={activeTab} onChange={handleChange}>
                <Tab label='THÔNG TIN' value={CampaignTab.INFO} />
                <Tab label='CHIẾN DỊCH CON' value={CampaignTab.SUB} />
              </Tabs>
            </AppBar>

            <Box sx={{ overflowY: 'scroll', height: '100%', padding: '16px' }}>
              <CustomTabPanel name={CampaignTab.INFO} active={activeTab === CampaignTab.INFO}>
                <CampaignInfoTab />
              </CustomTabPanel>
              <CustomTabPanel name={CampaignTab.SUB} active={activeTab === CampaignTab.SUB}>
                <SubCampaignTab />
              </CustomTabPanel>
            </Box>
          </Grid>
        </Grid>
      </form>
    </CampaignContext.Provider>
  );
};

export default CampaignManager;
