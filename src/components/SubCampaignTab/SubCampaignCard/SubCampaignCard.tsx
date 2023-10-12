import { useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, Tooltip, Typography } from '@mui/material';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';

import type { SubCampaign } from 'types';
import { CampaignValidation } from 'helpers/CampaignValidation';
import { Colors } from 'constants/colors';

interface SubCampaignCardProps {
  campaign: SubCampaign;
  selectSubCampaign: (subCampaignId: string) => void;
  isActive: boolean;
  isShowMessage: boolean;
}

const SubCampaignCard = (props: SubCampaignCardProps) => {
  const { campaign, isActive, selectSubCampaign, isShowMessage } = props;
  const validateRef = useRef<CampaignValidation>(new CampaignValidation());

  const totalAdsQuantity = campaign.ads.reduce((acc, ad) => acc + ad.quantity, 0);

  const invalidSubCampaign = useMemo(() => {
    return isShowMessage && validateRef.current.validateSubCampaign([campaign]);
  }, [campaign, isShowMessage]);

  return (
    <Card
      sx={{
        minWidth: 210,
        width: 210,
        height: 120,
        marginLeft: '16px',
        cursor: 'pointer',
        boxSizing: 'border-box',
        ...(isActive && {
          border: `2px solid ${Colors.Azure}`,
        }),
      }}
      variant='outlined'
      onClick={() => selectSubCampaign(campaign.id)}
    >
      <CardHeader
        sx={{ padding: '8px 8px 4px' }}
        title={
          <div className='MuiCardHeader-content'>
            <Typography
              variant='h6'
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'normal',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                textAlign: 'center',
                color: invalidSubCampaign ? 'red' : 'inherit',
                wordBreak: 'break-all',
              }}
            >
              {campaign.name}
              <CheckCircleSharpIcon
                fontSize='small'
                sx={{
                  fontSize: '14px',
                  color: 'rgb(0, 128, 0)',
                  marginLeft: '8px',
                }}
              />
            </Typography>
          </div>
        }
      />

      <CardContent sx={{ padding: '0px 8px' }} style={{ textAlign: 'center' }}>
        <Tooltip title='Số lượng' arrow placement='left'>
          <Typography variant='h5' component='div'>
            {totalAdsQuantity}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

SubCampaignCard.propTypes = {};

export default SubCampaignCard;
