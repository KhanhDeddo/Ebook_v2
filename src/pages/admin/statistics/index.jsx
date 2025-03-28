import { Avatar, Box, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Shop2Icon from '@mui/icons-material/Shop2';
import { DataGrid } from '@mui/x-data-grid';
import { getBooks } from '~/services/productService';
import Loading from '~/components/common/loading';
import { getOrders } from '~/services/orderService';
import { getUsers } from '~/services/userService';

const columnsRecentOrder = [
  {
    field: 'id',
    headerName: 'STT',
    headerAlign: 'center',
    align: 'center',
    flex: 1,
  },
  {
    field: 'title',
    headerName: 'Tên sản phẩm',
    headerAlign: 'start',
    align: 'start',
    flex: 4,
  },
  {
    field: 'stock',
    headerName: 'Số lượng',
    headerAlign: 'start',
    align: 'start',
    flex: 1.7,
  },
]
const columnsNewUser = [
  {
    field: 'id',
    headerName: 'ID người dùng',
    headerAlign: 'center',
    flex: 1,
    align: 'center',
  },
  {
    field: 'image_url',
    headerName: 'Avata',
    flex: 4,
    headerAlign: 'center',
    align: 'center',
    display: 'flex',
    justifyContent: 'center',
    renderCell: (params) => (
      <Avatar
        src={params.value}
        alt='avata'
        sx={{
          width: 40,
          height: 40,
          boxShadow: 3,
        }}
      />
    ),
  },
  {
    field: 'username',
    headerName: 'Tên người dùng',
    headerAlign: 'center',
    flex: 7,
    align: 'center',
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 8,
    headerAlign: 'center',
    align: 'center',
  },
]

const AdminStatistics = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [books, setBooks] = useState([])
  const [orders, setOrders] = useState([])
  const [ordersProgress, setOrdersProgress] = useState([])
  const [ordersSuccess, setOrdersSuccess] = useState([])
  const [ordersFailed, setOrdersFailed] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  useEffect(() => { setTotalAmount(ordersSuccess?.reduce((sum, order) => sum + order?.total_price, 0)) }, [ordersSuccess])
  const fechTop20Book = async () => {
    try {
      const userData = await await getUsers()
      const bookData = await await getBooks()
      const orderData = await getOrders()
      setBooks(bookData)
      setOrders(orderData)
      console.log(new Date(orderData[1].create_at))
      console.log("User Data:", userData);

      setUsers(
        userData
          .map(({ user_id, create_at, ...rest }) => ({
            id: user_id,
            create_at: new Date(create_at), 
            ...rest,
          }))
          .sort((a, b) => b.create_at - a.create_at) 
      );
      
      
      
      const handleOrdersProgress = orderData.filter((order) => order.status !== "Hoàn thành" && order.status !== "Đã hủy")
      const handleOrdersSuccess = orderData.filter(
        (order) => order.status === "Hoàn thành" && new Date(order.create_at).getFullYear() === 2025
      )
      const handleOrdersFailed = orderData.filter((order) => order.status === "Đã hủy")
      setOrdersProgress(handleOrdersProgress)
      setOrdersSuccess(handleOrdersSuccess)
      setOrdersFailed(handleOrdersFailed)
    } catch (e) { console.log(e) }
    finally { setLoading(false) }
  }
  useEffect(() => {
    fechTop20Book()
  }, [])

  const valueFormatter = (value) => {
    return `${value?.toLocaleString('vi-VN')}đ`
  }
  const dataset = [
    {
      month: 'Jan',
      cash: ordersSuccess
        ?.filter((order) => (order.payment_method === "Tiền mặt" && new Date(order.create_at).getMonth() + 1 === 1))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      zalopay: ordersSuccess
        ?.filter((order) => (order.payment_method === "Zalopay" && new Date(order.create_at).getMonth() + 1 === 1))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      total: ordersSuccess
        ?.filter((order) => (new Date(order.create_at).getMonth() + 1 === 1))
        ?.reduce((sum, order) => sum + order?.total_price, 0)
    },
    {
      month: 'Feb',
      cash: ordersSuccess
        ?.filter((order) => (order.payment_method === "Tiền mặt" && new Date(order.create_at).getMonth() + 1 === 2))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      zalopay: ordersSuccess
        ?.filter((order) => (order.payment_method === "Zalopay" && new Date(order.create_at).getMonth() + 1 === 2))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      total: ordersSuccess
        ?.filter((order) => (new Date(order.create_at).getMonth() + 1 === 2))
        ?.reduce((sum, order) => sum + order?.total_price, 0)
    },
    {
      month: 'Mar',
      cash: ordersSuccess
        ?.filter((order) => (order.payment_method === "Tiền mặt" && new Date(order.create_at).getMonth() + 1 === 3))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      zalopay: ordersSuccess
        ?.filter((order) => (order.payment_method === "Zalopay" && new Date(order.create_at).getMonth() + 1 === 3))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      total: ordersSuccess
        ?.filter((order) => (new Date(order.create_at).getMonth() + 1 === 3))
        ?.reduce((sum, order) => sum + order?.total_price, 0)
    },
    {
      month: 'Apr',
      cash: ordersSuccess
        ?.filter((order) => (order.payment_method === "Tiền mặt" && new Date(order.create_at).getMonth() + 1 === 4))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      zalopay: ordersSuccess
        ?.filter((order) => (order.payment_method === "Zalopay" && new Date(order.create_at).getMonth() + 1 === 4))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      total: ordersSuccess
        ?.filter((order) => (new Date(order.create_at).getMonth() + 1 === 4))
        ?.reduce((sum, order) => sum + order?.total_price, 0)
    },
    {
      month: 'May',
      cash: ordersSuccess
        ?.filter((order) => (order.payment_method === "Tiền mặt" && new Date(order.create_at).getMonth() + 1 === 5))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      zalopay: ordersSuccess
        ?.filter((order) => (order.payment_method === "Zalopay" && new Date(order.create_at).getMonth() + 1 === 5))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      total: ordersSuccess
        ?.filter((order) => (new Date(order.create_at).getMonth() + 1 === 5))
        ?.reduce((sum, order) => sum + order?.total_price, 0)
    },
    {
      month: 'Jun',
      cash: ordersSuccess
        ?.filter((order) => (order.payment_method === "Tiền mặt" && new Date(order.create_at).getMonth() + 1 === 6))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      zalopay: ordersSuccess
        ?.filter((order) => (order.payment_method === "Zalopay" && new Date(order.create_at).getMonth() + 1 === 6))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      total: ordersSuccess
        ?.filter((order) => (new Date(order.create_at).getMonth() + 1 === 6))
        ?.reduce((sum, order) => sum + order?.total_price, 0)
    },
    {
      month: 'Jul',
      cash: ordersSuccess
        ?.filter((order) => (order.payment_method === "Tiền mặt" && new Date(order.create_at).getMonth() + 1 === 7))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      zalopay: ordersSuccess
        ?.filter((order) => (order.payment_method === "Zalopay" && new Date(order.create_at).getMonth() + 1 === 7))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      total: ordersSuccess
        ?.filter((order) => (new Date(order.create_at).getMonth() + 1 === 7))
        ?.reduce((sum, order) => sum + order?.total_price, 0)
    },
    {
      month: 'Aug',
      cash: ordersSuccess
        ?.filter((order) => (order.payment_method === "Tiền mặt" && new Date(order.create_at).getMonth() + 1 === 8))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      zalopay: ordersSuccess
        ?.filter((order) => (order.payment_method === "Zalopay" && new Date(order.create_at).getMonth() + 1 === 8))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      total: ordersSuccess
        ?.filter((order) => (new Date(order.create_at).getMonth() + 1 === 8))
        ?.reduce((sum, order) => sum + order?.total_price, 0)
    },
    {
      month: 'Sep',
      cash: ordersSuccess
        ?.filter((order) => (order.payment_method === "Tiền mặt" && new Date(order.create_at).getMonth() + 1 === 9))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      zalopay: ordersSuccess
        ?.filter((order) => (order.payment_method === "Zalopay" && new Date(order.create_at).getMonth() + 1 === 9))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      total: ordersSuccess
        ?.filter((order) => (new Date(order.create_at).getMonth() + 1 === 9))
        ?.reduce((sum, order) => sum + order?.total_price, 0)
    },
    {
      month: 'Oct',
      cash: ordersSuccess
        ?.filter((order) => (order.payment_method === "Tiền mặt" && new Date(order.create_at).getMonth() + 1 === 10))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      zalopay: ordersSuccess
        ?.filter((order) => (order.payment_method === "Zalopay" && new Date(order.create_at).getMonth() + 1 === 10))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      total: ordersSuccess
        ?.filter((order) => (new Date(order.create_at).getMonth() + 1 === 10))
        ?.reduce((sum, order) => sum + order?.total_price, 0)
    },
    {
      month: 'Nov',
      cash: ordersSuccess
        ?.filter((order) => (order.payment_method === "Tiền mặt" && new Date(order.create_at).getMonth() + 1 === 11))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      zalopay: ordersSuccess
        ?.filter((order) => (order.payment_method === "Zalopay" && new Date(order.create_at).getMonth() + 1 === 11))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      total: ordersSuccess
        ?.filter((order) => (new Date(order.create_at).getMonth() + 1 === 11))
        ?.reduce((sum, order) => sum + order?.total_price, 0)
    },
    {
      month: 'Dec',
      cash: ordersSuccess
        ?.filter((order) => (order.payment_method === "Tiền mặt" && new Date(order.create_at).getMonth() + 1 === 12))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      zalopay: ordersSuccess
        ?.filter((order) => (order.payment_method === "Zalopay" && new Date(order.create_at).getMonth() + 1 === 12))
        ?.reduce((sum, order) => sum + order?.total_price, 0),
      total: ordersSuccess
        ?.filter((order) => (new Date(order.create_at).getMonth() + 1 === 12))
        ?.reduce((sum, order) => sum + order?.total_price, 0)
    }
  ]
  const dataPie = [
    { id: 0, value: ordersSuccess?.length / (ordersSuccess?.length + ordersFailed?.length), label: "Tỷ lệ đơn hàng thành công", color: "#28C76F" },
    { id: 2, value: ordersFailed?.length / (ordersSuccess?.length + ordersFailed?.length), label: "Tỷ lệ đơn hàng bị hủy", color: "#EA5455" },
    // { id: 3, value: ordersProgress?.length/orders?.length, label:"Tỷ lệ đơn hàng đang xử lý", color: "#7367F0" },
  ]
  if (loading) return <Loading />
  return (
    <Stack sx={{ height: '180vh', width: '100%', overflow: 'hidden' }}>
      <Stack
        direction={'row'}
        flex={1.7}
      >
        <Stack
          direction={'row'}
          sx={{ flex: 6.9 }}
        >
          <Paper
            elevation={5}
            sx={{
              flex: 1,
              margin: 1.5,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              boxShadow: "0px 0px 15px rgba(22, 0, 149, 0.66)",
              animation: "gradientAnimation 6s ease infinite",
              background: "linear-gradient(135deg,rgb(255, 92, 10),rgb(36, 206, 101),rgb(212, 241, 26))",
              backgroundSize: "400% 400%",
              transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease-in-out, opacity 0.4s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0px 0px 10px rgba(28, 0, 241, 0.9), 0px 0px 50px rgba(4, 0, 255, 0.9)",
                opacity: 0.9,
              },
              "&:active": {
                transform: "scale(0.95)",
                boxShadow: "0px 0px 50px rgba(255, 0, 128, 0.6)",
                opacity: 1,
              },
            }}
          >
            <Box
              sx={{
                flex: 2,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={{
                fontSize: 20,
                fontWeight: 'bold',
                margin: 1,
                color: '#fff',
                filter: "drop-shadow(0px 0px 10px rgba(255, 0, 17, 0.67))"
              }}>Tổng doanh thu</Typography>
              <CurrencyExchangeIcon sx={{ width: 40, height: 40, margin: 1, color: '#fff' }} />
            </Box>
            <Box
              sx={{
                flex: 8,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: '#fff' }}>{`${(totalAmount / 1000000)}Tr`}</Typography>
            </Box>
          </Paper>
          <Paper
            elevation={5}
            sx={{
              flex: 1,
              margin: 1.5,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              boxShadow: "0px 0px 15px rgba(22, 0, 149, 0.66)",
              animation: "gradientAnimation 6s ease infinite",
              background: "linear-gradient(135deg,rgb(71, 10, 255),rgb(36, 206, 101),rgb(212, 241, 26))",
              backgroundSize: "400% 400%",
              transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease-in-out, opacity 0.4s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0px 0px 10px rgba(28, 0, 241, 0.9), 0px 0px 50px rgba(4, 0, 255, 0.9)",
                opacity: 0.9,
              },
              "&:active": {
                transform: "scale(0.95)",
                boxShadow: "0px 0px 50px rgba(255, 0, 128, 0.6)",
                opacity: 1,
              },
            }}
          >
            <Box
              sx={{
                flex: 2,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={{
                fontSize: 20,
                fontWeight: 'bold',
                margin: 1,
                color: '#fff',
                filter: "drop-shadow(0px 0px 10px rgba(255, 0, 17, 0.67))"
              }}>Tổng Đơn hàng</Typography>
              <ShoppingCartIcon sx={{ width: 40, height: 40, margin: 1, color: '#fff' }} />
            </Box>
            <Box
              sx={{
                flex: 8,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: '#fff' }}>{orders.length}</Typography>
            </Box>
          </Paper>
          <Paper
            elevation={5}
            sx={{
              flex: 1,
              margin: 1.5,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 3,
              boxShadow: "0px 0px 15px rgba(22, 0, 149, 0.66)",
              animation: "gradientAnimation 6s ease infinite",
              background: "linear-gradient(135deg,rgb(255, 10, 10),rgb(107, 36, 206),rgb(212, 241, 26))",
              backgroundSize: "400% 400%",
              transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease-in-out, opacity 0.4s ease",
              "&:hover": {
                transform: "scale(1.1)",
                boxShadow: "0px 0px 10px rgba(28, 0, 241, 0.9), 0px 0px 50px rgba(4, 0, 255, 0.9)",
                opacity: 0.9,
              },
              "&:active": {
                transform: "scale(0.95)",
                boxShadow: "0px 0px 50px rgba(255, 0, 128, 0.6)",
                opacity: 1,
              },
            }}
          >
            <Box
              sx={{
                flex: 2,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography sx={{
                fontSize: 19,
                fontWeight: 'bold',
                margin: 1,
                color: '#fff',
                filter: "drop-shadow(0px 0px 10px rgba(255, 0, 17, 0.67))"
              }}>Đơn hàng đang xử lý</Typography>
              <LocalShippingIcon sx={{ width: 40, height: 40, margin: 1, color: '#fff' }} />
            </Box>
            <Box
              sx={{
                flex: 8,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography sx={{ fontSize: 40, fontWeight: 'bold', color: '#fff' }}>{ordersProgress.length}</Typography>
            </Box>
          </Paper>
        </Stack>
        <Stack
          flex={3.1}
        >
          <Paper
            elevation={5}
            sx={{
              flex: 1,
              margin: 1,
              display: 'flex',
              justifyContent: 'space-between',
              borderRadius: 3,
              boxShadow: "0px 0px 10px rgba(149, 0, 0, 0.66)",
              animation: "gradientAnimation 6s ease infinite",
              background: "linear-gradient(135deg,rgb(255, 10, 10),rgb(198, 36, 206),rgb(223, 26, 241))",
              backgroundSize: "400% 400%",
              transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease-in-out, opacity 0.4s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0px 0px 10px rgba(28, 0, 241, 0.9), 0px 0px 50px rgba(4, 0, 255, 0.9)",
                opacity: 0.9,
              },
              "&:active": {
                transform: "scale(0.95)",
                boxShadow: "0px 0px 50px rgba(255, 0, 128, 0.6)",
                opacity: 1,
              }
            }}
          >
            <Box flex={7} sx={{
            }}>
              <Typography
                sx={{
                  margin: 1,
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: '#fff'
                }}
              >Đơn hàng thành công</Typography>
              <Shop2Icon
                sx={{
                  color: '#fff',
                  marginLeft: 7,
                  width: 35,
                  height: 35
                }} />
            </Box>
            <Typography
              flex={3}
              sx={{
                margin: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 34,
                fontWeight: 'bold',
                color: '#fff',
                marginRight: 5,
              }}>{ordersSuccess.length}</Typography>
          </Paper>
          <Paper
            elevation={5}
            sx={{
              flex: 1,
              margin: 1,
              display: 'flex',
              justifyContent: 'space-between',
              borderRadius: 3,
              boxShadow: "0px 0px 10px rgba(149, 0, 0, 0.66)",
              animation: "gradientAnimation 6s ease infinite",
              background: "linear-gradient(135deg,rgb(128, 10, 255),rgb(255, 0, 0),rgb(223, 26, 241))",
              backgroundSize: "400% 400%",
              transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease-in-out, opacity 0.4s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: "0px 0px 10px rgba(28, 0, 241, 0.9), 0px 0px 50px rgba(4, 0, 255, 0.9)",
                opacity: 0.9,
              },
              "&:active": {
                transform: "scale(0.95)",
                boxShadow: "0px 0px 50px rgba(255, 0, 128, 0.6)",
                opacity: 1,
              }
            }}
          >
            <Box flex={7} sx={{
            }}>
              <Typography
                sx={{
                  margin: 1,
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: '#fff'
                }}
              >Đơn hàng thất bại</Typography>
              <Shop2Icon
                sx={{
                  color: '#fff',
                  marginLeft: 7,
                  width: 35,
                  height: 35
                }} />
            </Box>
            <Typography
              flex={3}
              sx={{
                margin: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 34,
                fontWeight: 'bold',
                color: '#fff',
                marginRight: 5,
              }}>{ordersFailed.length}</Typography>
          </Paper>
        </Stack>
      </Stack>

      <Stack
        flex={4}
        direction={'row'}
      >
        <Stack
          sx={{
            flex: 6.9,
            borderRadius: 5,
            boxShadow: 5,
            margin: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BarChart
            sx={{ ml: 5 }}
            dataset={dataset}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            yAxis={[{ width: '100px' }]}
            series={[
              { dataKey: "cash", label: "Doanh thu COD", valueFormatter },
              { dataKey: "zalopay", label: "Doanh thu Zalopay", valueFormatter },
              { dataKey: "total", label: "Tổng doanh thu", valueFormatter },
            ]}

          />
        </Stack>

        <Stack
          sx={{
            flex: 3.1,
            borderRadius: 5,
            boxShadow: 5,
            padding: '20px 0 20px 0',
            margin: 1
          }}
        >
          <PieChart
            series={[
              {
                data: dataPie,
                outerRadius: 100, // Tùy chỉnh kích thước pie
              },
            ]}
            sx={{ ml: 20 }}
            width={300}
            height={250}

            slotProps={{ legend: { hidden: true } }} // Ẩn legend mặc định
          />
          <Box gap={2} m={'1px 1px 20px 20px'}>
            {dataPie.map((item) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    backgroundColor: item.color,
                    borderRadius: "50%",
                  }}
                />
                <Typography variant="body2" color='black' fontSize={17}>{item.label}</Typography>
              </Box>
            ))}
          </Box>
        </Stack>
      </Stack>

      <Stack
        direction={'row'}
        flex={5.5}
        overflow={'hidden'}
      >
        <Box
          sx={{
            // bgcolor:'blue',
            flex: 6.9,
            margin: 1,
            mb: 8,
          }}
        >
          <Typography margin={2} fontSize={20} fontWeight={'bold'}>Top 10 khách hàng tiềm năng</Typography>
          <DataGrid
            sx={{
              boxShadow: 3,
              borderRadius: 3
            }}
            columns={columnsNewUser}
            rows={users.slice(0,10)}
            // rowHeight={70}
          />
        </Box>
        <Box
          sx={{
            flex: 3.1,
            margin: 1,
            mb: 8,
          }}
        >
          <Typography margin={2} fontSize={20} fontWeight={'bold'}>Top 10 sản phẩm bán chạy nhất</Typography>
          <DataGrid
            sx={{
              boxShadow: 3,
              borderRadius: 3
            }}
            columns={columnsRecentOrder}
            // rowHeight={50}
            pageSizeOptions={[5]}
            rows={books.slice(0,10)}
          />
        </Box>

      </Stack>
    </Stack>
  );
}

export default AdminStatistics
