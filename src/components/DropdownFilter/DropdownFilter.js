import './DropdownFilter.css';
import {
  DropdownButton,
  Dropdown
} from 'react-bootstrap';

const DropdownFilter = ({ dropdownData }) => {
  return (
    <DropdownButton id="dropdown-basic-button" className='dropdown__btn' title={dropdownData.title}>
      {dropdownData.items.map(item => <Dropdown.Item key={item} href="#/action-1" className='dropdown__item'>{item}</Dropdown.Item>)}
    </DropdownButton>
  );
}

export default DropdownFilter;