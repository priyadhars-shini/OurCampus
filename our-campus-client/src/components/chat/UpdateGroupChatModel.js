import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Image,
  Spinner,
  Container,
} from "react-bootstrap";
import api from "../utils/axios";
// import toast from "react-toastify";
import { useDisclosure } from "reakit/Disclosure";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";

const UpdateGroupChatModel = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user } = {};

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      // toast.error("Only Admin Have Permission To Remove User");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.patch(`/api/v1/chat/removeFromGroup`, {
        chatId: selectedChat._id,
        userId: user1._id,
      });

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      // toast.error(error);
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
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

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);

      const { data } = await api.patch(`/api/v1/chat/renameGroup`, {
        chatId: selectedChat._id,
        chatName: groupChatName,
      });

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      // toast.error(error);
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      // toast.error("User Already In Group");
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      // toast.error("Ony Admin Can Add Users");
      return;
    }

    try {
      setLoading(true);

      const { data } = await api.patch(`/api/v1/chat/addUserToGroup`, {
        chatId: selectedChat._id,
        userId: user1._id,
      });

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      // toast.error(error);
      setLoading(false);
    }
    setGroupChatName("");
  };

  return (
    <>
      <Button onClick={onOpen}>
        <Image icon='fa-bell' />
      </Button>

      <Modal show={isOpen} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedChat.chatName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {selectedChat.users.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                admin={selectedChat.groupAdmin}
                handleFunction={() => handleRemove(u)}
              />
            ))}
          </Container>
          <Form>
            <Form.Group controlId='formBasicEmail'>
              <Form.Control
                type='text'
                placeholder='Chat Name'
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' onClick={handleRename}>
              Update
            </Button>
          </Form>
          <Form>
            <Form.Group controlId='formBasicEmail'>
              <Form.Control
                type='text'
                placeholder='Add User to group'
                onChange={(e) => handleSearch(e.target.value)}
              />
            </Form.Group>
          </Form>

          {loading ? (
            <Spinner animation='border' role='status' />
          ) : (
            searchResult &&
            searchResult.map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleAddUser(user)}
              />
            ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='danger' onClick={() => handleRemove(user)}>
            Leave Group
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModel;
