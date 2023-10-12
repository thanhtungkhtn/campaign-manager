import { ActionTypes } from 'constants/campaign';
import type { Campaign, CampaignActions } from 'types';

// Campaign Reducer
const campaignReducer = (state: Campaign, action: CampaignActions): Campaign => {
  switch (action.type) {
    case ActionTypes.CHANGE_CAMPAIGN_INFO: {
      return {
        ...state,
        information: action.payload,
      };
    }
    case ActionTypes.ADD_SUB_CAMPAIGN: {
      return { ...state, subCampaigns: [...state.subCampaigns, action.payload] };
    }
    case ActionTypes.CHANGE_SUB_CAMPAIGN: {
      const { subCampaigns } = state;
      const subCampaign = action.payload;

      const updatedSubCampaigns = subCampaigns.map((campaign) =>
        campaign.id === subCampaign.id ? { ...campaign, ...subCampaign } : campaign,
      );

      return {
        ...state,
        subCampaigns: updatedSubCampaigns,
      };
    }

    case ActionTypes.ADD_AD_SUB_CAMPAIGN: {
      const { subCampaignId, advertise } = action.payload;
      const updatedSubCampaigns = [...state.subCampaigns];

      const index = updatedSubCampaigns.findIndex((subCampaign) => subCampaign.id === subCampaignId);
      // Add the new ad to the specified sub-campaign
      updatedSubCampaigns[index].ads.push(advertise);

      return {
        ...state,
        subCampaigns: updatedSubCampaigns,
      };
    }
    case ActionTypes.CHANGE_AD_SUB_CAMPAIGN: {
      const { subCampaignId, advertise } = action.payload;
      const newState = { ...state };

      const { subCampaigns } = newState;

      const subCampaignIndex = subCampaigns.findIndex((subCampaign) => subCampaign.id === subCampaignId);
      const subCampaign = subCampaigns[subCampaignIndex];

      const advertiseIndex = subCampaign.ads.findIndex((ad) => ad.id === advertise.id);
      subCampaign.ads[advertiseIndex] = advertise;

      return newState;
    }
    case ActionTypes.REMOVE_ADS: {
      const { subCampaignId, advertiseId } = action.payload;
      const removeState = { ...state };

      const { subCampaigns } = removeState;
      const subCampaignIndex = subCampaigns.findIndex((subCampaign) => subCampaign.id === subCampaignId);
      const subCampaign = subCampaigns[subCampaignIndex];

      const advertiseIndex = subCampaign.ads.findIndex((advertise) => advertise.id === advertiseId);
      // Remove the specified ad from the sub-campaign
      subCampaign.ads.splice(advertiseIndex, 1);

      return removeState;
    }

    case ActionTypes.REMOVE_ALL_ADS: {
      const { subCampaignId } = action.payload;

      const clearedState = { ...state };
      const { subCampaigns } = clearedState;
      const index = subCampaigns.findIndex((subCampaign) => subCampaign.id === subCampaignId);
      // Clear all ads from the specified sub-campaign
      subCampaigns[index].ads = [];

      return clearedState;
    }

    case ActionTypes.SELECTED_SUB_CAMPAIGN: {
      return {
        ...state,
        subCampaignSelectedId: action.payload,
      };
    }

    case ActionTypes.TRIGGER_CAMPAIGN_MESSAGE: {
      return {
        ...state,
        isShowMessage: action.payload,
      };
    }

    default:
      return state;
  }
};

export default campaignReducer;
