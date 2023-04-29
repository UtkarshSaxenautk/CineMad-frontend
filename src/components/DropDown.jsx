import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TranslateIcon from '@mui/icons-material/Translate';

const options = [
  'English',
  'Hindi',
  'Spanish',
  'German'
];

const ITEM_HEIGHT = 48;

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='text-amber-700 row-auto'>
      
      <IconButton 
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        sx={{ color:'#bd6513' , paddingBottom:'2px'}}
        onClick={handleClick}
      >
        <TranslateIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            borderRadius:'3ch',
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
             backgroundColor: 'black',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem sx={{color:'#BD6513'}} key={option} selected={option === 'Pyxis'} onClick={handleClose}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}