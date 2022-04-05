import SearchIcon from '../../assets/search.svg';

const HeaderMiddle = () => {

  return (
    <div className="header__middle ps-3 ps-xl-0">
      <div className="header__middle-search circularDiv p-2">
        <img src={SearchIcon} />
        <input type="search" placeholder="search..." className="ms-1" />
      </div>
    </div>
  );
}

export default HeaderMiddle;
