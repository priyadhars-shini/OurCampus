import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import api from "../utils/axios";
import { Spinner } from "react-bootstrap";
// import { useAppContext } from "../context/ChatProvider";
import ScrollableChat from "./ScrollableChat";
import UpdateGroupChatModel from "./UpdateGroupChatModel";
import ProfileModal from "./ProfileModal";
import { getSender, getSenderFull } from "../../config/chat";

let socket, selectedChatCompare;

const SingleChat = (props) => {
  const {
    fetchAgain,
    setFetchAgain,
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
  } = props;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);

      const { data } = await api.get(`/api/v1/message/${selectedChat._id}`);

      setMessages(data);
      setLoading(false);
      socket.emit("join-chat", selectedChat._id);
    } catch (error) {
      // toast.error(error);
    }
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop-typing", selectedChat._id);
      try {
        const { data } = await api.post(`/api/v1/message/`, {
          message: newMessage,
          chatId: selectedChat._id,
        });

        setNewMessage("");
        socket.emit("new-message", data);
        setMessages([...messages, data]);
      } catch (error) {
        // toast.error(error);
      }
    }
  };

  useEffect(() => {
    socket = io(process.env.REACT_APP_SOCKET_ENDPOINT);
    socket.emit("setup", user);

    socket.on("connected", () => setSocketConnected(true));

    socket.on("typing", () => setIsTyping(true));
    socket.on("stop-typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    fetchMessages();

    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message-received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // notification
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop-typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: "3px",
              paddingLeft: "2px",
              width: "100%",
              fontSize: window.innerWidth >= 768 ? "30px" : "28px",
              fontFamily: "Poppins",
            }}
          >
            <button
              style={{ display: window.innerWidth >= 768 ? "none" : "flex" }}
              onClick={() => setSelectedChat("")}
            >
              <FaArrowLeft />
            </button>
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "3px",
              backgroundColor: "#E8E8E8",
              width: "100%",
              height: "100%",
              borderRadius: "lg",
              overflowY: "hidden",
            }}
          >
            {loading ? (
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  margin: "auto",
                  alignSelf: "center",
                }}
              >
                <Spinner size='xl' />
              </div>
            ) : (
              <div
                className='message'
                style={{
                  overflow: "auto",
                  height: "60vh",
                }}
              >
                <ScrollableChat messages={messages} />
              </div>
            )}
            <div style={{ height: "15%", marginTop: "3px" }}>
              {isTyping ? <div>Typing ...</div> : <></>}
              <input
                style={{
                  backgroundColor: "#E0E0E0",
                  padding: "10px",
                  borderRadius: "5px",
                  width: "100%",
                  fontSize: "16px",
                }}
                type='text'
                placeholder='Enter a message..'
                value={newMessage}
                onChange={typingHandler}
                onKeyDown={sendMessage}
                required
              />
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              fontSize: "3xl",
              paddingBottom: "3px",
              fontFamily: "Poppins",
            }}
          >
            Click On Users to Start Conversation
          </div>
        </div>
      )}
    </>
  );
};

export default SingleChat;
