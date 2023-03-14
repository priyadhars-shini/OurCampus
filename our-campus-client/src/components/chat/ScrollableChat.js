import {
  Col,
  Container,
  Image,
  ListGroup,
  Row,
  Tooltip,
} from "react-bootstrap";
import React, { useRef, useEffect } from "react";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/chat";
import { connect } from "react-redux";
// import { useAppContext } from "../context/ChatProvider";

const ScrollableChat = ({ messages, user }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current &&
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Image
                src={m.sender.dp}
                width='20px'
                height='20px'
                roundedCircle
              />
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "50vw",
              }}
            >
              {m.message}
            </span>
          </div>
        ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

// const ScrollableChat = ({ messages, user }) => (
//   <Container>
//     <Row>
//       <Col>
//         <ListGroup style={{ overflow: "auto", maxHeight: "50vh" }}>
//           {messages.map((message, index) => (
//             <ListGroup.Item key={index}>{message.message}</ListGroup.Item>
//           ))}
//         </ListGroup>
//       </Col>
//     </Row>
//   </Container>
// );

const mapStateToProps = (state) => {
  return {
    user: state.userLogin.userInfo,
    loading: state.userLogin.loading,
  };
};

export default connect(mapStateToProps)(ScrollableChat);
