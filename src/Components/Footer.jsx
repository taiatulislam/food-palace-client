import logoLight from "../assets/images/logo/logo-light.jpg";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { LuMailOpen } from "react-icons/lu";
import { FaMapLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <div
      className="mt-10"
      style={{
        backgroundImage: "url(https://i.ibb.co/XkKCdB0/patron-black.jpg)",
        backgroundSize: "cover",
      }}
    >
      <footer className="footer p-7 text-primary-content max-w-7xl mx-auto gap-4 py-20">
        <div className="flex">
          <div className="text-white w-2/3">
            <div className="flex items-center gap-5 mb-5">
              <img
                src={logoLight}
                alt="logo"
                className="w-[100px] rounded-lg"
              />
              <div>
                <h3 className="text-2xl">Food Palace</h3>
                <p className="text-[#dc3545] text-lg font-medium">
                  Food & Restaurant
                </p>
              </div>
            </div>
            <p className="text-lg">
              All produced by using ingredients and serving up delicious food,
              every time. Including pizza and pasta dishes, as well as fresh
              salads, burger, steaks, risottos and indulgent desserts.
            </p>

            <div>
              <h2 className="text-lg font-bold mt-10">Newsletter</h2>
              <hr className="w-[90px] border-2 border-[#ffc107]" />
              <p className="font-medium my-2">
                Subscribe and Get Recent News and Updates
              </p>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter Your Email Address ..."
                  className="w-[50%] bg-transparent border-2 border-gray-500 rounded-lg p-2 pl-5"
                />
                <button className="bg-[#dc3545] p-3 font-semibold rounded-lg">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="text-white w-1/3">
            <h2 className="text-lg font-bold">Contact Info</h2>
            <hr className="w-[100px] border-2 border-[#ffc107]" />
            <p className="py-4">Mon - Sat: 1.00 p.m to 3.00 p.m</p>
            <p className="">Sun: 12.30 pm to 3.30 p.m</p>
            <p className="py-4">Festival: Open Full Day</p>
            <div>
              {/* Mobile */}
              <div className="flex item-center gap-2">
                <p>
                  <HiOutlineDevicePhoneMobile className="text-black rounded-full bg-[#ffc107] w-10 h-10 p-2" />
                </p>
                <div>
                  <p className="text-[#dc3545] font-semibold">For Booking</p>
                  <p>01 123 456 789</p>
                </div>
              </div>
              {/* Email */}
              <div className="flex item-center gap-2 my-5">
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
              <div className="flex item-center gap-2">
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
      <p className="text-white bg-black text-center py-3">
        Copyright © 2023 - All right reserved ||{" "}
        <span className="text-[#dc3545]">Food Palace</span>
      </p>
    </div>
  );
};

export default Footer;
