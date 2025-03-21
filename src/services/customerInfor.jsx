import api from "./api";

export const getCustomerInfors = async (user_id) => {
  try {
    const response = await api.get("/customer-infors",{
      params:{ user_id:user_id? user_id:""}
    })
    return response.data ?? []
  } catch (error) {
    if (error.response?.status !== 400) {
      console.error("Error fetching categories:", error)
    }
    return [];
  }
}