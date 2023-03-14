import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  accept,
  decline,
  getUserDetails,
  request,
  unrequest,
} from "../actions/userActions";
import Feeds from "../components/Feeds";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Rating from "../components/Rating";
import { skillsList } from "../constants/skills";

// const profile = {
//   username: "19EUCB045",
//   name: "Sadurathman V",
//   tagline: "MERN Stack Developer | Content Creator | Student '23",
//   dp: "/images/1.jpg",
//   respect: 50,
//   rating: 4.5,
//   followers: 100,
//   following: 22,
//   skills: ["cpp", "java", "MERN"],
//   posts: [],
// };

const ProfileScreen = ({ match, history }) => {
  const dispatch = useDispatch();
  const [requestStatus, setRequestStatus] = useState(0);
  const [acceptStatus, setAcceptStatus] = useState(0);

  const [fetchUser, setFetchUser] = useState(match.params.username);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfile = useSelector((state) => state.userDetails);
  let { loading, user, error } = userProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (fetchUser !== match.params.username)
      setFetchUser(match.params.username);
    else if (!user || fetchUser !== user.username) {
      fetchUser && dispatch(getUserDetails(fetchUser));
    } else {
      // 2 - accepted, 1 - requested, 0 - no
      const status =
        user.followers && user.followers.includes(userInfo._id)
          ? 2
          : user.requests && user.requests.includes(userInfo._id)
          ? 1
          : 0;
      setRequestStatus(status);
    }
  }, [userInfo, user, fetchUser, history, match.params.username, dispatch]);

  if (!fetchUser && !match.params.username) user = userInfo;

  return (
    <Container>
      {loading && <Loader />}
      {error && <Message variant='danger'>{error}</Message>}
      {user ? (
        <>
          {user &&
            user.requested &&
            user.requested.includes(userInfo._id) &&
            acceptStatus === 0 && (
              <Row className='text-center'>
                <Message variant='info'>
                  <Col>
                    {`${user.name} has requested to follow you`}
                    <Button
                      className='ms-4 me-2'
                      variant='success'
                      onClick={() => {
                        dispatch(accept(user));
                        setAcceptStatus(1);
                      }}
                    >
                      Accept
                    </Button>
                    <Button
                      className='ml-2'
                      variant='danger'
                      onClick={() => {
                        dispatch(decline(user));
                        setAcceptStatus(0);
                      }}
                    >
                      Decline
                    </Button>
                  </Col>
                </Message>
              </Row>
            )}
          <Card bg='dark' text='white' className='my-3 p-3 rounded'>
            <Card.Body>
              <Container>
                <Row>
                  <Col md={3}>
                    <Container>
                      <Image
                        src={user.dp}
                        width='256px'
                        height='256px'
                        roundedCircle
                        className='mx-auto'
                      />
                      <Row className='my-2 text-center'>
                        <Link
                          to={`/profile/${user.username}`}
                          className='username'
                        >
                          {user.name}
                        </Link>
                      </Row>
                      <Row>
                        <small className='text-muted mb-1 text-center'>
                          {user.tagline}
                        </small>
                      </Row>
                    </Container>
                  </Col>
                  <Col className='offset-2 my-3 text-center' md={6}>
                    <Row className='my-5'>
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
                    <Row className='my-3 text-center'>
                      <Rating text={"Rating : "} value={user.rating} />
                    </Row>
                    {user._id === userInfo._id ? (
                      <>
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
                      </>
                    ) : requestStatus === 0 ? (
                      <Button
                        variant='info'
                        onClick={() => {
                          dispatch(request(user));
                          setRequestStatus(1);
                        }}
                      >
                        Request
                      </Button>
                    ) : requestStatus === 1 ? (
                      <Button
                        variant='outline-info'
                        onClick={() => {
                          dispatch(unrequest(user));
                          setRequestStatus(0);
                        }}
                      >
                        Un Request
                      </Button>
                    ) : (
                      <Button variant='light'>Following</Button>
                    )}
                    {/* <Row className='my-2'> */}
                    {/* <Button  */}
                    {/* // onClick={()=> setModalShow(true)}  */}
                    {/* size='sm' variant="danger">+ Add Post</Button> */}
                    {/* </Row> */}
                    <Container className='mt-4 pt-2'>
                      <Row xs='auto'>
                        <Col className='p-2 m-1 text-muted'>Skills : </Col>
                        {user.skills ? (
                          user.skills.map((skill, idx) => (
                            <Col
                              key={idx}
                              className='p-2 m-1 bg-light text-primary rounded-pill'
                            >
                              {skillsList[skill]}
                            </Col>
                          ))
                        ) : (
                          <p>Not yet Added</p>
                        )}
                      </Row>
                    </Container>
                  </Col>
                </Row>
                <Row xs='auto' className='px-4 mx-4 mt-4'>
                  <Col className='text-muted'>About : </Col>
                  {user.about}
                </Row>
              </Container>
            </Card.Body>
          </Card>
          <Row>
            <Col className='offset-2' md={8}>
              {(user.followers && user.followers.includes(userInfo._id)) ||
              user._id === userInfo._id ? (
                <Feeds posts={user.posts} />
              ) : (
                <Message variant='danger'>Private Account</Message>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <Message variant='danger'>Username Doesnot exsist</Message>
      )}
    </Container>
  );
};

export default ProfileScreen;
