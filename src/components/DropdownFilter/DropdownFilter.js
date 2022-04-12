import './DropdownFilter.css';
import {
  DropdownButton,
  Dropdown
} from 'react-bootstrap';

const DropdownFilter = ({ dropdownData, sortingFilterQueryHandler }) => {
  return (
    <DropdownButton id="dropdown-basic-button" className='dropdown__btn' title={dropdownData.title}>
      {dropdownData.items.map(item => <Dropdown.Item key={item.name} onClick={() => sortingFilterQueryHandler(item.query)} className='dropdown__item'>{item.name}</Dropdown.Item>)}
    </DropdownButton>
  );
}

export default DropdownFilter;