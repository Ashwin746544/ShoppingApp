import Detail from "../Detail/Detail";
import DetailCategoryName from "../DetailCategoryName/DetailCategoryName";

const SidebarCategory = ({ sidebarCategory }) => {

  console.log("inside sidebar Category", sidebarCategory);
  // const content = sidebarCategory.options.map((option, index) => <Detail key={index} title={option.optionTitle}>
  //   {option.optionCategories.map((optionCategory, index) => <DetailCategoryName key={index}>{optionCategory}</DetailCategoryName>)}
  // </Detail>);
  const content = sidebarCategory.subCategories.map((subCategory, index) => <DetailCategoryName key={subCategory.id} catId={subCategory.id}>{subCategory.name}</DetailCategoryName>);
  return (
    <Detail title={sidebarCategory.name}>
      {content}
    </Detail>
  );
};
export default SidebarCategory;
