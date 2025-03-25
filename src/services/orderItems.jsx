import api from "./api"

// export const getCarts  = async (user_id) =>{
//   try {
//     const response = await api.get('/carts',{
//       params:{ user_id:user_id ? user_id : ""}
//     })
//     return response.data ?? []
//   } catch (error) {
//     console.log(error)
//   }
// }

export const postOrderItem = async (data) => {
  try {
    const response = await api.post('/order-items',data)
    if (response.status === 201) return {
      success:true,
      message: "Tạo orderitem thành công"
    }
  } catch (error) {
    console.error(`Lỗi. ${error.response.data.message}`)
  }
}
export const putOrderItem = async (data) => {
  try {
    const response = await api.put('/cart-items',data)
    return response.data
  } catch (error) {
    console.error(`Lỗi. ${error.response.data.message}`)
  }
}
export const deleteOrderItem = async (cart_item_id) => {
  try {
    console.log(cart_item_id)
    const response = await api.delete('/cart-items',{ data: { cart_item_id } })
    return response.data
  } catch (error) {
    console.error(`Lỗi. ${error.response.data.message}`)
    return error.response.data
  }
}