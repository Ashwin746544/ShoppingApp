import './LoadingSpinner.css';
import Spinner from 'react-bootstrap/Spinner';


const LoadingSpinner = ({ isAppend }) => {
  return <div className='spinner-container' style={{ alignItems: isAppend ? "start" : "center" }}><Spinner animation="border" variant="primary" /></div>;
}

export default LoadingSpinner;