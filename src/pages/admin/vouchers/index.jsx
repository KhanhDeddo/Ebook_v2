import { Category } from "@mui/icons-material";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import Loading from "~/components/common/loading";
import { getBooks } from "~/services/productService";

const AdminVoucher = () => {
  const [loading, setLoading] = useState(true)
  // eslint-disable-next-line no-unused-vars
  const [books,setBooks] = useState([])
  // const [voucher, setVoucher] = useState({})
  useEffect(()=>{
    const fechBooks = async () => {
      try{
        setBooks(await getBooks())
      }catch(e){console.log(e)}
      finally{setLoading(false)}
    } 
    fechBooks()
  },[])
   return loading ? <Loading/>
   :<Stack sx={{ height: "120vh", width: "100%" }}
    >
      <Stack
        sx={{
          flex:8,
          bgcolor:'lightgray'
        }}
      >
        
      </Stack>
      <Stack
        sx={{
          flex:12,
          bgcolor:'blue'
        }}
      >
        hehe
      </Stack>
    </Stack>
}

export default AdminVoucher;
