
import { Box, Button, FormControl, FormControlLabel, InputBase, Radio, RadioGroup, Typography } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import Loading from '~/components/common/loading';
import { deleteOrder, getOrders, putOrder } from '~/services/orderService';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteCartItem } from '~/services/cartItem';
import { toast, ToastContainer } from 'react-toastify';
import { zalopay } from '~/services/zalopay';
import { useDispatch } from "react-redux";
import { toggleCheck } from "../../../redux/slices/cartSlice"
const Payments = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))
  const [isload, setIsLoad] = useState(true)
  const [order, setOrder] = useState()
  const [orderItems, setOrderItems] = useState([])
  useEffect(() => {
    const fechData = async () => {
      try {
        const data = await getOrders(user.user_id, id)
        setOrder(data)
      } catch (error) {
        console.log(error)
      } finally { setIsLoad(false) }
    }
    fechData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(order)
  useEffect(() => {
    setOrderItems(order?.OrderItems.map(({ order_item_id, Book, ...rest }) => ({
      id: order_item_id,
      ...rest,
      title: Book.title,
      image_url: Book.image_url,
      price: Book.price
    })))
  }, [order])
  const handleCancel = async () => {
    try {
      await deleteOrder(order.order_id)
      navigate('/cart')
    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = async () => {
    try {
      if(!order.name || !order.phone || !order.address || !order.payment_method)  return toast.warning("Vui lòng nhập đủ dữ liệu !")
      const requests = orderItems.flatMap(item => [
        item.cart_item_id && deleteCartItem(item.cart_item_id)
      ])
      dispatch(toggleCheck())
      await Promise.allSettled(requests)
      await putOrder(order)
      console.log(order.payment_method)
      if(order.payment_method==="Zalopay"){
          toast.loading("Đang đến trang thanh toán...")
          const res = await zalopay({username:user.username, amount: order.total_price, transID:order.transID})
          window.location.href = res.pay_url
      }else{
      toast('Đặt hàng thành công.Đi đến trang quản lý đơn hàng sau 2s... ')
      setTimeout(() => {
        navigate('/orders');
      }, 2000)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target; // Lấy name và value từ input
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value, // Cập nhật giá trị mới theo trường
    }));
  };
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
          style={{ width: 50, height: 65, objectFit: "cover", borderRadius: 5 }}
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
    },
    {
      field: "total_price",
      headerName: "Thành tiền",
      flex: 1,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography>{params.value.toLocaleString('vi-VN')}đ</Typography>
      )
    }
  ]
  useEffect(()=>{console.log(order)},[order])
  if (isload) return <Loading />
  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Box sx={{ width: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 'bold', color: '#008874', padding: 3 }}>Thông tin đơn hàng</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', height: '100%', width: '100%', flexDirection: 'column', padding: 2 }}>
          <Box flex={1} sx={{ padding: 1, gap: 1, display: 'flex', flexDirection: 'column', pl: 3 }}>
            <Box sx={{ width: '50%', display: 'flex', boxShadow: 3, alignItems: 'center', borderRadius: 5, paddingLeft: 3 }}>
              <Typography sx={{ minWidth: 150 }}>Mã đơn hàng</Typography>
              <InputBase sx={{ flex: 1, boxShadow: 3, borderRadius: 5, padding: 1, pl: 3 }} value={order.transID} readOnly />
            </Box>
            <Box sx={{ width: '50%', display: 'flex', boxShadow: 3, alignItems: 'center', borderRadius: 5, paddingLeft: 3 }}>
              <Typography sx={{ minWidth: 150 }}>Tổng sản phẩm</Typography>
              <InputBase sx={{ flex: 1, boxShadow: 3, borderRadius: 5, padding: 1, pl: 3 }} value={order.OrderItems.length} readOnly />
            </Box>
            <Box sx={{ width: '50%', display: 'flex', boxShadow: 3, alignItems: 'center', borderRadius: 5, paddingLeft: 3 }}>
              <Typography sx={{ minWidth: 150 }}>Tổng thành tiền</Typography>
              <InputBase sx={{ flex: 1, boxShadow: 3, borderRadius: 5, padding: 1, pl: 3 }} value={`${order.total_price.toLocaleString("vi-VN")} đ`} readOnly />
            </Box>
          </Box>
          <Box flex={7} maxHeight={'60vh'} maxWidth={'780px'}>
            <DataGrid
              columns={columns}
              rows={orderItems}
              rowHeight={70}
              sx={{ boxShadow: 2, borderRadius: 5 }}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, gap: 2 }} >
        <Typography sx={{ fontSize: 24, fontWeight: 'bold', color: '#008874', padding: 3 }}>Thông tin khách hàng</Typography>
        <Box sx={{ width: '95%', display: 'flex', boxShadow: 3, alignItems: 'center', borderRadius: 5, paddingLeft: 3 }}>
          <Typography sx={{ minWidth: 180 }}>Người đặt hàng</Typography>
          <InputBase sx={{ flex: 1, boxShadow: 3, borderRadius: 5, padding: 1, pl: 3 }} value={user.username} readOnly />
        </Box>
        <Box sx={{ width: '95%', display: 'flex', boxShadow: 3, alignItems: 'center', borderRadius: 5, paddingLeft: 3 }}>
          <Typography sx={{ minWidth: 180 }}>Người nhận đơn</Typography>
          <InputBase onChange={handleChange} sx={{ flex: 1, boxShadow: 3, borderRadius: 5, padding: 1, pl: 3 }} name='name' value={order.name || ""} />
        </Box>
        <Box sx={{ width: '95%', display: 'flex', boxShadow: 3, alignItems: 'center', borderRadius: 5, paddingLeft: 3 }}>
          <Typography sx={{ minWidth: 180 }}>Số điện thoại</Typography>
          <InputBase onChange={handleChange} sx={{ flex: 1, boxShadow: 3, borderRadius: 5, padding: 1, pl: 3 }} name='phone' value={order.phone || ""} />
        </Box>
        <Box sx={{ width: '95%', display: 'flex', boxShadow: 3, alignItems: 'center', borderRadius: 5, paddingLeft: 3 }}>
          <Typography sx={{ minWidth: 180 }}>Địa chỉ</Typography>
          <InputBase onChange={handleChange} sx={{ flex: 1, boxShadow: 3, borderRadius: 5, padding: 1, pl: 3 }} name='address' value={order.address || ""} />
        </Box>
        <Box sx={{ width: '95%', display: 'flex', boxShadow: 3, alignItems: 'center', borderRadius: 5, paddingLeft: 3 }}>
          <Typography sx={{ minWidth: 180 }}>Phương thức thanh toán</Typography>
          <FormControl sx={{ flex: 1, boxShadow: 3, borderRadius: 5, padding: '6px 20px 6px 50px' }}>
            <RadioGroup row
              sx={{ display: 'flex', gap: 5, justifyContent: 'center' }}
              name="payment_method"
              value={order.payment_method || ""}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Tiền mặt"
                control={<Radio icon={<Box component="img"
                  src="https://www.svgrepo.com/show/406653/money-with-wings.svg"
                  sx={{ width: 25, height: 25, objectFit: "cover", borderRadius: '100%', boxShadow: 1 }}
                />}
                  checkedIcon={<TaskAltIcon color="primary" sx={{ width: 25, height: 25, boxShadow: 5, borderRadius: '100%' }} />} />}
                label="COD"
              />
              <FormControlLabel
                value="Zalopay"
                control={<Radio icon={<Box component="img"
                  src="https://images.seeklogo.com/logo-png/39/1/zalopay-logo-png_seeklogo-391409.png"
                  sx={{ width: 25, height: 25, objectFit: "cover", borderRadius: '100%', boxShadow: 1 }}
                />} checkedIcon={<TaskAltIcon color="primary" sx={{ boxShadow: 5, borderRadius: '100%' }} />} />}
                label="ZaloPay"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'flex-end', padding: 3, pt: 8 }}>
            <Button onClick={() => { handleCancel() }}
              sx={{
                minWidth: 180,
                height: 50,
                borderRadius: 3,
                background: "linear-gradient(135deg,rgb(203, 0, 0) 0%,rgb(249, 142, 35) 100%)",
                color: "white",
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: "0px 4px 10px rgba(255, 78, 80, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
                  boxShadow: "0px 6px 15px rgba(255, 78, 80, 0.5)",
                  transform: "translateY(-2px)"
                },
                "&:active": {
                  transform: "translateY(2px)",
                  boxShadow: "0px 2px 5px rgba(255, 78, 80, 0.2)"
                }
              }}
            >
              Hủy
            </Button>

            <Button onClick={() => { handleSubmit() }}
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
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default Payments;
