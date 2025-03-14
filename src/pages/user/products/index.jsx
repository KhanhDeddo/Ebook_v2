import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import CategoryIcon from '@mui/icons-material/Category';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Box, ListItem, Typography } from '@mui/material';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: '0đ',
  },
  {
    value: 1000000,
    label: '1,000,000đ',
  },
];
function valuetext(value) {
  return `${value}°C`;
}


const Products = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => { setOpen(!open) }
  return (
    <Box sx={{
      width: '100%',
      height: '150vh',
      display: 'flex',
    }}>
      <Box flex={2}
        sx={{
          bgcolor: 'lightgray'
        }}
      >
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', color:'#008874' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader sx={{fontSize:40,fontWeight:'bold', color:'#008874',pb:5, pt:3}}>Bộ lọc</ListSubheader>
          }
        >
          <ListItemButton onClick={handleClick}>
            <ListItemIcon><CategoryIcon sx={{color:'#008874'}} /></ListItemIcon>
            <ListItemText primary="Danh mục sản phẩm" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Ngữ văn" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Toán" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItemButton>
              
            </List>
          </Collapse>
          <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 1 }}>
            <ListItemText primary={ <Typography variant="body1" sx={{ fontSize: 20, fontWeight: 600 }}>Khoảng giá</Typography>}/>
            <Slider 
              defaultValue={200000}
              getAriaValueText={valuetext}
              aria-label="Khoảng giá" 
              min={0} 
              max={1000000} 
              step={1000}
              marks={marks}
              valueLabelDisplay="auto" 
            />
          </ListItem>


        </List>
      </Box>
      <Box flex={8}>8</Box>
    </Box>
  );
}

export default Products;
