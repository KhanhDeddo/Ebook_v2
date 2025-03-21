import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import Typography from '@mui/material/Typography';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import DiscountIcon from '@mui/icons-material/Discount';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import {Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Badge from '@mui/material/Badge';
import UserAvatarMenu from '~/components/common/userAvatarMenu';

const today = new Date();
const formattedDate = today.toLocaleDateString("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});
const NAVIGATION = [
  {path:'/dashboard', component:'Trang chủ', icon:<DashboardIcon/>},
  {path:'/statistics', component:'Thống kê', icon:<BarChartIcon/>},
  {path:'/orders', component:'Quản lý đơn hàng', icon:<ShoppingBagIcon/>},
  {path:'/vouchers', component:'Quản lý khuyến mãi', icon:<DiscountIcon/>},
  {path:'/products', component:'Quản lý sản phẩm', icon:<DashboardCustomizeIcon/>},
  {path:'/users', component:'Quản lý người dùng', icon:<PeopleAltIcon/>,
    children:[
      {path:'/staffs', component:'Quản lý nhân viên', icon:<ShoppingBagIcon/>},
      {path:'/customers', component:'Quản lý khách hàng', icon:<ShoppingBagIcon/>},
    ]
  },
]
const AdminLayout = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname.split("/").pop()
  const formattedPage = page.replace(/^./, (char) => char.toUpperCase()) 
  if(!user || user?.role !=='admin') return <Navigate to={'/'} replace/>
  return (
    <Container disableGutters maxWidth={false} sx={{height:'100vh', overflow:'hidden'}}>
      <Paper
        elevation={3}
        sx={{
          display:'flex',
          justifyContent:'space-between',
          width:'100%',
          height:'60px',
          bgcolor:'#fff',
          border:1,
          borderColor:'#e1e4ec'
        }}
      >
        <Box
          sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            padding:'10px',
          }}
        >
          <AutoStoriesIcon
            sx={{
              width:50,
              height:50,
              color:'#008874'
            }}
          />
          <Typography
            sx={{
              fontSize:30,
              fontWeight:'bold',
              color:'#008874',
              paddingLeft:2
            }}
          >
            Ebook Store
          </Typography>
        </Box>
        <Box
          sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            padding:'10px',
            marginRight:'5px',
            gap:'15px'
          }}
        >
          <Badge>
            <Tooltip title='Thông báo'>
            <Badge badgeContent={19} color="error">
              <NotificationsIcon
                sx={{
                  color:'#008874',
                  border: '1px solid #e1e4ec',
                  borderRadius: '100%',
                  boxShadow: 3,
                  padding: '5px',
                  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: 5,
                  },
                  '&:active': {
                    transform: 'scale(0.9)',
                    boxShadow: 1,
                  },
                }}
              />
            </Badge>
          </Tooltip>
          </Badge>
          <Paper
            elevation={3}
            sx={{
              padding:'5px',
              display:'flex',
              justifyContent:'space-between',
              alignItems:'center',
              gap:'5px',
              '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 5,
                },
                '&:active': {
                  transform: 'scale(0.9)',
                  boxShadow: 1,
                },
            }}
          >
            <CalendarTodayIcon
              sx={{
                color:'#008874'
              }}
            />
            <Typography>
              {formattedDate}
            </Typography>
          </Paper>
          <UserAvatarMenu user={user}/>
        </Box>
      </Paper>
      <Stack direction="row" sx={{ height: 'calc(100vh - 60px)' }}>
        <Box 
          sx={{ 
            flex: 3,
            border:1 ,
            backgroundColor:'#f5f6fa', 
            borderColor: '#e1e4ec', 
            padding: '10px'


          }}
        >
          <Stack sx={{height:'calc(100vh - 60px)'}}>
            <Box
              sx={{
                flex:18,
              }}
            >
              <Stack
                sx={{
                  gap:'10px',
                }}
              >
                {NAVIGATION.map((item,index)=>(
                  <Paper 
                    key={index}
                    elevation={3}
                    sx={{
                      padding:'13px',
                      display:'flex',
                        gap:'12px',
                        textDecoration:'none',
                        color:'#008874',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: 5,
                      },
                      '&:active': {
                        transform: 'scale(0.9)',
                        boxShadow: 1,
                      },
                    }}
                    onClick={()=>{navigate(`/admin${item.path}`)}}
                  >
                      {item.icon}
                      <Typography
                        sx={{
                          fontWeight:'bold',
                          fontSize:'17px'
                        }}
                      >
                        {item.component}
                      </Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>
            <Box
              sx={{
                flex:2,
                bgcolor:'#fff',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
              }}
            >
              <Typography
                variant="caption"
                sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden', }}
              >
                {`© ${new Date().getFullYear()} Made by Khanh Deddo`}
              </Typography>
            </Box>
          </Stack>
        </Box>
        <Box 
          sx={{ 
            flex: 17, 
            backgroundColor: 'white', 
            padding: 2, 
            overflow:'auto' 
          }}
        >
          <Stack>
            <Box
              sx={{
                display:'flex',
                alignItems:'center',
                gap:'5px',
                flex:1,
              }}
            >
              <Typography sx={{color:'#586679', fontWeight:'500'}}>Admin</Typography>
              <ArrowForwardIosIcon sx={{width:13, height:13, color:'#bbbbbb'}}/> 
              <Typography sx={{fontWeight:'500'}}>{formattedPage}</Typography>
            </Box>
            <Box sx={{ flex:19 }}> <Outlet/> </Box>
          </Stack>
        </Box>
      </Stack>

    </Container>
  );
}

export default AdminLayout;
