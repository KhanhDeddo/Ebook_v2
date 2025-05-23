import { Box, Typography, Button } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete'
import { getCarts } from '~/services/cart'
import Loading from '~/components/common/loading'
import { deleteCartItem, putCartItem } from '~/services/cartItem'
import { toast, ToastContainer } from 'react-toastify'
import { postOrder } from '~/services/orderService'
import { postOrderItem } from '~/services/orderItems'
import { useDispatch } from "react-redux";
import { toggleCheck } from "../../../redux/slices/cartSlice"

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))
  const [isload, setIsload] = useState(true)
  const [selectedProducts, setSelectedProducts] = useState([])
  const [cart, setCart] = useState([])
  const [newOrder, setNewOrder] = useState({})
  const total = selectedProducts.reduce((acc, selectedProduct) => acc + selectedProduct.price_at_time, 0)
  const handleSelectionChange = (newSelection) => {
    const selectedRows = cart.filter(row => newSelection.includes(row.id))
    setSelectedProducts(selectedRows)
  }
  const changeQuantityTang = async (row) => {
    if (row.quantity + 1 > row.stock) return toast.info('Đã đạt số lượng sản phẩm tối đa !')
    console.log(row.stock)
    const data = {
      cart_item_id: row.id,
      quantity: row.quantity + 1,
      price_at_time: row.price * (row.quantity + 1)
    }
    try {
      await putCartItem(data)
      await getCartUser()
    } catch (error) {
      console.log(error)
    }
  }
  const changeQuantityGiam = async (row) => {
    const data = {
      cart_item_id: row.id,
      quantity: row.quantity - 1,
      price_at_time: row.price * (row.quantity - 1)
    }
    try {
      data.quantity > 0 ? await putCartItem(data) : await deleteCartItem(data.cart_item_id)
      if (data.quantity < 1) toast.info(`Sách ${row.title} đã bị xóa khỏi giỏ hàng!`)
      await getCartUser()
      dispatch(toggleCheck())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    console.log(selectedProducts)
  }, [selectedProducts])

  const createOrder = async () => {
    try {
      if (selectedProducts.length === 0) {
        return toast.warning('Vui lòng chọn sản phẩm !');
      }
      console.log('aa')
      console.log(selectedProducts)
      const outOfStockItems = selectedProducts
        .filter((item) => item?.status === "Ngưng bán" || item?.stock < 1)
        .map((item) => item?.title);

      if (outOfStockItems.length > 0) {
        toast.warning(`Sách hết hàng/ngừng bán: ${outOfStockItems.join(", ")}`);
        return
      }

      const res = await postOrder(newOrder);

      if (!res || !res.success || !res.newOrder) {
        throw new Error("Tạo order thất bại!");
      }
      toast('Đang chuyển đến trang thanh toán...');
      const orderId = res.newOrder.order_id;

      // Gửi orderItems và xóa cartItem tuần tự
      const requests = selectedProducts.flatMap(item => [
        postOrderItem({
          order_id: orderId,
          cart_item_id: item.id,
          book_id: item.book_id,
          quantity: item.quantity,
          unit_price: item.price_at_time,
          discount_price: 0,
          total_price: item.price_at_time
        }),
        // deleteCartItem(item.id)
      ]);

      // Đợi tất cả orderItems và deleteCartItem hoàn thành
      const responses = await Promise.allSettled(requests);

      // Kiểm tra lỗi
      const failed = responses.filter(r => r.status === "rejected");
      if (failed.length > 0) {
        console.error("Có lỗi khi tạo orderItems hoặc xóa cartItems:", failed);
        toast.error("Một số sản phẩm không thể thêm vào đơn hàng hoặc chưa xóa khỏi giỏ hàng!");
        return;
      }

      // Khi mọi thứ đã xong, mới chuyển trang
      navigate(`/payments/${res.newOrder.order_id}`);
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };


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
        price: Book.price,
        stock: Book.stock,
        status: Book?.status
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
      res.success && toast(res.message)
      dispatch(toggleCheck())
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    setNewOrder({
      user_id: user?.user_id,
      delivery_infor_id: 1,
      status: "Chờ xác nhận",
      total_price: total,
      discount_applied: 10000,
      final_price: total
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])
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
          <Button onClick={() => { changeQuantityGiam(params.row) }} sx={{ boxShadow: 2, width: 10, height: 30, fontSize: 40, color: 'black', borderRadius: 10 }}>-</Button>
          <Typography fontSize={20} fontWeight={'bold'}>{params.value}</Typography>
          <Button onClick={() => { changeQuantityTang(params.row) }} sx={{ boxShadow: 2, width: 10, height: 30, fontSize: 20, color: 'black', borderRadius: 10 }}>+</Button>
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
          onClick={() => { handleDeleteCartItem(params.row.id) }}
          sx={{ color: 'red', cursor: 'pointer' }}
        />
      )
    },

  ]
  console.log('aaa')
  console.log(sortedRows)
  if (isload) return <Loading />
  return (
    <Box sx={{ display: 'flex', width: '100%' }} minHeight={'90vh'} maxHeight={'90vh'} gap={1}>
      <Box flex={4} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography flex={1}>Trang chủ/Giỏ hàng</Typography>
        {sortedRows.length === 0 ? <Box flex={19}
          sx={{
            gap: 5, boxShadow: 3, borderRadius: 10, margin: 1, maxWidth: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
          }}>
          <Box component={'img'} src='https://www.svgrepo.com/show/34974/shopping-cart.svg'
            sx={{ width: 200, height: 200, objectFit: 'contain', pointerEvents: 'none' }}
          /><Typography sx={{ fontSize: 28 }}>Giỏ hàng trống</Typography>
        </Box>
          : <Box flex={19} sx={{ boxShadow: 3, borderRadius: 5, margin: 1, overflow: 'hidden', maxWidth: '100%' }}>
            <DataGrid
              columns={columns}
              rowHeight={80}
              rows={sortedRows}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={handleSelectionChange}
              sx={{
                "& .MuiDataGrid-cell:focus": {
                  outline: "none",
                },
                "& .MuiDataGrid-row:focus": {
                  outline: "none",
                },
                "& .MuiDataGrid-row:focus-within": {
                  outline: "none",
                }
              }}
            />
          </Box>}
      </Box>
      <Box flex={1} sx={{
        boxShadow: 3, margin: 1, marginTop: 5, height: '100%',
        width: '100%', borderRadius: 5, display: 'flex', flexDirection: 'column',
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ width: 110, fontSize: 17, fontWeight: 550, color: 'rebeccapurple' }} >Số lượng</Typography>
            <Typography sx={{ fontSize: 17, fontWeight: 550, color: 'rebeccapurple', minWidth: 110 }} >{selectedProducts.length}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ width: 110, fontSize: 17, fontWeight: 550, color: 'rebeccapurple' }} >Phí delivery</Typography>
            <Typography sx={{ fontSize: 17, fontWeight: 550, color: 'rebeccapurple', minWidth: 110 }} >{`0đ`}</Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Typography sx={{ width: 110, fontSize: 17, fontWeight: 550, color: 'rebeccapurple' }} >Thành tiền</Typography>
            <Typography sx={{ fontSize: 17, fontWeight: 550, color: 'rebeccapurple', minWidth: 110 }} >{`${total.toLocaleString('vi-VN')}đ`}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5, pt: 2 }}>
          <Button
            onClick={() => { createOrder() }}
            sx={{
              minWidth: 180,
              height: 50,
              borderRadius: 3,
              background: "linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%)",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0px 4px 10px rgba(54, 209, 220, 0.3)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)",
                boxShadow: "0px 6px 15px rgba(54, 209, 220, 0.5)",
                transform: "translateY(-2px)"
              },
              "&:active": {
                transform: "translateY(2px)",
                boxShadow: "0px 2px 5px rgba(54, 209, 220, 0.2)"
              }
            }}
          >
            <Typography fontSize={20} fontWeight={'bold'}>Đặt hàng</Typography>
          </Button>
        </Box>
      </Box>
      <ToastContainer autoClose={3000} />
    </Box>
  );
}

export default Cart;
