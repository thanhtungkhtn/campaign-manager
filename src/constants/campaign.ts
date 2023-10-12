import { Campaign } from 'types';

export enum CampaignTab {
  INFO = 'INFO',
  SUB = 'SUB',
}

export const DefaultId = {
  SUB_CAMPAIGN: 'sub-campaign-default-id',
  AD: 'ad-default-id',
};

export const initialCampaignState: Campaign = {
  isShowMessage: false,
  subCampaignSelectedId: DefaultId.SUB_CAMPAIGN,
  information: {
    name: '',
  },
  subCampaigns: [
    {
      id: DefaultId.SUB_CAMPAIGN,
      name: 'Chiến dịch con 1',
      status: true,
      ads: [
        {
          id: DefaultId.AD,
          name: 'Quảng cáo 1',
          quantity: 0,
        },
      ],
    },
  ],
};

export enum ActionTypes {
  CHANGE_CAMPAIGN_INFO = 'CHANGE_CAMPAIGN_INFO',

  ADD_SUB_CAMPAIGN = 'ADD_SUB_CAMPAIGN',
  CHANGE_SUB_CAMPAIGN = 'CHANGE_SUB_CAMPAIGN',

  ADD_AD_SUB_CAMPAIGN = 'ADD_AD_SUB_CAMPAIGN',
  CHANGE_AD_SUB_CAMPAIGN = 'CHANGE_AD_SUB_CAMPAIGN',

  REMOVE_ADS = 'REMOVE_ADS',
  REMOVE_ALL_ADS = 'REMOVE_ALL_ADS',
  SELECTED_SUB_CAMPAIGN = 'SELECTED_SUB_CAMPAIGN',

  TRIGGER_CAMPAIGN_MESSAGE = 'TRIGGER_CAMPAIGN_MESSAGE',
}
