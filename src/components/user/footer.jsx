import { Box, Typography, Link } from '@mui/material';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minHeight: '50vh',
        overflow: 'hidden',
        bgcolor: '#f8f9fa',
        color: '#333'
      }}
    >
      {/* Phần Trên */}
      <Box flex={1}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '20px 50px',
          // bgcolor: '#008874',
          // color: 'white'
        }}
      >
        <Box flex={1}>
          <Typography
            sx={{
              fontSize: 40,
              fontWeight: 'bold',
              color:'#008874'
            }}
          >
            Ebook Store
          </Typography>
        </Box>
        {/* Chính sách */}
        {[
          {
            img: 'https://theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_1.png?v=666',
            title: 'Miễn phí vận chuyển',
            desc: 'Áp dụng cho đơn hàng từ 100k'
          },
          {
            img: 'https://theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_3.png?v=666',
            title: 'Thanh toán bảo mật',
            desc: 'Đảm bảo an toàn khi thanh toán'
          },
          {
            img: 'https://theme.hstatic.net/200000690725/1001078549/14/home_policy_icon_4.png?v=666',
            title: 'Hỗ trợ 24/7',
            desc: 'Tư vấn và hỗ trợ khách hàng'
          }
        ].map((item, index) => (
          <Box flex={1} key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box component={'img'} src={item.img} sx={{ width: 50, height: 50 }} />
              <Box>
                <Typography fontSize={18} fontWeight="bold">{item.title}</Typography>
                <Typography fontSize={16}>{item.desc}</Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Phần Dưới */}
      <Box flex={2} 
        sx={{ 
          display: 'flex', 
          padding: '40px 50px', 
          // bgcolor: '#222',
          color: 'black' 
        }}
      >
        {/* Cột 1: Thông tin liên hệ */}
        <Box flex={1}>
          <Typography fontSize={20} fontWeight="bold">Liên Hệ</Typography>
          <Typography fontSize={16}>Địa chỉ: 123 Đường ABC, Quận X, TP.Hà Nội</Typography>
          <Typography fontSize={16}>Điện thoại: 0123 456 789</Typography>
          <Typography fontSize={16}>Email: support@ebookstore.com</Typography>
        </Box>

        {/* Cột 2: Chính sách */}
        <Box flex={1}>
          <Typography fontSize={20} fontWeight="bold">Chính Sách</Typography>
          {["Chính sách đổi trả", "Chính sách bảo mật", "Hướng dẫn mua hàng"].map((text, idx) => (
            <Link key={idx} href="#" color="inherit" underline="hover" sx={{ display: "block", fontSize: 16, mt: 1 }}>
              {text}
            </Link>
          ))}
        </Box>

        {/* Cột 3: Liên kết nhanh */}
        <Box flex={1}>
          <Typography fontSize={20} fontWeight="bold">Liên Kết</Typography>
          {["Trang chủ", "Sản phẩm", "Liên hệ"].map((text, idx) => (
            <Link key={idx} href="#" color="inherit" underline="hover" sx={{ display: "block", fontSize: 16, mt: 1 }}>
              {text}
            </Link>
          ))}
        </Box>

        {/* Cột 4: Mạng xã hội */}
        <Box flex={1}>
          <Typography fontSize={20} fontWeight="bold">Kết Nối Với Chúng Tôi</Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
            <FacebookIcon sx={{ fontSize: 30, cursor: "pointer" }} />
            <InstagramIcon sx={{ fontSize: 30, cursor: "pointer" }} />
            <TwitterIcon sx={{ fontSize: 30, cursor: "pointer" }} />
          </Box>
        </Box>
      </Box>

      {/* Dòng bản quyền */}
      <Box sx={{ textAlign: 'center', py: 2, bgcolor: '#111', color: '#bbb', fontSize: 14 }}>
        © 2025 Ebook Store. All rights reserved.
      </Box>
    </Box>
  );
}

export default Footer;
