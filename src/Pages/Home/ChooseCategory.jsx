import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const ChooseCategory = () => {
  return (
    <div className="max-w-7xl mx-auto py-10">
      <h3 className="text-5xl text-center font-bold text-black">
        Choose a Category
      </h3>
      <hr className="mx-auto w-[200px] border-[3px] border-[#ffc107] rounded-lg mb-10" />

      {/* Swiper */}
      <Swiper
        modules={[Pagination]}
        slidesPerView={4}
        spaceBetween={25}
        pagination={{ clickable: true }}
        className="w-full"
      >
        {/* Slide 1 */}
        <SwiperSlide className="text-center">
          <div className="flex flex-col">
            <img
              src="https://i.ibb.co/y06NXhY/category-1.jpg"
              alt="category"
              className="rounded-full"
            />
            <div className="font-semibold">
              <h3 className="text-lg">Organic Food</h3>
              <p className="text-[#dc3545]">12 dishes in the Menu</p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide className="text-center">
          <div className="flex flex-col">
            <img
              src="https://i.ibb.co/1rqWKt4/category-2.jpg"
              alt="category"
              className="rounded-full"
            />
            <div className="font-semibold">
              <h3 className="text-lg">Zinger Burger</h3>
              <p className="text-[#dc3545]">04 dishes in the Menu</p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide className="text-center">
          <div className="flex flex-col">
            <img
              src="https://i.ibb.co/xgjhLpR/category-3.jpg"
              alt="category"
              className="rounded-full"
            />
            <div className="font-semibold">
              <h3 className="text-lg">Grill Food</h3>
              <p className="text-[#dc3545]">10 dishes in the Menu</p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 4 */}
        <SwiperSlide className="text-center">
          <div className="flex flex-col">
            <img
              src="https://i.ibb.co/XWqxqH9/category-4.jpg"
              alt="category"
              className="rounded-full"
            />
          </div>
          <div className="font-semibold">
            <h3 className="text-lg">Organic Food</h3>
            <p className="text-[#dc3545]">12 dishes in the Menu</p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default ChooseCategory;
