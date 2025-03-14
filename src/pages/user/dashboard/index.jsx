import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import BannerCarousel from '~/components/user/bannerCarousel';
import CardProduct from '~/components/user/cardProduct'
import BannerProduct from '~/components/user/bannerProduct';

const Dashboard = () => {
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box flex={2}><BannerCarousel /></Box>
      <Box flex={8} sx={{ minHeight: '150vh', paddingTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, mb:10 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection:'column', gap: 2, alignItems: 'center' }}>
          <Typography sx={{ fontSize: 30, fontWeight: 'bold', color: '#008874' }}>Sách đang khuyến mãi</Typography>
          <BannerProduct/>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', flexDirection:'column', gap: 2, alignItems: 'center' }}>
          <Typography sx={{ fontSize: 30, fontWeight: 'bold', color: '#008874' }}>Sách trung học</Typography>
          <BannerProduct/>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', flexDirection:'column', gap: 2, alignItems: 'center' }}>
          <Typography sx={{ fontSize: 30, fontWeight: 'bold', color: '#008874' }}>Sách trung học cơ sở</Typography>
          <BannerProduct/>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', flexDirection:'column', gap: 2, alignItems: 'center' }}>
          <Typography sx={{ fontSize: 30, fontWeight: 'bold', color: '#008874' }}>Sách tiểu học</Typography>
          <BannerProduct/>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard
