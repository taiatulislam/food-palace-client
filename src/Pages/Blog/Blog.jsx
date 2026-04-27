import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import BlogSkeleton from "../../Components/BlogSkeleton";

const Blog = () => {
  const fetchAllFoods = async () => {
    const response = await fetch("/json/blog.json");

    if (!response.ok) {
      throw new Error("Failed to fetch food data");
    }

    return response.json();
  };

  const { data: allBlog = [], isLoading } = useQuery({
    queryKey: ["all-blog"],
    queryFn: fetchAllFoods,
  });

  const featuredBlogs = allBlog?.filter((blog) => blog.id === "featured");
  const otherBlogs = allBlog?.filter((blog) => blog.id !== "featured");

  return (
    <section className="max-w-7xl mx-auto px-5 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-black">Food Blog</h1>
        <hr className="mx-auto w-[130px] md:w-[180px] border-[3px] border-secondary rounded-lg my-3" />
        <p className="text-gray-600 max-w-2xl mx-auto">
          Fresh ideas, practical kitchen tips, and food business insights to
          help you cook better and serve smarter.
        </p>
      </div>

      {isLoading ? (
        <article className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-2 border-primary rounded-xl p-4 md:p-6 bg-white mb-10 animate-pulse">
          <div className="w-full h-[260px] md:h-[340px] bg-gray-300 rounded-lg"></div>

          <div className="flex flex-col justify-center space-y-3">
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="h-8 w-full bg-gray-300 rounded"></div>
            <div className="h-5 w-full bg-gray-200 rounded"></div>
            <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-20 bg-gray-300 rounded mt-4"></div>
            <div className="h-10 w-32 bg-gray-300 rounded"></div>
          </div>
        </article>
      ) : (
        featuredBlogs?.[0] && (
          <article className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-2 border-primary rounded-xl p-4 md:p-6 bg-white shadow-sm mb-10">
            <img
              src={featuredBlogs[0].image}
              alt={featuredBlogs[0].title}
              className="w-full h-[260px] md:h-[340px] object-cover rounded-lg"
            />

            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold text-primary mb-2">
                {featuredBlogs[0].category}
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-black mb-3">
                {featuredBlogs[0].title}
              </h2>
              <p className="text-gray-700 text-base md:text-lg">
                {featuredBlogs[0].description}
              </p>
              <p className="text-sm text-gray-500 mt-4">
                {featuredBlogs[0].readTime}
              </p>
              <Link
                to={`/blog/${featuredBlogs[0].id}`}
                className="btn bg-primary border-none normal-case text-white w-fit mt-5"
              >
                Read Article
              </Link>
            </div>
          </article>
        )
      )}

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          Latest Food Articles
        </h2>
        <p className="text-sm text-gray-500">{otherBlogs.length} articles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <BlogSkeleton key={i} />)
          : otherBlogs.map((blog) => (
              <article
                key={blog.id}
                className="border-2 border-primary rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-[220px] object-cover"
                  loading="lazy"
                  decoding="async"
                />

                <div className="p-5">
                  <p className="text-xs font-semibold tracking-wide text-primary mb-2">
                    {blog.category}
                  </p>

                  <h3 className="text-xl font-semibold text-black mb-3">
                    {blog.title}
                  </h3>

                  <p className="text-gray-700 text-sm">{blog.description}</p>

                  <div className="flex items-center justify-between mt-4">
                    <p className="text-xs text-gray-500">{blog.readTime}</p>

                    <Link
                      to={`/blog/${blog.id}`}
                      className="text-primary font-semibold hover:underline"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            ))}
      </div>
    </section>
  );
};

export default Blog;
