import { useEffect, useState } from 'react';
import Detail from '../Detail/Detail';
import SidebarCategory from '../SidebarCategory/SidebarCategory';
import './SidebarCategories.css';

function SidebarCategorises({ categoriesArray }) {
  const [sidebarCategories, setSidebarCategories] = useState([]);

  useEffect(() => {
    const transformedCategories = categoriesArray.slice(0, 10).filter(
      (category) => category.subCategories.length > 0,
    );
    setSidebarCategories(transformedCategories);
  }, [categoriesArray]);

  const content = sidebarCategories.map(
    (sidebarCategory) => (
      <SidebarCategory
        key={sidebarCategory.name}
        sidebarCategory={sidebarCategory}
      />
    ),
  );

  return (
    <div className="sidebarCategories ps-3">
      <Detail title="All Category" isOpen>
        {content}
      </Detail>
    </div>
  );
}

export default SidebarCategorises;
