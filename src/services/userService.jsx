import api from "./api"

export const getUsers  = async (search = "") =>{
  try {
    const response = await api.get('/users',{
      params:search ? {search}:{}
    })
    return response.data ?? []
  } catch (error) {
    console.log(error)
  }
}

export const postUser = async (user) => {
  try {
    const response = await api.post('/users', user)
    if (response.status === 201) return {
      success:true,
      user:response.data,
      message: "Đăng ký thành công!"
    }
  } catch (error) {
    console.error("Lỗi API:", error);
    if (error.response) {
      return {
        success:false,
        message: `Đăng ký thất bại. ${error.response.data.message}`
      }
    }
    return {message: `Lỗi: Mất kết nối với server. Vui lòng thử lại sau ít phút...`}
  }
}
export const putUser = async (user) => {
  try {
    const response = await api.put('/users', user)
    if (response.status === 200) return {
      success:true,
      user:response.data,
      message: "Cập nhật thành công!"
    }
  } catch (error) {
    console.error("Lỗi API:", error);
    if (error.response) {
      return {
        success:false,
        message: `Cập nhật thất bại. ${error.response.data.message}`
      }
    }
    return {message: `Lỗi: Mất kết nối với server. Vui lòng thử lại sau ít phút...`}
  }
}