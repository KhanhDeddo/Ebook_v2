import { Box, Stack, TextField, Typography, Button } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import InstagramIcon from '@mui/icons-material/Instagram'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { auth } from '~/services/authService'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const Login = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  const [formData, setFormData] = useState({email: '', password: ''})
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    })
  }

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast.warning("Vui lòng điền đầy đủ thông tin!")
      return
    }toast.loading("⏳ Đang xử lý yêu cầu...")
    try {
      const res = await auth(formData)
      toast.dismiss()
      toast(res.success?"Wellcome to Ebook store":`Lỗi: ${res.error}`, {
        icon: res.success?<div> <TaskAltIcon style={{ color: "#2ecc71" }}/></div>:<div> <ErrorOutlineIcon sx={{color:'red'}}/> </div>,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      })
      if(res?.success) {
        localStorage.setItem('user', JSON.stringify(res.user))
        setTimeout(() => {navigate(res?.user?.role !=='admin'?'/':'/admin')}, 2000)
      }
    } catch (error) {
      console.log(error)
    }
  }
  if(user && user?.role !=='admin') return <Navigate to="/" replace />
  return (
    <Box
      sx = {{ height:'100vh', width:'100%', display:'flex', justifyContent:'center', alignItems:'center', background:'lightgray'}}>
      <Stack
        direction={'row'} sx={{ boxShadow:30, borderRadius:5, height:'80%', width:'60%', background:'#fff'}}>
        <Box
          component="img"
          src="https://i.pinimg.com/736x/ab/86/aa/ab86aa9088a744dd93209f69e17b6c60.jpg"
          alt="Mô tả ảnh"
          sx={{ flex:1, objectFit: "cover", borderRadius: 5 }}
        />
        <Box sx={{ flex:1, borderRadius: 5, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', background:'#fff'}}>
          <Typography
            sx={{
              flex:2,
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              fontSize:'26px',
              fontWeight:'bold',
              color:'#008874'
            }}
          >Đăng nhập</Typography>
          <Box
            sx={{
              flex:4,
              display:'flex',
              flexDirection:'column',
              justifyContent:'center',
              gap:1.5,
              width:'90%',
            }}
          >
            <TextField
              name='email'
              label='Tài khoản'
              placeholder='Nhập email...'
              defaultValue={formData?.email || ""}
              onChange={handleChange}
            />
            <TextField
              name='password'
              type='password'
              label='Mật khẩu'
              placeholder='Nhập mật khẩu...'
              defaultValue={formData?.password || ""}
              onChange={handleChange}
            />
            <Typography
              color='primary'
              sx={{
                fontWeight:100,
                fontSize:'14px'
              }}
            >Quên mật khẩu ?</Typography>
            <Box
              sx={{
                display:'flex',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                gap:3,
                paddingTop:2,
              }}
            >
            <Button
              variant='contained'
              onClick={handleSubmit}
              sx={{
                boxShadow:5,
                borderRadius:5,
                width:'40%',
                bgcolor:'#008874'
              }}
            >Đăng nhập</Button>
            <Typography>Hoặc</Typography>
            <Stack direction={'row'} gap={5}>
              <FacebookIcon
                sx={{
                  cursor:'pointer',
                  padding:1,
                  color:'#fff',
                  borderRadius:'100%',
                  bgcolor:'#0866ff',
                  boxShadow:3,
                  '&:hover':{ transform:'scale(1.1)' }
                }}
              />
              <GoogleIcon
                sx={{
                  cursor:'pointer',
                  padding:1,
                  color:'#fff',
                  borderRadius:'100%',
                  bgcolor:'red',
                  boxShadow:3,
                  '&:hover':{ transform:'scale(1.1)' }
                }}
              />
              <InstagramIcon
                sx={{
                  cursor:'pointer',
                  padding:1,
                  color:'#fff',
                  borderRadius:'100%',
                  bgcolor:'#fd00b5',
                  boxShadow:3,
                  '&:hover':{ transform:'scale(1.1)' }
                }}
              />
            </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              flex:1,
              width:'90%',
              display:'flex',
              justifyContent:'space-between',
              alignItems:'end',
              paddingBottom:1
            }}
          >
            <Typography display={'flex'} gap={1} cursor='pointer' color='#757575'>
              Bạn chưa có tài khoản ?
              <Typography color='primary'
                onClick ={() => {navigate('/register')}}
                sx={{
                  cursor:'pointer'
                }}
              >Đăng ký</Typography>
            </Typography>
            <Typography
              onClick = {() => {navigate('/')}}
              sx={{
                display:'flex',
                cursor:'pointer',
                "&:hover": { color: "darkblue" },
                justifyContent:'center',
                gap:0.5,
                color:'#757575'
              }}
            >Quay lại {<ArrowForwardIcon/>}</Typography>
          </Box>
        </Box>
      </Stack>
      <ToastContainer/>
    </Box>
  )
}

export default Login;
