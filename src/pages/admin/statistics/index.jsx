import { Avatar, Box, CircularProgress, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { PieChart } from '@mui/x-charts';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Shop2Icon from '@mui/icons-material/Shop2';
import { DataGrid } from '@mui/x-data-grid';
import { getBooks } from '~/services/productService';

const dataset = [
  {
    london: 19,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: 'Jan',
  },
  {
    london: 20,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: 'Feb',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: 'Mar',
  },
  {
    london: 44,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: 'Apr',
  },
  {
    london: 27,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: 'May',
  },
  {
    london: 10,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: 'June',
  },
  {
    london: 69,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: 'July',
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: 'Aug',
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: 'Sept',
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: 'Oct',
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: 'Nov',
  },
  {
    london: 31,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: 'Dec',
  },
];
const columnsRecentOrder = [
  {
    field:'id',
    headerName:'STT',
    headerAlign:'center',
    align:'center',
    flex:1,
  },
  {
    field:'title',
    headerName:'Tên sản phẩm',
    headerAlign:'start',
    align:'start',
    flex:4,
  },
  {
    field:'stock',
    headerName:'Số lượng',
    headerAlign:'start',
    align:'start',
    flex:1.7,
  },
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
    flex:7,
    align:'start',
  },
  {
    field:'email',
    headerName:'Email',
    flex:8,
    headerAlign:'start',
    align:'start',
  },
  {
    field:'address',
    headerName:'Địa chỉ',
    flex:8,
    headerAlign:'start',
    align:'start',
  }
]
const rowUser = [
  {
    id:1,
    avata:'https://i.pinimg.com/736x/c3/50/f2/c350f23508a933b4ea3f97679ec05f34.jpg',
    name:"Khanh Deddo",
    email:'Khanhdeddo@gmail.com',
    address:'Khanhdeddo@gmail.com'
  },
  {
    id:2,
    avata:'https://i.pinimg.com/736x/55/20/8c/55208cec924741222d1708be53515539.jpg',
    name:"Khanh Deddo",
    email:'Khanhdeddo@gmail.com',
    address:'Khanhdeddo@gmail.com'

  },
  {
    id:3,
    avata:'https://i.pinimg.com/736x/20/26/8e/20268e42064a3342731fb336a675696c.jpg',
    name:"Khanh Deddo",
    email:'Khanhdeddo@gmail.com',
    address:'Khanhdeddo@gmail.com'

  },
  {
    id:4,
    avata:'https://i.pinimg.com/736x/1f/83/d2/1f83d2945c3a3194f5bbdaf6756b4b90.jpg',
    name:"Khanh Deddo",
    email:'Khanhdeddo@gmail.com',
    address:'Khanhdeddo@gmail.com'

  },
  {
    id:5,
    avata:'https://i.pinimg.com/736x/c8/63/96/c863967bab7eee4929cf9b4d8f9da2e8.jpg',
    name:"Khanh Deddo",
    email:'Khanhdeddo@gmail.com',
    address:'Khanhdeddo@gmail.com'

  },
  {
    id:6,
    avata:'https://i.pinimg.com/736x/c3/50/f2/c350f23508a933b4ea3f97679ec05f34.jpg',
    name:"Khanh Deddo",
    email:'Khanhdeddo@gmail.com',
    address:'Khanhdeddo@gmail.com'
  },
  {
    id:7,
    avata:'https://i.pinimg.com/736x/55/20/8c/55208cec924741222d1708be53515539.jpg',
    name:"Khanh Deddo",
    email:'Khanhdeddo@gmail.com',
    address:'Khanhdeddo@gmail.com'

  },
  {
    id:8,
    avata:'https://i.pinimg.com/736x/20/26/8e/20268e42064a3342731fb336a675696c.jpg',
    name:"Khanh Deddo",
    email:'Khanhdeddo@gmail.com',
    address:'Khanhdeddo@gmail.com'

  },
  {
    id:9,
    avata:'https://i.pinimg.com/736x/1f/83/d2/1f83d2945c3a3194f5bbdaf6756b4b90.jpg',
    name:"Khanh Deddo",
    email:'Khanhdeddo@gmail.com',
    address:'Khanhdeddo@gmail.com'

  },
  {
    id:10,
    avata:'https://i.pinimg.com/736x/c8/63/96/c863967bab7eee4929cf9b4d8f9da2e8.jpg',
    name:"Khanh Deddo",
    email:'Khanhdeddo@gmail.com',
    address:'Khanhdeddo@gmail.com'

  },
  
]

