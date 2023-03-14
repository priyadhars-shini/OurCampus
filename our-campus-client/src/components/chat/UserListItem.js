import React from "react";
import { ListGroup, ListGroupItem, Image, Badge } from "react-bootstrap";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <ListGroup.Item
      action
      onClick={handleFunction}
      variant='info'
      style={{
        cursor: "pointer",
        borderRadius: "5px",
      }}
      className='d-flex align-items-center'
    >
      <Image
        style={{ maxWidth: "10vw", maxHeight: "10vh", paddingRight: "10px" }}
        className='mr-3'
        size='sm'
        src={user.dp}
        name={user.username}
        roundedCircle
      />
      <div>
        <Badge variant='secondary'>{user.username}</Badge>
        <br />
        <small>
          <b>Name: </b>
          {user.name}
        </small>
      </div>
    </ListGroup.Item>
  );
};

export default UserListItem;
