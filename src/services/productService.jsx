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
export const postBook = async (formData) => {
  try {
    await api.post("/books", formData); // Gửi dữ liệu đúng định dạng
    return { message: "create book success" };
  } catch (error) {
    console.error("Error updating book:", error.response?.data || error.message);
    return { message: "error", error: error.response?.data || error.message };
  }
};

export const putBook = async (formData) => {
  try {
    await api.put("/books", formData); // Gửi dữ liệu đúng định dạng
    return { message: "update book success" };
  } catch (error) {
    console.error("Error updating book:", error.response?.data || error.message);
    return { message: "error", error: error.response?.data || error.message };
  }
};
