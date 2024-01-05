import React from "react";
import "./TagFilter.css";
const TagFilter = ({ labels, selectedTags, onSelect }) => {
  if (!labels || !labels.length) {
    return null;
  }

  return (
    <div className="tag-filter">
      <h2>Filter by Tags:</h2>
      <div className="tag-list" style={{ alignItems: "flex-start" }}>
        {labels.map((label) => (
          <label key={label.id}>
            <input
              type="checkbox"
              checked={selectedTags.includes(label.id)}
              onChange={() => onSelect(label.id)}
            />
            {label.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
