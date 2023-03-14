import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Image, Modal, Row } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import {
  createPostReview,
  deletePost,
  like,
  unlike,
} from "../actions/postActions";
import EditPostScreen from "../screens/EditPostScreen";

const Post = ({ post, profile }) => {
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likes.includes(profile._id));
  const [enableComment, setEnableComment] = useState(false);
  const [comment, setComment] = useState("");

  function UpdatePost(props) {
    return (
      <Modal
        {...props}
        size='lg'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            Edit Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPostScreen post={props.post} onHide={props.onHide} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const likeClickHandler = () => {
    if (isLiked) {
      dispatch(unlike(post));
      const idx = post.likes.indexOf(profile._id);
      if (idx > -1) post.likes.splice(idx, 1);
    } else {
      dispatch(like(post));
      post.likes.push(profile._id);
    }
    setIsLiked(!isLiked);
  };

  const commentHandler = (e) => {
    e.preventDefault();
    dispatch(createPostReview(post._id, { comment }));
    const name = profile.username;
    post.comments.push({ comment, name });
    setComment("");
  };

  return (
    <>
      <UpdatePost
        post={post}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <Card
        bg='dark'
        text='white'
        className='my-3 p-3 rounded'
        style={{ width: "50vw" }}
      >
        <Card.Header>
          <Row>
            <Col>
              <Image src={post.dp} width='48px' height='48px' roundedCircle />
            </Col>
            <Col>
              <Link
                to={`/profile/${post.username}`}
                className='username me-auto'
              >
                {post.username}
              </Link>
            </Col>
            <Col className='text-center'>
              {profile && profile.username === post.username && (
                <>
                  <Button
                    onClick={() => {
                      setModalShow(true);
                    }}
                    className='mx-auto py-1 px-2 me-2'
                    size='small'
                    variant='info'
                  >
                    <small>Edit</small>
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch(deletePost(post._id));
                    }}
                    className='mx-auto py-1 px-2'
                    size='small'
                    variant='danger'
                  >
                    <small>Delete</small>
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Card.Header>
        <Link to={`/post/${post._id}`}>
          <Card.Img
            src={post.image}
            variant='top'
            style={{
              width: "90%",
              marginLeft: "50%",
              transform: "translateX(-50%)",
            }}
          />
        </Link>
        <Card.Body>
          <Card.Title as='div'>
            <strong>{post.caption}</strong>
          </Card.Title>
          <Button variant='dark' onClick={likeClickHandler}>
            <Row>
              <i
                className={`${isLiked ? "like fas" : "far"} fa-heart fa-2x`}
              ></i>{" "}
            </Row>
            <Row className='my-1 mx-3'>{post.likes.length}</Row>
          </Button>
          <Button variant='dark' onClick={() => setEnableComment(true)}>
            <Row>
              <i className='far fa-comment fa-2x'></i>{" "}
            </Row>
            <Row className='my-1 mx-3'>{post.comments.length}</Row>
          </Button>
          <Button variant='dark'>
            <i className='fas fa-share fa-2x'></i>{" "}
          </Button>
        </Card.Body>
        {enableComment && (
          <Card.Footer>
            <Row>
              {post.comments.map((comment) => (
                <Row className='my-1 border border-secondary'>
                  <Link to={`/profile/${comment.name}`}>
                    <strong className='text-muted'>{comment.name}</strong>
                  </Link>
                  <p className='ms-3'>{comment.comment}</p>
                </Row>
              ))}
            </Row>
            <Row className='my-3 text-center'>
              <Col md={2} className='my-2'>
                Comment
              </Col>
              <Col md={6} className='my-2'>
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{ border: "none", width: "20vw" }}
                />
              </Col>
              <Col md={3}>
                <Button
                  className='ms-3'
                  size='sm'
                  variant='light'
                  onClick={(e) => commentHandler(e)}
                >
                  Comment
                </Button>
              </Col>
            </Row>
          </Card.Footer>
        )}
      </Card>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.userLogin.userInfo,
  };
};

export default connect(mapStateToProps)(Post);
