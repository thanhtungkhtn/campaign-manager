import { Ad, Campaign, SubCampaign } from 'types';

enum ErrorTypes {
  MISSING_CAMPAIGN_NAME = 'MISSING_CAMPAIGN_NAME',
  MISSING_SUB_CAMPAIGN_NAME = 'MISSING_SUB_CAMPAIGN_NAME',
  MISSING_ADVERTISE_NAME = 'MISSING_ADVERTISE_NAME',
  QUANTITY_OF_ADVERTISE = 'QUANTITY_ADVERTISE',
  TOTAL_SUB_CAMPAIGN_ADVERTISE = 'TOTAL_SUB_CAMPAIGN_ADVERTISE',
}

interface CampaignError {
  name: ErrorTypes;
  message: string;
}

export class CampaignValidation {
  campaign!: Campaign;
  errors: CampaignError[] = [];

  register(campaign: Campaign) {
    this.campaign = campaign;
    return this;
  }

  validateName = (name: string) => {
    return Boolean(name.trim().length);
  };

  validateSubCampaign = (subCampaigns: SubCampaign[]) => {
    return subCampaigns.some((subCampaign: SubCampaign) => {
      const { name, ads } = subCampaign;
      if (!this.validateName(name)) {
        return true;
      }
      if (ads.length === 0) {
        return true;
      }

      return ads.some((advertise: Ad) => {
        return !this.validateName(advertise.name) || advertise.quantity === 0;
      });
    });
  };

  validationCampaign = () => {
    const { information, subCampaigns } = this.campaign;
    const isValidCampaignName = this.validateName(information.name);
    if (!isValidCampaignName) {
      return true;
    }
    return this.validateSubCampaign(subCampaigns);
  };
}
