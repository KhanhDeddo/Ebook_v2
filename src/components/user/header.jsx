import { Badge, Box, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';
import UserAvatarMenu from '../common/userAvatarMenu';
import _ from "lodash"
import { useSelector } from "react-redux"
import { getCarts } from '~/services/cart';


const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const pathSegments = location.pathname.split("/")
  const pageSegment = pathSegments[1]
  const checkStatus = useSelector((state) => state.cart.checkChainQuantityCartItems)
  const [cart, setCart] = useState({})

  const handlKeyDow = (e) => {
    console.log('hha' + search)
    if (!e.target.value && pageSegment === 'products') navigate(`/products`, { replace: true })
  }
  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.trim()) {
        navigate(`/products?search=${search}`);
      }
    }, 500)
    return () => clearTimeout(delay)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])
  useEffect(()=>{
    if(pathSegments[2]) setSearch('')
  },[pathSegments])
  console.log(pathSegments)

  useEffect(() => {
    const getData = async () => {
      const data = await getCarts(user.user_id)
      setCart(data)
      console.log(data)
    }
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkStatus])
  return (
    <Stack sx={{ width: '100%', height: '100%' }}>
      <Box flex={6} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 50px 0 50px' }}>
        <Box color={'#ffffff'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
          <MailOutlineIcon color='#fff' />
          <Typography>ebook@thanglong.edu.vn</Typography>
          <Typography>|</Typography>
          <Typography>Miễn phí ship với đơn hàng từ 100.000 đ</Typography>
        </Box>
        <Box color={'#ffffff'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }} >
          <PhoneIcon color='#fff' />
          <Typography>Lên hệ</Typography>
          <Typography>|</Typography>
          <Typography>Hotline: 0345755***</Typography>
        </Box>
      </Box>
      <Box flex={14}
        sx={{ display: 'flex', bgcolor: '#ffff', justifyContent: 'center', alignItems: 'center', padding: '0 50px 0 50px' }} >
        <Box flex={3}>
          <Box onClick={() => { navigate('/') }}
            sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}>
            <Box
              component="img"
              src="https://i.pinimg.com/736x/90/92/dc/9092dcfa11ff4873a5ab1b90271a62d6.jpg"
              sx={{ width: 50, height: 50, objectFit: "cover", borderRadius: '100%' }} />
            <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: '#008874' }}>Ebook store</Typography>
          </Box>
        </Box>
        <Box flex={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, }}>
          <Typography fontWeight={500} fontSize={18} sx={{ cursor: 'pointer' }} onClick={() => { navigate('/') }} >Trang chủ</Typography>
          <Typography fontWeight={500} fontSize={18} sx={{ cursor: 'pointer' }} >Bộ sưu tập</Typography>
          <Typography fontWeight={500} fontSize={18} sx={{ cursor: 'pointer' }} onClick={() => { navigate('/products') }} >Sản phẩm</Typography>
          <Typography fontWeight={500} fontSize={18} sx={{ cursor: 'pointer' }} onClick={() => { navigate('/*') }}>Bài viết</Typography>
          <Typography fontWeight={500} fontSize={18} sx={{ cursor: 'pointer' }} onClick={() => { navigate('/*') }}>Liên hệ</Typography>
        </Box>
        <Box flex={3} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', gap: 2, }}>
          <TextField
            variant="standard"
            placeholder="Tìm kiếm..."
            value={search}
            onChange={(e) => {setSearch(e.target.value)}}
            onKeyDown={handlKeyDow}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ cursor: 'pointer' }} onClick={() => { search && navigate(`/products?search=${search}`) }} />
                </InputAdornment>
              ),
            }}
            sx={{
              boxShadow: 1, border: '1 soild #fff', borderRadius: 2, transition: 'transform 0.3s ease-in-out', padding: 1,
              '&:hover': { transform: 'scale(1.05)' },
              '&:active': { transform: 'scale(1)' }
            }}
          />
          <Tooltip title='Giỏ hàng'
            onClick={() => { navigate('/cart') }}
            sx={{
              cursor: 'pointer', padding: 0.7, borderRadius: '100%', boxShadow: 1, transition: 'transform 0.2s ease-in-out',
              '&:hover': { transform: 'scale(1.2)' }
            }}
          >
            <Badge badgeContent={cart?.cartItems?.length} color="error" >
              <ShoppingCartIcon sx={{ color: '#008874' }} />
            </Badge>
          </Tooltip>
          <Tooltip title='Thông báo'
            onClick={() => { navigate('/cart') }}
            sx={{ cursor: 'pointer', padding: 0.7, borderRadius: '100%', boxShadow: 1, transition: 'transform 0.2s ease-in-out', '&:hover': { transform: 'scale(1.2)' } }}
          >
            <Badge badgeContent={0} color="error">
              <NotificationsIcon sx={{ color: '#008874' }} />
            </Badge>
          </Tooltip>
        </Box>
        <UserAvatarMenu user={user} />
      </Box>
    </Stack>
  )
}

export default Header
