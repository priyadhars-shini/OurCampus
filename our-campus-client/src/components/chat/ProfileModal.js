import React from "react";
import { Modal, Button, Image } from "react-bootstrap";

const ProfileModal = ({ user, children }) => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {children ? (
        <Button variant='link' onClick={handleShow}>
          {children}
        </Button>
      ) : (
        <Button variant='secondary' onClick={handleShow}>
          View Profile
        </Button>
      )}
      {user && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{user.username}</Modal.Title>
          </Modal.Header>
          <Modal.Body className='text-center'>
            <Image
              src={user.dp}
              width='200px'
              height='200px'
              roundedCircle
              className='mx-auto'
            />
            <p>{user.name}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ProfileModal;
