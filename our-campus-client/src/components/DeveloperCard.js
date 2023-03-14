import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const DeveloperCard = ({ user }) => {
  return (
    <Card bg='dark' text='white' className='my-3 p-3 rounded'>
      <Card.Body>
        <Row className='text-center'>
          <Container className='text-center'>
            <Image
              src={user.dp}
              width='200px'
              height='200px'
              roundedCircle
              className='mx-auto'
            />
          </Container>
          <Row className='my-2 text-center'>
            <Link to={`/profile/${user.username}`} className='username'>
              {user.name}
            </Link>
          </Row>
          <Row>
            <small className='text-muted mb-1 text-center'>
              {user.tagline}
            </small>
          </Row>
          <Row className='my-2 text-center' style={{ fontSize: "11px" }}>
            <Col>
              <span>{user.posts && user.posts.length}</span>
              <br />
              <span>Posts</span>
            </Col>

            <Col>
              <span>{user.followers && user.followers.length}</span>
              <br />
              <span>Followers</span>
            </Col>

            <Col>
              <span>{user.following && user.following.length}</span>
              <br />
              <span>Following</span>
            </Col>
          </Row>
          <Row className='my-3 text-justify' style={{ fontSize: "14px" }}>
            <small>{user.about}</small>
          </Row>
          <Row className='my-1 text-center'>
            <Rating text={"Rating : "} value={5} />
          </Row>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default DeveloperCard;
