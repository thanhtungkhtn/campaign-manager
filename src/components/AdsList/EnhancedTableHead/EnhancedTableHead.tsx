import React from 'react';
import { Button, Checkbox, IconButton, TableCell, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import type { Ad } from 'types';
import { useCampaignContext } from 'hooks/useCampaignContext';
import { addAdSubCampaign, removeAllAdsSubCampaign } from 'components/CampaignManager/actions';
import { getUniqueId } from 'utils';

interface EnhancedTableProps {
  numSelected: number;
  rowCount: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface HeadCell {
  id: keyof Ad;
  label: string;
  numeric: boolean;
  required: boolean;
  style?: React.CSSProperties;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    label: 'Tên quảng cáo*',
    required: true,
    style: { padding: 0 },
  },
  {
    id: 'quantity',
    numeric: true,
    label: 'Số lượng*',
    required: true,
    style: { width: '50%' },
  },
];

const EnhancedTableHead = (props: EnhancedTableProps) => {
  const { onSelectAllClick, numSelected, rowCount } = props;
  const {
    dispatch,
    state: { subCampaigns, subCampaignSelectedId },
  } = useCampaignContext();

  const handleAddAdvertise = () => {
    const advertiseIndex = subCampaigns.findIndex((subCampaign) => subCampaign.id === subCampaignSelectedId);
    if (advertiseIndex >= 0) {
      const advertiseNumber = subCampaigns[advertiseIndex].ads.length + 1;

      dispatch(
        addAdSubCampaign(subCampaignSelectedId, {
          id: getUniqueId('ad'),
          name: `Quảng cáo ${advertiseNumber}`,
          quantity: 0,
        }),
      );
    }
  };

  const handleRemoveAllAdvertise = () => {
    dispatch(removeAllAdsSubCampaign(subCampaignSelectedId));
  };

  return (
    <TableHead>
      <TableRow sx={{ height: '58px' }}>
        <TableCell padding='checkbox' sx={{ width: '60px', padding: '0px 0px 0px 4px' }}>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>

        {numSelected > 0 && rowCount > 0 ? (
          <TableCell scope='col' style={{ padding: 0 }} colSpan={2}>
            <Tooltip title='Xoá'>
              <IconButton aria-label='delete' onClick={handleRemoveAllAdvertise}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
        ) : (
          headCells.map((headCell) => (
            <TableCell key={headCell.id} align='left' sx={headCell.style}>
              <Typography variant='body1' component='p'>
                {headCell.label}
              </Typography>
            </TableCell>
          ))
        )}

        <TableCell align='right' scope='col' style={{ padding: '0px 16px', width: '120px' }}>
          <Button onClick={handleAddAdvertise} variant='outlined' startIcon={<AddIcon />}>
            THÊM
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
