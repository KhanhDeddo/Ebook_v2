import { Avatar, Box, CircularProgress, InputAdornment, Paper, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { getOrders } from '~/services/orderService';
import { EditNote } from '@mui/icons-material';

const getStatusColor = (status) => {
  switch (status) {
    case "Chờ xác nhận":
      return "#FFC107"
    case "Chờ giao hàng":
      return "#17A2B8"
    case "Đang giao":
      return "#007BFF"
    case "Hoàn thành":
      return "#28A745"
    case "Đã hủy":
      return "#DC3545"
    default:
      return "#008899"
    // return "#6C757D"
  }
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
        onClick={() => { (params.row.id) }}
        sx={{ color: '#007BFF', cursor: 'pointer', width: 40, height: 40 }}
      />
    )
  },

]
const AdminOrders = () => {
  // const user = JSON.parse(localStorage.getItem("user"));
  const [isLoad, setIsLoad] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
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
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoad(false);
      }
    };

    getData();
  }, []);
  if (isLoad)
    return (
      <>
        <p>Loading...</p>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - 300px)',
            width: '100%'
          }}
        >
          <CircularProgress
            sx={{
              width: 900,
              height: 900,
              color: 'red'
            }}
          />
        </Box>
      </>
    )

  return (
    <Stack
      sx={{
        height: '120vh',
        width: '100%',
        // bgcolor:'lightblue'
      }}
    >
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
            <Box borderRadius={2} boxShadow={2} padding={1}>Chờ giao hàng</Box>
            <Box borderRadius={2} boxShadow={2} padding={1}>Chờ vận chuyển</Box>
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
              padding: 1

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
          />
        </Box>
      </Stack>
    </Stack>
  );
}

export default AdminOrders;
