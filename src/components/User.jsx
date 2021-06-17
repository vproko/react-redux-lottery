import React from "react";

const User = ({
  user: { userId, username, firstName, lastName, joined, email, tickets },
  deleteUser,
}) => {
  return (
    <tr className="align-middle">
      <td className="align-middle">{userId}</td>
      <td className="align-middle">{username}</td>
      <td className="align-middle">{firstName}</td>
      <td className="align-middle">{lastName}</td>
      <td className="align-middle">{joined}</td>
      <td className="align-middle">{email}</td>
      <td className="align-middle">{tickets.length}</td>
      <td className="align-middle" id="trash-icon">
        <i
          onClick={() => deleteUser(userId)}
          className="fas fa-trash fa-lg"
          id="user-trash-icon"
        ></i>
      </td>
    </tr>
  );
};

export default User;
