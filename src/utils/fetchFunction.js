import axiosInstance from "../api/axiosInstance";

export const fetchWishlists = async (user) => {
  if (user) {
    const response = await axiosInstance.get(`/wishlist?email=${user?.email}`);

    if (!response.data.success) {
      throw new Error("Failed to fetch food data");
    }

    return response.data?.data;
  }
};
