import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress'
import EditIcon from '@mui/icons-material/Edit';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { getBooks } from '~/services/productService';
import { debounce } from "lodash";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { RemoveRedEyeOutlined } from '@mui/icons-material';
const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '"Đang bán"',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const Products = () => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchValue,setSearchValue] = useState("")

  const handleOpenDialog = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const [paginationModel, setPaginationModel] = useState({
    page: 0, 
    pageSize: 10,
  });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    { 
      field: "id", 
      headerName: "STT", 
      width: 100,
      headerAlign: "center",
      align: "center"
    },
    { 
      field: "title", 
      headerName: "Tên sản phẩm", 
      width: 250,
      headerAlign: "start",
      align: "start"
    },
    {
      field: "image_url",
      headerName: "Hình ảnh",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <img
          src={params.value}
          alt='image'
          style={{
            width: 50,
            height: 65,
            borderRadius: 4,
            padding:2
          }}
        />
      ),
    },
    {
      field:"status",
      headerName:"Trạng thái",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: () => <Android12Switch />,
    },
    
    { 
      field: "category", 
      headerName: "Danh mục", 
      width: 150,
      headerAlign: "center",
      align: "center"
    },
    { 
      field: "price", 
      headerName: "Giá bán", 
      width: 150, 
      type: "number", 
      headerAlign: "center",
      align: "center"
    },
    { 
      field: "stock", 
      headerName: "Tồn kho", 
      width: 134, 
      type: "number",
      headerAlign: "center",
      align: "center"
    },
    {
      field: "operation",
      headerName: "Thao tác",
      width: 150,
      headerAlign: "center",
      align: "center",
      display:'flex',
      justifyContent:'center',
      renderCell: (params) => {
        if(open && params.row.id === selectedProduct.id) return <RemoveRedEyeOutlined sx={{color:'red', width:30,height:30}}/>;
        return <VisibilityOffIcon
          sx={{
            color:'orange',
            width:30,
            height:30,
          }} 
          onClick={() => handleOpenDialog(params.row)} 
        />
      }
    }  
  ];
  const fetchBooks = async () => {
    try {
      const data = await getBooks(searchValue?.trim() || ""); 
      setBooks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchBooks = debounce(fetchBooks, 500);

  useEffect(() => {
    if (searchValue !== undefined) {
      debouncedFetchBooks(searchValue);
    }
    return () => debouncedFetchBooks.cancel(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])
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
    <Stack sx={{height:'calc(100vh - 116px)',width:'100%'}}>
      <Box
        sx={{
          flex:3,
          display:'flex',
          justifyContent:'space-between',
          alignItems:'center',
          padding:2
        }}
      >
        <TextField
          variant="standard"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchValue}
          onChange={(e)=>{setSearchValue(e.target.value)}}
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
            border:'1 soild #fff',
            borderRadius:2,
            padding:1,
            '&:hover':{
              transform:'scale(1.1)',
              boxShadow:5
            },
            '&:active':{
              transform:'scale(0.95)',
              boxShadow:1
            }
          }}
        />
        <Box
          sx={{
            padding:2
          }}
        >
          <Button variant="contained" href="#contained-buttons"
            sx={{
              padding:1,
              boxShadow:3,
              bgcolor:'#008874'
            }}
          >
            Thêm sản phẩm mới
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          flex:17,
          overflow:'hidden'
        }}
      >
      <DataGrid
        rows={books}
        columns={columns}
        rowHeight={70}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20, 30]}
        // checkboxSelection
        disableSelectionOnClick
      />
      </Box>
      {/* Dialog hiển thị thông tin chi tiết sản phẩm */}
      <Dialog open={open} onClose={handleCloseDialog} sx={{ padding: 0, boxShadow: 3, borderRadius: 2 , "& .MuiDialog-paper": {maxWidth:'900px', maxHeight:'650px'}  }}>
        <DialogTitle>Thông tin chi tiết</DialogTitle>
        <DialogContent sx={{overflow:'hidden'}}>
          {selectedProduct && (
            <Stack sx={{ padding: 2,display:'flex',flexDirection:'row',alignItems:'start',justifyContent:'space-between',gap:4 }}>
              <Paper
                elevation={5}
                sx={{
                  width:'fit-content',
                  height:'fit-content',
                  overflow:'hidden',
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center',
                  padding:2,
                }}
              >
              <img src={selectedProduct.image_url} alt="Product" style={{ width: '340px',height:'100%', borderRadius: 4, display:'block' }} />
              </Paper>
              <Box>
                <Typography variant="h6">{selectedProduct.title}</Typography>

                <Box
                  sx={{
                    display:'flex',
                    gap:1,
                    padding:'5px',
                    paddingTop:4
                  }}
                >
                  <Typography sx={{width:130, fontWeight:'bold', fontSize:'17px'}}>Tên sách:</Typography>
                  <TextField id="standard-basic" variant="standard" value={selectedProduct.title} sx={{width:300}}/>
                </Box>
                <Box
                  sx={{
                    display:'flex',
                    gap:1,
                    padding:'5px'
                  }}
                >
                  <Typography sx={{width:130, fontWeight:'bold', fontSize:'17px'}}>Danh mục:</Typography>
                  <TextField id="standard-basic" variant="standard" value={selectedProduct.category} sx={{width:300}}/>
                </Box>
                <Box
                  sx={{
                    display:'flex',
                    gap:1,
                    padding:'5px'
                  }}
                >
                  <Typography sx={{width:130, fontWeight:'bold', fontSize:'17px'}}>Giá:</Typography>
                  <TextField id="standard-basic" variant="standard" value={selectedProduct.price} sx={{width:300}}/>
                </Box>
                <Box
                  sx={{
                    display:'flex',
                    gap:1,
                    padding:'5px'
                  }}
                >
                  <Typography sx={{width:130, fontWeight:'bold', fontSize:'17px'}}>Trạng thái:</Typography>
                  <TextField id="standard-basic" variant="standard" value={selectedProduct.status} sx={{width:300}}/>
                </Box>
                <Box
                  sx={{
                    display:'flex',
                    gap:1,
                    padding:1
                  }}
                >
                  <Typography sx={{width:130, fontWeight:'bold', fontSize:'17px'}}>Danh mục:</Typography>
                  <TextField id="standard-basic" variant="standard" value={selectedProduct.category} sx={{width:300}}/>
                </Box>
                <Box
                  sx={{
                    display:'flex',
                    gap:1,
                    padding:1
                  }}
                >
                  <Typography sx={{width:130, fontWeight:'bold', fontSize:'17px'}}>Tồn kho:</Typography>
                  <TextField id="standard-basic" variant="standard" value={selectedProduct.stock} sx={{width:300}}/>
                </Box>
                <Box
                  sx={{
                    display:'flex',
                    gap:1,
                    padding:1
                  }}
                >
                  <Typography sx={{width:130, fontWeight:'bold', fontSize:'17px'}}>Tác giả:</Typography>
                  <TextField id="standard-basic" variant="standard" value={selectedProduct.author} sx={{width:300}}/>
                </Box>
                <Box
                  sx={{
                    display:'flex',
                    gap:1,
                    padding:1
                  }}
                >
                  <Typography sx={{width:130, fontWeight:'bold', fontSize:'17px'}}>Nhà cung cấp:</Typography>
                  <TextField id="standard-basic" variant="standard" value={selectedProduct.supplier} sx={{width:300}}/>
                </Box>
                <Box
                  sx={{
                    display:'flex',
                    gap:1,
                    padding:1
                  }}
                >
                  <Typography sx={{width:130, fontWeight:'bold', fontSize:'17px'}}>Nhà phát hành:</Typography>
                  <TextField id="standard-basic" variant="standard" value={selectedProduct.publisher} sx={{width:300}}/>
                </Box>
                <Box
                  sx={{
                    display:'flex',
                    gap:1,
                    padding:1
                  }}
                >
                  <Typography sx={{width:130, fontWeight:'bold', fontSize:'17px'}}>Mô tả:</Typography>
                  <TextField id="standard-basic" variant="standard" value={selectedProduct.depcription} sx={{width:300}}/>
                </Box>
              </Box>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Đóng</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}

export default Products;
