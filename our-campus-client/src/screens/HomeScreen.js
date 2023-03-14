import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { connect } from "react-redux";
import Feeds from "../components/Feeds";
import Message from "../components/Message";
import ProfileSummary from "../components/ProfileSummary";
import Suggestions from "../components/Suggestions";
import Loader from "../components/Loader";

const HomeScreen = ({ userInfo, loading }) => {
  return (
    <Container>
      {loading && <Loader />}
      <Row>
        <Col md={3}>
          <ProfileSummary profile={userInfo} />
        </Col>
        <Col md={6}>
          {userInfo && userInfo.home && userInfo.home.length > 0 ? (
            <Feeds posts={userInfo.home} />
          ) : (
            <Message>No Feeds</Message>
          )}
        </Col>
        <Col md={3}>
          <Suggestions profiles={userInfo.suggestions} />
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userLogin.userInfo,
    loading: state.userLogin.loading,
  };
};

export default connect(mapStateToProps)(HomeScreen);
