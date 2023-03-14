import React from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const SuggestionProfile = ({ profile, history }) => {
  return (
    <Row className='mb-3'>
      <Col xs='3'>
        <Image src={profile.dp} width='48px' height='48px' roundedCircle />
      </Col>
      <Col xs='8' className='d-flex align-items-center'>
        <Col xs='8'>
          <Row>
            <Link to={`/profile/${profile.username}`} className='username'>
              <small style={{ fontSize: "1.3vh" }}>{profile.name}</small>
            </Link>
          </Row>
          <Row>
            <small className='text-muted'>{profile.username}</small>
          </Row>
        </Col>
        <Col className='mx-2'>
          <Link to={`/profile/${profile.username}`} className='username'>
            <Button size='sm' variant='secondary'>
              View
            </Button>
          </Link>
        </Col>
      </Col>
    </Row>
  );
};

export default SuggestionProfile;
