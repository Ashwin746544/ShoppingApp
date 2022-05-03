import { useRef } from 'react';
import SearchIcon from '../../assets/search.svg';

function HeaderMiddle({ searchTextHandler }) {
  const ref = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredText = ref.current.value.trim();
    if (enteredText === '') {
      return;
    }
    let searchText = '';
    enteredText.split(' ').forEach((word) => {
      searchText += (`search=${word}&`);
    });
    searchTextHandler(searchText.slice(0, searchText.length - 1));
  };

  return (
    <div className="header__middle ps-3 ps-xl-0">
      <form className="header__middle-search circularDiv p-2" onSubmit={submitHandler}>
        <img src={SearchIcon} alt="search" />
        <input type="search" placeholder="search..." className="ms-1" ref={ref} />
      </form>
    </div>
  );
}

export default HeaderMiddle;
