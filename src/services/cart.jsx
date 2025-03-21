import api from "./api"

export const getCarts  = async (user_id) =>{
  try {
    const response = await api.get('/carts',{
      params:{ user_id:user_id ? user_id : ""}
    })
    return response.data ?? []
  } catch (error) {
    console.log(error)
  }
}

export const postCart = async (user_id) => {
  try {
    const response = await api.post('/carts', {user_id:user_id})
    if (response.status === 201) return {
      success:true,
      message: "Tạo giỏ hàng thành công!"
    }
  } catch (error) {
    console.error(`Đăng ký thất bại. ${error.response.data.message}`)
  }
}