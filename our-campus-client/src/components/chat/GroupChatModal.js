import React, { useState } from "react";
import { Modal, Button, FormControl, Toast } from "react-bootstrap";
import api from "../utils/axios";
// import { useAppContext } from "../context/ChatProvider";
import UserBadgeItem from "./UserBadgeItem";
import UserListItem from "./UserListItem";
import { useDisclosure } from "reakit/Disclosure";

const GroupChatModal = ({ children }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { chats, setChats } = {};

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
      Toast.error(error);
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      Toast.error("User Already Added!");
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      Toast.error("Please Fill Up All The Fields");
      return;
    }

    try {
      const { data } = await api.post(`/api/v1/chat/createGroup`, {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      });
      setChats([data, ...chats]);
      setIsOpen(false);
      Toast.success("SuccessFully Created New Group");
    } catch (error) {
      Toast.error("Failed To Create Group");
    }
  };

  return (
    <>
      <span onClick={() => {}}>{children}</span>

      <Modal show={isOpen} onHide={() => {}} centered>
        <Modal.Header>
          <Modal.Title style={{ fontSize: "35px", fontFamily: "Poppins" }}>
            Create Group Chat
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormControl>
            <FormControl.Input
              type='text'
              placeholder='Group Name'
              onChange={(e) => setGroupChatName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Input
              type='text'
              placeholder='Add Users:'
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {selectedUsers.map((u) => (
              <UserBadgeItem
                key={u._id}
                user={u}
                handleFunction={() => handleDelete(u)}
              />
            ))}
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            searchResult &&
            searchResult
              .slice(0, 4)
              .map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleSubmit}>
            Create Chat
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GroupChatModal;
