import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import React from 'react';
import { Avatar, Box, Paper, Stack } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { DataGrid } from '@mui/x-data-grid';

const columnsRecentOrder = [
  {
    field:'id',
    headerName:'STT',
    headerAlign:'center',
    align:'center',
    flex:1,
  },
  {
    field:'customerName',
    headerName:'Tên khách hàng',
    headerAlign:'start',
    align:'start',
    flex:4,
  },
  {
    field:'status',
    headerName:'Trạng thái',
    headerAlign:'start',
    align:'start',
    flex:3,
  },
  {
    field:'total',
    headerName:'Tổng tiền',
    headerAlign:'start',
    align:'start',
    flex:3,
  },
  {
    field:'address',
    headerName:'Địa chỉ nhận hàng',
    headerAlign:'start',
    align:'start',
    flex:5,
  }
]
const columnsNewUser = [
  {
    field:'id',
    headerName:'STT',
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
          width:'80%',
          height:'80%',
          boxShadow:3,
        }}
      />
    ),
  },
  {
    field:'name',
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
const rowUser = [
  {
    id:1,
    avata:'https://i.pinimg.com/736x/c3/50/f2/c350f23508a933b4ea3f97679ec05f34.jpg',
    name:"Khanh Deddo",
    email:'Khanhdeddo@gmail.com'
  },
  {
    id:2,
    avata:'https://i.pinimg.com/736x/55/20/8c/55208cec924741222d1708be53515539.jpg',
    name:"Khanh Deddo",
    email:'Khanhdeddo@gmail.com'
  },
  {
    id:3,
    avata:'https://i.pinimg.com/736x/20/26/8e/20268e42064a3342731fb336a675696c.jpg',
    name:"Khanh Deddo",
    email:'Khanhdeddo@gmail.com'
  },
  {
    id:4,
    avata:'https://i.pinimg.com/736x/1f/83/d2/1f83d2945c3a3194f5bbdaf6756b4b90.jpg',
    name:"Khanh Deddo",
    email:'Khanhdeddo@gmail.com'
  },
  {
    id:5,
    avata:'https://i.pinimg.com/736x/c8/63/96/c863967bab7eee4929cf9b4d8f9da2e8.jpg',
    name:"Khanh Deddo",
    email:'Khanhdeddo@gmail.com'
  },
  
]
const rowOrder = [
  {
    id:1,
    customerName:"Khanh Deddo",
    status:'Đang giao',
    total:1902000,
    address:'250 Kim Giang, Hoàng Mai, Hà Nội'
  },
  {
    id:2,
    customerName:"Phương Anh",
    status:'Chờ xác nhận',
    total:902000,
    address:'350 Nguyễn trãi, Thanh Xuân, Hà Nội'
  },
  {
    id:3,
    customerName:"Trang Anh",
    status:'Chờ Vận chuyển',
    total:1902000,
    address:'100 Nguyễn Xiển, Hoàng Mai, Hà Nội'
  },
  {
    id:4,
    customerName:"Minh Thư",
    status:'Hoàn thành',
    total:842000,
    address:'192 Kim Giang, Hoàng Mai, Hà Nội'
  },
  {
    id:5,
    customerName:"Hồng Nhung",
    status:'Chờ xác nhận',
    total:1902000,
    address:'192 Khương Đình, Thanh Xuân, Hà Nội'
  }
]
const Dashboard = () => {
  return (
    <Stack sx={{height:'calc(100vh - 116px)',width:'100%'}}>
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
              58
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
              140
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
              12
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
              14
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
                rows={rowOrder}
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
                rows = {rowUser}
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

export default Dashboard;
