import { Avatar, Stack, Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCustomerInfors } from '~/services/customerInfor';
const Profile = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user"))
  const [userInfor, setUserInfor] = useState([])
  const fethCustomerInfor = async () => {
    try {
      const data = await getCustomerInfors(user?.user_id)
      setUserInfor(data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    fethCustomerInfor()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  console.log(userInfor)
  if (!user) return <Navigate to='/' replace />
  return (
    <Stack spacing={2} direction='row' sx={{ height: 'calc(100vh - 116px)', width: '100%', overflow: 'hidden', pt: 2, pb: 3 }}>
      <Box flex={4}>
        <Stack sx={{ gap: 5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ width: 250, height: 250, borderRadius: '100%', padding: '5px' }}>
              <Avatar src={user?.image_url}
                sx={{ width: '100%', height: '100%', maxWidth: 250, maxHeight: 250, boxShadow: 5 }}
              />
            </Paper>
          </Box>
          <Stack sx={{ paddingLeft: 10 }}>
            <Box sx={{ display: 'flex', gap: 1, padding: 2, boxShadow: 1 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '17px', width: 150 }}>Tên tài khoản:</Typography>
              <Typography sx={{ fontSize: '17px' }}>{user?.username}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, padding: 2, boxShadow: 1 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '17px', width: 150 }}>Chức vụ:</Typography>
              <Typography sx={{ fontSize: '17px' }} >{user?.role === 'admin' ? "Quản trị viên " : "Khách hàng"}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, padding: 2, boxShadow: 1 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '17px', width: 150 }} >Giới tính:</Typography>
              <Typography sx={{ fontSize: '17px' }}>  {user?.gender ? user?.gender : "Trống"}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, padding: 2, boxShadow: 1 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '17px', width: 150 }}>  Email:</Typography>
              <Typography sx={{ fontSize: '17px' }} > {user?.email}</Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
      <Box flex={6}>
        <Stack spacing={2} sx={{ height: 'calc(100vh - 116px)', width: '100%', overflow: 'hidden', paddingLeft: 5 }}>
          <Box flex={3}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography sx={{ fontWeight: 'bold' }}>Địa chỉ</Typography>
              <AddIcon 
                sx={{
                  boxShadow: 3, borderRadius: '100%',
                  transition:'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.3)',
                    boxShadow: 5,
                  },
                  '&:active': {
                    transform: 'scale(0.9)',
                    boxShadow: 1
                  }
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 3 }} >
              {userInfor?.map((item, index)=>(
                <Paper elevation={3} key={index}
                sx={{ width: '200px', height: '100px', padding: 2, marginTop: 2, display: 'flex', flexDirection:'column', 
                  boxShadow: 3, borderRadius: 5,
                  transition:'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: 5,
                    },
                    '&:active': {
                      transform: 'scale(0.9)',
                      boxShadow: 1
                    }
                }}>
                <Box display={'flex'} sx={{ justifyContent: 'space-between'}}>
                  <Typography fontSize={20} fontWeight={'bold'}>{item?.addressType}</Typography>
                  <RemoveIcon
                    sx={{
                      boxShadow: 3, borderRadius: '30%',
                      transition:'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: 5,
                      },
                      '&:active': {
                        transform: 'scale(0.9)',
                        boxShadow: 1
                      }
                    }}
                  />
                </Box>
              </Paper>
              ))}
              
            </Box>
          </Box>
          <Box flex={6}>
            <Typography sx={{ fontWeight: 'bold' }}>Thông tin cá nhân</Typography>
            <Box sx={{ marginTop: 2 }} >
              <Paper
                elevation={3}
                sx={{ marginRight: 10, marginLeft: 2, height: 50, display: 'flex', alignItems: 'center', marginTop: 2 }}
              >
                <Typography sx={{ alignItems: 'center', fontWeight: 'bold', width: 150, padding: 2 }}>Họ và tên:</Typography>
                <Typography>{user?.fullname ? user?.fullname : "Trống"}</Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{ marginRight: 10, marginLeft: 2, height: 50, display: 'flex', alignItems: 'center', marginTop: 1 }}
              >
                <Typography sx={{ alignItems: 'center', fontWeight: 'bold', width: 150, padding: 2 }}>Số Điện thoại:</Typography>
                <Typography>{user?.phone ? user?.phone : "Trống"}</Typography>
              </Paper>
              <Paper
                elevation={3}
                sx={{ marginRight: 10, marginLeft: 2, height: 50, display: 'flex', alignItems: 'center', marginTop: 1 }}
              >
                <Box sx={{ width: 150, padding: 2, }} >
                  <Typography sx={{ alignItems: 'center', fontWeight: 'bold' }}>Ngày sinh:</Typography>
                </Box>
                <Box>
                  <Typography>{user?.birthday ? user?.birthday : "Trống"}</Typography>
                </Box>
              </Paper>
              <Paper
                elevation={3}
                sx={{ marginRight: 10, marginLeft: 2, height: 130, alignItems: 'center', marginTop: 1 }}
              >
                <Box sx={{ width: 150, padding: 2, }}>
                  <Typography sx={{ alignItems: 'center', fontWeight: 'bold' }}>Sách yêu thích:</Typography>
                </Box>
                <Box>
                  <Box sx={{ height: '100px', maxHeight: '100px', }}>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Box>
          <Box flex={1} sx={{ gap: 1, display: 'flex', justifyContent: 'end', alignItems: 'start', paddingRight: 6 }}>
            <Button sx={{ bgcolor: '#008874', color: '#fff', fontWeight: 'bold', borderRadius: 20,
              transition:'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: 5,
              },
              '&:active': {
                transform: 'scale(0.9)',
                boxShadow: 1
              }
            }}>Cập nhật</Button>
            <Button 
              onClick={()=>{
                localStorage.removeItem('user')
                navigate('/login')
              }}
              sx={{ bgcolor: '#d32f2f', color: '#fff', fontWeight: 'bold', borderRadius: 20,
                transition:'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: 5,
                },
                '&:active': {
                  transform: 'scale(0.9)',
                  boxShadow: 1
                }
            }}>Đăng xuất</Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}

export default Profile
