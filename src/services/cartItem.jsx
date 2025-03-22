import api from "./api"
import { getCarts } from "./cart"

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

export const postCartItem = async (data) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const cart = await getCarts(user.user_id)
    const cartItem = {...data, cart_id:cart.cart_id}
    const response = await api.post('/cart-items',cartItem)
    if (response.status === 201) return {
      success:true,
      message: "Thêm sản phẩm vào giỏ hàng thành công"
    }
  } catch (error) {
    console.error(`Lỗi. ${error.response.data.message}`)
  }
}
export const putCartItem = async (data) => {
  try {
    const response = await api.put('/cart-items',data)
    return response.data
  } catch (error) {
    console.error(`Lỗi. ${error.response.data.message}`)
  }
}
export const deleteCartItem = async (cart_item_id) => {
  try {
    console.log(cart_item_id)
    const response = await api.delete('/cart-items',{ data: { cart_item_id } })
    return response.data
  } catch (error) {
    console.error(`Lỗi. ${error.response.data.message}`)
    return error.response.data
  }
}