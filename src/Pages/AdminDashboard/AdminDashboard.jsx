import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./AdminDashboard.css";

/* ─── Data ──────────────────────────────────────────── */
const REVENUE_DATA = [
  { day: "Mon", revenue: 5820 },
  { day: "Tue", revenue: 7240 },
  { day: "Wed", revenue: 6100 },
  { day: "Thu", revenue: 8900 },
  { day: "Fri", revenue: 7450 },
  { day: "Sat", revenue: 9100 },
  { day: "Today", revenue: 8249 },
];

const ORDER_STATUS = [
  { name: "Delivered", value: 58, color: "#1D9E75" },
  { name: "Preparing", value: 24, color: "#EF9F27" },
  { name: "Pending", value: 11, color: "#378ADD" },
  { name: "Cancelled", value: 7, color: "#E24B4A" },
];

const RECENT_ORDERS = [
  {
    id: "#8847",
    customer: "Rafiq A.",
    item: "Tom Yum Soup",
    total: "$19",
    status: "delivered",
  },
  {
    id: "#8846",
    customer: "Priya S.",
    item: "Grilled Fish",
    total: "$15",
    status: "preparing",
  },
  {
    id: "#8845",
    customer: "Chen W.",
    item: "Mango Sticky Rice",
    total: "$9",
    status: "delivered",
  },
  {
    id: "#8844",
    customer: "Sara K.",
    item: "Beef Noodles",
    total: "$18",
    status: "pending",
  },
  {
    id: "#8843",
    customer: "Amir H.",
    item: "Garden Salad",
    total: "$12",
    status: "cancelled",
  },
];

const TOP_DISHES = [
  {
    rank: 1,
    name: "Tom Yum Soup",
    orders: 312,
    revenue: "$5,928",
    img: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=80&q=60",
  },
  {
    rank: 2,
    name: "Grilled Fish",
    orders: 210,
    revenue: "$3,150",
    img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=80&q=60",
  },
  {
    rank: 3,
    name: "Mango Sticky Rice",
    orders: 198,
    revenue: "$1,782",
    img: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=80&q=60",
  },
];

const ACTIVITY = [
  {
    type: "green",
    text: "New order #8847 placed by Rafiq A.",
    time: "2 min ago",
  },
  {
    type: "amber",
    text: "Menu item 'Pad Thai' stock running low",
    time: "15 min ago",
  },
  {
    type: "red",
    text: "Order #8843 cancelled by customer",
    time: "28 min ago",
  },
  {
    type: "blue",
    text: "New customer registered: Sara K.",
    time: "41 min ago",
  },
];

const TABS = ["Overview", "Orders", "Menu", "Customers", "Reports"];

/* ─── KPI Cards ─────────────────────────────────────── */
const KPI_CARDS = [
  {
    label: "Today's revenue",
    value: "$8,249",
    badge: "+12.4%",
    trend: "up",
    color: "green",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: "Orders today",
    value: "347",
    badge: "+8.1%",
    trend: "up",
    color: "amber",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    label: "Active customers",
    value: "1,842",
    badge: "+23",
    trend: "up",
    color: "blue",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Avg. rating",
    value: "4.81",
    badge: "-0.2",
    trend: "down",
    color: "pink",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

/* ─── Custom bar colors ─────────────────────────────── */
function CustomBar(props) {
  const { x, y, width, height, index } = props;
  const isToday = index === REVENUE_DATA.length - 1;
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill={isToday ? "#1D9E75" : "#9FE1CB"}
      rx={4}
    />
  );
}

/* ─── Main component ────────────────────────────────── */
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-0 my-10">
      {/* Top bar */}
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
          <div className="ad-avatar">RA</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="ad-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`ad-tab ${activeTab === tab ? "ad-tab-active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="ad-kpi-grid">
        {KPI_CARDS.map((card) => (
          <div key={card.label} className="ad-kpi-card">
            <div className="ad-kpi-top">
              <div className={`ad-kpi-icon ad-kpi-icon--${card.color}`}>
                {card.icon}
              </div>
              <span
                className={`ad-kpi-badge ${card.trend === "up" ? "ad-kpi-badge--up" : "ad-kpi-badge--down"}`}
              >
                {card.badge}
              </span>
            </div>
            <div className="ad-kpi-val">{card.value}</div>
            <div className="ad-kpi-lbl">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="ad-mid-grid">
        {/* Revenue bar chart */}
        <div className="ad-panel">
          <div className="ad-panel-title">
            Revenue — last 7 days
            <span>Apr 22–29</span>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={REVENUE_DATA} barSize={28}>
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10, fill: "#888780" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#888780" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]}
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "0.5px solid #e5e7eb",
                  fontFamily: "'Sora', sans-serif",
                }}
              />
              <Bar
                dataKey="revenue"
                shape={<CustomBar />}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Doughnut */}
        <div className="ad-panel">
          <div className="ad-panel-title">Orders by status</div>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie
                data={ORDER_STATUS}
                cx="50%"
                cy="50%"
                innerRadius={38}
                outerRadius={58}
                dataKey="value"
                paddingAngle={2}
              >
                {ORDER_STATUS.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v, name) => [`${v}%`, name]}
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: "0.5px solid #e5e7eb",
                  fontFamily: "'Sora', sans-serif",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="ad-legend">
            {ORDER_STATUS.map((s) => (
              <div key={s.name} className="ad-legend-item">
                <span
                  className="ad-legend-dot"
                  style={{ background: s.color }}
                />
                {s.name} {s.value}%
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="ad-bot-grid">
        {/* Recent orders */}
        <div className="ad-panel">
          <div className="ad-panel-title">
            Recent orders
            <span className="ad-live-badge">Live</span>
          </div>
          <table className="ad-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Item</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((o) => (
                <tr key={o.id}>
                  <td className="ad-table-id">{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.item}</td>
                  <td>{o.total}</td>
                  <td>
                    <span
                      className={`ad-status-pill ad-status-pill--${o.status}`}
                    >
                      {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ad-right-col">
          {/* Top dishes */}
          <div className="ad-panel">
            <div className="ad-panel-title">
              Top dishes
              <span>This week</span>
            </div>
            {TOP_DISHES.map((dish) => (
              <div key={dish.rank} className="ad-top-dish">
                <span className="ad-dish-rank">{dish.rank}</span>
                <img src={dish.img} alt={dish.name} className="ad-dish-img" />
                <div className="ad-dish-info">
                  <div className="ad-dish-name">{dish.name}</div>
                  <div className="ad-dish-orders">{dish.orders} orders</div>
                </div>
                <span className="ad-dish-rev">{dish.revenue}</span>
              </div>
            ))}
          </div>

          {/* Activity */}
          <div className="ad-panel">
            <div className="ad-panel-title">Recent activity</div>
            {ACTIVITY.map((a, i) => (
              <div
                key={i}
                className={`ad-activity-item ${i === ACTIVITY.length - 1 ? "ad-activity-last" : ""}`}
              >
                <div className={`ad-act-dot ad-act-dot--${a.type}`} />
                <div>
                  <div className="ad-act-text">{a.text}</div>
                  <div className="ad-act-time">{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
