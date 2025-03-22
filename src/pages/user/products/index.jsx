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
import { Box, ListItem, Pagination } from '@mui/material';
import Slider from '@mui/material/Slider';
import { getCategories } from '~/services/categoryService';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getBooks } from '~/services/productService';
import CardProduct from '~/components/user/cardProduct';
import Loading from '~/components/common/loading';
import { Delete } from '@mui/icons-material';

const classLvs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const Products = () => {
  const navigate = useNavigate()
  const [isload, setIsload] = React.useState(true)
  const [searchParams] = useSearchParams()
  const search = searchParams.get("search")
  const [openCategory, setOpenCategory] = React.useState(false)
  const [openClass, setOpenClass] = React.useState(false)
  const [maxPrice, setMaxPrice] = React.useState(500000)
  const [selectcgr, setSelectcgr] = React.useState()
  const [selectcls, setSelectcls] = React.useState('')
  const [products, setProducts] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [dataBooks, SetDataBooks] = React.useState([])
  const [page, setPage] = React.useState(1)
  const handleClickCategory = () => { setOpenCategory(!openCategory) }
  const handleClickClass = () => { setOpenClass(!openClass) }

  React.useEffect(() => {
    const fechData = async () => {
      try {
        setIsload(true)
        setCategories(await getCategories())
        SetDataBooks(await getBooks())
      } catch (error) {
        console.log(error)
      } finally { setIsload(false) }
    }
    fechData()
  }, [])
  React.useEffect(() => {
    const fetchData = async () => {
        try {
            setProducts(dataBooks.filter((book) =>
              book?.price < maxPrice 
              &&(!selectcgr || book?.category === selectcgr)
              &&(!search || book?.title.toLowerCase().includes(search))
              &&(!selectcls ||  book?.title.toLowerCase().includes(selectcls))
            ))
        } catch (error) { console.log(error);} 
    }
    fetchData()
  }, [search, maxPrice,selectcgr,selectcls,dataBooks])

  
  const breadcrumbs = [
    <Typography key="home" sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Trang chủ</Typography>,
    <Typography key="products" sx={{ color: 'black', fontSize: 16.5 }}>Sản phẩm</Typography>,
  ]
  // if(isload) return <Loading/>
  return (
    <Box sx={{ width: '100%', minHeight: '150vh', display: 'flex', overflow: 'hidden' }}>
      <Box flex={2} sx={{ overflow: 'hidden', padding: 1 }} >
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', color: '#008874', boxShadow: 2, borderRadius: 2 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={<ListSubheader sx={{ fontSize: 40, fontWeight: 'bold', color: '#008874', pb: 5, pt: 3 }}>Bộ lọc</ListSubheader>}
        >
          <ListItemButton onClick={handleClickCategory}>
            <ListItemIcon><CategoryIcon sx={{ color: '#008874' }} /></ListItemIcon>
            <ListItemText primary="Danh mục sản phẩm" />
            {openCategory ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCategory} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {categories.map((item, index) => (
                <ListItemButton key={index} sx={{ pl: 4 }} onClick={()=>{setSelectcgr(item.name)}}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          <ListItemButton onClick={handleClickClass}>
            <ListItemIcon><CategoryIcon sx={{ color: '#008874' }} /></ListItemIcon>
            <ListItemText primary="Danh mục Lớp" />
            {openClass ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openClass} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {classLvs.map((item, index) => (
                <ListItemButton key={index} sx={{ pl: 4 }} onClick={()=>{setSelectcls(item)}}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary={`Lớp ${item}`} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>

          <ListItem sx={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 1, padding: '0 50px 0 20px' }}>
            <ListItemText primary={<Typography variant="body1" sx={{ fontSize: 20, fontWeight: 600 }}>Khoảng giá</Typography>} />
            <Slider
              value={maxPrice/1000}
              onChange={(event,value) => {setMaxPrice(value*1000)}}
              getAriaValueText={(value) => `${value} VND`}
              defaultValue={maxPrice}
              aria-label="Khoảng giá"
              min={0}
              max={500}
              step={1}
              marks={[
                { value: 0, label: "0K" },
                { value: 500, label: "500K" },
              ]}
              valueLabelDisplay="auto"
              sx={{
                color: '#52af77',
                height: 8,
                '& .MuiSlider-track': {
                  border: 'none',
                },
                '& .MuiSlider-thumb': {
                  height: 24,
                  width: 24,
                  backgroundColor: '#fff',
                  border: '2px solid currentColor',
                  '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                    boxShadow: 'inherit',
                  },
                  '&::before': {
                    display: 'none',
                  },
                },
                '& .MuiSlider-valueLabel': {
                  lineHeight: 1.2,
                  fontSize: 12,
                  background: 'unset',
                  padding: 1.2,
                  width: 35,
                  height: 35,
                  borderRadius: '50% 50% 50% 0',
                  backgroundColor: '#52af77',
                  transformOrigin: 'bottom left',
                  transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
                  '&::before': { display: 'none' },
                  '&.MuiSlider-valueLabelOpen': {
                    transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
                  },
                  '& > *': {
                    transform: 'rotate(45deg)',
                  }
                }
              }}
            />
            <Typography fontSize={17}>Giá tối đa: {maxPrice.toLocaleString()} VND</Typography>
          </ListItem>
          <ListItem sx={{display:'flex', flexDirection:'column', justifyContent:'start', padding: '0 50px 0 20px', alignItems: "stretch" }}>
            <ListItemText primary={<Typography sx={{ fontSize: 20, fontWeight: 600 }}>Đang lọc theo</Typography>} />
            {selectcgr && 
              <ListItem sx={{display:'flex', justifyContent:'space-between'}}>
                <ListItemText primary={<Typography variant="body1" sx={{ fontSize: 15, fontWeight: 400 }}>{selectcgr}</Typography>} />
                <ListItemButton onClick={()=>{setSelectcgr('')}} sx={{justifyContent:'center'}}><Delete/></ListItemButton>
              </ListItem>
            }
            {selectcls && 
              <ListItem sx={{display:'flex', justifyContent:'space-between'}}>
                <ListItemText primary={<Typography variant="body1" sx={{ fontSize: 15, fontWeight: 400 }}>{`Lớp ${selectcls}`}</Typography>} />
                <ListItemButton onClick={()=>{setSelectcls('')}} sx={{justifyContent:'center'}}><Delete/></ListItemButton>
              </ListItem>
            }
          </ListItem>
        </List>
      </Box>
      <Box flex={8}>
        <Box sx={{ minHeight: '90%' }}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb"> {breadcrumbs} </Breadcrumbs>
          {isload ? <Loading /> :
            <Box>
              {products?.length < 1 ? <Box flex={5} sx={{ padding: 8 }}><Typography fontSize={17}>Không tìm thấy sản phẩm phù hợp...</Typography></Box> :
                <Box sx={{ display: 'flex', flexWrap: 'wrap', margin: 'auto', paddingLeft: 5, }}>
                  {products.slice((page - 1) * 20, page * 20).map((product, index) => (
                    <CardProduct key={index} book={product} mg={1} />
                  ))}
                </Box>
              }
            </Box>
          }
        </Box>
        {products && products?.length > 20 &&
          <Pagination count={Math.ceil(products?.length / 20)}
            onChange={(event, value) => { setPage(value) }}
            variant="outlined" color="secondary"
            sx={{ display: 'flex', justifyContent: 'center', padding: 3 }}
          />}
      </Box>
    </Box>
  );
}

export default Products;
