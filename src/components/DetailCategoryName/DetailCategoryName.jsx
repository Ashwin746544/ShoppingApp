/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import './DetailCategoryName.css';
import { useContext } from 'react';
import SidebarContext from '../../Contex/SidebarContext';

function DetailCategoryName({ children: name, catId }) {
  const ctx = useContext(SidebarContext);

  return (
    <div className="DetailCategoryName">
      <p
        className="mb-3 text-decoration-none d-inline-block"
        onClick={() => ctx.selectSidebarCategoryHandler(catId)}
      >
        {name}

      </p>
    </div>
  );
}

export default DetailCategoryName;
