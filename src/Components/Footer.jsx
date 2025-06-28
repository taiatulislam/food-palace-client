import { FaMapLocationDot } from "react-icons/fa6";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { LuMailOpen } from "react-icons/lu";
import logoLight from "../assets/images/logo/logo-light.jpg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div
      className="mt-10"
      style={{
        backgroundImage: "url(https://i.ibb.co/XkKCdB0/patron-black.jpg)",
        backgroundSize: "cover",
      }}
    >
      <footer className="footer p-5 md:p-7 text-primary-content max-w-7xl mx-auto gap-4 py-20">
        <div className="flex gap-5 justify-between w-full">
          <div className="text-white">
            <div className="flex items-center gap-2 md:gap-5 mb-5">
              <img
                src={logoLight}
                alt="logo"
                className="w-[60px] md:w-[100px] rounded-lg"
              />
              <div>
                <h3 className="text-lg md:text-3xl">Food Palace</h3>
                <p className="text-[#dc3545] md:text-lg font-medium">
                  Food & Restaurant
                </p>
              </div>
            </div>
            <p className="text-base md:text-lg text-justify max-w-lg">
              All produced by using ingredients and serving up delicious food,
              every time. Including pizza and pasta dishes, as well as fresh
              salads, burger, steaks, risottos and indulgent desserts.
            </p>

            <div>
              <h2 className="text-lg mt-10">Newsletter</h2>
              <hr className="w-[90px] border-2 border-[#ffc107] rounded-lg" />
              <p className="my-2">Subscribe and Get Recent News and Updates</p>
              <div className="flex flex-col md:flex-row md:justify-between gap-3">
                <input
                  type="text"
                  placeholder="Enter Your Email Address ..."
                  className="w-full md:w-[80%] bg-transparent border-2 border-gray-500 rounded-lg p-2 md:pl-5 text-xs md:text-base"
                />
                <button className="bg-[#dc3545] p-3 font-medium rounded-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="text-white">
            <h2 className="text-lg">Contact Info</h2>
            <hr className="w-[100px] border-2 border-[#ffc107] rounded-lg" />
            <p className="py-1.5 md:py-3">Mon - Sat: 1.00 p.m to 3.00 p.m</p>
            <p className="">Sun: 12.30 pm to 3.30 p.m</p>
            <p className="py-1.5 md:py-3">Festival: Open Full Day</p>
            <div className="mt-3">
              {/* Mobile */}
              <div className="flex items-center gap-2">
                <p>
                  <HiOutlineDevicePhoneMobile className="text-black rounded-full bg-[#ffc107] w-10 h-10 p-2" />
                </p>
                <div>
                  <p className="text-[#dc3545] font-semibold">For Booking</p>
                  <p>01 123 456 789</p>
                </div>
              </div>
              {/* Email */}
              <div className="flex items-center gap-2 my-5">
                <p>
                  <LuMailOpen className="text-black rounded-full bg-[#ffc107] w-10 h-10 p-2" />
                </p>
                <div>
                  <p className="text-[#dc3545] font-semibold">
                    For Private Dining
                  </p>
                  <p>Info@Domain.Com</p>
                </div>
              </div>
              {/* Location */}
              <div className="flex  gap-2">
                <p>
                  <FaMapLocationDot className="text-black rounded-full bg-[#ffc107] w-10 h-10 p-2" />
                </p>
                <div>
                  <p className="text-[#dc3545] font-semibold">Location</p>
                  <p>New Street Town, Newyork.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <p className="text-white bg-black text-center py-4">
        Copyright © {currentYear} - All right reserved ||{" "}
        <span className="text-[#dc3545]">Food Palace</span>
      </p>
    </div>
  );
};

export default Footer;
