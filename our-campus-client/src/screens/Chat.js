import React, { useEffect, useState } from "react";
// import { useAppContext } from "../context/ChatProvider";
import { Col, Row, Container } from "react-bootstrap";
import { MyChats, ChatBox } from "../components/chat";
// import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { getUserFromLocalStorage } from "../components/utils/localStorage";
import { connect } from "react-redux";

const Chat = ({ user, loading }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [chats, setChats] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (!getUserFromLocalStorage()) {
      history.push("/signin");
    }
  }, [history]);

  return (
    <Container>
      <Row>
        <Col md={4}>
          {user && (
            <MyChats
              setChats={setChats}
              setSelectedChat={setSelectedChat}
              selectedChat={selectedChat}
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              chats={chats}
            />
          )}
        </Col>
        <Col md={8}>
          {user && (
            <ChatBox
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              notifications={notifications}
              setNotifications={setNotifications}
              user={user}
            />
          )}
        </Col>
      </Row>
      {/* <ToastContainer /> */}
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userLogin.userInfo,
    loading: state.userLogin.loading,
  };
};

export default connect(mapStateToProps)(Chat);
