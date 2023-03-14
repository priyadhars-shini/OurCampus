import React from "react";
import { Badge } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge pill variant='primary' className='m-1' onClick={handleFunction}>
      {user.username}
      {admin === user._id && <span> (Admin)</span>}
      <FaTimesCircle size={12} style={{ marginLeft: "5px" }} />
    </Badge>
  );
};

export default UserBadgeItem;
