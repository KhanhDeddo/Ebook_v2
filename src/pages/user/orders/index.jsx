import { Box, Button, InputBase, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import Loading from '~/components/common/loading';
import { getOrders, putOrder } from '~/services/orderService';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stepper, Step, StepLabel } from "@mui/material";
import { toast, ToastContainer } from 'react-toastify';


const steps = [
  { label: "Chờ xác nhận", img: "https://cdn-icons-png.flaticon.com/512/1759/1759310.png" },
  { label: "Đã xác nhận", img: "https://cdn-icons-png.flaticon.com/512/6815/6815043.png" },
  { label: "Chờ giao hàng", img: "https://cdn-icons-png.flaticon.com/512/3502/3502601.png" },
  { label: "Đang giao", img: "https://cdn-icons-png.flaticon.com/512/8441/8441282.png" },
  { label: "Hoàn thành", img: "https://cdn-icons-png.flaticon.com/512/5660/5660173.png" },
  { label: "Đã hủy", img: "https://cdn-icons-png.flaticon.com/512/3759/3759129.png" },
]
const getStatusColor = (status) => {
  switch (status) {
    case "Chờ xác nhận":
      return "#FFC107"
    case "Đã xác nhận":
      return "#28A745"
    case "Chờ giao hàng":
      return "#17A2B8"
    case "Đang giao":
      return "#007BFF"
    case "Hoàn thành":
      return "#008899"
    case "Đã hủy":
      return "#DC3545"
    default:
      return "#6C757D"
  }
}
const Orders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoad, setIsLoad] = useState(true);
  const [orders, setOrders] = useState([]);
  const [open, setOpen] = React.useState(false)
  const [selectOrder, setSelectOrder] = useState({})
  const [selectOrderItems, setSelectOrderItems] = useState([])
  const [activeStep, setActiveStep] = useState(0)
  const getData = async () => {
    try {
      const orderData = await getOrders(user?.user_id)
      console.log(orderData)
      const formattedOrders = orderData
        .map((order) => ({
          id: order?.order_id,
          created_at: new Date(order?.create_at),
          ...order,
        }))
        .sort((a, b) => b.created_at - a.created_at)
      setOrders(formattedOrders);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleClickOpen = (order) => {
    for (let i = 0; i <= 5; i++) {
      if (steps[i].label === order.status) {
        setActiveStep(i);
        break;
      }
    }
    setSelectOrder(order)
    const formattedOrders = order?.OrderItems
      .map((orderItme) => ({
        id: orderItme?.order_item_id,
        title: orderItme?.Book?.title,
        image_url: orderItme?.Book?.image_url,
        price: orderItme?.Book?.price,
        ...orderItme,
      }))
      .sort((a, b) => b.created_at - a.created_at)
    setSelectOrderItems(formattedOrders);
    setOpen(true)
  }
  const getIconStyle = (index, activeStep) => {
    if (activeStep < 5 && index < activeStep) {
      return { opacity: 1 }
    }
    if (index === activeStep) {
      return {
        opacity: 1,
        filter: "drop-shadow(0px 0px 8px rgba(255, 247, 170, 0.79))",
        transition: "filter 0.3s ease-in-out",
      };
    }
    return { opacity: 0.1 }
  }
  const columns = [
    {
      field: "id",
      headerName: "Mã Đơn hàng",
      flex: 0.5,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
    },
    {
      field: "created_at",
      headerName: "Ngày đặt đơn",
      flex: 1.2,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
      renderCell: (params) => (
        new Date(params.value).toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      )
    },
    {
      field: "total_price",
      headerName: "Tổng thành tiền",
      flex: 1,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography fontWeight={'bold'} color='#008899'>{params.value.toLocaleString('vi-VN')}đ</Typography>
      )
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography
          sx={{
            borderRadius: 10,
            backgroundColor: getStatusColor(params.value),
            color: "#fff",
            padding: "5px 10px",
            fontSize: 13,
            fontWeight: 'bold'
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "payment_status",
      headerName: "Trạng thái thanh toán",
      flex: 1,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography
          fontSize={13}
          bgcolor={params.value === "Đã thanh toán" ? '#008899' : '#FFC107'}
          color='#fff'
          fontWeight={'bold'}
          padding={'5px 10px'}
          borderRadius={10}
        >{params.value}</Typography>
      )
    },
    {
      field: "operater",
      headerName: "Thao tác",
      flex: 0.5,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
      renderCell: (params) => (
        <EditNoteIcon
          onClick={() => { handleClickOpen(params.row) }}
          sx={{ color: '#007BFF', cursor: 'pointer', width: 40, height: 40 }}
        />
      )
    },

  ]
  const columns_dialog = [
    {
      field: "id",
      headerName: "Mã sản phẩm",
      flex: 0.5,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
    },
    {
      field: 'image_url',
      headerName: 'Hình ảnh',
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
      display: 'flex',
      justifyContent: 'center',
      renderCell: (params) => (
        <img
          src={params.value}
          alt='avata'
          style={{
            width: 50,
            height: 65,
            borderRadius: '10px'
          }}
        />
      ),
    },
    {
      field: 'title',
      headerName: 'Tên sản phẩm',
      flex: 1.2,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
    },
    {
      field: "price",
      headerName: "Giá",
      flex: 0.9,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography fontWeight={'bold'} color='#008899'>{params?.value?.toLocaleString('vi-VN')}đ</Typography>
      )
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      flex: 0.8,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
    },
    {
      field: "total_price",
      headerName: "Tổng thành tiền",
      flex: 1,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
      renderCell: (params) => (
        <Typography fontWeight={'bold'} color='#008899'>{params?.value?.toLocaleString('vi-VN')}đ</Typography>
      )
    }
  ]
  const handleCancelOrder = async () => {
    toast.loading(`Đơn hàng ${selectOrder.order_id} đang được hủy...`)
    const data = { ...selectOrder, status: "Đã hủy" }
    await putOrder(data)
    await getData()
    toast.dismiss()
    toast.success('Hủy đơn hàng thành công')
    setActiveStep(5)
    setOpen(false)
  }
  return (
    <Box sx={{
      display: 'flex',
      width: '100%',
      minHeight: '90vh',
      maxHeight: '90vh',
      overflow: 'hidden',
    }}>
      <Box flex={1.8} sx={{
        // bgcolor: 'beige',
        display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: 1, margin: 1, borderRadius: 3, minWidth: '290px'
      }}>
        <Box
          sx={{
            // bgcolor:'cadetblue',
            width: '80%',
            mt: 4,
            minHeight: '70%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <InputBase
            placeholder='Tìm kiếm...'
            sx={{
              boxShadow: 3,
              borderRadius: 5,
              width: '100%',
              padding: 1
            }}
          />
          <Typography sx={{ fontSize: 20, fontWeight: 'bold', color: '#008874', mt: 3 }}>Bộ lọc</Typography>
          <Button sx={{
            boxShadow: 2, borderRadius: 3, fontWeight: 'bold', fontSize: 17, color: '#008874',
            '&:hover': { background: '#008874', color: '#fff' }
          }}>Tất cả</Button>
          <Button sx={{
            boxShadow: 2, borderRadius: 3, fontWeight: 'bold', fontSize: 17, color: '#008874',
            '&:hover': { background: '#008874', color: '#fff' }
          }}>Chờ xác nhận</Button>
          <Button sx={{
            boxShadow: 2, borderRadius: 3, fontWeight: 'bold', fontSize: 17, color: '#008874',
            '&:hover': { background: '#008874', color: '#fff' }
          }}>Chờ giao hàng</Button>
          <Button sx={{
            boxShadow: 2, borderRadius: 3, fontWeight: 'bold', fontSize: 17, color: '#008874',
            '&:hover': { background: '#008874', color: '#fff' }
          }}>Đang giao</Button>
          <Button sx={{
            boxShadow: 2, borderRadius: 3, fontWeight: 'bold', fontSize: 17, color: '#008874',
            '&:hover': { background: '#008874', color: '#fff' }
          }}>Hoàn thành</Button>
          <Button sx={{
            boxShadow: 2, borderRadius: 3, fontWeight: 'bold', fontSize: 17, color: '#008874',
            '&:hover': { background: '#008874', color: '#fff' }
          }}>Đã hủy</Button>
        </Box>
      </Box>
      {isLoad ? <Loading /> :

        <Box flex={7} sx={{
          // bgcolor:'violet'
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          maxHeight: '100%',
          mb: 1
        }}>
          <Box sx={{ minHeight: '5%', maxHeight: '5%', padding: 1 }}>
            <Typography>Trang chủ/Đơn hàng</Typography>
          </Box>
          {orders.length === 0 ? <Box sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            boxShadow: 1,
            borderRadius: 3,
          }}><Typography>Bạn chưa có đơn hàng nào</Typography></Box>
            : <DataGrid
              columns={columns}
              rows={orders}
              disableSelectionOnClick
              sx={{
                maxHeight: '90%',
                width: '100%',
                boxShadow: 1,
                borderRadius: 3,
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
          }
        </Box>
      }
      <Dialog
        open={open}
        onClose={() => { setOpen(false) }}
        sx={{ padding: 0, boxShadow: 3, borderRadius: 2, "& .MuiDialog-paper": { maxWidth: '1000px', maxHeight: '650px' } }}
      >
        <Box display={'flex'} justifyContent={'space-between'}>
          <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          <Button onClick={() => { setOpen(false) }} sx={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>X</Button>
        </Box>
        <DialogContent sx={{ width: '900px', height: '650px' }}>
          <Stepper activeStep={activeStep} alternativeLabel sx={{ pb: 5 }}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel
                  icon={
                    <img
                      src={step.img}
                      alt={step.label}
                      style={{
                        width: 40,
                        height: 40,
                        ...getIconStyle(index, activeStep)
                      }}
                    />
                  }
                >{step.label}</StepLabel>
              </Step>
            ))}
            {console.log(activeStep)}
          </Stepper>
          <Box display={'flex'} p={1}>
            <Box flex={1} flexWrap={'wrap'} overflow={'hidden'}>
              <Box sx={{ display: 'flex', padding: 0.5 }}>
                <DialogContentText sx={{ fontSize: 16, color: 'black', minWidth: 150 }}>Người đặt hàng:</DialogContentText>
                <DialogContentText sx={{ fontSize: 16, color: 'black' }}>{selectOrder?.User?.username}</DialogContentText>
              </Box>
              <Box sx={{ display: 'flex', padding: 0.5 }}>
                <DialogContentText sx={{ fontSize: 16, color: 'black', minWidth: 150 }}>Người nhận đơn:</DialogContentText>
                <DialogContentText sx={{ fontSize: 16, color: 'black', }}>{selectOrder?.name}</DialogContentText>
              </Box>
              <Box sx={{ display: 'flex', padding: 0.5 }}>
                <DialogContentText sx={{ fontSize: 16, color: 'black', minWidth: 150 }}>Số điện thoại:</DialogContentText>
                <DialogContentText sx={{ fontSize: 16, color: 'black' }}>{selectOrder?.phone}</DialogContentText>
              </Box>
              <Box sx={{ display: 'flex', padding: 0.5 }}>
                <DialogContentText sx={{ fontSize: 16, color: 'black', minWidth: 150 }}>Địa chỉ nhận hàng:</DialogContentText>
                <DialogContentText sx={{ fontSize: 16, color: 'black' }}>{selectOrder?.address}</DialogContentText>
              </Box>
            </Box>
            <Box flex={0.8}>
              <Box sx={{ display: 'flex', padding: 0.5 }}>
                <DialogContentText sx={{ fontSize: 16, color: 'black', minWidth: 200 }}>Tổng sản phẩm:</DialogContentText>
                <DialogContentText sx={{ fontSize: 16, color: 'black' }}>{selectOrder?.OrderItems?.length}</DialogContentText>
              </Box>
              <Box sx={{ display: 'flex', padding: 0.5 }}>
                <DialogContentText sx={{ fontSize: 16, color: 'black', minWidth: 200 }}>Tổng thành tiền: </DialogContentText>
                <DialogContentText sx={{ fontSize: 16, color: 'black' }}>{`${selectOrder?.total_price?.toLocaleString('vi-VN')}đ`}</DialogContentText>
              </Box>
              <Box sx={{ display: 'flex', padding: 0.5 }}>
                <DialogContentText sx={{ fontSize: 16, color: 'black', minWidth: 200 }}>Phương thức thanh toán:</DialogContentText>
                <DialogContentText sx={{ fontSize: 16, color: 'black' }}>{selectOrder.payment_method}</DialogContentText>
              </Box>
              <Box sx={{ display: 'flex', padding: 0.5 }}>
                <DialogContentText sx={{ fontSize: 16, color: 'black', minWidth: 200 }}>Trạng thái thanh toán:</DialogContentText>
                <DialogContentText sx={{ fontSize: 16, color: 'black' }}>{selectOrder.payment_status}</DialogContentText>
              </Box>
            </Box>
          </Box>
          <DialogTitle sx={{ padding: 1 }}>Danh sách sản phẩm</DialogTitle>
          <DataGrid
            columns={columns_dialog}
            rowHeight={70}
            rows={selectOrderItems}
            sx={{
              borderRadius: 3,
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
        </DialogContent>
        <DialogActions>
          <Button disabled={activeStep >= 1} onClick={() => { handleCancelOrder() }}>Hủy đơn</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer/>
    </Box>
  );
}

export default Orders
