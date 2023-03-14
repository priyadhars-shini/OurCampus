import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { Container, Col, Row } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listEvents } from "../actions/eventActions";
import EventCarousel from "../components/EventCarousel";
import ProfileSummary from "../components/ProfileSummary";
import Event from "../components/Event";

const EventScreen = ({ match, userInfo }) => {
  // const [refresh, setRefresh] = useState(false);

  const dispatch = useDispatch();

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events } = eventList;
  useEffect(() => {
    dispatch(listEvents(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword ? (
        <EventCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Events</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Container>
          <Row>
            <Col md={3}>
              <ProfileSummary profile={userInfo} />
            </Col>
            <Col className='offset-1'>
              {events.length > 0 ? (
                events.map((event) => (
                  <Row key={event._id}>
                    <Event event={event}/>
                  </Row>
                ))
              ) : (
                <Message variant='info'>No Events Hosted or Available</Message>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return { userInfo: state.userLogin.userInfo };
};

export default connect(mapStateToProps)(EventScreen);
