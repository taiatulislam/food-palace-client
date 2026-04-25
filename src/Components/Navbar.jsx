import { Link, NavLink, useLocation } from "react-router-dom";
import logoLight from "../../src/assets/images/logo/logo-light.jpg";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import bannerBG from "../assets/images/patron-black.jpg";

const navLinkStyle = ({ isActive }) => ({
  backgroundColor: "transparent",
  borderBottom: isActive ? "3px solid var(--color-secondary)" : "none",
  color: isActive ? "var(--color-secondary)" : "var(--color-primary)",
  borderRadius: "0",
  padding: "5px",
  fontWeight: "600",
  fontSize: "18px",
});

const Navbar = () => {
  const { user, signout } = useContext(AuthContext);
  const location = useLocation();
  const isHomePage = location?.pathname === "/";
  const sectionClass = isHomePage
    ? "absolute top-0 w-full py-2"
    : "static py-2";
  const sectionStyle = isHomePage
    ? {}
    : { backgroundImage: `url(${bannerBG})` };
  const userMenuLinks = [
    { label: "My added food", to: `/addedFood/${user?.email}` },
    { label: "Add food", to: "/addFood" },
    { label: "My ordered food", to: `/ordered/${user?.email}` },
  ];

  const links = (
    <>
      <li>
        <NavLink to="/" style={navLinkStyle}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/allFood" style={navLinkStyle}>
          All Food
        </NavLink>
      </li>

      <li>
        <NavLink to="/blog" style={navLinkStyle}>
          Blog
        </NavLink>
      </li>
    </>
  );

  const handleSignOut = () => {
    return signout();
  };

  return (
    <section className={sectionClass} style={sectionStyle}>
      <div className="max-w-7xl mx-auto px-5 md:px-0">
        <div className="navbar px-0">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost md:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-300 rounded-box w-52"
              >
                {links}
              </ul>
            </div>

            {/* Logo */}
            <Link to="/" className="hidden md:block">
              <img
                src={logoLight}
                alt="logo"
                className="md:w-[50px] lg:w-[50px] rounded mr-2"
              />
            </Link>
            <div className="hidden md:block">
              <h3 className="md:text-lg lg:text-xl text-white">Food Palace</h3>
              <p className="text-primary md:text-xs lg:text-sm">
                Food & Restaurant
              </p>
            </div>
          </div>

          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal gap-10">{links}</ul>
          </div>

          <div className="navbar-end flex gap-5">
            {user ? (
              <div className="flex items-center gap-5">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-8 md:w-10 rounded-full">
                      <img src={user?.photoURL} alt="profile" />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    {userMenuLinks.map((item) => (
                      <li key={item.label}>
                        <Link to={item.to}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={handleSignOut}
                  className="rounded-[4px] text-sm md:text-base bg-primary text-white px-2 md:px-5 py-1 md:py-1.5 font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/signIn"
                className="rounded-[4px] text-sm md:text-base bg-secondary px-2 md:px-5 py-1 md:py-1.5 font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