function valueFormatter(value) {
  return `${value} VNĐ`;
}

const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 800,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};
const data = [
  { id: 0, value: 100, label: "Đơn hàng thành công", color: "#0088FE" },
  { id: 1, value: 78, label: "Đơn hàng chờ xác nhận", color: "#FF6742" },
  { id: 2, value: 98, label: "Đơn hàng bị hủy", color: "#FF4042" },
  { id: 3, value: 118, label: "Đơn hàng chờ vận chuyển", color: "#FF8042" },
  { id: 4, value: 28, label: "Đơn hàng Đang giao", color: "#FF9042" },
];
const AdminStatistics = () => {
  const [loading,setLoading] = useState(true)
  const [books, setBooks] = useState([]); 
  const fechTop20Book = async () => {
    try {
      setBooks(await getBooks())
    } catch(e){console.log(e)}
    finally {setLoading(false)}
  }
  useEffect(()=>{
    fechTop20Book()
  },[])
  
  if (loading) 
      return (
        <>
          <p>Loading...</p>
          <Box
            sx={{
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              height:'calc(100vh - 300px)',
              width:'100%'
            }}
          >
            <CircularProgress
              sx={{
                width:900,
                height:900,
                color:'red'
              }}
            />
          </Box>
        </>
      )
    
  return (
    <Stack sx={{ height:'180vh', width:'100%', overflow:'hidden' }}>
      <Stack
        direction={'row'}
        flex={1.7}
      >
        <Stack
            direction={'row'}
            sx={{ flex:6.9}}
          >
            <Paper
              elevation={5}
              sx={{ 
                flex: 1,
                margin: 1.5,
                display:'flex',
                flexDirection:'column',
                borderRadius: 3,
                boxShadow: "0px 0px 15px rgba(22, 0, 149, 0.66)",
                animation: "gradientAnimation 6s ease infinite",
                background: "linear-gradient(135deg,rgb(255, 92, 10),rgb(36, 206, 101),rgb(212, 241, 26))",
                backgroundSize: "400% 400%",
                transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease-in-out, opacity 0.4s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0px 0px 10px rgba(28, 0, 241, 0.9), 0px 0px 50px rgba(4, 0, 255, 0.9)",
                  opacity: 0.9,
                },
                "&:active": {
                  transform: "scale(0.95)",
                  boxShadow: "0px 0px 50px rgba(255, 0, 128, 0.6)",
                  opacity: 1,
                },
              }}
            >
              <Box
                sx={{
                 flex:2,
                 display:'flex',
                 justifyContent:'space-between',
                }}
              >
                <Typography sx={{
                  fontSize:20,
                  fontWeight:'bold',
                  margin:1,
                  color:'#fff',
                  filter: "drop-shadow(0px 0px 10px rgba(255, 0, 17, 0.67))"
                }}>Tổng doanh thu</Typography>
                <CurrencyExchangeIcon sx={{width:40, height:40,margin:1, color:'#fff'}}/>
              </Box>
              <Box
                sx={{
                 flex:8,
                 display:'flex',
                 justifyContent:'center',
                }}
              >
                <Typography sx={{fontSize:40,fontWeight:'bold', color:'#fff'}}>24tr</Typography>
              </Box>
            </Paper>
            <Paper
              elevation={5}
              sx={{ 
                flex: 1,
                margin: 1.5,
                display:'flex',
                flexDirection:'column',
                borderRadius: 3,
                boxShadow: "0px 0px 15px rgba(22, 0, 149, 0.66)",
                animation: "gradientAnimation 6s ease infinite",
                background: "linear-gradient(135deg,rgb(71, 10, 255),rgb(36, 206, 101),rgb(212, 241, 26))",
                backgroundSize: "400% 400%",
                transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease-in-out, opacity 0.4s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0px 0px 10px rgba(28, 0, 241, 0.9), 0px 0px 50px rgba(4, 0, 255, 0.9)",
                  opacity: 0.9,
                },
                "&:active": {
                  transform: "scale(0.95)",
                  boxShadow: "0px 0px 50px rgba(255, 0, 128, 0.6)",
                  opacity: 1,
                },
              }}
            >
              <Box
                sx={{
                 flex:2,
                 display:'flex',
                 justifyContent:'space-between',
                }}
              >
                <Typography sx={{
                  fontSize:20,
                  fontWeight:'bold',
                  margin:1,
                  color:'#fff',
                  filter: "drop-shadow(0px 0px 10px rgba(255, 0, 17, 0.67))"
                }}>Tổng Đơn hàng</Typography>
                <ShoppingCartIcon sx={{width:40, height:40,margin:1, color:'#fff'}}/>
              </Box>
              <Box
                sx={{
                 flex:8,
                 display:'flex',
                 justifyContent:'center',
                }}
              >
                <Typography sx={{fontSize:40,fontWeight:'bold', color:'#fff'}}>98</Typography>
              </Box>
            </Paper>
            <Paper
              elevation={5}
              sx={{ 
                flex: 1,
                margin: 1.5,
                display:'flex',
                flexDirection:'column',
                borderRadius: 3,
                boxShadow: "0px 0px 15px rgba(22, 0, 149, 0.66)",
                animation: "gradientAnimation 6s ease infinite",
                background: "linear-gradient(135deg,rgb(255, 10, 10),rgb(107, 36, 206),rgb(212, 241, 26))",
                backgroundSize: "400% 400%",
                transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease-in-out, opacity 0.4s ease",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0px 0px 10px rgba(28, 0, 241, 0.9), 0px 0px 50px rgba(4, 0, 255, 0.9)",
                  opacity: 0.9,
                },
                "&:active": {
                  transform: "scale(0.95)",
                  boxShadow: "0px 0px 50px rgba(255, 0, 128, 0.6)",
                  opacity: 1,
                },
              }}
            >
              <Box
                sx={{
                 flex:2,
                 display:'flex',
                 justifyContent:'space-between',
                }}
              >
                <Typography sx={{
                  fontSize:19,
                  fontWeight:'bold',
                  margin:1,
                  color:'#fff',
                  filter: "drop-shadow(0px 0px 10px rgba(255, 0, 17, 0.67))"
                }}>Đơn hàng đang xử lý</Typography>
                <LocalShippingIcon sx={{width:40, height:40,margin:1, color:'#fff'}}/>
              </Box>
              <Box
                sx={{
                 flex:8,
                 display:'flex',
                 justifyContent:'center',
                }}
              >
                <Typography sx={{fontSize:40,fontWeight:'bold', color:'#fff'}}>19</Typography>
              </Box>
            </Paper>
        </Stack>
        <Stack
          flex={3.1}
        >
          <Paper
              elevation={5}
              sx={{ 
                flex: 1,
                margin: 1,
                display:'flex',
                justifyContent:'space-between',
                borderRadius: 3,
                boxShadow: "0px 0px 10px rgba(149, 0, 0, 0.66)",
                animation: "gradientAnimation 6s ease infinite",
                background: "linear-gradient(135deg,rgb(255, 10, 10),rgb(198, 36, 206),rgb(223, 26, 241))",
                backgroundSize: "400% 400%",
                transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease-in-out, opacity 0.4s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0px 0px 10px rgba(28, 0, 241, 0.9), 0px 0px 50px rgba(4, 0, 255, 0.9)",
                  opacity: 0.9,
                },
                "&:active": {
                  transform: "scale(0.95)",
                  boxShadow: "0px 0px 50px rgba(255, 0, 128, 0.6)",
                  opacity: 1,
                }   
              }}
            >
              <Box flex={7} sx={{
              }}>
              <Typography 
                sx={{
                  margin:1,
                  fontSize:17,
                  fontWeight:'bold',
                  color:'#fff'
                }}
              >Tổng sản phẩm đang bán</Typography>
              <Shop2Icon 
                sx={{
                  color:'#fff',
                  marginLeft:7,
                  width:35,
                  height:35
                }}/>
              </Box>
              <Typography 
                flex={3} 
                sx={{
                  margin:1,
                  display:'flex',
                  justifyContent:'center' ,
                  alignItems:'center',
                  fontSize:34,
                  fontWeight:'bold',
                  color:'#fff',
                  marginRight:5,
                  }}>40</Typography>
          </Paper>
          <Paper
              elevation={5}
              sx={{ 
                flex: 1,
                margin: 1,
                display:'flex',
                justifyContent:'space-between',
                borderRadius: 3,
                boxShadow: "0px 0px 10px rgba(149, 0, 0, 0.66)",
                animation: "gradientAnimation 6s ease infinite",
                background: "linear-gradient(135deg,rgb(128, 10, 255),rgb(255, 0, 0),rgb(223, 26, 241))",
                backgroundSize: "400% 400%",
                transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease-in-out, opacity 0.4s ease",
                "&:hover": {
                  transform: "scale(1.02)",
                  boxShadow: "0px 0px 10px rgba(28, 0, 241, 0.9), 0px 0px 50px rgba(4, 0, 255, 0.9)",
                  opacity: 0.9,
                },
                "&:active": {
                  transform: "scale(0.95)",
                  boxShadow: "0px 0px 50px rgba(255, 0, 128, 0.6)",
                  opacity: 1,
                }           
              }}
            >
              <Box flex={7} sx={{
              }}>
              <Typography 
                sx={{
                  margin:1,
                  fontSize:17,
                  fontWeight:'bold',
                  color:'#fff'
                }}
              >Tổng sản phẩm</Typography>
              <Shop2Icon 
                sx={{
                  color:'#fff',
                  marginLeft:7,
                  width:35,
                  height:35
                }}/>
              </Box>
              <Typography 
                flex={3} 
                sx={{
                  margin:1,
                  display:'flex',
                  justifyContent:'center' ,
                  alignItems:'center',
                  fontSize:34,
                  fontWeight:'bold',
                  color:'#fff',
                  marginRight:5,
                  }}>140</Typography>
          </Paper>
        </Stack>
      </Stack>  

      <Stack
        flex={4}
        direction={'row'}
      >
        <Stack
            sx={{
              flex:6.9,
              // bgcolor:'violet',
              borderRadius:5,
              boxShadow:5,
              padding:'20px 0 20px 0',
              margin:1
            }}
          >
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
              series={[
                { dataKey: 'newYork', label: 'Đơn đặt hàng', valueFormatter },
                { dataKey: 'paris', label: 'Đơn hàng hoàn thành', valueFormatter },
                { dataKey: 'london', label: 'Tổng doanh thu', valueFormatter },
              ]}
              {...chartSetting}
            />
        </Stack>
        <Stack
          sx={{
            flex:3.1,
            // bgcolor:'red',
            borderRadius:5,
            boxShadow:5,
            padding:'20px 0 20px 0',
            margin:1
          }}
        >
          <PieChart
            series={[
              {
                data: data,
                outerRadius: 100, // Tùy chỉnh kích thước pie
              },
            ]}
            sx={{ml:20}}
            width={300}
            height={250}
           
            slotProps={{ legend: { hidden: true } }} // Ẩn legend mặc định
          />
          <Box  gap={2} m={'1px 1px 20px 20px'}>
            {data.map((item) => (
              <Box 
                key={item.id}
                sx={{
                  display:'flex',
                  alignItems:'center',
                  gap:1
                }}
              >
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    backgroundColor: item.color,
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" color='black' fontSize={17}>{item.label}</Typography>
              </Box>
            ))}
          </Box>
        </Stack>
      </Stack>

      <Stack
        direction={'row'}
        flex={5.5}
        overflow={'hidden'}
      >
        <Box
            sx={{
              // bgcolor:'blue',
              flex:6.9,
              margin:1,
              mb:8,
            }}
          >
            <Typography margin={2} fontSize={20} fontWeight={'bold'}>Top 20 khách hàng tiềm năng</Typography>
            <DataGrid
               sx={{
                boxShadow:3,
                borderRadius:3
              }}  
              columns={columnsNewUser}
              rows={rowUser}
              rowHeight={70}
            />
        </Box>
        <Box
            sx={{
              flex:3.1,
              margin:1,
              mb:8,
            }}
          >
            <Typography margin={2} fontSize={20} fontWeight={'bold'}>Top 20 sản phẩm bán chạy nhất</Typography>
            <DataGrid
              sx={{
                boxShadow:3,
                borderRadius:3
              }}  
              columns={columnsRecentOrder}
              rowHeight={70}
              pageSizeOptions={[5]}
              rows={books}
            />
        </Box>
        
      </Stack>
    </Stack>
  );
}

export default AdminStatistics
