/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './Backdrop.css';

function Backdrop({ onClick }) {
  return (
    <div className="Backdrop" onClick={onClick} />
  );
}

export default Backdrop;
