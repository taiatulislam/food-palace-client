const AboutUs = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto py-16">
        <h3 className="text-5xl text-center font-bold pt-10 text-black">
          About Us
        </h3>
        <p className="mx-auto text-center pt-1 max-w-xl">
          Welcome to Food Palace, where passion for food and a commitment to
          creating memorable dining experiences come together.
        </p>
        <div className="flex flex-col-reverse md:flex-row lg:flex-row items-center gap-10 mt-10 px-5 lg:px-0">
          <div className="w-full md:w-1/2">
            <div className="border-2 border-[#dc3545] rounded-lg p-5">
              <h3 className="text-3xl font-bold mb-5 text-[#dc3545]">
                Our Story
              </h3>
              <p className="font-medium">
                At Food palace, our story is one of culinary creativity and a
                deep love for bringing people together through exceptional food.
                Our journey began when we decided to turn their lifelong passion
                for cooking into a dream come true a restaurant that not only
                serves delectable dishes but also offers an unforgettable dining
                experience.
              </p>
            </div>

            <div className="border-2 border-[#dc3545] rounded-lg p-5 my-3">
              <h3 className="text-3xl font-bold mb-5 text-[#dc3545]">
                Local Flavor, Global Inspiration
              </h3>
              <p className="font-medium">
                While we celebrate our local roots, we draw inspiration from
                global culinary traditions. Our menu is a harmonious fusion of
                flavors and techniques, bringing a world of tastes to your
                plate.
              </p>
            </div>

            <div className="border-2 border-[#dc3545] rounded-lg p-5">
              <h3 className="text-3xl font-bold mb-5 text-[#dc3545]">
                Our Philosophy
              </h3>
              <p className="font-medium">
                Our philosophy is simple: to offer you more than just a meal. We
                believe that dining is an art, and every plate is a canvas. Our
                chefs pour their hearts into crafting each dish, and our warm
                and welcoming staff ensures that every visit is not just a meal
                but a cherished memory.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full md:w-1/2">
            <div className="grid gap-3 grid-cols-1">
              <img
                src="https://i.ibb.co/6wftNDH/pub-promo-with-delicious-burger.jpg"
                alt="burger"
                className="h-[450px] rounded-l-lg"
              />
              <img
                src="https://i.ibb.co/QjGLKQV/ready-eat-meals-arrangement.jpg"
                alt="meat"
                className="rounded-l-lg"
              />
            </div>
            <div className="grid gap-3 rounded-lg grid-cols-1">
              <img
                src="https://i.ibb.co/sKZtQTX/ready-eat-meals-arrangement-1.jpg"
                alt=""
                className="h-[450px] w-full rounded-r-lg"
              />
              <img
                src="https://i.ibb.co/LvTvxZR/ready-eat-meal-collage-design.jpg"
                alt="green"
                className="rounded-r-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
