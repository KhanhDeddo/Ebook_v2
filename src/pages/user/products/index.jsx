import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import CategoryIcon from '@mui/icons-material/Category';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Box, ListItem, Pagination} from '@mui/material';
import Slider from '@mui/material/Slider';
import { getCategories } from '~/services/categoryService';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getBooks } from '~/services/productService';
import CardProduct from '~/components/user/cardProduct';
import Loading from '~/components/common/loading';

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
  const [isload, setIsload] = React.useState(true)
  const [searchParams] = useSearchParams()
  const search = searchParams.get("search")
  const [open, setOpen] = React.useState(false)
  const [products, setProducts]  = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [page, setPage] = React.useState(1)
  const handleClick = () => { setOpen(!open) }
  React.useEffect(()=>{
    const fechData = async () => {
      try {
        setCategories(await getCategories())
        setProducts(await getBooks(search))
      } catch (error) {
        console.log(error)
      } finally { setIsload(false) }
    }
    fechData()
  },[search])

  const breadcrumbs = [
    <Typography key="home" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Trang chủ</Typography>,
    <Typography key="products" sx={{ color: 'black', fontSize: 16.5 }}>Sản phẩm</Typography>,
  ]
  if(isload) return <Loading/>
  return (
    <Box sx={{
      width: '100%',
      minHeight: '150vh',
      display: 'flex',
      overflow:'hidden'
    }}>
      <Box flex={2}
        sx={{
          // bgcolor: 'lightgray',
          overflow:'hidden',
          padding:1
        }}
      >
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', color:'#008874', boxShadow:2, borderRadius:2 }}
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
                  <ListItemIcon onClick={()=>{}}>
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
        <Box sx={{minHeight:'90%'}}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb"> {breadcrumbs} </Breadcrumbs>
          <Box sx={{display:'flex', flexWrap:'wrap', margin: 'auto', paddingLeft:5,}}>
            {products.slice((page-1)*28,page*28).map((product, index)=>(
              <CardProduct key={index} book={product} mg={1}/>
            ))}
          </Box>
        </Box>
        {products && products?.length>28 && 
        <Pagination count={Math.ceil(products?.length / 28)}
          onChange={(event, value) =>{setPage(value)}}
          variant="outlined" color="secondary" 
          sx={{display:'flex', justifyContent:'center', padding:3}}
        /> }
      </Box>
    </Box>
  );
}

export default Products;
