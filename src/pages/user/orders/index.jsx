import { Box, Button, InputBase, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import Loading from '~/components/common/loading';
import { getOrders } from '~/services/orderService';
import EditNoteIcon from '@mui/icons-material/EditNote';

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
        bgcolor='#FFC107' 
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
        onClick={() => { (params.row.id) }}
        sx={{ color: '#007BFF', cursor: 'pointer', width: 40, height: 40 }}
      />
    )
  },

]

const Orders = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isLoad, setIsLoad] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
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

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    </Box>
  );
}

export default Orders
