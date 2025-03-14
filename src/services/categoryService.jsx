import api from "./api";

export const getCategories = async () => {
  try {
    const response = await api.get("/categories")
    return response.data ?? []
  } catch (error) {
    if (error.response?.status !== 400) {
      console.error("Error fetching categories:", error)
    }
    return [];
  }
}