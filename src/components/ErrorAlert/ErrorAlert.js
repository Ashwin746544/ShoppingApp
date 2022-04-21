import { Alert, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ErrorAlert({ setShowErrorAlert }) {
  const navigate = useNavigate();
  return (
    <Alert variant="danger" onClose={() => { }} className="m-3">
      <Alert.Heading>Something Went Wrong!</Alert.Heading>
      <p>
        It's Look like you are under slow internet Connection,please try again.
      </p>
      <Button variant="danger" onClick={() => navigate(0)}>Try Again</Button>
    </Alert>
  );
}

export default ErrorAlert;