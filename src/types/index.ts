import { ActionTypes } from 'constants/campaign';

export type CampaignDescription = {
  name: string;
  describe?: string;
};

// Define the structure of an ad
export type Ad = {
  id: string;
  name: string;
  quantity: number;
};

// Define the structure of a sub-campaign
export type SubCampaign = {
  id: string;
  name: string;
  status: boolean;
  ads: Ad[];
};

// Define the structure of a campaign
export type Campaign = {
  information: CampaignDescription;
  subCampaigns: SubCampaign[];
  subCampaignSelectedId: string;
  isShowMessage: boolean;
};

// Context Actions

export type Action<T> = {
  type: ActionTypes;
  payload: T;
};

export interface ActionCreator<T extends string, P> {
  type: T;
  payload: P;
}
export interface ChangeCampaignInfo {
  type: ActionTypes.CHANGE_CAMPAIGN_INFO;
  payload: CampaignDescription;
}

export interface AddSubCampaign {
  type: ActionTypes.ADD_SUB_CAMPAIGN;
  payload: SubCampaign;
}

export interface ChangeSubCampaign {
  type: ActionTypes.CHANGE_SUB_CAMPAIGN;
  payload: SubCampaign;
}

export interface AddAdsSubCampaign {
  type: ActionTypes.ADD_AD_SUB_CAMPAIGN;
  payload: {
    subCampaignId: string; // Index of the parent sub-campaign
    advertise: Ad;
  };
}

export interface ChangeAdSubCampaign {
  type: ActionTypes.CHANGE_AD_SUB_CAMPAIGN;
  payload: {
    subCampaignId: string;
    advertise: Ad;
  };
}

export interface RemoveAds {
  type: ActionTypes.REMOVE_ADS;
  payload: {
    subCampaignId: string; // Index of the parent sub-campaign
    advertiseId: string;
  };
}

export interface RemoveAllAds {
  type: ActionTypes.REMOVE_ALL_ADS;
  payload: {
    subCampaignId: string; // Index of the parent sub-campaign
  };
}

export interface SelectedSubCampaign {
  type: ActionTypes.SELECTED_SUB_CAMPAIGN;
  payload: string;
}

export interface TriggerCampaignMessage {
  type: ActionTypes.TRIGGER_CAMPAIGN_MESSAGE;
  payload: boolean;
}

export type CampaignActions =
  | ChangeCampaignInfo
  | AddSubCampaign
  | ChangeSubCampaign
  | AddAdsSubCampaign
  | ChangeAdSubCampaign
  | RemoveAds
  | RemoveAllAds
  | SelectedSubCampaign
  | TriggerCampaignMessage;
