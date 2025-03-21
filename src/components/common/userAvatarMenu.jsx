import React, { useState } from "react";
import { Avatar, Box, Tooltip, IconButton, Menu, MenuItem, Divider, ListItemIcon, Typography } from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';
import { AdminPanelSettings, Logout, Store } from "@mui/icons-material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import LocalMallIcon from '@mui/icons-material/LocalMall'
import InventoryIcon from '@mui/icons-material/Inventory'
import { useNavigate } from "react-router-dom"

const UserAvatarMenu = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)
  const pathSegments = location.pathname.split("/")
  const adminSegment = pathSegments[1]
  console.log(adminSegment)
  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center"}}>
        <Tooltip title={user? user.username:'Đăng nhập'}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              alt="User Avatar"
              src={user?.image_url}
              sx={{
                width:50,
                height:50,
                boxShadow: 3,
                transition: "transform 0.2s",
                "&:hover": { transform: "scale(1.2)", boxShadow: 5 },
                "&:active": { transform: "scale(0.9)", boxShadow: 1 },
              }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{
          paper: {
            elevation: 10,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": { width: 32, height: 32, ml: -0.5, mr: 1 },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        {!user ?
          <MenuItem onClick={()=>{navigate('/login')}}>
          <ListItemIcon>
            <LoginIcon size='smaill'/>
          </ListItemIcon>
          <Typography>Đăng nhập</Typography>
        </MenuItem>
        :<Box sx={{ all: 'unset' }}>
            <MenuItem onClick={() => navigate(user?.role==='admin' && adminSegment === 'admin' ? "/admin/profile":'/profile')}>
              <Box component={'img'} src={user?.image_url} sx={{ width: 60, height: 60, boxShadow: 3, borderRadius:'100%'}} />
              <Box display={'flex'} flexDirection={'column'} paddingLeft={2}>
                <Typography sx={{fontSize:20, fontWeight:'bold'}}>{user.username}</Typography>
                <Typography sx={{fontSize:15}}>{user.email}</Typography>
              </Box>
            </MenuItem>
            <Divider />
            <MenuItem onClick={()=>(navigate('/cart'))}>
              <ListItemIcon>
                <ShoppingCartIcon/>
              </ListItemIcon>
              <Typography>Giỏ hàng của bạn</Typography>
            </MenuItem>
            <MenuItem onClick={()=>(navigate('/orders'))}>
              <ListItemIcon>
                <LocalMallIcon fontSize="small" />
              </ListItemIcon>
              <Typography>Đơn hàng của bạn</Typography>
            </MenuItem>
            <MenuItem onClick={()=>navigate('/historyOrder')}>
              <ListItemIcon>
                <InventoryIcon fontSize="small" />
              </ListItemIcon>
              <Typography>Lịch sử đơn hàng</Typography>
            </MenuItem>
            {user?.role === 'admin' && 
              (adminSegment !=='admin' ?
                <MenuItem onClick={()=>navigate('/admin')}>
                  <ListItemIcon>
                    <AdminPanelSettings fontSize="small" />
                  </ListItemIcon>
                  <Typography>Website Admin</Typography>
                </MenuItem>
                :<MenuItem onClick={()=>navigate('/')}>
                  <ListItemIcon>
                    <Store fontSize="small" />
                  </ListItemIcon>
                  <Typography>Website Store</Typography>
                </MenuItem>
              )
            }
            
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Box>
        }
      </Menu>
    </>
  );
};

export default UserAvatarMenu;
