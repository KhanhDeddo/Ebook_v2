import { Box } from '@mui/material';
import React from 'react';

const Orders = () => {
  return (
    <Box sx={{
      display:'flex',
      width:'100%',
      minHeight:'100vh',
      bgcolor:'burlywood'
    }}>
    <Box flex={2} sx={{bgcolor:'beige'}}>
      <Box></Box>
    </Box>
    <Box flex={7} sx={{bgcolor:'violet'}}></Box>
    </Box>
  );
}

export default Orders
