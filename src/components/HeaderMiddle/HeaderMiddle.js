import { useRef } from 'react';
import SearchIcon from '../../assets/search.svg';

const HeaderMiddle = ({ searchTextHandler }) => {
  const ref = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredText = ref.current.value.trim();
    if (enteredText === "") {
      return;
    }
    let searchText = "";
    for (let word of enteredText.split(" ")) {
      searchText += ("search=" + word + "&");
    }
    // console.log(searchText.slice(0, searchText.length - 1) + "&salePrice>=50");
    searchTextHandler(searchText.slice(0, searchText.length - 1) + "&salePrice>=50");
    // searchTextHandler(enteredText);
  }

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
