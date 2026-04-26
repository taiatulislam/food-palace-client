import PropTypes from "prop-types";
import foodBG from "../assets/images/patron.jpg";
import { Link } from "react-router-dom";

const BannerCard = ({ foodName, foodImage }) => {
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-5 md:gap:0 md:flex-row items-center justify-between mt-16">
      <img
        src={foodBG}
        alt="bg"
        className="h-[50%] md:h-[80%] w-[55%] rounded-l-full absolute right-0 bottom-0 -z-10"
      />
      <div>
        <h3 className="text-primary text-xs md:text-lg lg:text-2xl font-bold">
          Fastest Delivery & Easy Pickup
        </h3>
        <h1 className="text-secondary text-xl md:text-3xl lg:text-8xl font-bold">
          {foodName}
        </h1>
        <p className="text-xs md:text-lg lg:text-2xl text-white max-w-lg my-2 md:my-5">
          Good food starts with good ingredients. We only bring you the best.
        </p>
        <Link
          to="/allFood"
          className="text-xs md:text-base bg-primary p-2 md:p-3 mt-6 md:mt-0 font-semibold rounded-md text-white"
        >
          View Our Menu
        </Link>
      </div>
      <div>
        <img
          src={foodImage}
          alt={foodName}
          className="w-[600px] lg:max-w-xl z-10"
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
