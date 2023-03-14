import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./style.css";
import SingleChat from "./SingleChat";
// import { useAppContext } from "../context/ChatProvider";

const ChatBox = (props) => {
  const {
    fetchAgain,
    setFetchAgain,
    selectedChat,
    setSelectedChat,
    user,
    notifications,
    setNotifications,
  } = props;

  return (
    <Container
      className='d-flex'
      style={{
        alignItems: "center",
        flexDirection: "column",
        padding: "1rem",
        background: "white",
        width: "68%",
        height: "70vh",
        borderRadius: "1rem",
        border: "1px solid #dee2e6",
      }}
    >
      <SingleChat
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        notification={notifications}
        setNotification={setNotifications}
        user={user}
      />
    </Container>
  );
};

export default ChatBox;
