import { Category } from "@mui/icons-material";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { getBooks } from "~/services/productService";

const columns = [
  { 
    field: "id", 
    headerName: "STT", 
    flex: 0.5, 
    headerAlign: "center",
    align: "center"
  },
  { 
    field: "title", 
    headerName: "Tên sản phẩm", 
    flex: 2, 
    headerAlign: "start",
    align: "start"
  },
  { 
    field: "category", 
    headerName: "Danh mục", 
    flex: 1, 
    headerAlign: "center",
    align: "center"
  },
  {
    field: "status",
    headerName: "Trạng thái",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  { 
    field: "price", 
    headerName: "Giá bán", 
    flex: 1, 
    type: "number", 
    headerAlign: "center",
    align: "center"
  }
];

const Voucher = () => {
  const [loading, setLoading] = useState(true)
  const [paginationModel, setPaginationModel] = useState({
      page: 0, 
      pageSize: 5, 
    });
  const [books,setBooks] = useState([])
  useEffect(()=>{
  
    const fechBooks = async () => {
      try{
      setBooks(await getBooks());
    }catch(e){console.log(e)}
    finally{setLoading(false)}
    };fechBooks()
  },[])
  // const customBooks = books.map(({...book}) => ({
  //   id: book.book_id,
  //   title: book.title,
  //   category: book.category_name,
  //   status: book.status,
  //   price: book.price
  // }))
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
      direction={"row"}
      sx={{
        height: "calc(100vh - 116px)",
        width: "100%",
        overflow: "auto", // Thêm thanh cuộn nếu nội dung dài
        gap: 2,
      }}
    >
      {/* Cột 1 */}
      <Stack flex={10} sx={{ gap: 1 }}>
        <Box flex={8} sx={{ bgcolor: "yellow" }}></Box>
        <Box flex={12} sx={{ height: "100%" , overflow:'hidden'}}>
          <DataGrid
            columns={columns}
            // rows={customBooks} 
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20, 30]}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 5,
            }}
          />
        </Box>
      </Stack>

      {/* Cột 2 */}
      <Stack flex={10} sx={{ gap: 1 }}>
        <Box flex={8} sx={{ overflow: "hidden",boxShadow:3,borderRadius:3 }}>
            <Stack
              direction={'row'}
            >
              <Box
                flex={5}
                sx={{
                  padding:1,
                  gap:2
                }}
              >
                <Typography>
                  Tạo Voucher
                </Typography>
                <Typography>
                  Mã khuyến mãi:
                </Typography>
                <Typography>
                  Loại khuyến mãi:
                </Typography>
                <Typography>
                  Loại giảm giá:
                </Typography>
              </Box>
              <Box
                flex={5}
                sx={{
                  padding:1,
                  gap:2
                }}
              >
                <Typography>
                  Giá trị giảm:
                </Typography>
                <Typography>
                  Giảm tối da:
                </Typography>
                <Typography>
                  Đơn tối thiểu
                </Typography>
                <Typography>
                  Thời gian:
                </Typography>
              </Box>
            </Stack>
        </Box>
        <Box flex={12} sx={{ height: "100%" , overflow:'hidden'}}>
          <DataGrid
            columns={columns}
            rows={books} 
            checkboxSelection
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[5, 10, 20, 30]}
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 5,
            }}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Voucher;
