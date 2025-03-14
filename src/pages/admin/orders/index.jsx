import { Box, CircularProgress, InputAdornment, Paper, Stack, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { getBooks } from '~/services/productService';

const columns = [
  {
    field:'id',
    headerName:'STT',
    flex:0.8,
    headerAlign:'center',
    align:'center'
  },
  {
    field:'order_id',
    headerName:'Mã đơn hàng',
    flex:1
  },
  {
    field:'customerName',
    headerName:'Tên khách hàng',
    flex:2
  },
  {
    field:'date',
    headerName:'Ngày đặt đơn',
    flex:2
  },
  {
    field:'status',
    headerName:'Trạng thái',
    flex:1.5
  },
  {
    field:'total',
    headerName:'Tổng tiền',
    flex:1.5
  },
  {
    field:'paidStatus',
    headerName:'Trạng thái thanh toán',
    flex:2
  },
  {
    field:'adress',
    headerName:'Địa chỉ nhận hàng',
    flex:3
  },
  {
    field:'operation',
    headerName:'Thao tác',
    flex:1
  },
]

const AdminOrders = () => {
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
    const fechBooks = async () => {
    try{
        await getBooks()
    }catch(e){return e;}
    finally{setLoading(false)}
    };fechBooks()
  },[])

  if (loading) 
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
    )
  
  return (
    <Stack
      sx={{
        height:'120vh',
        width:'100%',
        // bgcolor:'lightblue'
      }}
    >
      <Stack
        // sx={{
        //   flex:4,
        //   width:'100%',
        //   height:'100%',
        //   bgcolor:'lightgray'
          
        // }}
        sx={{
          flex:4,
          borderRadius: 2,
          boxShadow: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f6fa",
          fontWeight: "bold",
          backgroundImage: "url('https://www.svgrepo.com/show/233867/delivery-truck-free.svg')",
          backgroundSize: 200,
          backgroundPosition: "center",
          backgroundRepeat: 'no-repeat',
          
        }}
      >

      </Stack>
      <Stack
        sx={{
          flex:6,
          width:'100%',
          height:'100%',
          // bgcolor:'lightgreen'
        }}
      >
        <Box
          sx={{
            flex:1,
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            gap:2,
            padding:1
          }}
        >
          <Paper
            elevation={0}
            sx={{
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              gap:1,
              padding:1,
              borderRadius:3,
              height:'50%'
            }}
          >
            <Box borderRadius={2} boxShadow={2} padding={1}>Tất cả</Box>
            <Box borderRadius={2} boxShadow={2} padding={1}>Chờ giao hàng</Box>
            <Box borderRadius={2} boxShadow={2} padding={1}>Chờ vận chuyển</Box>
            <Box borderRadius={2} boxShadow={2} padding={1}>Đang giao</Box>
            <Box borderRadius={2} boxShadow={2} padding={1}>Hoàn thành</Box>
            <Box borderRadius={2} boxShadow={2} padding={1}>Đã hủy</Box>
          </Paper>
          <TextField
            variant="standard"
            placeholder='Tìm kiếm đơn hàng...'
            InputProps={{
              disableUnderline:true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              boxShadow:3,
              borderRadius:4,
              padding:1
              
            }}
          />
        </Box>
        <Box
          sx={{
            flex:9,
          }}
        >
          <DataGrid
            columns={columns}
          />
        </Box>
      </Stack>
    </Stack>
  );
}

export default AdminOrders;
