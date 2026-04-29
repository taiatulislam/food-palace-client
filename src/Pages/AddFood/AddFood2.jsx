import { useEffect, useState } from "react";
import placeholderImage from "../../assets/images/placeholder.png";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const SERVES_OPTIONS = [
  "1–2 persons",
  "2–3 persons",
  "3–4 persons",
  "4–6 persons",
];
const SPICE_LEVELS = ["None", "Mild", "Hot"];

const initialState = {
  image: "",
  name: "",
  price: null,
  quantity: null,
  prepTime: "",
  spiceLevel: "None",
  calories: null,
  origin: "",
  cuisine: "",
  madeBy: "",
  serves: "",
  category: "",
  tags: [],
  details: "",
};

export default function AddFood2() {
  const { id } = useParams();
  const [form, setForm] = useState(initialState);
  const [tagInput, setTagInput] = useState("");
  const [imgHover, setImgHover] = useState(false);

  const fetchAllFoods = async () => {
    const response = await fetch("/json/allFood.json");

    if (!response.ok) {
      throw new Error("Failed to fetch food data");
    }

    return response.json();
  };

  const { data: totalFoodData = [] } = useQuery({
    queryKey: ["all-foods"],
    queryFn: fetchAllFoods,
  });

  useEffect(() => {
    const food = totalFoodData.find((item) => item._id === Number(id));

    if (food) {
      setForm(food);
    }
  }, [id, totalFoodData]);

  const categories = [
    ...new Set(totalFoodData?.map((food) => food.category).filter(Boolean)),
  ];

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleTagKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = tagInput.trim().replace(/,$/, "");
      if (val && !form.tags.includes(val)) {
        set("tags", [...form.tags, val]);
      }
      setTagInput("");
    }
    if (e.key === "Backspace" && !tagInput && form.tags.length) {
      set("tags", form.tags.slice(0, -1));
    }
  };

  const removeTag = (tag) =>
    set(
      "tags",
      form.tags.filter((t) => t !== tag),
    );

  const spiceStyle = (level) => {
    if (form.spiceLevel !== level) return styles.spBtn;
    if (level === "None") return { ...styles.spBtn, ...styles.spNone };
    if (level === "Mild") return { ...styles.spBtn, ...styles.spMild };
    return { ...styles.spBtn, ...styles.spHot };
  };

  const handleSubmit = () => {
    alert("Food item saved!");
  };

  return (
    <div className="max-w-7xl mx-auto px-5 lg:px-0">
      <div style={styles.header}>
        <h1 style={styles.title}>{id ? "Update" : "Add"} food item</h1>
        <p style={styles.subtitle}>
          Fill in the details below to {id ? "update" : "add"} a new dish
        </p>
      </div>

      {/* Image */}
      <div
        style={styles.imgBox}
        onMouseEnter={() => setImgHover(true)}
        onMouseLeave={() => setImgHover(false)}
      >
        <img
          src={`${form.image}?w=700&q=80`}
          alt="food preview"
          style={styles.img}
          onError={(e) => {
            e.currentTarget.src = placeholderImage;
          }}
        />
        {imgHover && (
          <div style={styles.imgOverlay}>
            <span style={styles.imgOverlayText}>Change photo</span>
          </div>
        )}
      </div>

      {/* Fields */}
      <div style={styles.fields}>
        {/* Name */}
        <Field label="Dish name">
          <input
            style={styles.input}
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </Field>

        {/* Price & Quantity */}
        <div style={styles.row}>
          <Field label="Price (৳)">
            <input
              style={styles.input}
              type="number"
              value={form.price}
              onChange={(e) => set("price", e.target.value)}
            />
          </Field>
          <Field label="Quantity">
            <input
              style={styles.input}
              type="number"
              value={form.quantity}
              onChange={(e) => set("quantity", e.target.value)}
            />
          </Field>
        </div>

        {/* Category & Cuisine */}
        <div style={styles.row}>
          <Field label="Category">
            <select
              style={styles.input}
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="Cuisine">
            <input
              style={styles.input}
              value={form.cuisine}
              onChange={(e) => set("cuisine", e.target.value)}
            />
          </Field>
        </div>

        {/* Prep time & Calories */}
        <div style={styles.row}>
          <Field label="Prep time">
            <input
              style={styles.input}
              value={form.prepTime}
              onChange={(e) => set("prepTime", e.target.value)}
            />
          </Field>
          <Field label="Calories (kcal)">
            <input
              style={styles.input}
              type="number"
              value={form.calories}
              onChange={(e) => set("calories", e.target.value)}
            />
          </Field>
        </div>

        {/* Origin & Made by */}
        <div style={styles.row}>
          <Field label="Origin">
            <input
              style={styles.input}
              value={form.origin}
              onChange={(e) => set("origin", e.target.value)}
            />
          </Field>
          <Field label="Made by">
            <input
              style={styles.input}
              value={form.madeBy}
              onChange={(e) => set("madeBy", e.target.value)}
            />
          </Field>
        </div>

        {/* Serves & Spice */}
        <div style={styles.row}>
          <Field label="Serves">
            <select
              style={styles.input}
              value={form.serves}
              onChange={(e) => set("serves", e.target.value)}
            >
              {SERVES_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Spice level">
            <div style={styles.spiceGroup}>
              {SPICE_LEVELS.map((level) => (
                <button
                  key={level}
                  style={spiceStyle(level)}
                  onClick={() => set("spiceLevel", level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </Field>
        </div>

        {/* Description */}
        <Field label="Description">
          <textarea
            style={{ ...styles.input, ...styles.textarea }}
            value={form.details}
            onChange={(e) => set("details", e.target.value)}
          />
        </Field>

        {/* Tags */}
        <Field label="Tags">
          <div
            style={styles.tagsWrap}
            onClick={() => document.getElementById("tagInput").focus()}
          >
            {form.tags.map((tag) => (
              <span key={tag} style={styles.tag}>
                {tag}
                <button style={styles.tagRemove} onClick={() => removeTag(tag)}>
                  ×
                </button>
              </span>
            ))}
            <input
              id="tagInput"
              style={styles.tagInput}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKey}
              placeholder="Add tag…"
            />
          </div>
          <p style={styles.tagHint}>Press Enter or comma to add</p>
        </Field>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        <button style={styles.cancelBtn} onClick={() => setForm(initialState)}>
          Cancel
        </button>
        <button style={styles.saveBtn} onClick={handleSubmit}>
          Save item
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

const styles = {
  header: { marginBottom: "1.75rem" },
  title: { fontSize: 20, fontWeight: 500, color: "#111", margin: 0 },
  subtitle: { fontSize: 13, color: "#888", marginTop: 4 },

  imgBox: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    marginBottom: "1.5rem",
    border: "1px solid #eee",
  },
  img: { width: "100%", height: "100%", objectFit: "cover", display: "block" },
  imgOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0,0,0,0.32)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imgOverlayText: {
    fontSize: 13,
    color: "#fff",
    background: "rgba(0,0,0,0.4)",
    padding: "6px 14px",
    borderRadius: 99,
  },

  fields: { display: "flex", flexDirection: "column", gap: "1rem" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  field: { display: "flex", flexDirection: "column", gap: 5 },
  label: { fontSize: 12, fontWeight: 500, color: "#666" },
  input: {
    width: "100%",
    padding: "9px 12px",
    fontSize: 14,
    border: "1px solid #e5e5e5",
    borderRadius: 8,
    outline: "none",
    background: "#fff",
    color: "#111",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  textarea: { resize: "none", minHeight: 100, lineHeight: 1.6 },

  spiceGroup: { display: "flex", gap: 6, height: 38 },
  spBtn: {
    flex: 1,
    padding: "0 4px",
    border: "1px solid #e5e5e5",
    borderRadius: 8,
    fontSize: 12,
    cursor: "pointer",
    background: "transparent",
    color: "#888",
    fontFamily: "inherit",
  },
  spNone: {
    background: "#f0fdf4",
    color: "#16a34a",
    border: "none",
    fontWeight: 500,
  },
  spMild: {
    background: "#fffbeb",
    color: "#d97706",
    border: "none",
    fontWeight: 500,
  },
  spHot: {
    background: "#fef2f2",
    color: "#dc2626",
    border: "none",
    fontWeight: 500,
  },

  tagsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    padding: "7px 10px",
    border: "1px solid #e5e5e5",
    borderRadius: 8,
    minHeight: 42,
    cursor: "text",
    background: "#fff",
    alignItems: "center",
  },
  tag: {
    background: "#f4f4f5",
    color: "#3f3f46",
    fontSize: 12,
    padding: "3px 8px",
    borderRadius: 99,
    display: "flex",
    alignItems: "center",
    gap: 4,
    border: "1px solid #e4e4e7",
  },
  tagRemove: {
    border: "none",
    background: "none",
    cursor: "pointer",
    color: "#999",
    fontSize: 14,
    lineHeight: 1,
    padding: 0,
  },
  tagInput: {
    border: "none",
    outline: "none",
    fontSize: 13,
    background: "transparent",
    color: "#111",
    minWidth: 80,
    fontFamily: "inherit",
  },
  tagHint: { fontSize: 11, color: "#aaa", marginTop: 4 },

  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: "1.75rem",
    paddingTop: "1.25rem",
    borderTop: "1px solid #f0f0f0",
  },
  cancelBtn: {
    padding: "9px 18px",
    border: "1px solid #e5e5e5",
    borderRadius: 8,
    background: "transparent",
    fontSize: 14,
    cursor: "pointer",
    color: "#666",
    fontFamily: "inherit",
  },
  saveBtn: {
    padding: "9px 22px",
    border: "none",
    borderRadius: 8,
    background: "#111",
    fontSize: 14,
    cursor: "pointer",
    color: "#fff",
    fontWeight: 500,
    fontFamily: "inherit",
  },
};
