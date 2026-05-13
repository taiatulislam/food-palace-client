import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance";

const ChooseCategory = () => {
  const fetchAllCategory = async () => {
    const response = await axiosInstance.get("/categories");

    if (!response.data.success) {
      throw new Error("Failed to fetch food data");
    }

    return response.data;
  };

  const { data: totalCategory = {}, isLoading } = useQuery({
    queryKey: ["all-category"],
    queryFn: fetchAllCategory,
    retry: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="max-w-7xl mx-auto py-10 px-5 lg:px-0">
      <h3 className="text-3xl md:text-5xl text-center font-bold text-black">
        Choose a Category
      </h3>

      <hr className="mx-auto w-[200px] border-[3px] border-secondary rounded-lg mb-10" />

      {/* Swiper */}
      <Swiper
        className="testimonial-swiper"
        modules={[Pagination]}
        slidesPerView={2}
        spaceBetween={25}
        pagination={{ clickable: true }}
        breakpoints={{
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SwiperSlide key={index} className="text-center">
                <div className="flex flex-col items-center animate-pulse">
                  <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-300"></div>
                  <div className="mt-4 space-y-2">
                    <div className="h-4 w-24 bg-gray-300 rounded mx-auto"></div>
                    <div className="h-3 w-32 bg-gray-200 rounded mx-auto"></div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          : totalCategory?.data?.map((category, index) => (
              <SwiperSlide key={index} className="text-center">
                <div className="flex flex-col items-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-40 object-cover rounded-full"
                  />
                  <div className="font-semibold mt-3">
                    <h3 className="text-lg">{category.name}</h3>
                    <p className="text-primary text-sm md:text-base">
                      {category.noOfFood} dishes in the Menu
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
      </Swiper>
    </div>
  );
};

export default ChooseCategory;
