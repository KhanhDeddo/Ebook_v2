import { Avatar, Stack, Box, Paper, Typography, Dialog, DialogTitle, DialogContent, MenuItem, InputBase, Select, DialogActions } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import { Navigate, useNavigate } from 'react-router-dom';
import { getCustomerInfors } from '~/services/customerInfor';
import Loading from '~/components/common/loading';
import { toast, ToastContainer } from 'react-toastify';
import { putUser } from '~/services/userService';
const Profile = () => {
  const navigate = useNavigate()
  const [isload, setLoad] = useState(true)
  const user = JSON.parse(localStorage.getItem("user"))
  const [userInfor, setUserInfor] = useState([])
  const [open, setOpen] = useState(false)
  const [selectUser, setSelectUser] = useState(user)
  const [handle, setHandle] = useState(false)
  const handleChange = (e) => {
    setSelectUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  const handleSubmit = async () => {
    toast.loading("Đang xử lý yêu cầu của bạn...")
    setHandle(true)
    if (!selectUser.username || !selectUser.email || !selectUser.image_url ||
      !selectUser.birthday || !selectUser.role || !selectUser.phone || !selectUser.fullname || !selectUser.gender) {
      toast.dismiss()
      setHandle(false)
      return toast.warning("Vui lòng nhập đầy đủ thông tin")
    }
    console.log(selectUser)
    const res = await putUser(selectUser)
    toast.dismiss()
    res.success ? toast.success(res.message) : toast.error(res.message)
    if(res?.success){
      localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify(selectUser))
    }
    console.log(res)
    setHandle(false)
  }
  useEffect(() => { console.log(selectUser) }, [selectUser])
  const fethCustomerInfor = async () => {
    try {
      const data = await getCustomerInfors(user?.user_id)
      setUserInfor(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoad(false)
    }
  }
  useEffect(() => {
    fethCustomerInfor()
    console.log(user)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(userInfor)
  if (!user) return <Navigate to='/' replace />
  if (isload) return <Loading />
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
              <Typography sx={{ fontSize: '17px' }} >{user?.role === 'admin' ? "Quản trị viên " : user?.role === 'staff' ? "Nhân viên " : "Khách hàng"}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, padding: 2, boxShadow: 1 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '17px', width: 150 }} >Giới tính:</Typography>
              <Typography sx={{ fontSize: '17px' }}>  {user?.gender ? user?.gender === 'male' ? "Nam" : "Nữ" : "Trống"}</Typography>
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
                  transition: 'transform 0.2s ease-in-out',
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
              {userInfor?.map((item, index) => (
                <Paper elevation={3} key={index}
                  sx={{
                    width: '200px', height: '100px', padding: 2, marginTop: 2, display: 'flex', flexDirection: 'column',
                    boxShadow: 3, borderRadius: 5,
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: 5,
                    },
                    '&:active': {
                      transform: 'scale(0.9)',
                      boxShadow: 1
                    }
                  }}>
                  <Box display={'flex'} sx={{ justifyContent: 'space-between' }}>
                    <Typography fontSize={20} fontWeight={'bold'}>{item?.addressType}</Typography>
                    <RemoveIcon
                      sx={{
                        boxShadow: 3, borderRadius: '30%',
                        transition: 'transform 0.2s ease-in-out',
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
                  <Typography>
                    {user?.birthday ? new Date(user.birthday).toLocaleDateString('vi-VN') : "Trống"}
                  </Typography>

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
            <Button sx={{
              bgcolor: '#008874', color: '#fff', fontWeight: 'bold', borderRadius: 20,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
                boxShadow: 5,
              },
              '&:active': {
                transform: 'scale(0.9)',
                boxShadow: 1
              }
            }} onClick={() => { setOpen(true) }} >Cập nhật</Button>
            <Button
              onClick={() => {
                localStorage.removeItem('user')
                navigate('/login')
              }}
              sx={{
                bgcolor: '#d32f2f', color: '#fff', fontWeight: 'bold', borderRadius: 20,
                transition: 'transform 0.2s ease-in-out',
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
        <Dialog open={open} onClose={() => { setOpen(false) }}
          sx={{ padding: 0, boxShadow: 3, borderRadius: 2, "& .MuiDialog-paper": { maxWidth: '1000px', maxHeight: '650px' } }}
        >
          <Box display={'flex'} justifyContent={'space-between'}>
            <DialogTitle>Thông tin chi tiết</DialogTitle>
            <Button onClick={() => { setOpen(false) }} sx={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>X</Button>
          </Box>
          <DialogContent sx={{ width: '900px', height: '650px' }}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '30%' }}>
                <Avatar src={selectUser?.image_url ?? ""}
                  sx={{
                    width: 120,
                    height: 120,
                    boxShadow: 5
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: 1, padding: 1, pl: 3, borderRadius: 5, minWidth: 500, minHeight: 40 }}>
                  <Typography minWidth={150}>Tên tài khoản:</Typography>
                  <InputBase value={selectUser?.username ?? ""} onChange={handleChange} name='username' />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: 1, padding: 1, pl: 3, borderRadius: 5, minWidth: 500 }}>
                  <Typography minWidth={150}>Chức vụ:</Typography>
                  <Select
                    value={selectUser?.role ?? ""}
                    label="Vị trí"
                    sx={{ width: 200, borderRadius: 10, maxHeight: 40 }}
                    name='role'
                    onChange={handleChange}
                    disabled={selectUser?.role === 'admin'}
                  >
                    <MenuItem value={"admin"} disabled>Quản trị viên</MenuItem>
                    <MenuItem value={"staff"}>Nhân viên</MenuItem>
                    <MenuItem value={"customer"}>Khách hàng</MenuItem>
                  </Select>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: 1, padding: 1, pl: 3, borderRadius: 5, minWidth: 500 }}>
                  <Typography minWidth={150}>Trạng thái:</Typography>
                  <Select
                    value={selectUser?.status ?? ""}
                    label="Vị trí"
                    sx={{ width: 200, borderRadius: 10, maxHeight: 40 }}
                    onChange={handleChange}
                    name='status'
                    disabled={selectUser?.role === 'admin'}
                  >
                    <MenuItem value={"active"}>Hoạt động</MenuItem>
                    <MenuItem value={"banned"}>Khóa</MenuItem>
                  </Select>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: 1, padding: 1, pl: 3, borderRadius: 5, minWidth: 500, maxWidth: '95%', mt: 2 }}>
              <Typography minWidth={150}>Avata:</Typography>
              <InputBase name='image_url' value={selectUser?.image_url ?? ""} sx={{ width: 600 }} onChange={handleChange} />
            </Box>
            <Box display={'flex'} gap={2} mt={2}>
              <Box sx={{ flex: 1.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: 1, padding: 1, pl: 3, borderRadius: 5, maxWidth: '95%' }}>
                  <Typography minWidth={100}>Họ và tên:</Typography>
                  <InputBase value={selectUser?.fullname ?? ""} onChange={handleChange} name='fullname' />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: 1, padding: 1, pl: 3, borderRadius: 5, maxWidth: '95%', mt: 2 }}>
                  <Typography minWidth={100}>Email</Typography>
                  <InputBase value={selectUser?.email ?? ""} onChange={handleChange} disabled name='email' />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: 1, padding: 1, pl: 3, borderRadius: 5, maxWidth: '95%', mt: 2 }}>
                  <Typography minWidth={150}>Số điện thoại:</Typography>
                  <InputBase value={selectUser?.phone ?? ""} onChange={handleChange} name='phone' />
                </Box>
              </Box>
              <Box flex={1}>
                <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: 1, padding: 1, pl: 3, borderRadius: 5, maxWidth: '95%' }}>
                  <Typography minWidth={100}>Ngày sinh</Typography>
                  <InputBase
                    type="date"
                    value={selectUser?.birthday ? new Date(selectUser.birthday).toISOString().split('T')[0] : ""}
                    width={'100%'}
                    onChange={handleChange}
                    name="birthday"
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: 1, padding: 1, pl: 3, borderRadius: 5, maxWidth: '95%', mt: 2 }}>
                  <Typography minWidth={100}>Giới tính:</Typography>
                  <Select
                    value={selectUser?.gender ?? ""}
                    sx={{ width: "100%", borderRadius: 10, maxHeight: 35 }}
                    onChange={handleChange}
                    name='gender'
                  >
                    <MenuItem value={"male"}>Nam</MenuItem>
                    <MenuItem value={"female"}>Nữ</MenuItem>
                  </Select>
                </Box>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={() => {setSelectUser({})}} disabled={checkAdd===false}>ClearData</Button> */}
            <Button onClick={() => { handleSubmit() }} disabled={handle === true}>Cập nhật</Button>
          </DialogActions>
        </Dialog>
      </Box>
      <ToastContainer />
    </Stack>
  );
}

export default Profile
