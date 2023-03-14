import React, { useEffect } from "react";
import { Modal, Button, Row, Col, Container, Dropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../actions/userActions";
import { skillsList } from "../constants/skills";

const SkillModelForm = ({ user, children, openModel }) => {
  const [show, setShow] = React.useState(false);
  const [skills, setSkills] = React.useState([]);
  const [newSkill, setNewSkill] = React.useState("");
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeSkill = (pointedSkillIndex) => {
    setSkills(skills.filter((skill, idx) => idx !== pointedSkillIndex));
  };

  useEffect(() => {
    if (user) {
      setSkills(user.skills);
    } else {
      setSkills([]);
    }
    if (openModel) {
      handleShow();
    }
  }, [user]);

  const addSelectedSkill = (idx) => {
    setSkills([...skills, idx]);
  };

  const renderDropDown = () => {
    let keys = Object.keys(skillsList);
    keys = keys.filter((key) => !skills.includes(parseInt(key)));
    return keys.map((key) => (
      <Dropdown.Item
        onClick={() => {
          addSelectedSkill(parseInt(key));
        }}
      >
        {skillsList[key]}
      </Dropdown.Item>
    ));
  };

  const renderSelectedSkills = () =>
    skills.map((skill, idx) => (
      <Col key={idx} className='p-2 m-1 bg-light rounded-pill'>
        {skillsList[skill]}
        <span
          className='bg-danger mx-2 px-2 rounded-pill'
          style={{ cursor: "pointer" }}
          onClick={() => {
            removeSkill(idx);
          }}
        >
          x
        </span>
      </Col>
    ));

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        id: user._id,
        skills,
      })
    );
    handleClose();
  };

  return (
    <>
      {children ? (
        <Button
          variant='link'
          size='sm'
          className='me-3 mt-1'
          onClick={handleShow}
        >
          {children}
        </Button>
      ) : (
        <Button
          variant='secondary'
          size='sm'
          className='me-3 mt-1'
          onClick={handleShow}
        >
          + Skills
        </Button>
      )}
      {user && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{user.name}'s Skill Set</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <Form onSubmit={onSubmitHandler}>
              <InputGroup controlId='Skills'>
                <Form.Control
                  type='Skills'
                  placeholder='Enter Skill'
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                ></Form.Control>
                <Button type='submit' variant='outline-success'>
                  + Add
                </Button>
              </InputGroup>
            </Form> */}
            <Dropdown className='d-inline mx-2'>
              <Dropdown.Toggle id='dropdown-autoclose-true'>
                Select Your Skill
              </Dropdown.Toggle>

              <Dropdown.Menu>{renderDropDown()}</Dropdown.Menu>
            </Dropdown>
            <Container className='mt-1 rounded'>
              <Row xs='auto'>{renderSelectedSkills()}</Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='info' onClick={updateHandler}>
              Update
            </Button>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default SkillModelForm;
