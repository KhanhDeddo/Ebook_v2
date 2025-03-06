import { Box, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { PieChart } from '@mui/x-charts';

const dataset = [
  {
    london: 19,
    paris: 57,
    newYork: 86,
    seoul: 21,
    month: 'Jan',
  },
  {
    london: 20,
    paris: 52,
    newYork: 78,
    seoul: 28,
    month: 'Feb',
  },
  {
    london: 47,
    paris: 53,
    newYork: 106,
    seoul: 41,
    month: 'Mar',
  },
  {
    london: 44,
    paris: 56,
    newYork: 92,
    seoul: 73,
    month: 'Apr',
  },
  {
    london: 27,
    paris: 69,
    newYork: 92,
    seoul: 99,
    month: 'May',
  },
  {
    london: 10,
    paris: 63,
    newYork: 103,
    seoul: 144,
    month: 'June',
  },
  {
    london: 69,
    paris: 60,
    newYork: 105,
    seoul: 319,
    month: 'July',
  },
  {
    london: 65,
    paris: 60,
    newYork: 106,
    seoul: 249,
    month: 'Aug',
  },
  {
    london: 51,
    paris: 51,
    newYork: 95,
    seoul: 131,
    month: 'Sept',
  },
  {
    london: 60,
    paris: 65,
    newYork: 97,
    seoul: 55,
    month: 'Oct',
  },
  {
    london: 67,
    paris: 64,
    newYork: 76,
    seoul: 48,
    month: 'Nov',
  },
  {
    london: 31,
    paris: 70,
    newYork: 103,
    seoul: 25,
    month: 'Dec',
  },
];
function valueFormatter(value) {
  return `${value} VNĐ`;
}

const chartSetting = {
  yAxis: [
    {
      label: 'rainfall (mm)',
    },
  ],
  width: 800,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};
const data = [
  { id: 0, value: 100, label: "Tổng đơn hàng", color: "#0088FE" },
  { id: 1, value: 78, label: "Tổng đơn hàng thành công", color: "#FF8042" },
];
const Statistics = () => {
  return (
    <Stack
      direction={'row'} 
      sx={{
        height:'calc(100vh)',
        // bgcolor:'blue',
        width:'100%'
      }}
    >
      <Stack
        sx={{
          flex:14,
          height:'100vh',
          width:'100%',
          // bgcolor:'violet',
        }}
      >
        <Stack
            direction={'row'}
            sx={{
              flex:3,
              // bgcolor:'green',
              display:'flex',
              justifyContent:'center',
              alignItems:'center',
              gap:2,
              padding:1

            }}
          >
            <Paper
              sx={{
                height:'80%',
                width:'90%',
                padding:1
              }}
            >
              Tổng doanh thu
            </Paper>
            <Paper
              sx={{
                height:'80%',
                width:'90%',
                padding:1
              }}
            >
              Tổng sản phẩm
            </Paper>
            <Paper
              sx={{
                height:'80%',
                width:'90%',
                padding:1
              }}
            >
              Tổng sản phẩm đang bán
            </Paper>
            
        </Stack>
        <Stack
            sx={{
              flex:7,
              // bgcolor:'violet'
            }}
          >
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
              series={[
                { dataKey: 'newYork', label: 'Đơn đặt hàng', valueFormatter },
                { dataKey: 'paris', label: 'Đơn hàng hoàn thành', valueFormatter },
                { dataKey: 'london', label: 'Tổng doanh thu', valueFormatter },
                // { dataKey: 'seoul', label: 'Tổng doanh thu', valueFormatter },
              ]}
              {...chartSetting}
            />
        </Stack>
      </Stack>  
      <Stack
        sx={{
          flex:6,
          height:'100vh',
          width:'100%',
          // bgcolor:'orange'
        }}
      >

        <Stack
          sx={{
            flex:3,
            // bgcolor:'blue',
            gap:1,
            padding:1
          }}
        >
          <Paper
            sx={{
              width:'100%',
              height:'90%'
            }}
          >
            Tổng đơn hàng 
          </Paper>
          <Paper
            sx={{
              width:'100%',
              height:'90%'
            }}
          >
            Tổng đơn hàng thành công
          </Paper>
        </Stack>
      
        <Stack
          sx={{
            flex:7,
            // bgcolor:'red',
            padding:1
          }}
        >
          <Paper
            sx={{
              height:'100%',
              alignItems:'center'
            }}
          >
          <Box
            sx={{
              
              gap:1
            }}
          >
      {/* PieChart */}
      <PieChart
        series={[
          {
            data: data,
            outerRadius: 110, // Tùy chỉnh kích thước pie
          },
        ]}
        width={400}
        height={250}
        alignItems={'center'}
        justifyContent={'center'}
        slotProps={{ legend: { hidden: true } }} // Ẩn legend mặc định
      />

      {/* Custom Legend */}
      <Box  gap={2} mt={1} padding={5}>
        {data.map((item) => (
          <Box key={item.id} display="flex" alignItems="center" gap={1}>
            <Box
              sx={{
                width: 12,
                height: 12,
                backgroundColor: item.color,
                borderRadius: "50%",
              }}
            />
            <Typography variant="body2">{item.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
          </Paper>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default Statistics;
