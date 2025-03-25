import api from "./api"

export const getOrders  = async (user_id, order_id='') =>{
  try {
    const response = await api.get('/orders',{
      params:{ 
        user_id:user_id ? user_id : "",
        order_id:order_id
      }
    })
    return response.data ?? []
  } catch (error) {
    console.log(error)
  }
}

export const postOrder = async (data) => {
  try {
    const response = await api.post('/orders', data)
    if (response.status === 201) return {
      success:true,
      message: "Tạo đơn hàng thành công!",
      newOrder:response.data
    }
  } catch (error) {
    console.error(`Tạo đơn hàng thất bại. ${error.response.data.message}`)
  }
}