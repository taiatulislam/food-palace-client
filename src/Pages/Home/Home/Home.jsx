import AboutUs from "../AboutUs/AboutUs";
import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import PopularFood from "../PopularFood/PopularFood";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularFood></PopularFood>
            <AboutUs></AboutUs>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;