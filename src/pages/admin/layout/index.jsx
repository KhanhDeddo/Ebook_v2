import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
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
import {useLocation, useNavigate } from 'react-router-dom';
const avata = 'https://i.pinimg.com/736x/20/26/8e/20268e42064a3342731fb336a675696c.jpg';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Badge from '@mui/material/Badge';

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
const AdminLayout = ({ children, }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname.replace("/", ""); // Lấy tên trang từ URL
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }
  return (
    <Container disableGutters maxWidth={false} sx={{height:'100vh' ,backgroundColor:''}}>
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
          <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <Tooltip title="Khanh Deddo">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <Avatar
                    alt="Remy Sharp"
                    src={avata}
                    sx={{
                      width: 40,
                      height: 40,
                      boxShadow:3,
                      '&:hover':{
                        transform:'scale(1.2)',
                        boxShadow:5
                      },
                      '&:active':{
                        transform:'scale(0.9)',
                        boxShadow:1
                      }
                    }}
                  />
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => {navigate('/profile')}}>
                <Avatar
                      alt="Remy Sharp"
                      src={avata}
                      sx={{
                        width: 40,
                        height: 40,
                        boxShadow:3,
                        '&:hover':{
                          transform:'scale(1.1)',
                          boxShadow:5
                        },
                        '&:active':{
                          transform:'scale(0.9)',
                          boxShadow:1
                        }
                      }}
                    /> Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={() => {navigate('/login')}}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </React.Fragment>
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
                    onClick={()=>{navigate(item.path)}}
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
              <Typography sx={{fontWeight:'500'}}>{page}</Typography>
            </Box>
            <Box
              sx={{
                flex:19,
              }}
            >
            {children}
            </Box>
          </Stack>
        </Box>
      </Stack>

    </Container>
  );
}

export default AdminLayout;
