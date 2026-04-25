import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "../Home/Banner/Banner.css";

import { FaStar } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";

import bannerBG from "../../assets/images/patron.jpg";
import coffee from "../../assets/images/coffee.webp";
import ice from "../../assets/images/ice.webp";

const Testimonial = () => {
  return (
    <section className="max-w-7xl mx-auto py-10 px-5 lg:px-0">
      <div className="flex flex-col-reverse md:flex-row gap-10 items-center">
        <div className="relative w-full md:w-1/2">
          <h3 className="text-primary font-semibold">Testimonials & Reviews</h3>
          <h2 className="text-3xl md:text-5xl font-semibold">
            Our Customer Feedbacks
          </h2>
          <Swiper
            className="testimonial-swiper"
            modules={[Autoplay, Pagination]}
            slidesPerView={2}
            spaceBetween={30}
            loop
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
          >
            {reviews.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="border-[3px] border-secondary rounded-lg mt-7 p-7 relative">
                  <p>{item.review}</p>

                  <div className="flex gap-3 mt-3 items-center">
                    <h3 className="font-semibold">{item.name}</h3>

                    <div className="flex gap-1 items-center text-secondary">
                      {[...Array(item.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>

                  <ImQuotesLeft className="rounded-full bg-secondary w-10 h-10 p-2 absolute bottom-2 right-2" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="grid grid-cols-2 items-center gap-12 relative">
          <img
            src={bannerBG}
            alt="bg"
            className="rounded-lg h-[200px]"
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 42vw, 220px"
          />
          <div className="flex flex-col gap-6">
            <img
              src={ice}
              alt="iceCream"
              className="rounded-lg -ml-24 h-[200px] object-cover"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 42vw, 220px"
            />
            <img
              src={coffee}
              alt="coffee"
              className="rounded-lg h-[200px] object-cover"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 768px) 42vw, 220px"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const reviews = [
  {
    id: 1,
    name: "Ariana Mitchell",
    review:
      "Absolutely loved the ambiance and the food quality. Every dish felt crafted with care and flavor.",
    rating: 5,
  },
  {
    id: 2,
    name: "Daniel Carter",
    review:
      "Great service and quick delivery. The taste was good, though a bit pricey for regular visits.",
    rating: 4,
  },
  {
    id: 3,
    name: "Sophia Nguyen",
    review:
      "A cozy place to hang out with friends. Desserts were the highlight of the evening!",
    rating: 3,
  },
  {
    id: 4,
    name: "Liam Anderson",
    review:
      "Nice experience overall. Could improve portion sizes, but flavors were spot on.",
    rating: 4,
  },
];

export default Testimonial;
