import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import InputAdornment from "@mui/material/InputAdornment";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { getBooks, postBook, putBook } from '~/services/productService';
import { debounce } from "lodash";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Space, Switch } from 'antd';
import { RemoveRedEyeOutlined } from '@mui/icons-material';
import Loading from '~/components/admin/loading';

const Products = () => {
  const [paginationModel, setPaginationModel] = useState({page: 0, pageSize: 10})
  const [searchValue,setSearchValue] = useState("")
  const [formData, setFormData] = useState(null)
  const [formDataStatus, setFormDataStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [books, setBooks] = useState([])
  const [open, setOpen] = useState(false)
  const [isAdd,setIsAdd] = useState(false)

  const handleCloseDialog = () => {
    setIsAdd(false)
    setOpen(false)
  }

  const updateBook = (product) => {
    setFormData({
      book_id:product.id,
      title: product.title,
      category_name: product.category,
      price: product.price,
      status: product.status,
      stock: product.stock,
      author: product.author,
      supplier: product.supplier,
      publisher: product.publisher,
      description: product.description,
      image_url: product.image_url,
    })
    setOpen(true)
  }

  const AddBook = () =>{
    setFormData({
      title: "",
      category_name: "",
      price:"",
      status:"",
      stock:"",
      author:"",
      supplier:"",
      publisher:"",
      description:"",
      image_url:"",
    })
    setIsAdd(true)
    setOpen(true)
  }

  const updateStatusBook = (product) => {
    const status = product.status === 'Đang bán' ? 'Ngưng bán':'Đang bán'
    setFormDataStatus({
      book_id:product.id,
      title: product.title,
      category_name: product.category,
      price: product.price,
      status: status,
      stock: product.stock,
      author: product.author,
      supplier: product.supplier,
      publisher: product.publisher,
      description: product.description,
      image_url: product.image_url,
    })
  }

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
      renderCell: (params) => {
        return(
          <Space direction="vertical">
            <Switch 
              onChange={() => {updateStatusBook(params.row)}}
              checkedChildren="Đang bán"
              unCheckedChildren="Ngưng bán" 
              checked={params.value === "Đang bán"}
              style={{
                backgroundColor: params.value === "Đang bán" ? "#00806F" : "#FF6B6B",
                width: 90,
              }}
            />
          </Space>
        )
      }
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
      type: "number",
      width: 134, 
      headerAlign: "center",
      align: "center",
      display:'flex',
      justifyContent:'center',
      renderCell: (params) =>{
        return (
          <Typography 
            sx={{
              color: params.value > 0 ? '#008874': 'red', 
              fontWeight:'bold',
            }} 
          >{params.value}</Typography>
        )
      }
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
        if(open && !isAdd && params.row.id === formData.book_id) return <RemoveRedEyeOutlined sx={{color:'red', width:30,height:30}}/>;
        return <VisibilityOffIcon
          sx={{
            color:'orange',
            width:30,
            height:30,
          }} 
          onClick={() => updateBook(params.row)} 
        />
      }
    }  
  ]

  const fetchBooks = async () => {
    try {
      const data = await getBooks(searchValue?.trim() || "")
      setBooks(data)
    }catch (error) {console.error(error)}
    finally {setLoading(false)}
  }
  const debouncedFetchBooks = debounce(fetchBooks, 500)
  useEffect(() => {
    if (searchValue !== undefined) debouncedFetchBooks(searchValue)
    return () => debouncedFetchBooks.cancel(); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue])

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }
  const addUpdateBook = async (formData) => {
    try {
      console.log("Updating book with data:", formData)
      isAdd ? await postBook(formData):await putBook(formData)
      await fetchBooks()
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Đã xảy ra lỗi khi cập nhật sách!");
    }finally{
      setOpen(false)
      setIsAdd(false)
    }
  }
  useEffect(() => {
    if (formDataStatus) {
      addUpdateBook(formDataStatus)
      setFormDataStatus(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formDataStatus])

  return loading ? <Loading/>
    :<Stack sx={{height:'calc(100vh - 116px)',width:'100%'}}>
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
        <Box sx={{padding:2}}>
          <Button variant="contained" href="#contained-buttons"
            onClick = {()=>{AddBook()}}
            sx={{
              padding:1,
              boxShadow:5,
              bgcolor:'#008874',
              borderRadius:5,
              paddingInline:5
            }}
          >Thêm mới
          </Button>
        </Box>
      </Box>
      <Box sx={{flex:17, overflow:'hidden'}}>
      <DataGrid
        rows={books}
        columns={columns}
        rowHeight={70}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10, 20, 30]}
        disableSelectionOnClick
      />
      </Box>
      <Dialog open={open} onClose={handleCloseDialog} sx={{ padding: 0, boxShadow: 3, borderRadius: 2, "& .MuiDialog-paper": { maxWidth: '900px', maxHeight: '650px' } }}>
        <DialogTitle>Thông tin chi tiết</DialogTitle>
        {open && (
          <>
            <DialogContent sx={{ overflow: 'hidden' }}>
              <Stack sx={{ padding: 2, display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'space-between', gap: 4 }}>
                <Paper elevation={5} sx={{ width: 'fit-content', height: 'fit-content', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}>
                  <img src={formData?.image_url || ''} alt="Product" style={{ width: '340px', height: '100%', borderRadius: 4, display: 'block' }} />
                </Paper>
                <Box>
                  <Typography variant="h6">{formData?.title || 'Chưa có dữ liệu'}</Typography>
                  {[
                    { label: "Tên sách", name: "title" },
                    { label: "Danh mục", name: "category_name" },
                    { label: "Image_url", name: "image_url" },
                    { label: "Giá", name: "price" },
                    { label: "Trạng thái", name: "status" },
                    { label: "Tồn kho", name: "stock" },
                    { label: "Tác giả", name: "author" },
                    { label: "Nhà cung cấp", name: "supplier" },
                    { label: "Nhà phát hành", name: "publisher" },
                    { label: "Mô tả", name: "description" },
                  ].map((field) => (
                    <Box key={field.name} sx={{ display: 'flex', gap: 1, padding: '5px' }}>
                      <Typography sx={{ width: 130, fontWeight: 'bold', fontSize: '17px' }}>{field.label}:</Typography>
                      <TextField
                        name={field.name}
                        variant="standard"
                        defaultValue={formData?.[field.name] || ''}
                        onChange={handleChange}
                        sx={{ width: 300 }}
                      />
                    </Box>
                  ))}
                </Box>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => addUpdateBook(formData)} color="error">{isAdd ? 'Xác nhận' : 'Cập nhật'}</Button>
              <Button onClick={handleCloseDialog} color="primary">Đóng</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Stack>
}

export default Products
