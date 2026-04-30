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
import PropTypes from "prop-types";

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
    total: "৳ 19",
    status: "delivered",
  },
  {
    id: "#8846",
    customer: "Priya S.",
    item: "Grilled Fish",
    total: "৳ 15",
    status: "preparing",
  },
  {
    id: "#8845",
    customer: "Chen W.",
    item: "Mango Sticky Rice",
    total: "৳ 9",
    status: "delivered",
  },
  {
    id: "#8844",
    customer: "Sara K.",
    item: "Beef Noodles",
    total: "৳ 18",
    status: "pending",
  },
  {
    id: "#8843",
    customer: "Amir H.",
    item: "Garden Salad",
    total: "৳ 12",
    status: "cancelled",
  },
];

const TOP_DISHES = [
  {
    rank: 1,
    name: "Tom Yum Soup",
    orders: 310,
    revenue: "৳ 392",
    img: "https://images.unsplash.com/photo-1702940860770-f742273de15c",
  },
  {
    rank: 2,
    name: "Grilled Chicken Steak",
    orders: 210,
    revenue: "৳ 999",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947",
  },
  {
    rank: 3,
    name: "Beef Burger",
    orders: 198,
    revenue: "৳ 482",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
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

const KPI_CARDS = [
  {
    label: "Today's revenue",
    value: "৳ 8,249",
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

CustomBar.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number,
  index: PropTypes.number,
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Overview");

  // Helper for status pill classes
  const getStatusClasses = (status) => {
    const base =
      "text-[10.5px] font-medium px-2 py-[3px] rounded-full inline-block";
    const map = {
      delivered: "bg-[#e1f5ee] text-[#085041]",
      preparing: "bg-[#faeeda] text-[#633806]",
      pending: "bg-[#e6f1fb] text-[#0c447c]",
      cancelled: "bg-[#fcebeb] text-[#791f1f]",
    };
    return `${base} ${map[status]}`;
  };

  const getDotClass = (type) => {
    const map = {
      green: "bg-[#1D9E75]",
      amber: "bg-[#EF9F27]",
      red: "bg-[#E24B4A]",
      blue: "bg-[#378ADD]",
    };
    return `w-2 h-2 rounded-full shrink-0 mt-1 ${map[type]}`;
  };

  const getKpiIconClasses = (color) => {
    const bg = {
      green: "bg-[#e1f5ee] text-[#085041]",
      amber: "bg-[#faeeda] text-[#633806]",
      blue: "bg-[#e6f1fb] text-[#0c447c]",
      pink: "bg-[#fbeaf0] text-[#72243e]",
    }[color];
    return `w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${bg}`;
  };

  const getBadgeClasses = (trend) => {
    const base = "text-[10.5px] font-medium px-2 py-[3px] rounded-full";
    if (trend === "up") return `${base} bg-[#e1f5ee] text-[#085041]`;
    return `${base} bg-[#fcebeb] text-[#791f1f]`;
  };

  return (
    <div className="bg-[#f9fafb] min-h-screen py-6 font-['Sora',system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-5 lg:px-0">
        {/* Tabs */}
        <div className="flex gap-1 flex-wrap mb-5">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-[18px] py-[7px] rounded-full text-[12.5px] font-medium transition-all duration-150 cursor-pointer ${
                activeTab === tab
                  ? "bg-[#111827] text-white border border-[#111827]"
                  : "bg-[#f9fafb] text-[#6b7280] border border-[#e5e7eb] hover:border-[#d1d5db] hover:text-[#111827]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mb-4">
          {KPI_CARDS.map((card) => (
            <div
              key={card.label}
              className="bg-white border border-[#e5e7eb] rounded-xl p-[14px_16px] hover:border-[#d1d5db] transition-colors"
            >
              <div className="flex justify-between items-start mb-2.5">
                <div className={getKpiIconClasses(card.color)}>{card.icon}</div>
                <span className={getBadgeClasses(card.trend)}>
                  {card.badge}
                </span>
              </div>
              <div className="text-[28px] font-semibold text-[#111827] leading-none mb-1">
                {card.value}
              </div>
              <div className="text-[10.5px] text-[#9ca3af] uppercase tracking-wide font-medium">
                {card.label}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-3 mb-3.5">
          {/* Bar Chart */}
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-[14px_16px]">
            <div className="flex justify-between items-center text-[13px] font-medium text-[#111827] mb-3.5">
              Revenue — last 7 days
              <span className="text-[11px] text-[#9ca3af] font-normal">
                Apr 22–29
              </span>
            </div>
            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
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
                    tickFormatter={(v) => `৳ ${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(v) => [`৳ ${v.toLocaleString()}`, "Revenue"]}
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
                    isAnimationActive={false}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-[14px_16px]">
            <div className="text-[13px] font-medium text-[#111827] mb-3.5">
              Orders by status
            </div>
            <div className="w-full h-40">
              <ResponsiveContainer width="100%" height="100%">
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
            </div>
            <div className="flex flex-col gap-1.5 mt-3">
              {ORDER_STATUS.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-1.5 text-[11.5px] text-[#6b7280]"
                >
                  <span
                    className="w-2 h-2 rounded-[2px]"
                    style={{ background: s.color }}
                  />
                  {s.name} {s.value}%
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-3">
          {/* Recent Orders Table */}
          <div className="bg-white border border-[#e5e7eb] rounded-xl p-[14px_16px] overflow-x-auto">
            <div className="flex justify-between items-center mb-3.5">
              <span className="text-[13px] font-medium text-[#111827]">
                Recent orders
              </span>
              <span className="text-[10.5px] font-medium text-[#1d9e75] bg-[#e1f5ee] px-2 py-[3px] rounded-full">
                Live
              </span>
            </div>
            <table className="w-full text-[12.5px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left text-[10.5px] text-[#9ca3af] uppercase tracking-wide font-medium pb-2.5 border-b border-[#f3f4f6]">
                    #
                  </th>
                  <th className="text-left text-[10.5px] text-[#9ca3af] uppercase tracking-wide font-medium pb-2.5 border-b border-[#f3f4f6]">
                    Customer
                  </th>
                  <th className="text-left text-[10.5px] text-[#9ca3af] uppercase tracking-wide font-medium pb-2.5 border-b border-[#f3f4f6]">
                    Item
                  </th>
                  <th className="text-left text-[10.5px] text-[#9ca3af] uppercase tracking-wide font-medium pb-2.5 border-b border-[#f3f4f6]">
                    Total
                  </th>
                  <th className="text-left text-[10.5px] text-[#9ca3af] uppercase tracking-wide font-medium pb-2.5 border-b border-[#f3f4f6]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {RECENT_ORDERS.map((o) => (
                  <tr key={o.id}>
                    <td className="py-2.5 border-b border-[#f9fafb] text-[#9ca3af]">
                      {o.id}
                    </td>
                    <td className="py-2.5 border-b border-[#f9fafb] text-[#111827]">
                      {o.customer}
                    </td>
                    <td className="py-2.5 border-b border-[#f9fafb] text-[#111827]">
                      {o.item}
                    </td>
                    <td className="py-2.5 border-b border-[#f9fafb] text-[#111827]">
                      {o.total}
                    </td>
                    <td className="py-2.5 border-b border-[#f9fafb]">
                      <span className={getStatusClasses(o.status)}>
                        {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3">
            {/* Top Dishes */}
            <div className="bg-white border border-[#e5e7eb] rounded-xl p-[14px_16px]">
              <div className="flex justify-between items-center mb-3.5">
                <span className="text-[13px] font-medium text-[#111827]">
                  Top dishes
                </span>
                <span className="text-[11px] text-[#9ca3af] font-normal">
                  This week
                </span>
              </div>
              {TOP_DISHES.map((dish) => (
                <div
                  key={dish.rank}
                  className="flex items-center gap-2.5 mb-2.5 last:mb-0"
                >
                  <span className="text-[11px] font-medium text-[#9ca3af] w-4 text-center">
                    {dish.rank}
                  </span>
                  <img
                    src={dish.img}
                    alt={dish.name}
                    className="w-[38px] h-[38px] rounded-lg object-cover bg-[#f3f4f6]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12.5px] font-medium text-[#111827] truncate">
                      {dish.name}
                    </div>
                    <div className="text-[11px] text-[#9ca3af] mt-0.5">
                      {dish.orders} orders
                    </div>
                  </div>
                  <span className="text-[12.5px] font-medium text-[#111827] shrink-0">
                    {dish.revenue}
                  </span>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-[#e5e7eb] rounded-xl p-[14px_16px]">
              <div className="text-[13px] font-medium text-[#111827] mb-3.5">
                Recent activity
              </div>
              {ACTIVITY.map((a, i) => (
                <div
                  key={i}
                  className={`flex gap-2.5 items-start ${i !== ACTIVITY.length - 1 ? "pb-3 mb-3 border-b border-[#f3f4f6]" : ""}`}
                >
                  <div className={getDotClass(a.type)} />
                  <div>
                    <div className="text-[12px] text-[#111827] leading-normal">
                      {a.text}
                    </div>
                    <div className="text-[10.5px] text-[#9ca3af] mt-0.5">
                      {a.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
