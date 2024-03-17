import { FaStar } from "react-icons/fa";
import { ImQuotesLeft } from "react-icons/im";

const Testimonial = () => {
  return (
    <section className="max-w-7xl mx-auto py-10">
      <div className="grid grid-cols-2 items-center">
        <div className="w-[75%]">
          <h3 className="text-[#dc3545] font-semibold">
            Testimonials & Reviews
          </h3>
          <h2 className="text-5xl font-semibold">Our Customer Feedbacks</h2>
          <div className="border-[3px] border-[#ffc107] rounded-lg mt-7 p-7 relative">
            <p>
              A good restaurant like a vacation. It transports you, and it
              become a lot more than just about the food. All great deeds and
              all great thoughts
            </p>
            <div className="flex gap-5 mt-3">
              <h3 className="font-semibold">Bratlee Hamint</h3>
              <div className="flex gap-2 items-center text-[#ffc107]">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>
            </div>
            <ImQuotesLeft className="rounded-full bg-[#ffc107] w-10 h-10 p-2 absolute bottom-2 right-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 items-center gap-12 relative">
          <img
            src="https://i.ibb.co/QdHbqft/patron.jpg"
            alt="bg"
            className="rounded-lg h-[200px]"
          />
          <div className="flex flex-col gap-6">
            <img
              src="https://i.ibb.co/nkwsqcc/unnamed.jpg"
              alt="iceCream"
              className="rounded-lg -ml-24 h-[200px]"
            />
            <img
              src="https://i.ibb.co/D8Zrn4p/ice.jpg"
              alt="coffee"
              className="rounded-lg h-[200px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
