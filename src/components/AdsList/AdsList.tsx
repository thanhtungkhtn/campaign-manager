import { Checkbox, FormControl, IconButton, Input, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip } from '@mui/material';
import { useMemo, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

import EnhancedTableHead from './EnhancedTableHead';
import { useCampaignContext } from 'hooks/useCampaignContext';
import { changeAdSubCampaign, removeAdSubCampaign } from 'components/CampaignManager/actions';
import type { Ad } from 'types';

const AdsList = () => {
  const [selected, setSelected] = useState<readonly string[]>([]);
  const {
    state: { subCampaignSelectedId, subCampaigns, isShowMessage },
    dispatch,
  } = useCampaignContext();

  const subCampaign = useMemo(() => {
    const subCampaignIndex = subCampaigns.findIndex((subCampaign) => subCampaign.id === subCampaignSelectedId);
    return subCampaigns[subCampaignIndex];
  }, [subCampaigns, subCampaignSelectedId]);

  const visibleRows: Ad[] = useMemo(() => subCampaign.ads, [subCampaign, subCampaign.ads]);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = visibleRows.map((row) => row.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectSubCampaign = (advertiseId: string) => {
    const selectedIndex = selected.indexOf(advertiseId);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, advertiseId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const isSelected = (advertiseId: string) => selected.indexOf(advertiseId) !== -1;

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, advertise: Ad) => {
    const { name, value, type } = e.target;
    const isChangeQuantityAds = type === 'number';

    dispatch(
      changeAdSubCampaign(subCampaignSelectedId, {
        ...advertise,
        [name]: isChangeQuantityAds ? Number(value) : e.target.value,
      }),
    );
  };

  const handleRemoveAd = (advertise: Ad) => {
    dispatch(removeAdSubCampaign(subCampaignSelectedId, advertise.id));
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 750 }} size='medium'>
        <EnhancedTableHead numSelected={selected.length} onSelectAllClick={handleSelectAllClick} rowCount={visibleRows.length} />
        <TableBody>
          {visibleRows.map((row) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `ads-table-${row.id}`;
            return (
              <TableRow
                hover
                role='checkbox'
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={labelId}
                selected={isItemSelected}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell padding='checkbox' sx={{ padding: '0px 0px 0px 4px' }}>
                  <Checkbox
                    color='primary'
                    checked={isItemSelected}
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                    onChange={() => handleSelectSubCampaign(row.id)}
                  />
                </TableCell>

                <TableCell
                  component='th'
                  id={labelId}
                  scope='row'
                  padding='none'
                  sx={{
                    paddingTop: '8px',
                    paddingBottom: '8px',
                  }}
                >
                  <FormControl fullWidth>
                    <Input
                      value={row.name}
                      onChange={(e) => handleChangeInput(e, row)}
                      type='text'
                      aria-label='name'
                      fullWidth
                      name='name'
                      error={isShowMessage && !row.name.trim()}
                    />
                  </FormControl>
                </TableCell>
                <TableCell
                  align='left'
                  sx={{
                    paddingTop: '8px',
                    paddingBottom: '8px',
                    width: '50%',
                  }}
                >
                  <FormControl fullWidth>
                    <Input
                      value={row.quantity}
                      onChange={(e) => handleChangeInput(e, row)}
                      type='number'
                      aria-label='quantity'
                      fullWidth
                      name='quantity'
                      error={isShowMessage && !row.quantity}
                    />
                  </FormControl>
                </TableCell>
                <TableCell align='right'>
                  <Tooltip title='Xoá'>
                    <IconButton aria-label='delete' onClick={() => handleRemoveAd(row)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdsList;
