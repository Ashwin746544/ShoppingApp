import './Backdrop.css';

const Backdrop = ({ onClick }) => {
  return (
    <div className="Backdrop" onClick={onClick}></div>
  );
}

export default Backdrop;