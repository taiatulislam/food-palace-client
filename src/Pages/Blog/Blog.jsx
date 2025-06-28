import blogs from "../../../public/json/blog.json";

const Blog = () => {
  return (
    <div className="max-w-7xl mx-auto px-5">
      {blogs?.map((blog) => (
        <BlogCard
          key={blog?.id}
          id={blog?.id}
          title={blog?.title}
          description={blog?.description}
          imageUrl={blog?.imageUrl}
          altText={blog?.altText}
        />
      ))}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const BlogCard = ({ id, title, description, imageUrl, altText }) => {
  return (
    <div
      className={`border-2 border-[#FA8072] rounded-lg p-5 mt-5 flex flex-col justify-between gap-4 ${
        id % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="sm:w-full md:w-1/2">
        <h3 className="text-2xl lg:text-3xl font-semibold mb-3">{title}</h3>
        <p className="text-base lg:text-lg">{description}</p>
      </div>
      <img
        src={imageUrl}
        alt={altText}
        className="h-[200px] md:h-[300px] sm:w-full md:w-1/2 rounded-md"
      />
    </div>
  );
};

export default Blog;
