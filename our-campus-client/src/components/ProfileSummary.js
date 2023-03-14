import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import AddPostScreen from "../screens/AddPostScreen";
import AddEventScreen from "../screens/AddEventScreen";
import { Provider } from "react-redux";
import SkillModelForm from "./SkillModalForm";

// const profile = {
//   username: "19EUCB045",
//   name: "Sadurathman V",
//   tagline: "MERN Stack Developer | Content Creator | Student '23",
//   dp: "1.jpg",
//   respect: 50,
//   rating: 4.5,
//   followers: 100,
//   following: 22,
//   skills: ["cpp", "java", "MERN"],
// };

const ProfileSummary = ({ profile }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [eventShow, setEventShow] = React.useState(false);

  function AddPost(props) {
    return (
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPostScreen hide={props.onHide} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function AddEvent(props) {
    return (
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Add Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddEventScreen />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <AddPost show={modalShow} onHide={() => setModalShow(false)} />
      <AddEvent show={eventShow} onHide={() => setEventShow(false)} />
      <Card bg='dark' text='white' className='my-3 p-3 rounded'>
        <Card.Header className='mx-auto'>
          <Image src={profile.dp} width='64px' height='64px' roundedCircle />
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col></Col>
              <Col xl='auto' md='auto'>
                <Link to={`/profile/${profile.username}`} className='username'>
                  {profile.name}
                </Link>
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <small className='text-muted align-items-center d-flex justify-content-center'>
                {profile.tagline}
              </small>
            </Row>
            <br />
            <Row>
              <Rating text={"Rating : "} value={profile.rating} />
            </Row>
          </Container>
        </Card.Body>
        <Card.Footer>
          <Link to='/edit'>
            <Button size='sm' variant='info' className='me-3'>
              Edit Profile
            </Button>
          </Link>
          <Link to='/events/enrollments'>
            <Button size='sm' variant='outline-light'>
              Enrollments
            </Button>
          </Link>
          <Row className='my-2'>
            <Button
              onClick={() => setModalShow(true)}
              size='sm'
              variant='danger'
            >
              + Add Post
            </Button>
            {profile.userType > 1 && (
              <Button
                className='my-2'
                onClick={() => setEventShow(true)}
                size='sm'
                variant='success'
              >
                + Add Event
              </Button>
            )}
            <SkillModelForm
              user={profile}
              openModel={profile && profile.skills && profile.skills.length < 1}
            />
          </Row>
        </Card.Footer>
      </Card>
    </>
  );
};

export default ProfileSummary;
