import { Alert, Button } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function ErrorAlert({ onlyRefresh }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Alert variant="danger" className="m-3">
      <Alert.Heading>Something Went Wrong!</Alert.Heading>
      <p>
        It's Look like you are under slow internet Connection,please try again.
      </p>
      <Button onClick={() => onlyRefresh ? navigate(pathname) : navigate(0)} variant="danger">Try Again</Button>
    </Alert>
  );
}

export default ErrorAlert;