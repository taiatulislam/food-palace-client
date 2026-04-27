import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import BlogSkeleton from "../../Components/BlogSkeleton";

const BlogDetails = () => {
  const { id } = useParams();

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

  const blog = allBlog.find((item) => item.id === id);
  const relatedBlogs = allBlog?.filter((item) => item.id !== id).slice(0, 3);

  if (!blog) {
    return (
      <section className="max-w-7xl mx-auto px-5 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
          Blog Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The blog you are trying to read does not exist.
        </p>
        <Link
          to="/blog"
          className="btn bg-primary border-none text-white normal-case"
        >
          Back to Blog
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-5 py-8">
      {isLoading ? (
        <article className="border-2 border-primary rounded-xl overflow-hidden bg-white">
          <div className="w-full h-[260px] md:h-[430px] bg-gray-300" />

          <div className="p-5 md:p-8 space-y-4">
            <div className="flex gap-3">
              <div className="h-6 w-20 bg-gray-300 rounded-full" />
              <div className="h-4 w-24 bg-gray-300 rounded" />
              <div className="h-4 w-28 bg-gray-300 rounded" />
            </div>

            <div className="h-10 w-3/4 bg-gray-300 rounded" />
            <div className="h-4 w-32 bg-gray-300 rounded" />

            <div className="space-y-3 mt-4">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-2/3 bg-gray-200 rounded" />
            </div>
          </div>
        </article>
      ) : (
        <article className="border-2 border-primary rounded-xl overflow-hidden bg-white shadow-sm">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[260px] md:h-[430px] object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="p-5 md:p-8">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white">
                {blog.category}
              </span>
              <span className="text-sm text-gray-500">{blog.readTime}</span>
              <span className="text-sm text-gray-500">{blog.publishedAt}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-black mb-4">
              {blog.title}
            </h1>
            <p className="text-gray-600 mb-4">By {blog.author}</p>
            <p className="text-gray-700 text-lg mb-5">{blog.description}</p>

            <div className="space-y-4">
              {blog.content?.map((paragraph) => (
                <p key={paragraph} className="text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </article>
      )}

      <section className="mt-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl md:text-3xl font-bold text-black">
            Related Food Blogs
          </h2>
          <Link
            to="/blog"
            className="text-primary font-semibold hover:underline"
          >
            See All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => <BlogSkeleton key={i} />)
            : relatedBlogs?.map((item) => (
                <article
                  key={item.id}
                  className="border-2 border-primary rounded-xl overflow-hidden shadow-sm bg-white"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[220px] object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="p-5">
                    <p className="text-xs font-semibold tracking-wide text-primary mb-2">
                      {item.category}
                    </p>
                    <h3 className="text-xl font-semibold text-black mb-3">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 text-sm">{item.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-xs text-gray-500">{item.readTime}</p>
                      <Link
                        to={`/blog/${item.id}`}
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
    </section>
  );
};

export default BlogDetails;
