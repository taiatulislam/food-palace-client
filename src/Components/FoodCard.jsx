import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

const FoodCard = ({
  food,
  actionLabel,
  onAction,
  metaFields = [],
  showAvailability = false,
}) => {
  return (
    <div className="card card-compact bg-base-100 shadow-xl border-[3px] border-primary p-2">
      <figure>
        <img
          src={food?.image}
          alt={food?.name || "food"}
          className="h-[200px] w-full rounded-b-lg"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 25vw"
        />
      </figure>

      <div className="mt-3">
        <div className="flex gap-2 items-center text-secondary">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
        </div>

        <h2 className="text-xl font-semibold pt-2">{food?.name}</h2>

        {metaFields.map((field) => (
          <p key={field.label} className="text-base font-medium">
            <span className="font-bold">{field.label}:</span> {field.value}
          </p>
        ))}

        <p className="text-2xl font-semibold">
          <span className="font-bold text-primary">$ </span>
          {food?.price}
        </p>

        {showAvailability && (
          <p
            className={`text-lg font-medium mb-4 ${
              food?.quantity > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {food?.quantity > 0 ? "Available" : "Stock Out"}
          </p>
        )}

        {actionLabel && onAction && (
          <div className="card-actions justify-end mt-3">
            <button
              onClick={() => onAction(food?._id)}
              className="btn bg-primary w-full normal-case text-white"
            >
              {actionLabel}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

FoodCard.propTypes = {
  food: PropTypes.object.isRequired,
  actionLabel: PropTypes.string,
  onAction: PropTypes.func,
  metaFields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    }),
  ),
  showAvailability: PropTypes.bool,
};

export default FoodCard;
