import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import CategoryIcon from '@mui/icons-material/Category';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Box, ListItem} from '@mui/material';
import Slider from '@mui/material/Slider';
import { getCategories } from '~/services/categoryService';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(true)
  const [categories, setCategories] = React.useState([])
  const handleClick = () => { setOpen(!open) }
  React.useEffect(()=>{
    const fechCategories = async () => {
      const data = await getCategories()
      setCategories(data)
    }
    fechCategories()
  },[])
  React.useEffect(() => {
    console.log(categories);
  }, [categories]);

  const breadcrumbs = [
    <Typography sx={{cursor:'pointer' }} onClick={()=>{navigate('/')}} >Trang chủ</Typography>,
    <Typography sx={{color:'black', fontSize:16.5}}>Sản phẩm</Typography>,
  ];
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
              {categories.map((item,index)=>(
                <ListItemButton key={index} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon><CategoryIcon sx={{color:'#008874'}} /></ListItemIcon>
            <ListItemText primary="Danh mục sản phẩm" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {categories.map((item,index)=>(
                <ListItemButton key={index} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon><CategoryIcon sx={{color:'#008874'}} /></ListItemIcon>
            <ListItemText primary="Danh mục sản phẩm" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {categories.map((item,index)=>(
                <ListItemButton key={index} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
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
      <Box flex={8}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
      </Box>
    </Box>
  );
}

export default Products;
