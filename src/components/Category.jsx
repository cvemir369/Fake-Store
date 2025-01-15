const Category = ({ category, isActive, onCategorySelect }) => {
  return (
    <a
      role="tab"
      className={`tab ${isActive ? "tab-active" : ""}`}
      onClick={() => onCategorySelect(category)}
    >
      {category}
    </a>
  );
};

export default Category;
