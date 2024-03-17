import { FaInstagram } from "react-icons/fa6";

const SocialMedia = () => {
  return (
    <div className="container mx-auto text-center">
      <FaInstagram className="rounded-full text-white bg-[#dc3545] w-14 h-14 p-2 mx-auto mb-3" />
      <h2 className="text-5xl font-semibold">Follow @FoodPalace </h2>
      <p className="py-1">Join Our Community to inspire your desire</p>
      <div className="grid grid-cols-5 gap-10 px-5 mt-10">
        <img src="https://i.ibb.co/8BzLBgv/photo-gallery-1.jpg" alt="Food" />
        <img src="https://i.ibb.co/XW8tdKf/photo-gallery-2.jpg" alt="Food" />
        <img src="https://i.ibb.co/CzDCSw3/photo-gallery-3.jpg" alt="Food" />
        <img src="https://i.ibb.co/C0QZWVQ/photo-gallery-4.jpg" alt="Food" />
        <img src="https://i.ibb.co/GRpXJ13/photo-gallery-5.jpg" alt="Food" />
      </div>
    </div>
  );
};

export default SocialMedia;
