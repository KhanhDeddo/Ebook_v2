import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { Avatar, Box, Paper, Stack } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { DataGrid } from '@mui/x-data-grid';
import { getOrders } from '~/services/orderService';
import Loading from '~/components/common/loading';
import { getBook } from '~/services/productService';
import { getUsers } from '~/services/userService';

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

const columnsRecentOrder = [
  {
    field:'id',
    headerName:'Mã đơn hàng',
    headerAlign:'center',
    align:'center',
    flex:2,
  },
  {
    field:'username',
    headerName:'Người đặt hàng',
    headerAlign:'center',
    align:'center',
    flex:4,
  },
  {
    field: "status",
    headerName: "Trạng thái",
    flex: 3,
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
    field: "total_price",
    headerName: "Tổng thành tiền",
    flex: 3,
    headerAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    align: 'center',
    renderCell: (params) => (
      <Typography fontWeight={'bold'} color='#008899'>{params?.value?.toLocaleString('vi-VN')}đ</Typography>
    )
  },
  {
    field:'address',
    headerName:'Địa chỉ nhận hàng',
    headerAlign:'center',
    align:'center',
    flex:5,
  }
]
const columnsNewUser = [
  {
    field:'id',
    headerName:'Mã người dùng',
    headerAlign:'center',
    flex:1,
    align:'center',
  },
  {
    field:'avata',
    headerName:'Avata',
    flex:4,
    headerAlign:'start',
    align:'center',
    display:'flex',
    justifyContent:'center',
    renderCell: (params) => (
      <Avatar
        src={params.value}
        alt='avata'
        sx={{
          width:60,
          height:60,
          boxShadow:3,
        }}
      />
    ),
  },
  {
    field:'username',
    headerName:'Tên người dùng',
    headerAlign:'start',
    flex:6,
    align:'start',
  },
  {
    field:'email',
    headerName:'Email',
    flex:9,
    headerAlign:'start',
    align:'start',
  }
]

