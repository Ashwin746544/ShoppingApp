import Detail from "../Detail/Detail";
import DetailCategoryName from "../DetailCategoryName/DetailCategoryName";

const SidebarCategory = ({ sidebarCategory }) => {


  const content = sidebarCategory.options.map((option, index) => <Detail key={index} title={option.optionTitle}>
    {option.optionCategories.map((optionCategory, index) => <DetailCategoryName key={index}>{optionCategory}</DetailCategoryName>)}
  </Detail>);
  return (
    <Detail title={sidebarCategory.title}>
      {content}
    </Detail>
  );
};
export default SidebarCategory;
