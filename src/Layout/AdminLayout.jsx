import { Outlet, NavLink } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Top navbar (mobile) */}
        <div className="w-full navbar bg-base-200 lg:hidden">
          <label htmlFor="admin-drawer" className="btn btn-square btn-ghost">
            ☰
          </label>
          <span className="ml-2 font-bold">Admin Panel</span>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <div className="ad-topbar">
            <div className="ad-brand">
              <div className="ad-logo">
                <svg
                  viewBox="0 0 24 24"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="#E1F5EE"
                  strokeWidth="1.5"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
              <div>
                <div className="ad-brand-name">FoodDash Admin</div>
                <div className="ad-brand-sub">Restaurant management</div>
              </div>
            </div>
            <div className="ad-topbar-right">
              <span className="ad-date">Wednesday, 29 Apr 2026</span>
              <button className="ad-notif-btn" aria-label="Notifications">
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="ad-notif-dot" />
              </button>
              <div className="ad-avatar">A</div>
            </div>
          </div>

          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 min-h-full bg-base-200 text-base-content">
          <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>

          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/home">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/manage-food">Manage Food</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/all-food">All Food</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/add-blog">Add Blog</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminLayout;
