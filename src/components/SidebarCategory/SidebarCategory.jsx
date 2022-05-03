import Detail from '../Detail/Detail';
import DetailCategoryName from '../DetailCategoryName/DetailCategoryName';

function SidebarCategory({ sidebarCategory }) {
  const content = sidebarCategory.subCategories.map(
    (subCategory) => (
      <DetailCategoryName
        key={subCategory.id}
        catId={subCategory.id}
      >
        {subCategory.name}
      </DetailCategoryName>
    ),
  );
  return (
    <Detail title={sidebarCategory.name}>
      {content}
    </Detail>
  );
}
export default SidebarCategory;
