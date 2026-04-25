import PropTypes from "prop-types";
import foodBG from "../assets/images/patron.jpg";
import { Link } from "react-router-dom";

const BannerCard = ({ foodName, foodImage }) => {
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-between mt-16">
      <img
        src={foodBG}
        alt="bg"
        className="h-[50%] md:h-[80%] w-[55%] rounded-l-full absolute right-0 -z-10"
      />
      <div>
        <h3 className="text-primary text-lg lg:text-2xl font-bold">
          Fastest Delivery & Easy Pickup
        </h3>
        <h1 className="text-secondary text-3xl md:text-5xl lg:text-8xl font-bold">
          {foodName}
        </h1>
        <p className="text-lg lg:text-2xl text-white max-w-lg my-1 md:my-5">
          Good food starts with good ingredients. We only bring you the best.
        </p>
        <Link
          to="/allFood"
          className="bg-primary p-3 mt-6 md:mt-0 font-semibold rounded-lg text-white"
        >
          View Our Menu
        </Link>
      </div>
      <div>
        <img
          src={foodImage}
          alt={foodName}
          className="w-[600px] lg:max-w-xl z-1"
        />
      </div>
    </div>
  );
};

BannerCard.propTypes = {
  foodName: PropTypes.string,
  foodImage: PropTypes.string,
};

export default BannerCard;
