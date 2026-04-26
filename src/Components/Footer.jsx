import { FaMapLocationDot } from "react-icons/fa6";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import { LuMailOpen } from "react-icons/lu";
import logoLight from "../assets/images/logo/logo-light.jpg";
import bannerBG from "../assets/images/patron-black.jpg";

const contactInfo = [
  {
    id: "phone",
    title: "For Booking",
    value: "01 123 456 789",
    icon: HiOutlineDevicePhoneMobile,
  },
  {
    id: "email",
    title: "For Private Dining",
    value: "Info@Domain.Com",
    icon: LuMailOpen,
  },
  {
    id: "location",
    title: "Location",
    value: "New Street Town, Newyork.",
    icon: FaMapLocationDot,
  },
];

const newsletterContent = (
  <>
    <h2 className="text-lg font-bold mt-5 md:mt-10">Newsletter</h2>
    <hr className="w-[90px] border-2 border-secondary rounded-lg" />
    <p className="font-medium my-2">
      Subscribe and Get Recent News and Updates
    </p>
    <div className="flex flex-col md:flex-row gap-3">
      <input
        type="email"
        placeholder="Enter Your Email Address ..."
        className="md:w-[75%] bg-transparent border-2 border-gray-500 rounded-lg p-2 md:pl-5 text-xs md:text-base"
      />
      <button className="bg-primary p-3 font-semibold rounded-lg">
        Subscribe
      </button>
    </div>
  </>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div
      style={{
        backgroundImage: `url(${bannerBG})`,
        backgroundSize: "cover",
      }}
    >
      <footer className="md:py-7 max-w-7xl mx-auto py-16 px-5 lg:px-0">
        <div className="flex flex-col md:flex-row gap-5 md:gap-10">
          <div className="text-white w-full md:w-2/3">
            <div className="flex items-center mb-5">
              <img
                src={logoLight}
                alt="logo"
                className="w-[50px] lg:w-[50px] rounded mr-2"
              />
              <div>
                <h3 className="md:text-lg lg:text-xl text-white">
                  Food Palace
                </h3>
                <p className="text-primary md:text-xs lg:text-sm">
                  Food & Restaurant
                </p>
              </div>
            </div>
            <p className="text-base lg:text-lg text-justify max-w-lg">
              All produced by using ingredients and serving up delicious food,
              every time. Including pizza and pasta dishes, as well as fresh
              salads, burger, steaks, risottos and indulgent desserts.
            </p>

            <div className="hidden md:block">{newsletterContent}</div>
          </div>

          <div className="text-white w-full md:w-1/3">
            <h2 className="text-lg font-semibold">Contact Info</h2>
            <hr className="w-[100px] border-2 border-secondary rounded-lg" />
            <p className="py-2 md:py-4">Mon - Sat: 1.00 p.m to 3.00 p.m</p>
            <p className="">Sun: 12.30 pm to 3.30 p.m</p>
            <p className="py-2 md:py-4">Festival: Open Full Day</p>
            <div className="mt-3 md:mt-0">
              {contactInfo.map(({ id, title, value, icon: Icon }) => (
                <div
                  key={id}
                  className={`flex items-center gap-2 ${id === "email" ? "my-5" : ""}`}
                >
                  <p>
                    <Icon className="text-black rounded-full bg-secondary w-10 h-10 p-2" />
                  </p>
                  <div>
                    <p className="text-primary font-semibold">{title}</p>
                    <p>{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter for small device */}
        <div className="block w-full text-white md:hidden">
          {newsletterContent}
        </div>
      </footer>
      <p className="text-white text-xs md:text-base bg-black text-center py-4">
        Copyright © {currentYear} - All right reserved ||{" "}
        <span className="text-primary">Food Palace</span>
      </p>
    </div>
  );
};

export default Footer;
