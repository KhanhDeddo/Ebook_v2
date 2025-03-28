import { Avatar, Box, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { getOrders, putOrder } from '~/services/orderService';
import { EditNote } from '@mui/icons-material';
import exportInvoice from '~/utils/exportInvoice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Stepper, Step, StepLabel } from "@mui/material";
import Loading from '~/components/common/loading';
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
const AdminOrders = () => {
  const [isLoad, setIsLoad] = useState(true)
  const [open, setOpen] = React.useState(false)
  const [orders, setOrders] = useState([])
  const [selectOrder, setSelectOrder] = useState({})
  const [selectOrderItems, setSelectOrderItems] = useState([])
  const [handle, setHandle] = useState(false)

  const getData = async () => {
    try {
      const orderData = await getOrders()
      console.log(orderData)
      const formattedOrders = orderData
        .map((order) => ({
          id: order?.order_id,
          username: order?.User?.username,
          avata: order?.User?.image_url,
          created_at: new Date(order?.create_at),
          ...order,
        }))
        .sort((a, b) => b.created_at - a.created_at)
      setOrders(formattedOrders);
      if (open) {
        setSelectOrder(formattedOrders.find((order) => order?.id === selectOrder?.id) || null);
      }      
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoad(false);
    }
  };

  useEffect(() => {
    getData();
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
  const [activeStep, setActiveStep] = useState(0)
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
      field: 'avata',
      headerName: 'Avata',
      flex: 0.8,
      headerAlign: 'center',
      align: 'center',
      display: 'flex',
      justifyContent: 'center',
      renderCell: (params) => (
        <Avatar
          src={params.value}
          alt='avata'
          sx={{
            width: 45,
            height: 45,
            boxShadow: 3,
          }}
        />
      ),
    },
    {
      field: 'username',
      headerName: 'Người đặt hàng',
      flex: 1,
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
        <Typography fontWeight={'bold'} color='#008899'>{params?.value?.toLocaleString('vi-VN')}đ</Typography>
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
        <EditNote
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
    setHandle(true)
    toast.loading(`Đơn hàng ${selectOrder.order_id} đang được hủy...`)
    const data = { ...selectOrder, status: "Đã hủy" }
    await putOrder(data)
    await getData()
    toast.dismiss()
    toast.success('Hủy đơn hàng thành công')
    setActiveStep(5)
    setHandle(false)
  }

  const handleSubmitOrder = async () => {
    setHandle(true)
    toast.loading(`Đang cập nhật trạng thái đơn hàng ${selectOrder.order_id}...`)
    let data = { ...selectOrder, status: steps[activeStep + 1].label }
    if (data.status === "Hoàn thành") data = { ...data, payment_status: "Đã thanh toán" }
    await putOrder(data)
    await getData()
    toast.dismiss()
    toast.success('Cập nhật trạng thái đơn hàng thành công')
    setActiveStep(activeStep + 1)
    setHandle(false)
  }
  if (isLoad) return <Loading />
  return (
    <Stack sx={{ height: '120vh', width: '100%', }}>
      <Stack
        sx={{
          flex: 4,
          borderRadius: 2,
          boxShadow: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f6fa",
          fontWeight: "bold",
          backgroundImage: "url('https://www.svgrepo.com/show/233867/delivery-truck-free.svg')",
          backgroundSize: 200,
          backgroundPosition: "center",
          backgroundRepeat: 'no-repeat',
        }}
      >
      </Stack>
      <Stack
        sx={{
          flex: 6,
          width: '100%',
          height: '100%',
          // bgcolor:'lightgreen'
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            padding: 1
          }}
        >
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              padding: 1,
              borderRadius: 3,
              height: '50%'
            }}
          >
            <Box borderRadius={2} boxShadow={2} padding={1}>Tất cả</Box>
            <Box borderRadius={2} boxShadow={2} padding={1}>Chờ xác nhận</Box>
            <Box borderRadius={2} boxShadow={2} padding={1}>Đã xác nhận</Box>
            <Box borderRadius={2} boxShadow={2} padding={1}>Chờ giao hàng</Box>
            <Box borderRadius={2} boxShadow={2} padding={1}>Đang giao</Box>
            <Box borderRadius={2} boxShadow={2} padding={1}>Hoàn thành</Box>
            <Box borderRadius={2} boxShadow={2} padding={1}>Đã hủy</Box>
          </Paper>
          <TextField
            variant="standard"
            placeholder='Tìm kiếm đơn hàng...'
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              boxShadow: 3,
              borderRadius: 4,
              padding: 1,
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 9,
          }}
        >
          <DataGrid
            columns={columns}
            rows={orders}
            disableSelectionOnClick
            sx={{
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
        </Box>
      </Stack>
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
          <Button disabled={activeStep >= 1 || handle} onClick={() => { handleCancelOrder() }}>Hủy đơn</Button>
          {activeStep >= 4 ?
            <Button onClick={() => { exportInvoice(selectOrder) }}>Xuất hóa đơn</Button>
            : <Button disabled={activeStep == 4 || handle} onClick={() => { handleSubmitOrder() }}>Xác nhận</Button>
          }
        </DialogActions>
      </Dialog>
      <ToastContainer autoClose={2000} />
    </Stack>
  );
}

export default AdminOrders;
