import { Box, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

const columns = [
  {
    field: "id",
    headerName:"STT",
    flex:0.5
  },
  {
    field: "title",
    headerName:"Tên sản phẩm",
    flex:1
  },
  {
    field: "quantity",
    headerName:"Số lương",
    flex:1
  },
  {
    field: "price",
    headerName:"Giá",
    flex:1
  },
  {
    field: "status",
    headerName:"Trạng thái",
    flex:1
  },
  {
    field: "operater",
    headerName:"Thao tác",
    flex:1
  },
  
]

const Cart = () => {
  return (
    <Box sx={{display:'flex'}} minHeight={'100vh'} gap={1}>
      <Box flex={4} sx={{display:'flex', flexDirection:'column'}}>
        <Typography flex={1}>Trang chủ/Giỏ hàng</Typography>
        <Box flex={19} sx={{boxShadow:3, borderRadius:1, margin:1}}>
          <DataGrid
            columns={columns}
          />
        </Box>
      </Box>
      <Box flex={1}>
        <Box  sx={{boxShadow:3, margin:3}}>
            hehe  
        </Box>
      </Box>
    </Box>
  );
}

export default Cart;
