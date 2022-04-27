import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center"><h1 className="mb-3">404 Page Not Found</h1><Button variant="primary" onClick={() => navigate("/")}>Go To Home</Button></div>
  );
}

export default PageNotFound;