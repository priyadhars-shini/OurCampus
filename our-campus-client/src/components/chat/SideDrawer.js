// import React, { useState } from "react";
// // import { Button } from "@chakra-ui/react";
// // import { useDisclosure } from "@chakra-ui/react";
// // import {
// //   Dropdown,
// //   Form,
// //   FormControl,
// //   Modal,
// //   Nav,
// //   Navbar,
// // } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
// import api from "../utils/axios";
// import { FiSearch } from "react-icons/fi";

// import { toast } from "react-toastify";
// import ChatLoading from "./ChatLoading";
// import UserListItem from "./UserListItem";
// // import { useAppContext } from "../context/ChatProvider";
// import ProfileModal from "./ProfileModal";
// import { removeUserFromLocalStorage } from "../utils/localStorage";
// import { getSender } from "../../config/chat";

import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { useDisclosure } from "reakit/Disclosure";
import {
  FormControl,
  Navbar,
  Nav,
  Dropdown,
  Modal,
  Form,
  Spinner,
} from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import api from "../utils/axios";
// import toast from "react-toastify";
import ChatLoading from "./ChatLoading";
import UserListItem from "./UserListItem";
// import { useAppContext } from "../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { removeUserFromLocalStorage } from "../utils/localStorage";
import { getSender } from "../../config/chat";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const navigate = useHistory();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = {};

  const logoutHandler = () => {
    removeUserFromLocalStorage("user");
    navigate.push("/register");
  };

  const handleSearch = async () => {
    if (!search) {
      // toast.error("Please Provide username");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.get(`/api/v1/auth/users?search=${search}`);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      // toast.error(error);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const { data } = await api.post(`/api/v1/chat`, { userId });

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      // toast.error(error);
    }
  };

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand>Chatify</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Nav.Link onClick={onOpen}>
              <FiSearch /> Search User
            </Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant='secondary'>
                {notification && notification.length > 0 && <Image />}
                <Image name={user.name} src={user.avatar} rounded={true} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>My Profile</Dropdown.Item>
                <ProfileModal user={user} />
                <Dropdown.Divider />
                {notification &&
                  notification.map((noti) => (
                    <Dropdown.Item
                      key={noti._id}
                      onClick={() => {
                        setSelectedChat(noti.chat);
                        setNotification(notification.filter((n) => n !== noti));
                      }}
                    >
                      {noti && noti.chat && noti.chat.isGroupChat
                        ? `New Message in ${noti.chat.chatName}`
                        : `New Message from ${getSender(
                            user,
                            noti.chat.users
                          )}`}
                    </Dropdown.Item>
                  ))}
                <Dropdown.Divider />
                <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={isOpen} onHide={onClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Search Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form inline>
            <FormControl
              type='text'
              placeholder='Search by name or email'
              className='mr-sm-2'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant='outline-success' onClick={handleSearch}>
              Go
            </Button>
          </Form>
          {loading ? (
            <Spinner animation='border' role='status'>
              <span className='sr-only'>Loading...</span>
            </Spinner>
          ) : (
            searchResult &&
            searchResult.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
              />
            ))
          )}
          {loadingChat && <Spinner className='d-flex justify-content-center' />}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SideDrawer;
