import api from "./api"

export const auth = async (data) => {
  try {
    console.log("Dữ liệu gửi đi:", data)
    const res = await api.post('/auth', data)
    return { success: true, user: res.data }
  } catch (e) {
    // console.error("Lỗi đăng nhập:", e.response?.data || e.message)
    return { success: false, error: e.response?.data?.message || "Lỗi máy chủ. Vui lòng thử lại sau." }
  }
}
