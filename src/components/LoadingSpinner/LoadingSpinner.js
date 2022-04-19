import './LoadingSpinner.css';
import Spinner from 'react-bootstrap/Spinner';


const LoadingSpinner = ({ isAppend, shouldCoverPage }) => {
  return <div className={`spinner-container ${shouldCoverPage ? "CoverPage" : ""}`} style={{ alignItems: isAppend ? "start" : "center" }}><Spinner animation="border" variant="primary" /></div>;
}

export default LoadingSpinner;