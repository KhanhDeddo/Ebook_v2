
import { Box, Button, FormControl, FormControlLabel, InputBase, Radio, RadioGroup, Typography } from '@mui/material'
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';

const Payments = () => {
  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh', overflow:'hidden' }}>
      <Box sx={{ width: '60%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3 }}>
        <Typography sx={{ fontSize: 24, fontWeight: 'bold', color: '#008874', padding:3 }}>Thông tin đơn hàng</Typography>
        <Box>
          {/* <DataGrid/> */}
        </Box>
      </Box>
      <Box sx={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 3, gap: 2 }} >
          <Typography sx={{ fontSize: 24, fontWeight: 'bold', color: '#008874' ,padding:3 }}>Thông tin khách hàng</Typography>
        <Box sx={{ width: '95%', display: 'flex', boxShadow: 3, alignItems: 'center', borderRadius: 5, paddingLeft: 3 }}>
          <Typography sx={{ minWidth: 180 }}>Người đặt hàng</Typography>
          <InputBase sx={{ flex: 1, boxShadow: 3, borderRadius: 5, padding: 1 }} />
        </Box>
        <Box sx={{ width: '95%', display: 'flex', boxShadow: 3, alignItems: 'center', borderRadius: 5, paddingLeft: 3 }}>
          <Typography sx={{ minWidth: 180 }}>Người nhận đơn</Typography>
          <InputBase sx={{ flex: 1, boxShadow: 3, borderRadius: 5, padding: 1 }} />
        </Box>
        <Box sx={{ width: '95%', display: 'flex', boxShadow: 3, alignItems: 'center', borderRadius: 5, paddingLeft: 3 }}>
          <Typography sx={{ minWidth: 180 }}>Số điện thoại</Typography>
          <InputBase sx={{ flex: 1, boxShadow: 3, borderRadius: 5, padding: 1 }} />
        </Box>
        <Box sx={{ width: '95%', display: 'flex', boxShadow: 3, alignItems: 'center', borderRadius: 5, paddingLeft: 3 }}>
          <Typography sx={{ minWidth: 180 }}>Địa chỉ</Typography>
          <InputBase sx={{ flex: 1, boxShadow: 3, borderRadius: 5, padding: 1 }} />
        </Box>
        <Box sx={{ width: '95%', display: 'flex', boxShadow: 3, alignItems: 'center', borderRadius: 5, paddingLeft: 3 }}>
          <Typography sx={{ minWidth: 180 }}>Phương thức thanh toán</Typography>
          <FormControl sx={{ flex: 1, boxShadow: 3, borderRadius: 5, padding: '6px 20px 6px 50px' }}>
            <RadioGroup row sx={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
              <FormControlLabel
                value="cod"
                control={<Radio icon={<Box component="img"
                  src="https://www.svgrepo.com/show/406653/money-with-wings.svg"
                  sx={{ width: 25, height: 25, objectFit: "cover", borderRadius: '100%', boxShadow: 1 }}
                />}
                  checkedIcon={<TaskAltIcon color="primary" sx={{ width: 25, height: 25, boxShadow: 5, borderRadius: '100%' }} />} />}
                label="COD"
              />
              <FormControlLabel
                value="zalopay"
                control={<Radio icon={<Box component="img"
                  src="https://images.seeklogo.com/logo-png/39/1/zalopay-logo-png_seeklogo-391409.png"
                  sx={{ width: 25, height: 25, objectFit: "cover", borderRadius: '100%', boxShadow: 1 }}
                />} checkedIcon={<TaskAltIcon color="primary" sx={{ boxShadow: 5, borderRadius: '100%' }} />} />}
                label="ZaloPay"
              />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'flex-end', padding: 3, pt: 8 }}>
            <Button
              sx={{
                minWidth: 180,
                height: 50,
                borderRadius: 3,
                background: "linear-gradient(135deg,rgb(203, 0, 0) 0%,rgb(249, 142, 35) 100%)",
                color: "white",
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: "0px 4px 10px rgba(255, 78, 80, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
                  boxShadow: "0px 6px 15px rgba(255, 78, 80, 0.5)",
                  transform: "translateY(-2px)"
                },
                "&:active": {
                  transform: "translateY(2px)",
                  boxShadow: "0px 2px 5px rgba(255, 78, 80, 0.2)"
                }
              }}
            >
              Hủy
            </Button>

            <Button
              sx={{
                minWidth: 180,
                height: 50,
                borderRadius: 3,
                background: "linear-gradient(135deg, #36d1dc 0%, #5b86e5 100%)",
                color: "white",
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: "0px 4px 10px rgba(54, 209, 220, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(135deg, #48c6ef 0%, #6f86d6 100%)",
                  boxShadow: "0px 6px 15px rgba(54, 209, 220, 0.5)",
                  transform: "translateY(-2px)"
                },
                "&:active": {
                  transform: "translateY(2px)",
                  boxShadow: "0px 2px 5px rgba(54, 209, 220, 0.2)"
                }
              }}
            >
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Payments;
