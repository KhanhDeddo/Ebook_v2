import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '~/components/user/header';

const UserLayout = () => {
  return (
    <Stack

      sx={{
        width:'100%',
        height:'100vh',
        overflow:'hidden'
      }}
    >
    <Box sx={{ flex:3, bgcolor:'#242021',borderBottom: '1px solid lightgray' }}><Header/></Box>
    <Stack sx={{flex:17, overflowY:'auto'}}>
      <Box
        sx={{
          flex:17,
          bgcolor:'yellow',
          margin:'0 50px 0 50px'
          
        }}
      ><Outlet/></Box>
      <Box
        sx={{flex:3,
          bgcolor:'lightcoral'
        }}
      >
        <Typography>hehe</Typography>
        <Typography>hehe</Typography>
        <Typography>hehe</Typography>
        <Typography>hehe</Typography>
        <Typography>hehe</Typography>
        <Typography>hehe</Typography>
        <Typography>hehe</Typography>
        <Typography>hehe</Typography>
        <Typography>hehe</Typography>
        <Typography>hehe</Typography>
        <Typography>hehe</Typography>
        <Typography>hehe</Typography>
        <Typography>hehe</Typography>
      </Box>
    </Stack>
    
    </Stack>
  )
}

export default UserLayout
