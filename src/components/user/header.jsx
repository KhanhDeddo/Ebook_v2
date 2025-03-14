import { Avatar, Badge, Box, InputAdornment, Stack, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';



const Header = () => {
  const navigate = useNavigate()
  return (
   <Stack sx={{width:'100%',height:'100%'}}>
      <Box
        sx={{
          flex:6,
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center',
          padding:'0 50px 0 50px'
        }}
      >
        <Box color={'#ffffff'}
          sx={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            gap:1
          }}
        >
          <MailOutlineIcon color='#fff'/>
          <Typography>ebook@thanglong.edu.vn</Typography>
          <Typography>|</Typography>
          <Typography>Miễn phí ship với đơn hàng từ 100.000 đ</Typography>
        </Box>
        <Box color={'#ffffff'}
          sx={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            gap:1
          }}
        >
          <PhoneIcon color='#fff'/>
          <Typography>Lên hệ</Typography>
          <Typography>|</Typography>
          <Typography>Hotline: 0345755***</Typography>
        </Box>
      </Box>
      <Box
    sx={{
      flex:14,
      display:'flex',
      bgcolor:'#ffff',
      justifyContent:'center',
      alignItems:'center',
      padding:'0 50px 0 50px'
    }}
   >
    <Box flex={3}>
      <Box
        sx={{
          display:'flex',
          justifyContent:'start',
          // bgcolor:'yellow',
          alignItems:'center',
          gap:2,
        }}
      >
        <Box
          component="img"
          src="https://i.pinimg.com/736x/ab/86/aa/ab86aa9088a744dd93209f69e17b6c60.jpg"
          alt="Mô tả ảnh"
          sx={{
            width: 50,  // Đảm bảo ảnh full chiều rộng
            height: 50, // Đảm bảo ảnh full chiều cao
            objectFit: "cover", // Lấp đầy khung mà không méo
            borderRadius: 5,
          }}
        />
        <Typography
          sx={{
            fontSize:30,
            fontWeight:'bold',
            color:'#008874'
          }}
        >Ebook store</Typography>
      </Box>
    </Box>
    <Box flex={4}
      sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:4,
      }}
    >
      <Typography fontWeight={500} fontSize={18} sx={{cursor:'pointer'}} onClick={()=>{navigate('/')}} >Trang chủ</Typography>
      <Typography fontWeight={500} fontSize={18} sx={{cursor:'pointer'}} >Bộ sưu tập</Typography>
      <Typography fontWeight={500} fontSize={18} sx={{cursor:'pointer'}} >Sản phẩm</Typography>
      <Typography fontWeight={500} fontSize={18} sx={{cursor:'pointer'}} >Bài viết</Typography>
      <Typography fontWeight={500} fontSize={18} sx={{cursor:'pointer'}} >Liên hệ</Typography>
    </Box>
    <Box flex={3}
      sx={{
        display:'flex',
        justifyContent:'end',
        // bgcolor:'blue',
        alignItems:'center',
        gap:2,
      }}
    >
      
      <TextField
        variant="standard"
        placeholder="Tìm kiếm..."
        // value={searchValue}
        // onChange={(e)=>{setSearchValue(e.target.value)}}
        InputProps={{
          disableUnderline:true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          boxShadow:1,
          border:'1 soild #fff',
          borderRadius:2,
          transition:'transform 0.3s ease-in-out',
          padding:1,
          '&:hover':{
            transform:'scale(1.05)'
          },
          '&:active':{
            transform:'scale(1)'
          }
        }}
      />
      <Tooltip title='Giỏ hàng'
        onClick={()=>{navigate('/cart')}}
        sx={{cursor:'pointer',
          // bgcolor:'blue',
          padding:0.7,
          borderRadius:'100%',
          boxShadow:1,
          transition: 'transform 0.2s ease-in-out',
          '&:hover':{
            transform: 'scale(1.2)'
          }
        }}
      >
      <Badge badgeContent={19} color="error" borderRadius='100%'>
        <ShoppingCartIcon
          sx={{
            color:'#008874'
          }}
        />
      </Badge>
      </Tooltip>
      <Tooltip title='Thông báo'
        onClick={()=>{navigate('/cart')}}
        sx={{cursor:'pointer',
          // bgcolor:'blue',
          padding:0.7,
          borderRadius:'100%',
          boxShadow:1,
          transition: 'transform 0.2s ease-in-out',
          '&:hover':{
            transform: 'scale(1.2)'
          }
        }}
      >
      <Badge badgeContent={9} color="error" borderRadius='100%'>
        <NotificationsIcon
          sx={{
            color:'#008874'
          }}
        />
      </Badge>
      </Tooltip>
      <Box
        onClick={() => {navigate('/login')}}
        sx={{
          cursor:'pointer',
          width:55,
          height:55,
          boxShadow:3,
          background:'#fff',
          borderRadius:'100%',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.2)",
          }
        }}
      >
        <Tooltip title="Đăng nhập">
          <Avatar 
            src='https://i.pinimg.com/736x/d4/e8/ae/d4e8aea335b9642fc13e2838722d82e2.jpg'
            sx={{
              width:50,
              height:50
            }}
          />
        </Tooltip>     
      </Box>
    </Box>
   </Box> 
   </Stack>
  )
}

export default Header;
