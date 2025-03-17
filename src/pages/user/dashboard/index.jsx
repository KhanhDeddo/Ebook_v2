import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react';
import Loading from '~/components/common/loading';
import BannerCarousel from '~/components/user/bannerCarousel';
import BannerProduct from '~/components/user/bannerProduct';
import { getBooks } from '~/services/productService';

const Dashboard = () => {
  const [listNguVan, setListNguVan] = useState([])
  const [listToan, setListToan] = useState([])
  const [listVatLy, setListVatLy] = useState([])
  const [listHoa, setListHoa] = useState([])
  const [isload,setIsLoad] = useState(true)
  useEffect(()=>{
    const fethBookNguVans = async () => {
      try{
        const nguvan = await getBooks("Ngữ Văn")
        const toan = await getBooks("Toán")
        const ly = await getBooks("Vật lý")
        const hoa = await getBooks("Hóa")
        setListHoa(hoa)
        setListNguVan(nguvan)
        setListToan(toan)
        setListVatLy(ly)
      } catch (error) { console.log(error) }
      finally{setIsLoad(false)}
    }
    fethBookNguVans()
  },[])
  return isload ? <Loading/>:(
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box flex={2}><BannerCarousel /></Box>
      <Box flex={8} sx={{ minHeight: '150vh', paddingTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, mb:10 }}>
        {/* <Box sx={{ width: '100%', display: 'flex', flexDirection:'column', gap: 2, alignItems: 'center' }}>
          <Typography sx={{ fontSize: 30, fontWeight: 'bold', color: '#008874' }}>Sách đang khuyến mãi</Typography>
          <BannerProduct books={listVatLy}/>
        </Box> */}
        <Box sx={{ width: '100%', display: 'flex', flexDirection:'column', gap: 2, alignItems: 'center' }}>
          <Typography sx={{ fontSize: 30, fontWeight: 'bold', color: '#008874' }}>Sách giáo khoa vật lý</Typography>
          <BannerProduct books={listVatLy}/>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', flexDirection:'column', gap: 2, alignItems: 'center' }}>
          <Typography sx={{ fontSize: 30, fontWeight: 'bold', color: '#008874' }}>Sách giáo khoa toán</Typography>
          <BannerProduct books={listToan}/>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', flexDirection:'column', gap: 2, alignItems: 'center' }}>
          <Typography sx={{ fontSize: 30, fontWeight: 'bold', color: '#008874' }}>Sách giáo khoa ngữ văn</Typography>
          <BannerProduct books={listNguVan}/>
        </Box>
        <Box sx={{ width: '100%', display: 'flex', flexDirection:'column', gap: 2, alignItems: 'center' }}>
          <Typography sx={{ fontSize: 30, fontWeight: 'bold', color: '#008874' }}>Sách giáo khoa hóa học</Typography>
          <BannerProduct books={listHoa}/>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard
