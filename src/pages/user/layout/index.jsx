import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import React, { useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '~/components/user/footer'
import Header from '~/components/user/header'

const UserLayout = () => {
  const location = useLocation();
  const contentRef = useRef(null);
  useEffect(() => {
      if (contentRef.current) {
          contentRef.current.scrollTop = 0;
      }
  }, [location.pathname]);
  return (
    <Stack sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Box flex={3} sx={{ bgcolor: '#242021', borderBottom: '1px solid lightgray' }}><Header /></Box>
      <Stack ref={contentRef} sx={{ flex: 17, overflowY: 'auto' }}>
        <Box flex={17} sx={{ margin: '0 50px 0 50px' }}><Outlet /></Box>
        <Box flex={3} sx={{ bgcolor: '#f3f6fa', borderTop: '1px solid lightgray' }}><Footer /></Box>
      </Stack>
    </Stack>
  )
}

export default UserLayout
