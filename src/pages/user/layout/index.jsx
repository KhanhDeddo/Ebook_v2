import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '~/components/user/footer'
import Header from '~/components/user/header'

const UserLayout = () => {
  return (
    <Stack sx={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <Box flex={3} sx={{ bgcolor: '#242021', borderBottom: '1px solid lightgray' }}><Header /></Box>
      <Stack sx={{ flex: 17, overflowY: 'auto' }}>
        <Box flex={17} sx={{ margin: '0 50px 0 50px' }}><Outlet /></Box>
        <Box flex={3} sx={{ bgcolor: '#f3f6fa', borderTop: '1px solid lightgray' }}><Footer /></Box>
      </Stack>
    </Stack>
  )
}

export default UserLayout
