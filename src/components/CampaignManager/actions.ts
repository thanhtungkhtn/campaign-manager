import { ActionTypes } from 'constants/campaign';
import type { SubCampaign, Ad, ActionCreator } from 'types';

const createCampaignAction = <T extends string, P>(type: T, payload: P): ActionCreator<T, P> => ({
  type,
  payload,
});

export const changeCampaignInfo = (payload: { name: string; describe?: string }) => createCampaignAction(ActionTypes.CHANGE_CAMPAIGN_INFO, payload);

export const addSubCampaign = (subCampaign: SubCampaign) => createCampaignAction(ActionTypes.ADD_SUB_CAMPAIGN, subCampaign);

export const changeSubCampaign = (subCampaign: SubCampaign) => createCampaignAction(ActionTypes.CHANGE_SUB_CAMPAIGN, subCampaign);

export const addAdSubCampaign = (subCampaignId: string, advertise: Ad) => createCampaignAction(ActionTypes.ADD_AD_SUB_CAMPAIGN, { subCampaignId, advertise });

export const changeAdSubCampaign = (subCampaignId: string, advertise: Ad) => createCampaignAction(ActionTypes.CHANGE_AD_SUB_CAMPAIGN, { subCampaignId, advertise });

export const removeAdSubCampaign = (subCampaignId: string, advertiseId: string) => createCampaignAction(ActionTypes.REMOVE_ADS, { subCampaignId, advertiseId });

export const removeAllAdsSubCampaign = (subCampaignId: string) => createCampaignAction(ActionTypes.REMOVE_ALL_ADS, { subCampaignId });

export const selectedSubCampaign = (subCampaignId: string) => createCampaignAction(ActionTypes.SELECTED_SUB_CAMPAIGN, subCampaignId);

export const triggerCampaignMessage = (isShowMessage: boolean) => createCampaignAction(ActionTypes.TRIGGER_CAMPAIGN_MESSAGE, isShowMessage);
