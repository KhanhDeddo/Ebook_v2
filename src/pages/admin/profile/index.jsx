import { Avatar, Stack, Box, Paper, Typography } from '@mui/material';
import React from 'react';
const avata = 'https://i.pinimg.com/736x/20/26/8e/20268e42064a3342731fb336a675696c.jpg';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
const AdminProfile = () => {
  return (
    <Stack spacing={2} direction='row' sx={{height:'calc(100vh - 116px)',width:'100%',overflow:'hidden'}}>
      <Box
        flex={4}
        sx={{}}
      >
        <Stack
          sx={{gap:5}}
        >
          <Box
            sx={{
              display:'flex',
              justifyContent:'center',
            }}
          >
            <Paper
             elevation={3}
              sx={{
                width:250,
                height:250,
                borderRadius:'100%',
                padding:'5px'
              }}  
            >
              <Avatar
                src={avata}
                sx={{
                  width:'100%',
                  height:'100%',
                  maxWidth:250,
                  maxHeight:250,
                  boxShadow:5,
                }}
              />
            </Paper>
          </Box>
          <Stack
            sx={{paddingLeft:10}}
          >
            <Box
              sx={{
                display: 'flex',
                gap:1,
                padding:2,
                boxShadow:1
              }}
            >
              <Typography
                sx={{
                fontWeight:'bold',
                fontSize:'17px',
                width:150
                }}
              >
                Tên tài khoản:
              </Typography>
              <Typography
                sx={{
                  fontSize:'17px'
                  }}
              >
                Khanh Deddo
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap:1,
                padding:2,
                boxShadow:1

              }}
            >
              <Typography
                sx={{
                fontWeight:'bold',
                fontSize:'17px',
                width:150
                }}
              >
                Chức vụ:
              </Typography>
              <Typography
                sx={{
                  fontSize:'17px'
                  }}
              >
                Quản trị viên
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap:1,
                padding:2,
                boxShadow:1

              }}
            >
              <Typography
                sx={{
                fontWeight:'bold',
                fontSize:'17px',
                width:150
                }}
              >
                Giới tính:
              </Typography>
              <Typography
                sx={{
                  fontSize:'17px'
                  }}
              >
                Nam
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap:1,
                padding:2,
                boxShadow:1

              }}
            >
              <Typography
                sx={{
                fontWeight:'bold',
                fontSize:'17px',
                width:150
                }}
              >
                Email:
              </Typography>
              <Typography
                sx={{
                  fontSize:'17px'
                  }}
              >
                khanhdeddo@gmail.com
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Box
        flex={6}
      >
        <Stack
          spacing={2} sx={{height:'calc(100vh - 116px)',width:'100%',overflow:'hidden', paddingLeft:5}}
        >
          <Box
            flex={3}
          >
            <Box sx={{display:'flex',gap:1}}>
            <Typography sx={{fontWeight:'bold'}}>Địa chỉ</Typography>
            <AddIcon sx={{
              boxShadow:5,
              width:20,
              height:20,
              borderRadius:'100%',
              '&:hover':{
                transform: 'scale(1.3)',
                boxShadow: 5
              }
            }}/>
            </Box>
            <Box
              sx={{display:'flex',gap:3}}
            >
              <Paper
              elevation={3}
              sx={{width:'200px',height:'100px', padding:1,marginTop:2, display:'flex', justifyContent:'space-between'}}
              >
                <Typography>Nhà riêng</Typography>
                <RemoveIcon
                  sx={{
                    boxShadow:3,
                    borderRadius:'20%',
                    '&:hover':{
                      transform:'scale(1.1)',
                      boxShadow:5,
                    },
                    '&:active':{
                      transform:'scale(0.9)',
                      boxShadow:1
                    }

                  }}
                />
              </Paper>

            </Box>
          </Box>
          <Box
            flex={6}
          >
            <Typography sx={{fontWeight:'bold'}}>Thông tin cá nhân</Typography>
            <Box
              sx={{marginTop:2}}
            >
              <Paper
                elevation={3}
                sx={{
                  marginRight:10,
                  marginLeft:2,
                  height:50,
                  display:'flex',
                  alignItems:'center',
                  marginTop:2
                }}
              >
                <Box
                  sx={{
                    width:150,
                    padding:2,                  
                  }}
                >
                  <Typography sx={{
                    alignItems:'center',
                    fontWeight:'bold'
                    }}>Họ và tên:</Typography> 
                </Box>
                <Box>
                  <Typography>Nguyễn Văn Khanh</Typography>
                </Box>
              </Paper>
              <Paper
                elevation={3}
                sx={{
                  marginRight:10,
                  marginLeft:2,
                  height:50,
                  display:'flex',
                  alignItems:'center',
                  marginTop:1
                }}
              >
                <Box
                  sx={{
                    width:150,
                    padding:2,                  
                  }}
                >
                  <Typography sx={{
                    alignItems:'center',
                    fontWeight:'bold'
                    }}>Số Điện thoại:</Typography> 
                </Box>
                <Box>
                  <Typography>0123456789</Typography>
                </Box>
              </Paper>
              <Paper
                elevation={3}
                sx={{
                  marginRight:10,
                  marginLeft:2,
                  height:50,
                  display:'flex',
                  alignItems:'center',
                  marginTop:1
                }}
              >
                <Box
                  sx={{
                    width:150,
                    padding:2,                  
                  }}
                >
                  <Typography sx={{
                    alignItems:'center',
                    fontWeight:'bold'
                    }}>Ngày sinh:</Typography> 
                </Box>
                <Box>
                  <Typography>19/02/2004</Typography>
                </Box>
              </Paper>
              <Paper
                elevation={3}
                sx={{
                  marginRight:10,
                  marginLeft:2,
                  height:130,
                  alignItems:'center',
                  marginTop:1
                }}
              >
                <Box
                  sx={{
                    width:150,
                    padding:2,                  
                  }}
                >
                  <Typography sx={{
                    alignItems:'center',
                    fontWeight:'bold'
                    }}>Sở thích:</Typography> 
                </Box>
                <Box>
                  <Box
                    sx={{
                      height:'100px',
                      maxHeight:'100px',
                      // bgcolor:'lightgray'
                    }}
                  >
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
          <Box
            flex={1}
            sx={{ 
              gap:1,
              display:'flex',
              justifyContent:'end',
              alignItems:'center',
              paddingRight:6
            }}
          >
            
            <Button sx={{bgcolor:'orange',color:'#fff',fontWeight:'bold'}}>Cập nhật</Button>
            <Button sx={{bgcolor:'#d32f2f',color:'#fff',fontWeight:'bold'}}>Đăng xuất</Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}

export default AdminProfile
