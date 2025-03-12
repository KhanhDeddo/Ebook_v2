import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';

const Loading = () => {
  return (
    <>
        <p>Loading...</p>
        <Box
          sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            height:'calc(100vh - 300px)',
            width:'100%'
          }}
        >
          <CircularProgress
            sx={{
              width:900,
              height:900,
              color:'red'
            }}
          />
        </Box>
      </>
  );
}

export default Loading;
