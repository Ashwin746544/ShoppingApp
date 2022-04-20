import { Button, Modal } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const GenericModal = ({ openModal, modalHeading, cancelHandler, proceedHandler, children }) => {
  const [show, setShow] = useState(false);
  console.log('MODAL RENDERED' + show);

  useEffect(() => {
    setShow(openModal);
  }, [openModal]);

  const handleClose = () => { setShow(false); setTimeout(() => cancelHandler(), 300) };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => { proceedHandler(); handleClose(); }}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GenericModal;