import AboutUs from "../AboutUs/AboutUs";
import ContactUs from "../ContactUs/ContactUs";
import PopularFood from "../PopularFood/PopularFood";

const Home = () => {
    return (
        <div>
            <PopularFood></PopularFood>
            <AboutUs></AboutUs>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;