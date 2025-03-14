import { Box, Stack, TextField, Typography, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import InstagramIcon from '@mui/icons-material/Instagram'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState(null)
  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }

  return (
    <Box
      sx = {{
        height:'100vh',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        background:'lightgray'
      }}
    >
      <Stack
        direction={'row'}
        sx={{
          boxShadow:30,
          borderRadius:5,
          height:'80%',
          width:'60%',
          background:'#fff',
        }}
      >
        <Box
          component="img"
          src="https://i.pinimg.com/736x/ab/86/aa/ab86aa9088a744dd93209f69e17b6c60.jpg"
          alt="Mô tả ảnh"
          sx={{
            flex:1,
            objectFit: "cover", // Giữ tỉ lệ ảnh
            borderRadius: 5,
          }}
        />
        <Box
          sx={{
            flex:1,
            borderRadius: 5,
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            background:'#fff',
            // bgcolor:'green'
          }}
        >
          <Typography
            // bgcolor={'red'}
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
              // bgcolor:'orange'
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
              defaultValue={formData?.email || ""}
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
                  '&:hover':{
                    transform:'scale(1.1)'
                  }
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
                  '&:hover':{
                    transform:'scale(1.1)'
                  }
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
                  '&:hover':{
                    transform:'scale(1.1)'
                  }
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
              Bạn chư có tài khoản ?
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
    </Box>
  )
}

export default Login;
