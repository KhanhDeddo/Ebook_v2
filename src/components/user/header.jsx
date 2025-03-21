import { Avatar, Badge, Box, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';



const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  // localStorage.removeItem("user")
  console.log(user)
  const navigate = useNavigate()
  return (
    <Stack sx={{ width: '100%', height: '100%' }}>
      <Box flex={6}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 50px 0 50px'
        }}
      >
        <Box color={'#ffffff'}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1
          }}
        >
          <MailOutlineIcon color='#fff' />
          <Typography>ebook@thanglong.edu.vn</Typography>
          <Typography>|</Typography>
          <Typography>Miễn phí ship với đơn hàng từ 100.000 đ</Typography>
        </Box>
        <Box color={'#ffffff'}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1
          }}
        >
          <PhoneIcon color='#fff' />
          <Typography>Lên hệ</Typography>
          <Typography>|</Typography>
          <Typography>Hotline: 0345755***</Typography>
        </Box>
      </Box>
      <Box flex={14}
        sx={{
          display: 'flex',
          bgcolor: '#ffff',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0 50px 0 50px'
        }}
      >
        <Box flex={3}>
          <Box
            onClick={()=>{navigate('/')}}
            sx={{
              display: 'flex',
              justifyContent: 'start',
              // bgcolor:'yellow',
              alignItems: 'center',
              gap: 1.5,
              cursor:'pointer'
            }}
          >
            <Box
              component="img"
              src="https://i.pinimg.com/736x/90/92/dc/9092dcfa11ff4873a5ab1b90271a62d6.jpg"
              alt="Mô tả ảnh"
              sx={{
                width: 50,  // Đảm bảo ảnh full chiều rộng
                height: 50, // Đảm bảo ảnh full chiều cao
                objectFit: "cover", // Lấp đầy khung mà không méo
                borderRadius: '100%',
              }}
            />
            <Typography
              sx={{
                fontSize: 40,
                fontWeight: 'bold',
                color: '#008874'
              }}
            >Ebook store</Typography>
          </Box>
        </Box>
        <Box flex={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <Typography fontWeight={500} fontSize={18} sx={{ cursor: 'pointer' }} onClick={() => { navigate('/') }} >Trang chủ</Typography>
          <Typography fontWeight={500} fontSize={18} sx={{ cursor: 'pointer' }} >Bộ sưu tập</Typography>
          <Typography fontWeight={500} fontSize={18} sx={{ cursor: 'pointer' }} onClick={() => { navigate('/products') }} >Sản phẩm</Typography>
          <Typography fontWeight={500} fontSize={18} sx={{ cursor: 'pointer' }} onClick={() => { navigate('/*') }}>Bài viết</Typography>
          <Typography fontWeight={500} fontSize={18} sx={{ cursor: 'pointer' }} onClick={() => { navigate('/*') }}>Liên hệ</Typography>
        </Box>
        <Box flex={3}
          sx={{
            display: 'flex',
            justifyContent: 'end',
            // bgcolor:'blue',
            alignItems: 'center',
            gap: 2,
          }}
        >

          <TextField
            variant="standard"
            placeholder="Tìm kiếm..."
            // value={searchValue}
            // onChange={(e)=>{setSearchValue(e.target.value)}}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              boxShadow: 1,
              border: '1 soild #fff',
              borderRadius: 2,
              transition: 'transform 0.3s ease-in-out',
              padding: 1,
              '&:hover': {
                transform: 'scale(1.05)'
              },
              '&:active': {
                transform: 'scale(1)'
              }
            }}
          />
          <Tooltip title='Giỏ hàng'
            onClick={() => { navigate('/cart') }}
            sx={{
              cursor: 'pointer',
              // bgcolor:'blue',
              padding: 0.7,
              borderRadius: '100%',
              boxShadow: 1,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.2)'
              }
            }}
          >
            <Badge badgeContent={19} color="error" borderRadius='100%'>
              <ShoppingCartIcon
                sx={{
                  color: '#008874'
                }}
              />
            </Badge>
          </Tooltip>
          <Tooltip title='Thông báo'
            onClick={() => { navigate('/cart') }}
            sx={{
              cursor: 'pointer',
              // bgcolor:'blue',
              padding: 0.7,
              borderRadius: '100%',
              boxShadow: 1,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.2)'
              }
            }}
          >
            <Badge badgeContent={9} color="error" borderRadius='100%'>
              <NotificationsIcon
                sx={{
                  color: '#008874'
                }}
              />
            </Badge>
          </Tooltip>
          <Box
            onClick={() => { 
              localStorage.removeItem("user")
              navigate('/login') }}
            sx={{
              cursor: 'pointer',
              width: 55,
              height: 55,
              boxShadow: 3,
              background: '#fff',
              borderRadius: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.2)",
              }
            }}
          >
            <Tooltip title={user? user.username:"Đăng nhập"}>
              <Avatar
                src= {user? user.image_url:""}
                sx={{ width: 50,height: 50 }}
              />
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Stack>
  )
}

export default Header;
