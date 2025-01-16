const Category = ({ category, isActive, onCategorySelect }) => {
  return (
    <a
      role="tab"
      className={`tab ${isActive ? "tab-active" : ""} text-xs  p-2 h-full`}
      onClick={() => onCategorySelect(category)}
    >
      {category}
    </a>
  );
};

export default Category;
