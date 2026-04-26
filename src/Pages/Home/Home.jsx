import AboutUs from "./AboutUs";
import Banner from "./Banner/Banner";
import ChooseCategory from "./ChooseCategory";
import PopularFood from "./PopularFood";
// import Reserve from "./Reserve";
import SocialMedia from "./SocialMedia";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <div>
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
