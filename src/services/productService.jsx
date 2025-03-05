import api from "./api";

export const getBooks = async () => {
  try {
    const response = await api.get("/books");
    return response.data ?? [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};
