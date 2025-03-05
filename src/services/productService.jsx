import api from "./api";

export const getBooks = async (search = "") => {
  try {
    const response = await api.get("/books", {
      params: search ? { search } : {},
    });
    return response.data ?? [];
  } catch (error) {
    if (error.response?.status !== 400) {
      console.error("Error fetching books:", error);
    }
    return [];
  }
};
