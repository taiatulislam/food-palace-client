import { Link } from "react-router-dom";

const Blog = () => {
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

      <article className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-2 border-primary rounded-xl p-4 md:p-6 bg-white shadow-sm mb-10">
        <img
          src={featuredBlog.image}
          alt={featuredBlog.title}
          className="w-full h-[260px] md:h-[340px] object-cover rounded-lg"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold text-primary mb-2">
            {featuredBlog.category}
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-black mb-3">
            {featuredBlog.title}
          </h2>
          <p className="text-gray-700 text-base md:text-lg">
            {featuredBlog.description}
          </p>
          <p className="text-sm text-gray-500 mt-4">{featuredBlog.readTime}</p>
          <Link
            to={`/blog/${featuredBlog.id}`}
            className="btn bg-primary border-none normal-case text-white w-fit mt-5"
          >
            Read Article
          </Link>
        </div>
      </article>

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl md:text-3xl font-bold text-black">
          Latest Food Articles
        </h2>
        <p className="text-sm text-gray-500">{blogs.length} articles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {blogs.map((blog) => (
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

const featuredBlog = {
  id: "featured",
  title: "10 Food Trends That Customers Love in 2026",
  description:
    "From protein-rich bowls to fusion street food, these trends are helping food brands increase engagement, repeat orders, and social shares.",
  image: "https://i.ibb.co/jJrXm4j/pexels-ella-olsson-1640777.jpg",
  readTime: "7 min read",
  category: "Featured",
  author: "Food Palace Team",
  publishedAt: "Apr 2026",
  content: [
    "Food trends now move faster than ever, and customers expect fresh ideas in every season. Protein-rich bowls, low-oil frying, and ingredient transparency are becoming standard choices for regular diners.",
    "Fusion food is also becoming more popular. People enjoy familiar local flavors combined with global techniques. Restaurants that experiment with small seasonal specials often see stronger repeat customer behavior.",
    "Another major trend is visual presentation. Well-plated meals with color contrast, fresh herbs, and texture variety are more likely to perform well on social media, driving organic food marketing.",
  ],
};

const blogs = [
  {
    id: "1",
    title: "How to Plate Food Like a Pro Chef",
    description:
      "Simple plating techniques that make your dishes look premium and more appetizing in photos.",
    image: "https://i.ibb.co/Gs8fQXf/pexels-chanwalrus-958545.jpg",
    readTime: "4 min read",
    category: "Kitchen Tips",
    author: "Chef Arif Rahman",
    publishedAt: "Mar 2026",
    content: [
      "Professional plating starts with balance. Use one hero element and support it with smaller side components to avoid a crowded plate.",
      "Color contrast is essential. Pair greens with warm tones like grilled proteins or roasted vegetables to make dishes look more vibrant.",
      "Finish with texture: crunchy toppings, fresh herbs, or light sauce streaks can transform basic serving into a premium presentation.",
    ],
  },
  {
    id: "2",
    title: "Healthy Fast Food: Smart Ingredient Swaps",
    description:
      "Build lighter menu options with better oils, fresh toppings, and smarter side choices.",
    image: "https://i.ibb.co/kx6P4sH/pexels-jan-n-g-u-y-e-n-699953.jpg",
    readTime: "5 min read",
    category: "Nutrition",
    author: "Nadia Islam",
    publishedAt: "Feb 2026",
    content: [
      "Healthy fast food does not mean removing flavor. Start with ingredient swaps like Greek yogurt sauces, whole-grain buns, and baked sides.",
      "Control portion size by designing balanced combos with lean proteins and vegetables. Customers appreciate choices that feel satisfying without being too heavy.",
      "Clear nutritional labeling also builds trust. Highlighting calorie-smart options helps customers pick meals confidently.",
    ],
  },
  {
    id: "3",
    title: "Best Spices to Boost Flavor Naturally",
    description:
      "A quick guide to spice combinations that make grilled, baked, and sautéed dishes stand out.",
    image: "https://i.ibb.co/x7nW9D3/pexels-antonio-friedemann-4462782.jpg",
    readTime: "3 min read",
    category: "Flavors",
    author: "Chef Tanim",
    publishedAt: "Jan 2026",
    content: [
      "Cumin, paprika, and garlic powder are a strong base for grilled dishes. This trio adds warmth and depth without overpowering ingredients.",
      "For seafood and white meats, combine black pepper, lemon zest, and coriander for a lighter aromatic profile.",
      "Freshly ground spice blends usually perform better than pre-mixed packs in both aroma and flavor complexity.",
    ],
  },
  {
    id: "4",
    title: "Reducing Food Waste in Restaurant Kitchens",
    description:
      "Practical systems for inventory tracking, prep planning, and creative reuse of ingredients.",
    image: "https://i.ibb.co/JnW6rK8/pexels-kampus-production-5920773.jpg",
    readTime: "6 min read",
    category: "Restaurant Management",
    author: "Rafiul Karim",
    publishedAt: "Dec 2025",
    content: [
      "Food waste often starts with over-prep. Forecasting demand based on daily sales can reduce unnecessary production.",
      "Use FIFO inventory flow and assign shelf labels with prep dates to improve ingredient rotation.",
      "Leftover ingredients can be repurposed into soups, sauces, or staff meals to minimize disposal while preserving value.",
    ],
  },
  {
    id: "5",
    title: "How Food Photography Increases Online Orders",
    description:
      "Learn what angles, lighting, and styling techniques make menu photos convert better.",
    image: "https://i.ibb.co/ZhRMQCG/pexels-ella-olsson-3026808.jpg",
    readTime: "5 min read",
    category: "Marketing",
    author: "Samiha Noor",
    publishedAt: "Nov 2025",
    content: [
      "Natural side lighting gives food better depth and texture than direct flash. Keep shadows soft to preserve detail.",
      "Use close-up framing for hero shots and top-down views for combo meals or platters.",
      "Consistent editing style across menu photos builds stronger brand identity and improves trust on ordering platforms.",
    ],
  },
  {
    id: "6",
    title: "Seasonal Menu Planning for Better Sales",
    description:
      "Use seasonal ingredients to control costs, improve taste, and keep your menu exciting.",
    image: "https://i.ibb.co/HGf9H9v/pexels-pixabay-262978.jpg",
    readTime: "4 min read",
    category: "Menu Planning",
    author: "Food Palace Team",
    publishedAt: "Oct 2025",
    content: [
      "Seasonal menus help reduce ingredient costs and improve freshness at the same time. Local availability often means better quality produce.",
      "Rotate featured dishes monthly to keep repeat customers interested and increase trial orders.",
      "Use customer feedback and sales reports to keep high-performing seasonal items in a core rotation.",
    ],
  },
];

export default Blog;
