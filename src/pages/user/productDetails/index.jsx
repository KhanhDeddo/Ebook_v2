import { Box, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '~/components/common/loading';
import BannerProduct from '~/components/user/bannerProduct';
import { getBook, getBooks } from '~/services/productService';

const ProductDetails = () => {
  const {id} = useParams()
  const [isLoad, setIsLoad] = useState(true)
  const [book, setBook] = useState(null)
  const [books, setBooks] = useState(null)
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id])
  useEffect(()=>{
    const fethBook = async () => {
      try {
        const data = await getBook(id)
        setBook(data)
        const lstbook = await getBooks(data ? data.category:"")
        setBooks(lstbook)
      } catch (error) {
        console.log(error)
      }finally{ setIsLoad(false)}
    }
    fethBook()
  },[id])
  console.log(book) 
  return isLoad ? <Loading/> : (
    <Box
      sx={{
        width:'100%',
        minHeight:'170vh',
        display:'flex',
        flexDirection:'column',
        gap:1
      }}
    >
      <Box bgcolor={'green'} sx={{minHeight:30,maxHeight:30}}>Trang chủ</Box>
      <Box flex={3} sx={{display:'flex', minHeight:'579px'}} gap={1}>
        <Box flex={2}
          sx={{
            maxWidth:'30%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            boxShadow:3,
            borderRadius:5,
          }}
        >
          <Box
            component={'img'}
            src={book ? book.image_url: ""}
            sx={{
              maxWidth:'100%',
              width:'95%',
              height:'95%',
              maxHeight:'100%',
              borderRadius:5
            }}
          />
        </Box>
        <Box flex={2} 
            sx={{
              maxWidth:'60%',
              display:'flex',
              flexDirection:'column',
              boxShadow:3,
              borderRadius:3,
              paddingLeft:3,
              paddingTop:3,
              gap:1,
              overflow:'hidden'
            }}
          >
            <Tooltip title={book? book.title:""}><Typography fontSize={30} fontWeight={'bold'}>{book? book.title.slice(0,40):""}</Typography></Tooltip>
            <Typography fontSize={17} fontWeight={550}>Danh mục:     {book ? book.category: ""}</Typography>
            <Typography fontSize={17} fontWeight={550}>Số lượng:     {book ? book.stock: ""}</Typography>
            <Typography fontSize={17} fontWeight={550}>Giá:          {book ? book.price.toLocaleString("vi-VN") : ""}đ</Typography>
            <Typography fontSize={17} fontWeight={550}>Trạng thái:   {book ? book.status : ""}</Typography>
            <Typography fontSize={17} fontWeight={550}>Tác giả:      {book ? book.author: ""}</Typography>
            <Typography fontSize={17} fontWeight={550}>Nhà xuất bản: {book ? book.publisher: ""}</Typography>
            <Typography fontSize={17} fontWeight={550}>Nhà cung cấp: {book ? book.supplier: ""}</Typography>
            <Typography fontSize={17} fontWeight={550}>Ngày sản xuất:{book ? book.create_at.slice(0,10): ""}</Typography>
            <Typography fontSize={17} fontWeight={550}>Mô tả</Typography>
            <Box
              sx={{
                minHeight:'30%',
                maxWidth:'100%',
                marginRight:3,
                borderRadius:3,
                bgcolor:'#f5f5f5'
              }}
            >
            <Typography padding={1}>{book? book.description.slice(0,462) :""}</Typography>
            </Box>
        </Box>
        <Box flex={1}
          sx={{
            maxWidth:'50%',
            bgcolor:'violet'
          }}
        >hehe</Box>
      </Box>
      <Box flex={1} minHeight={'35vh'}>
        <Typography fontSize={20} fontWeight={550}>Đánh giá sản phẩm</Typography>
        <Box
              sx={{
                minHeight:'30vh',
                minWidth:'100%',
                marginRight:3,
                borderRadius:3,
                bgcolor:'#f5f5f5'
              }}
            >
            </Box>
      </Box>
      <Box flex={1} minHeight={'50vh'} marginBottom={10}>
        <Typography fontSize={20} fontWeight={550}>Sản phẩm tương tự</Typography>
        <BannerProduct books={books? books:[]}/>
      </Box>
    </Box>
  );
}

export default ProductDetails
