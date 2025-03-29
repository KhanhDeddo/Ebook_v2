import { Avatar, Box, InputAdornment, InputBase, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { EditNote, Password } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Stepper, Step, StepLabel } from "@mui/material";
import Loading from '~/components/common/loading';
import { toast, ToastContainer } from 'react-toastify';
import { getUsers, postUser, putUser } from '~/services/userService';
import { Space, Switch } from 'antd';

const AdminUsers = () => {
  const [isLoad, setIsLoad] = useState(true)
  const [open, setOpen] = React.useState(false)
  const [checkAdd, setCheckAdd] = React.useState(false)
  const [users, setUsers] = useState([])
  const [selectUser, setSelectUser] = useState({})
  const [handle, setHandle] = useState(false)

  const getData = async () => {
    try {
      const userData = await getUsers()
      console.log(userData)
      const formattedUsers = userData
        .map((user) => ({
          id: user?.user_id,
          created_at: new Date(user?.create_at),
          ...user,
        }))
        .sort((a, b) => b.created_at - a.created_at)
      setUsers(formattedUsers);
      if (open) {
        setSelectUser(formattedUsers.find((user) => user?.email === selectUser?.email) || null)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoad(false);
    }
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const handleClickOpen = (order) => {
    setSelectUser(order)
    setOpen(true)
  }
  const handleChange = (e) => {
    setSelectUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }
  useEffect(() => {
    console.log("selectUser mới:", selectUser)
  }, [selectUser]);
  const addUser = async () => {
    setCheckAdd(true)
    setSelectUser({})
    setOpen(true)
  }
  const handleSubmit = async () => {
    toast.loading("Đang xử lý yêu cầu của bạn...")
    setHandle(true)
    if(!selectUser.username || !selectUser.email || !selectUser.image_url || 
      !selectUser.birthday || !selectUser.role || !selectUser.phone || !selectUser.fullname || !selectUser.gender)
      {toast.dismiss()
        setHandle(false)
        return toast.warning("Vui lòng nhập đầy đủ thông tin")
      }
    if(checkAdd){
      const newUser = {...selectUser, password:'12345'}
      const res = await postUser(newUser)
      toast.dismiss()
      res.success? toast.success(res.message):toast.error(res.message)
      console.log(res)
    }else{
      const res = await putUser(selectUser)
      toast.dismiss()
      res.success? toast.success(res.message):toast.error(res.message)
      console.log(res)
    }
    setHandle(false)
    await getData()
  }
  const changeStatus = async (data) => {
    if(data.role === "admin") return toast.warning("Không thể thay đổi trạng thái của quản trị viên!")
    setHandle(true)
    toast.loading("Đang xử lý yêu cầu của bạn...")
    const newData = { ...data, status: data.status === "active" ? "banned" : "active" }
    const res = await putUser(newData)
    await getData()
    toast.dismiss()
    res.success? toast.success(res.message):toast.error(res.message)
    console.log(res)
    setHandle(false)
  }
  const columns = [
    {
      field: "id",
      headerName: "Mã người dùng",
      flex: 0.5,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
    },
    {
      field: 'image_url',
      headerName: 'Avata',
      flex: 0.5,
      headerAlign: 'center',
      align: 'center',
      display: 'flex',
      justifyContent: 'center',
      renderCell: (params) => (
        <Avatar
          src={params.value}
          alt='avata'
          sx={{
            width: 45,
            height: 45,
            boxShadow: 3,
          }}
        />
      ),
    },
    {
      field: 'username',
      headerName: 'Tên người dùng',
      flex: 1,
      headerAlign: 'start',
      display: 'flex',
      justifyContent: 'center',
      align: 'start',
    },
    {
      field: 'role',
      headerName: 'Chức vụ',
      flex: 0.8,
      headerAlign: 'start',
      display: 'flex',
      justifyContent: 'center',
      align: 'start',
      renderCell: (parmas) => (
        <Box>
          {parmas.value === "admin" ? "Quản trị viên" : parmas.value === "staff" ? "Nhân viên" : "Khách hàng"}
        </Box>
      )
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 0.8,
      headerAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      align: 'center',
      renderCell: (params) => {
        return (
          <Space direction="vertical">
            <Switch
              disabled={handle===true}
              onChange={() => {changeStatus(params.row)}}
              checkedChildren="Active"
              unCheckedChildren="Banner"
              checked={params.value === "active"}
              style={{
                backgroundColor: params.value === "active" ? "#008899" : "#FF6B6B",
                width: 90,
              }}
            />
          </Space>
        )
      }
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
      headerAlign: 'start',
      display: 'flex',
      justifyContent: 'center',
      align: 'start',
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
        <EditNote
          onClick={() => { handleClickOpen(params.row) }}
          sx={{ color: '#007BFF', cursor: 'pointer', width: 40, height: 40 }}
        />
      )
    },

  ]
  if (isLoad) return <Loading />
  return (
    <Stack sx={{ height: '120vh', width: '100%', }}>
      <Stack sx={{ width: '100%', height: '100%', }}>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, padding: 1 }}>
          <TextField
            variant="standard"
            placeholder='Tìm kiếm...'
            sx={{ boxShadow: 3, borderRadius: 4, padding: 1, }}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ padding: 2 }}>
            <Button variant="contained" href="#contained-buttons" onClick={() => { addUser() }}
              sx={{ padding: 1, boxShadow: 5, bgcolor: '#008874', borderRadius: 5, paddingInline: 5 }}
            >Thêm mới</Button>
          </Box>
        </Box>
        <Box sx={{ flex: 9, }}  >
          <DataGrid
            columns={columns}
            rows={users}
            disableSelectionOnClick
            sx={{
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
        </Box>
      </Stack>
      <Dialog open={open} onClose={() => { setOpen(false), setCheckAdd(false) }}
        sx={{ padding: 0, boxShadow: 3, borderRadius: 2, "& .MuiDialog-paper": { maxWidth: '1000px', maxHeight: '650px' } }}
      >
        <Box display={'flex'} justifyContent={'space-between'}>
          <DialogTitle>Thông tin chi tiết</DialogTitle>
          <Button onClick={() => { setOpen(false) , setCheckAdd(false) }} sx={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>X</Button>
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
              <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: 1, padding: 1, pl: 3, borderRadius: 5, minWidth: 500, minHeight:40 }}>
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
                  disabled = {selectUser?.role === 'admin'}
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
                  disabled = {selectUser?.role === 'admin'}
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
            <Box sx={{ flex:1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: 1, padding: 1, pl: 3, borderRadius: 5, maxWidth: '95%' }}>
                <Typography minWidth={100}>Họ và tên:</Typography>
                <InputBase value={selectUser?.fullname ?? ""} onChange={handleChange} name='fullname'/>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: 1, padding: 1, pl: 3, borderRadius: 5, maxWidth: '95%', mt: 2 }}>
                <Typography minWidth={100}>Email</Typography>
                <InputBase value={selectUser?.email ?? ""} onChange={handleChange} disabled={checkAdd===false}  name='email'/>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: 1, padding: 1, pl: 3, borderRadius: 5, maxWidth: '95%', mt: 2 }}>
                <Typography minWidth={150}>Số điện thoại:</Typography>
                <InputBase value={selectUser?.phone ?? ""} onChange={handleChange} name='phone' />
              </Box>
            </Box>
            <Box flex={1}>
              <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: 1, padding: 1, pl: 3, borderRadius: 5, maxWidth: '95%'}}>
                <Typography minWidth={100}>Ngày sinh</Typography>
                <InputBase 
                  type="date" 
                  value={selectUser?.birthday ? new Date(selectUser.birthday).toISOString().split('T')[0] : ""} 
                  width={'100%'} 
                  onChange={handleChange} 
                  name="birthday" 
                />
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', boxShadow: 1, padding: 1, pl: 3, borderRadius: 5, maxWidth: '95%', mt: 2}}>
                <Typography minWidth={100}>Giới tính:</Typography>
                <Select
                  value={selectUser?.gender ?? ""}
                  sx={{ width:"100%", borderRadius: 10, maxHeight: 35 }}
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
          <Button onClick={() => {setSelectUser({})}} disabled={checkAdd===false}>ClearData</Button>
          <Button  onClick={() => { handleSubmit() }} disabled={handle===true}>Cập nhật</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer autoClose={2000} />
    </Stack>
  );
}

export default AdminUsers
