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
import { useNavigate } from 'react-router-dom'



const CardProduct = ({ book, mg = 3 }) => {
  const navigate = useNavigate()
  return (
    <Card onClick = {()=>{navigate(`/products/${book.book_id}`)}}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: 230,
        maxWidth: 230,
        borderRadius: 3,
        boxShadow: 3,
        padding: 1,
        gap: 1,
        margin:mg,
        cursor:'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': { transform: 'scale(1.07)' }
    }}>
      <Box
        component="img"
        src={book.image_url}
        alt="Book Cover"
        sx={{ width: 230, height: 270, borderRadius: 2 }}
      />
      <CardContent sx={{ padding: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Typography sx={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}>{book.price.toLocaleString("vi-VN")}đ</Typography>
          <Chip label="-20%" size="small" sx={{ ml: 1, backgroundColor: '#f4f4f4', fontSize: 12 }} />
        </Box>

        <Typography sx={{ fontSize: 16, fontWeight: 'bold', mb: 1 }}>{book.title.slice(0, 26)}</Typography>
        <Typography sx={{ fontSize: 16, fontWeight: 'bold', mb: 1 }}>SGK {book.category}</Typography>
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
