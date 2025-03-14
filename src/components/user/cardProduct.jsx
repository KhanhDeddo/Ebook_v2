import * as React from 'react'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'



const CardProduct = () => {
  return (
    <Card sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minWidth: 230,
      maxWidth: 240,
      borderRadius: 3,
      boxShadow: 3,
      padding: 1,
      gap: 1,
      margin:3,
      transition: 'transform 0.2s ease-in-out',
      '&:hover': { transform: 'scale(1.07)' }
    }}>
      <Box
        component="img"
        src="https://hieusach24h.com/wp-content/uploads/2021/09/Ngu-van-10-tap-2-1.jpg"
        alt="Book Cover"
        sx={{ width: 230, height: 270, borderRadius: 2 }}
      />
      <CardContent sx={{ padding: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography sx={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}>140.000đ</Typography>
          <Chip label="-20%" size="small" sx={{ ml: 1, backgroundColor: '#f4f4f4', fontSize: 12 }} />
        </Box>

        <Typography sx={{ fontSize: 16, fontWeight: 'bold', mb: 1 }}>Lê Minh Khuê - Tuyển Tập Truyện Ngắn</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating name="half-rating" defaultValue={4.5} precision={0.5} readOnly sx={{ fontSize: 16 }} />
          <Typography sx={{ fontSize: 14, color: 'text.secondary', ml: 1 }}>|</Typography>
          <Typography sx={{ fontSize: 14, color: 'text.secondary', ml: 1 }}>Đã bán 119</Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Chip icon={<LocalShippingIcon />} label="Hỏa tốc 2h" color="error" sx={{ fontWeight: 600, fontSize: 14 }} />
        <Box
          display={'flex'}
          gap={1.5}
        >
          <FavoriteBorderIcon sx={{ cursor: 'pointer', color: 'error.main' }} />
          <AddShoppingCartIcon sx={{ cursor: 'pointer', color: 'primary.main' }} />
        </Box>
      </CardActions>
    </Card>
  )
}

export default CardProduct;
