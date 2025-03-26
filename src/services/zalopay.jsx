import api from "./api"

export const zalopay = async (data) => {
  try {
    const res = await api.post('zalopay',data)
    return res?.data
  } catch (error) {
    console.log(error)
  }
}