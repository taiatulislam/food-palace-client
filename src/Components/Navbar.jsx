import { Link, NavLink, useLocation } from "react-router-dom";
import logoLight from "../../src/assets/images/logo/logo-light.jpg";
import React, { useContext, useState } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import bannerBG from "../assets/images/patron-black.jpg";
import placeholderImage from "../assets/images/placeholder.png";
import Swal from "sweetalert2";

const navLinkStyle = ({ isActive }) => ({
  backgroundColor: "transparent",
  borderBottom: isActive ? "3px solid var(--color-secondary)" : "none",
  color: isActive ? "var(--color-secondary)" : "var(--color-primary)",
  borderRadius: "0",
  padding: "5px",
  fontWeight: "600",
});

const Navbar = () => {
  const { user, signout } = useContext(AuthContext);
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [IsUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const isHomePage = location?.pathname === "/";
  const sectionClass = isHomePage
    ? "absolute top-0 w-full py-2"
    : "static py-2";
  const sectionStyle = isHomePage
    ? {}
    : { backgroundImage: `url(${bannerBG})` };
  const userMenuLinks = [
    // { label: "My added food", to: `/addedFood/${user?.email}` },
    // { label: "Add food", to: "/addFood" },
    // { label: "My Cart", to: `/cart/${user?.email}` },
    { label: "My ordered food", to: `/ordered/${user?.email}` },
  ];

  const links = (
    <>
      <li>
        <NavLink to="/" style={navLinkStyle} className="text-xs md:text-lg">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/allFood"
          style={navLinkStyle}
          className="text-xs md:text-lg"
        >
          All Food
        </NavLink>
      </li>
      <li>
        <NavLink to="/cart" style={navLinkStyle} className="text-xs md:text-lg">
          Cart
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/wishlist"
          style={navLinkStyle}
          className="text-xs md:text-lg"
        >
          Wishlist
        </NavLink>
      </li>
      <li>
        <NavLink to="/blog" style={navLinkStyle} className="text-xs md:text-lg">
          Blog
        </NavLink>
      </li>
    </>
  );

  const handleSignOut = () => {
    signout()
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "User signed out successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((error) => {
        console.error(error.code, error.message);

        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  return (
    <section className={sectionClass} style={sectionStyle}>
      <div className="max-w-7xl mx-auto px-5 lg:px-0">
        <div className="navbar px-0">
          <div className="navbar-start">
            {/* Mobile Dropdown */}
            <div className="dropdown dropdown-end md:hidden z-20">
              <label
                tabIndex={0}
                role="button"
                className="cursor-pointer text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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

              {isMenuOpen && (
                <ul className="menu menu-xs dropdown-content left-0 mt-2 z-[50] w-40 rounded-box bg-base-300 p-2 shadow">
                  {React.Children.map(links, (link) => (
                    <li onClick={() => setIsMenuOpen(false)}>{link}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Logo */}
            <Link to="/" className="hidden md:block">
              <img
                src={logoLight}
                alt="logo"
                className="md:w-[50px] lg:w-[50px] rounded mr-2"
                onError={(e) => {
                  e.currentTarget.src = placeholderImage;
                }}
              />
            </Link>

            <div className="hidden md:block">
              <h3 className="md:text-lg lg:text-xl text-white">Food Palace</h3>
              <p className="text-primary md:text-xs lg:text-sm">
                Food & Restaurant
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal gap-5 lg:gap-10">{links}</ul>
          </div>

          {/* Right Side */}
          <div className="navbar-end flex gap-5">
            {user ? (
              <div className="flex items-center gap-5">
                <div className="dropdown dropdown-end z-20">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div
                      className="w-8 md:w-10 rounded-full"
                      onClick={() => setIsUserMenuOpen(!IsUserMenuOpen)}
                    >
                      <img src={user?.photoURL} alt="profile" />
                    </div>
                  </label>

                  {IsUserMenuOpen && (
                    <ul className="menu menu-xs md:menu-sm dropdown-content right-0 mt-2 z-20 p-2 shadow bg-base-100 rounded-box">
                      {userMenuLinks.map((item) => (
                        <li key={item.label}>
                          <Link
                            to={item.to}
                            className="text-nowrap"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
