import { Box, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import PaymentIcon from '@mui/icons-material/Payment'
import PixIcon from '@mui/icons-material/Pix'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { getCarts } from '~/services/cart'
import Loading from '~/components/common/loading'
import { deleteCartItem } from '~/services/cartItem'
import { toast, ToastContainer } from 'react-toastify'

const Cart = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [isload, setIsload] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [cart, setCart] = useState([])
  const handleSelectionChange = (newSelection) => {
    setSelectedProducts(newSelection)
  }
  useEffect(() => {
    console.log(selectedProducts)
  }, [selectedProducts])

  const getCartUser = async () => {
    try {
      if (!user) return
      const data = await getCarts(user?.user_id)
      console.log(data)
      setCart(data.cartItems.map(({ cart_item_id, Book, ...rest }) => ({
        id: cart_item_id,
        ...rest,
        title: Book.title,
        image_url: Book.image_url,
        price: Book.price
      })))
    } catch (error) {
      console.log(error)
    } finally { setIsload(false) }
  }

  useEffect(() => {
    getCartUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDeleteCartItem = async (id) => {
    try {
      console.log(id)
      const res = await deleteCartItem(id)
      await getCartUser()
      res.success ? toast(res.message) : toast.error('Lỗi ' + res.message)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log("Updated Cart:", cart)

  }, [cart])
  const sortedRows = [...cart].sort((a, b) => new Date(b.create_at) - new Date(a.create_at));

  const columns = [
    {
      field: "id",
      headerName: "Mã SP",
      flex: 0.5,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
    },
    {
      field: "title",
      headerName: "Tên sản phẩm",
      flex: 1
    },
    {
      field: "image_url",
      headerName: "Hình ảnh",
      flex: 1,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
      renderCell: (params) => (
        <img
          src={params.value}
          style={{ width: 50, height: 70, objectFit: "cover", borderRadius: 5 }}
        />
      )
    },
    {
      field: "price",
      headerName: "Giá",
      flex: 1,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography>{params.value.toLocaleString('vi-VN')}đ</Typography>
      )
    },
    {
      field: "quantity",
      headerName: "Số lương",
      flex: 1,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.5, margin: 5, padding: 5 }}>
          <Button sx={{ boxShadow: 2, width: 10, height: 30, fontSize: 40, color: 'black', borderRadius: 10 }}>-</Button>
          <Typography fontSize={20} fontWeight={'bold'}>{params.value}</Typography>
          <Button sx={{ boxShadow: 2, width: 10, height: 30, fontSize: 20, color: 'black', borderRadius: 10 }}>+</Button>

        </Box>
      )
    },
    {
      field: "price_at_time",
      headerName: "Thành tiền",
      flex: 1,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography>{params.value.toLocaleString('vi-VN')}đ</Typography>
      )
    },
    {
      field: "operater",
      headerName: "Thao tác",
      flex: 0.5,
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
      renderCell: (params) => (
        <DeleteIcon
          boxShadow={3}
          onClick={() => { handleDeleteCartItem(params.row.id) }}
          sx={{ color: 'red', cursor: 'pointer' }}
        />
      )
    },

  ]

  if (isload) return <Loading />
  return (
    <Box sx={{ display: 'flex' }} minHeight={'90vh'} maxHeight={'90vh'} gap={1}>
      <Box flex={4} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography flex={1}>Trang chủ/Giỏ hàng</Typography>
        <Box flex={19} sx={{ boxShadow: 3, borderRadius: 1, margin: 1, overflow: 'hidden', maxWidth: '100%' }}>
          <DataGrid
            columns={columns}
            rowHeight={80}
            rows={sortedRows}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={handleSelectionChange}
          />
        </Box>
      </Box>
      <Box flex={1} sx={{
        boxShadow: 3, margin: 1, marginTop: 5, height: '100%',
        width: '100%', borderRadius: 5, display: 'flex', flexDirection: 'column',
      }}>
        <Box sx={{ paddingTop: 3, paddingLeft: 3, display: 'flex', gap: 5 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography
              sx={{
                fontSize: 18, fontWeight: 'bold', color: 'royalblue', display: 'flex',
                alignItems: 'center', gap: 1
              }}><PixIcon /> Số lượng</Typography>
            <Typography
              sx={{
                fontSize: 18, fontWeight: 'bold', color: 'royalblue', display: 'flex',
                alignItems: 'center', gap: 1
              }}><PixIcon /> Phí ship</Typography>
            <Typography
              sx={{
                fontSize: 18, fontWeight: 'bold', color: 'royalblue', display: 'flex',
                alignItems: 'center', gap: 1
              }}><PixIcon /> Phí VAT</Typography>
            <Typography
              sx={{
                fontSize: 18, fontWeight: 'bold', color: 'royalblue', display: 'flex',
                alignItems: 'center', gap: 1
              }}><PixIcon /> Thành tiền</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
            <Typography sx={{ fontSize: 17, fontWeight: 550, color: 'rebeccapurple' }} >12</Typography>
            <Typography sx={{ fontSize: 17, fontWeight: 550, color: 'rebeccapurple' }}>0đ</Typography>
            <Typography sx={{ fontSize: 17, fontWeight: 550, color: 'rebeccapurple' }}>10%</Typography>
            <Typography sx={{ fontSize: 17, fontWeight: 550, color: 'rebeccapurple' }}>1902000</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
          <Button variant="outlined"
            onClick={() => { navigate('/payments') }}
            sx={{
              marginTop: 5, bgcolor: '#008874', color: '#fff',
              borderColor: '#008874', fontSize: 17, fontWeight: 'bold',
              borderRadius: 10,
              boxShadow: 5,
              gap: 2,
            }}>
            <PaymentIcon />
            Thanh toán</Button>
        </Box>
      </Box>
      <ToastContainer autoClose={3000} />
    </Box>
  );
}

export default Cart;
