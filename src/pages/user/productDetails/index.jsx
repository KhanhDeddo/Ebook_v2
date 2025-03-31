import { Box, Button, InputBase, Rating, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '~/components/common/loading';
import BannerProduct from '~/components/user/bannerProduct';
import { getBook, getBooks } from '~/services/productService';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Facebook, TaskAlt } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import { postCartItem } from '~/services/cartItem';
import { postOrder } from '~/services/orderService';
import { postOrderItem } from '~/services/orderItems';
import { useDispatch } from "react-redux";
import { toggleCheck } from "../../../redux/slices/cartSlice"

const ProductDetails = () => {
    const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const user = JSON.parse(localStorage.getItem('user'))
  const [isLoad, setIsLoad] = useState(true)
  const [book, setBook] = useState(null)
  const [books, setBooks] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [total, setTotal] = useState(0)
  const [formData, setFormData] = useState()

  const changeQuantityTang = () => {
    const hehe = Number(quantity) + 1
    console.log(hehe)
    if (hehe > book.stock) return toast.info('Đã đạt số lượng sản phẩm tối đa !')
    setQuantity(hehe)
    setTotal(book.price * hehe)
  }
  const changeQuantityGiam = () => {
    const hehe = Number(quantity) - 1
    if (hehe < 1) return
    setQuantity(hehe)
    setTotal(book.price * hehe)
  }
  const handleChange = (e) => {
    if (e.target.value < 1) return toast.info('Đã đạt số lượng sản phẩm phải lớn hơn 0 !')
      if (e.target.value > book.stock) return toast.info('Số lượng vượt quá số lượng cho phép!')
    setQuantity(e.target.value)
    setTotal(book.price * e.target.value)
  }

  useEffect(() => {
    setFormData(prevData => ({ ...prevData, quantity: quantity, price_at_time: total }))
  }, [total, quantity])
  const addCart = async () => {
    try {
      if (!user) return toast.info('Vui lòng đăng nhập để thực hiện chức năng này.')
      if (book.stock<1 || book.status==="Ngưng bán") return toast.warning('Sản phẩm này đã hết hàng hoặc đã ngưng bán')
      toast('Đang thêm sản phẩm vào giỏ hàng')
      const res = await postCartItem(formData)
      if (res?.success) {
        toast.dismiss()
        toast("Thêm sản phẩm vào giỏ hàng thành công", {
          icon: <div><TaskAlt style={{ color: "#2ecc71" }} /> </div>,
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        })
        dispatch(toggleCheck())
      } else {
        toast('Thêm sản phẩm vào giỏ hàng thất bại')
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const fethBook = async () => {
      try {

        const data = await getBook(id)
        setBook(data)
        setFormData({ book_id:data.book_id, quantity: 1, price_at_time: data.price  })
        setTotal(data.price)
        setQuantity(1)
        const lstbook = await getBooks(data ? data.category : "")
        setBooks(lstbook)
      } catch (error) {
        console.log(error)
      } finally { setIsLoad(false) }
    }
    fethBook()
  }, [id])


  const [newOrder, setNewOrder] = useState({})
  useEffect(() => {
    setNewOrder({
      user_id: user?.user_id,
      delivery_infor_id: 1,
      status: "Chờ xác nhận",
      total_price: total,
      discount_applied: 10000,
      final_price: total
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total])
  const createOrder = async () => {
    try {
      if (!user) return toast.info('Vui lòng đăng nhập để thực hiện chức năng này.')
      if (book.stock<1 || book.status==="Ngưng bán") return toast.warning('Sản phẩm này đã hết hàng hoặc đã ngưng bán')
      toast('Đang xử lý yêu cầu của bạn')
      const res = await postOrder(newOrder);

      if (!res || !res.success || !res.newOrder) {
        throw new Error("Tạo order thất bại!");
      }
      const orderId = res.newOrder.order_id;

      // Đợi tất cả orderItems và deleteCartItem hoàn thành
      await postOrderItem({
        order_id: orderId,
        book_id: book.book_id,
        quantity: quantity,
        unit_price: total,
        discount_price: 0,
        total_price: total
      });
      toast.dismiss()
      toast('Đang chuyển đến trang thanh toán...')
      // Khi mọi thứ đã xong, mới chuyển trang
      navigate(`/payments/${res.newOrder.order_id}`);
    } catch (error) {
      console.error("Lỗi:", error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };
  if (isLoad) return <Loading />
  return (
    <Box
      sx={{ width: '100%', minHeight: '170vh', display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Box sx={{ minHeight: 30, maxHeight: 30, fontSize: 18 }}>Trang chủ/ Sản phẩm/ {book.title}</Box>
      <Box flex={3} sx={{ display: 'flex', minHeight: '579px' }} gap={1}>
        <Box flex={2}
          sx={{ maxWidth: '30%', minWidth: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 3, borderRadius: 5 }}>
          <Box
            component={'img'}
            src={book.image_url}
            sx={{ maxWidth: '100%', width: '95%', height: '95%', maxHeight: '100%', borderRadius: 5 }}
          />
        </Box>
        <Box flex={2} sx={{ maxWidth: '50%', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 3, paddingLeft: 3, paddingTop: 3, gap: 1, overflow: 'hidden' }}>
          <Tooltip title={book.title}><Typography fontSize={30} fontWeight={'bold'}>{book ? book?.title?.slice(0, 40) : ""}</Typography></Tooltip>
          <Typography fontSize={17} fontWeight={550}>Danh mục:     {book.category}</Typography>
          <Typography fontSize={17} fontWeight={550}>Số lượng:     {book.stock}</Typography>
          <Typography fontSize={17} fontWeight={550}>Giá:          {book.price.toLocaleString("vi-VN")}đ</Typography>
          <Typography fontSize={17} fontWeight={550}>Trạng thái:   {book.status}</Typography>
          <Typography fontSize={17} fontWeight={550}>Tác giả:      {book.author}</Typography>
          <Typography fontSize={17} fontWeight={550}>Nhà xuất bản: {book.publisher}</Typography>
          <Typography fontSize={17} fontWeight={550}>Nhà cung cấp: {book.supplier}</Typography>
          <Typography fontSize={17} fontWeight={550}>Ngày sản xuất:{book.create_at.slice(0, 10)}</Typography>
          <Typography fontSize={17} fontWeight={550}>Mô tả</Typography>
          <Box sx={{ minHeight: '30%', maxWidth: '100%', marginRight: 3, borderRadius: 3, bgcolor: '#f5f5f5' }}>
            <Typography padding={1}>{book.description.slice(0, 462)}</Typography>
          </Box>
        </Box>
        <Box flex={1} sx={{ maxWidth: '50%', boxShadow: 3, borderRadius: 3, padding: 2, paddingTop: 3 }}>
          <Box display={'flex'} justifyContent={'space-between'} borderBottom={'2px solid gray'} paddingBottom={1}>
            <Box display={'flex'} gap={1}>
              <Typography sx={{ textDecoration: 'underline' }}>4.5</Typography>
              <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
            </Box>
            <Typography sx={{ textDecoration: 'underline' }}>|</Typography>
            <Box display={'flex'} gap={1}>
              <Typography sx={{ textDecoration: 'underline' }}>192</Typography>
              <Typography sx={{ color: 'gray' }}>Đánh giá</Typography>
            </Box>

          </Box>
          <Box paddingTop={5} display={'flex'} flexDirection={'column'} gap={3}>
            <Box display={'flex'} gap={2} sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography fontSize={18}>Số lượng:</Typography>
              <Button onClick={changeQuantityGiam} sx={{ boxShadow: 3, width: 10, height: 30, fontSize: 40, color: 'black', borderRadius: 10 }}>-</Button>
              <InputBase value={quantity} 
              onChange={handleChange}
              type='number'
              sx={{
                maxWidth:50,
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                fontWeight:'bold',
                fontSize:20
              }}/>
              <Button onClick={changeQuantityTang} sx={{ boxShadow: 3, width: 10, height: 30, fontSize: 20, color: 'black', borderRadius: 10 }}>+</Button>

            </Box>
            <Box display={'flex'} gap={2} alignItems={'center'}>
              <Typography fontSize={20}>Tạm tính:</Typography>
              <Typography fontSize={20} sx={{ color: 'red', fontWeight: 'bold' }}>{total.toLocaleString('vi-VN')}đ</Typography>
            </Box>
            <Box display={'flex'} flexDirection={'column'} gap={1}>
              <Button variant="contained" startIcon={<AddShoppingCartIcon />} onClick={() => { addCart() }}>Thêm giỏ hàng</Button>
              <Button variant="contained" startIcon={<InventoryIcon />} sx={{ bgcolor: 'rebeccapurple' }} onClick={() => { createOrder() }}>Mua ngay</Button>
            </Box>
          </Box>

          <Box display={'flex'} justifyContent={'space-between'} borderTop={'2px solid gray'} marginTop={5} paddingTop={4}>
            <Box display={'flex'} gap={1}>
              <FavoriteBorderIcon sx={{ color: 'red', cursor: 'pointer' }} />
              <Typography sx={{ fontSize: 16 }}>Thêm vào yêu thích</Typography>
            </Box>
            <Typography>|</Typography>
            <Box display={'flex'} gap={1} justifyContent={'center'} alignItems={'stretch'}>
              <Typography sx={{ fontSize: 16 }}>Chia sẻ:</Typography>
              <Facebook sx={{ color: 'royalblue', fontSize: 25 }} />
            </Box>

          </Box>
        </Box>
      </Box>
      <Box flex={1} minHeight={'35vh'} sx={{ boxShadow: 3, borderRadius: 3, padding: 1 }}>
        <Typography fontSize={20} fontWeight={550}>Đánh giá sản phẩm</Typography>
        <Box sx={{ minHeight: '30vh', minWidth: '100%', marginRight: 3, borderRadius: 3, bgcolor: '#f5f5f5' }}>
        </Box>
      </Box>
      <Box flex={1} minHeight={'50vh'} marginBottom={10}>
        <Typography fontSize={20} fontWeight={550}>Sản phẩm tương tự</Typography>
        <BannerProduct books={books ? books : []} />
      </Box>
      <ToastContainer autoClose={3000} />
    </Box>
  );
}

export default ProductDetails
