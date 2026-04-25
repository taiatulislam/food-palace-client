import AboutUs from "./AboutUs";
import Banner from "./Banner/Banner";
import ChooseCategory from "./ChooseCategory";
import PopularFood from "./PopularFood";
// import Reserve from "./Reserve";
import SocialMedia from "./SocialMedia";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <div className="px-5 md:px-0">
      <Banner />
      <ChooseCategory />
      <PopularFood />
      <AboutUs />
      {/* <Reserve /> */}
      <Testimonial />
      <SocialMedia />
    </div>
  );
};

export default Home;
