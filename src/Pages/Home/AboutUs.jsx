import about1 from "../../assets/images/about/about-1.webp";
import about2 from "../../assets/images/about/about-2.webp";
import about3 from "../../assets/images/about/about-3.webp";
import about4 from "../../assets/images/about/about-4.webp";

const sections = [
  {
    title: "Our Story",
    description:
      "At Food Palace, our story is one of culinary creativity and a deep love for bringing people together through exceptional food. Our journey began when we decided to turn our lifelong passion for cooking into a dream come true—a restaurant that not only serves delectable dishes but also offers an unforgettable dining experience.",
  },
  {
    title: "Local Flavor, Global Inspiration",
    description:
      "While we celebrate our local roots, we draw inspiration from global culinary traditions. Our menu is a harmonious fusion of flavors and techniques, bringing a world of tastes to your plate.",
  },
  {
    title: "Our Philosophy",
    description:
      "Our philosophy is simple: to offer you more than just a meal. We believe dining is an art, and every plate is a canvas. Our chefs pour their hearts into crafting each dish, while our warm and welcoming staff ensures every visit becomes a cherished memory.",
  },
];

const imageGroups = [
  [
    {
      src: about2,
      alt: "Delicious burger",
      className: "h-[450px] rounded-l-lg",
    },
    {
      src: about4,
      alt: "Freshly cooked meat dish",
      className: "rounded-l-lg",
    },
  ],
  [
    {
      src: about3,
      alt: "Healthy green dish",
      className: "rounded-r-lg",
    },
    {
      src: about1,
      alt: "Restaurant specialty dish",
      className: "h-[450px] w-full rounded-r-lg",
    },
  ],
];

const AboutUs = () => {
  return (
    <section className="max-w-7xl mx-auto py-10 px-5 lg:px-0">
      {/* Header */}
      <header className="text-center">
        <h3 className="text-3xl md:text-5xl font-bold text-black">About Us</h3>
        <hr className="mx-auto w-[100px] md:w-[150px] border-[3px] border-secondary rounded-lg my-4" />
        <p className="max-w-xl mx-auto">
          Welcome to Food Palace, where passion for food and a commitment to
          creating memorable dining experiences come together.
        </p>
      </header>

      <div className="flex flex-col-reverse md:flex-row items-center gap-5 mt-10">
        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-4">
          {sections.map(({ title, description }) => (
            <div
              key={title}
              className="border-2 border-primary rounded-lg p-5 shadow-lg"
            >
              <h3 className="text-2xl lg:text-3xl font-semibold mb-4 text-primary">
                {title}
              </h3>
              <p className="text-xs lg:text-base font-medium">{description}</p>
            </div>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-1/2">
          {imageGroups.map((column, colIndex) => (
            <div key={colIndex} className="grid gap-3">
              {column.map(({ src, alt, className }, index) => (
                <img
                  key={index}
                  src={src}
                  alt={alt}
                  className={`${className} object-cover`}
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 768px) 46vw, 24vw"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
