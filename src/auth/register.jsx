import React, { useState } from 'react';
import { Box, Stack, TextField, Typography, Button, FormControlLabel, Checkbox } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { postUser } from '~/services/userService';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { postCart } from '~/services/cart';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    rePassword: '',
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.email || !formData.password || !formData.rePassword) {
      toast.warning("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (formData.password !== formData.rePassword) {
      toast.error("Mật khẩu nhập lại không khớp!");
      return;
    }
    if (!formData.agree) {
      toast.warning("Bạn cần đồng ý với điều khoản để tiếp tục!");
      return;
    }
  
    console.log("Đăng ký với dữ liệu:", formData);
    toast.loading("⏳ Đang xử lý yêu cầu..."); // Toast loading
    let res;
    try {
      res = await postUser(formData)
      console.log(res)
      if(res.success) await postCart(res.user.user_id)
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss()
      toast(res.message, {
        icon: res.success ? 
          <div><TaskAltIcon style={{ color: "#2ecc71" }} /> </div>:
          <div><UnpublishedIcon style={{ color: "#e74c3c" }} /> </div>,
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      if(res.success) setTimeout(() => {navigate('/login')}, 2000)
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'lightgray' }}>
      <ToastContainer />
      <Stack 
        direction={'row'}
        sx={{ boxShadow: 3, borderRadius: "10px", height: '80%', width: '60%', background: '#fff' }}
      >
        <Box
          component="img"
          src="https://i.pinimg.com/736x/ab/86/aa/ab86aa9088a744dd93209f69e17b6c60.jpg"
          sx={{ flex: 1, objectFit: "cover", borderRadius: "10px 0 0 10px" }}
        />
        <Box
          sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#fff' }}
        >
          <Typography sx={{ fontSize: '26px', fontWeight: 'bold', color: '#008874' }}>Đăng Ký</Typography>
          
          <Box sx={{ width: '80%', display: 'flex', flexDirection: 'column', gap: 2, marginTop: 2 }}>
            <TextField fullWidth variant="outlined" name="username" label="Tên tài khoản" onChange={handleChange} />
            <TextField fullWidth variant="outlined" name="email" label="Email" type="email" onChange={handleChange} />
            <TextField fullWidth variant="outlined" name="password" label="Mật khẩu" type="password" onChange={handleChange} />
            <TextField fullWidth variant="outlined" name="rePassword" label="Nhập lại mật khẩu" type="password" onChange={handleChange} />
            <FormControlLabel 
              control={<Checkbox name="agree" onChange={handleChange} />} 
              label="Tôi đồng ý với mọi điều khoản." 
            />
            <Button 
              fullWidth 
              variant='contained' 
              sx={{ bgcolor: '#008874', mt: 2, borderRadius: '8px' }}
              onClick={handleSubmit}
            >
              Đăng ký
            </Button>
          </Box>
          <Box sx={{ width: '80%', display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <Typography sx={{ color: '#757575', cursor: 'pointer' }}>
              Bạn đã có tài khoản? 
              <Typography component="span" color="primary" sx={{ cursor: 'pointer' }} onClick={() => navigate('/login')}> Đăng nhập</Typography>
            </Typography>
            <Typography
              sx={{ cursor: 'pointer', color: '#757575', display: 'flex', alignItems: 'center', "&:hover": { color: "darkblue" } }}
              onClick={() => navigate('/login')}
            >
              Quay lại <ArrowForwardIcon fontSize="small"/>
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default Register;
