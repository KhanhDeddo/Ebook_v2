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
    if (response.status === 201) return "Đăng ký thành công!";
  } catch (error) {
    console.error("Lỗi API:", error);
    if (error.response) {
      return `Đăng ký thất bại. ${error.response.data.message}`;
    }
    return "Đăng ký thất bại. Lỗi không xác định!";
  }
}