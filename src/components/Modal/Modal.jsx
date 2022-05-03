import { Button, Modal as BsModal } from 'react-bootstrap';
import { useEffect, useState } from 'react';

function Modal({
  openModal, BsModalHeading, cancelHandler, proceedHandler, children,
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(openModal);
  }, [openModal]);

  const handleClose = () => { setShow(false); setTimeout(() => cancelHandler(), 300); };

  return (
    <BsModal show={show} onHide={handleClose}>
      <BsModal.Header closeButton>
        <BsModal.Title>{BsModalHeading}</BsModal.Title>
      </BsModal.Header>
      <BsModal.Body>{children}</BsModal.Body>
      <BsModal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={() => { proceedHandler(); handleClose(); }}>
          Continue
        </Button>
      </BsModal.Footer>
    </BsModal>
  );
}

export default Modal;
