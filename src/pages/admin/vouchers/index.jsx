import { Category } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
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
  const [paginationModel, setPaginationModel] = useState({
      page: 0, // Trang mặc định là trang 0
      pageSize: 5, // Số dòng mặc định là 10
    });
  const [books,setBooks] = useState([])
  useEffect(()=>{
    const fechBooks = async () => {
      setBooks(await getBooks());
    };fechBooks()
  },[])
  const customBooks = books.map(({...book}) => ({
    id: book.book_id,
    title: book.title,
    category: book.category_name,
    status: book.status,
    price: book.price
  }))
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
            rows={customBooks} 
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