const AdminDashboard = () => {
    // const user = JSON.parse(localStorage.getItem("user"))
    const [isLoad, setIsLoad] = useState(true);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([])
    const [handleOrders, setHandleOrders] = useState([])
  useEffect(() => {
      const getData = async () => {
        try {
          const orderData = await getOrders()
          const productData = await getBook()
          const userData = await getUsers()
          setProducts(productData)
          const formattedUsers = userData
            .map((user) => ({
              id: user?.user_id,
              username: user?.username,
              avata: user?.image_url,
              created_at: new Date(user?.create_at),
              ...user,
            }))
            .sort((a, b) => b.created_at - a.created_at)
          setUsers(formattedUsers)
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
          setOrders(formattedOrders)
          const handleOrderDatas = formattedOrders.filter((order) => order.status !== "Hoàn thành" && order.status !== "Đã hủy")
          setHandleOrders(handleOrderDatas)
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoad(false);
        }
      };
  
      getData();
    }, [])
  if(isLoad) return <Loading/>
  return (
    <Stack sx={{height:'calc(100vh)',width:'100%'}}>
      <Stack
        flex={3}
        direction={'row'}
        gap={3}
        padding={3}
      >
       <Paper
          elevation={5}
          sx={{
            height: "75%",
            width: "95%",
            padding: 2,
            borderRadius: 3,
            background: "linear-gradient(135deg, #ff0080, #ff8c00, #0f0c29)",
            backgroundSize: "400% 400%",
            animation: "gradientAnimation 6s ease infinite",
            boxShadow: "0px 0px 15px rgba(255, 0, 128, 0.6)", // Viền phát sáng neon
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.08)",
              boxShadow: "0px 0px 30px rgba(255, 0, 128, 0.9), 0px 0px 50px rgba(255, 140, 0, 0.9)",
            },
            "&:active": {
              transform: "scale(0.95)",
              boxShadow: "0px 0px 10px rgba(255, 0, 128, 0.6)",
            },
          }}
        >
          <Box sx={{ flex: 3, display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#fff" }}>
              Đơn hàng đặt
            </Typography>
            <ShoppingCartIcon
              sx={{
                width: 40,
                height: 40,
                color: "#ffff", // Vàng ánh kim  
                filter: "drop-shadow(0px 0px 10px rgba(255, 0, 17, 0.67))"

              }}
            />
          </Box>
          <Box sx={{ flex: 7, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography
              sx={{
                fontSize: 42,
                fontWeight: "bold",
                color: "#fff",
                textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
              }}
            >
              {orders.length}
            </Typography>
          </Box>
          </Paper>

          <Paper
          elevation={5}
          sx={{
            height: "75%",
            width: "95%",
            padding: 2,
            borderRadius: 3,
            background: "linear-gradient(135deg,rgb(116, 7, 199),rgb(191, 14, 52),rgb(0, 0, 0))",
            backgroundSize: "400% 400%",
            animation: "gradientAnimation 5s ease infinite",
            boxShadow: "0px 0px 15px rgba(255, 0, 217, 0.8)", 
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: "0px 0px 40px rgba(151, 5, 151, 0.9)",
            },
            "&:active": {
              transform: "scale(0.95)",
              boxShadow: "0px 0px 10px rgba(149, 0, 255, 0.6)",
            },
          }}
        >
          <Box sx={{ flex: 3, display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#fff" }}>
              Sản phẩm
            </Typography>
            <ShoppingBagIcon
              sx={{
                width: 40,
                height: 40,
                color: "#ffff",
                filter: "drop-shadow(0px 0px 10px rgb(127, 17, 141))",  
              }}
            />
          </Box>
          <Box sx={{ flex: 7, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography
              sx={{
                fontSize: 42,
                fontWeight: "bold",
                color: "#fff",
                textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
              }}
            >
              {products.length}
            </Typography>
          </Box>
          </Paper>

          <Paper
          elevation={5}
          sx={{
            height: "75%",
            width: "95%",
            padding: 2,
            borderRadius: 3,
            background: "linear-gradient(135deg,rgb(3, 166, 33),rgb(0, 38, 255), #0f0c29)",
            backgroundSize: "400% 400%",
            animation: "gradientAnimation 6s ease infinite",
            boxShadow: "0px 0px 15px rgba(162, 0, 255, 0.6)", // Viền phát sáng neon
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.08)",
              boxShadow: "0px 0px 30px rgba(21, 135, 3, 0.9), 0px 0px 50px rgba(30, 0, 255, 0.9)",
            },
            "&:active": {
              transform: "scale(0.95)",
              boxShadow: "0px 0px 10px rgba(0, 4, 255, 0.6)",
            },
          }}
        >
          <Box sx={{ flex: 3, display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#fff" }}>
              Đơn hàng đang sử lý
            </Typography>
            <LocalShippingIcon
              sx={{
                width: 40,
                height: 40,
                color: "#ffff",
                filter: "drop-shadow(0px 0px 10px rgb(149, 255, 0))"

              }}
            />
          </Box>
          <Box sx={{ flex: 7, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography
              sx={{
                fontSize: 42,
                fontWeight: "bold",
                color: "#fff",
                textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
              }}
            >
              {handleOrders.length}
            </Typography>
          </Box>
          </Paper>

          <Paper
          elevation={5}
          sx={{
            height: "75%",
            width: "95%",
            padding: 2,
            borderRadius: 3,
            background: "linear-gradient(135deg,rgb(54, 33, 176), #6dd5ed)",
            backgroundSize: "400% 400%",
            animation: "gradientAnimation 5s ease infinite",
            boxShadow: "0px 0px 15px rgba(33, 147, 176, 0.8)", 
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: "0px 0px 30px rgba(109, 213, 237, 0.9)",
            },
            "&:active": {
              transform: "scale(0.95)",
              boxShadow: "0px 0px 10px rgba(33, 147, 176, 0.6)",
            },
          }}
        >
          <Box sx={{ flex: 3, display: "flex", justifyContent: "space-between" }}>
            <Typography sx={{ fontSize: "18px", fontWeight: "700", color: "#fff" }}>
              Thành viên
            </Typography>
            <PeopleIcon
              sx={{
                width: 40,
                height: 40,
                color: "#ffff",
                filter: "drop-shadow(0px 0px 10px rgba(0, 229, 255, 0.67))"
              }}
            />
          </Box>
          <Box sx={{ flex: 5, display: "flex", justifyContent: "center",alignItems:'center'}}>
            <Typography
              sx={{
                fontSize: 42,
                fontWeight: "bold",
                color: "#fff",
                textShadow: "0px 0px 10px rgba(255, 255, 255, 0.8)",
              }}
            >
              {users.length}
            </Typography>
          </Box>
          </Paper>

          
      </Stack>
      <Stack
        flex={7}
        overflow={'hidden'}
      >
        <Stack
        direction={'row'}
        >
          <Box
            flex={12}
          >
              <Typography sx={{fontSize:'17px', fontWeight:'700',padding:2}}>Đơn hàng gần đây</Typography>
              <DataGrid
                columns={columnsRecentOrder}
                rows={orders.slice(0,5)}
                rowHeight={70}
                sx={{
                  borderRadius:2,
                  boxShadow:3,
                  height:'75%',
                  width:'98%'
                }}
              />
          </Box>
          <Box
            flex={8}
            sx={{
              // overflow:'hidden'
            }}

          >
            <Typography sx={{fontSize:'17px', fontWeight:'700',padding:2}}>Người dùng mới</Typography>
            <DataGrid
                columns={columnsNewUser}
                rows = {users.slice(0,5)}
                rowHeight={70}
                padding={3}
                pagination
                sx={{
                  borderRadius:2,
                  boxShadow:3,
                  height:'75%',
                  width:'100%'
                }}
              />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default AdminDashboard;
