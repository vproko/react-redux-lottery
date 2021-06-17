import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../store/actions/userActions";
import { deleteUserById, usersPerPage } from "../store/async_actions/asyncAdminActions";

import User from "./User";
import Pagination from "./Pagination";

const Users = () => {
  const users = useSelector((state) => state.admin.users.users);
  const numberOfUsers = useSelector((state) => state.admin.users.totalCountOfUsers);
  const token = useSelector((state) => state.user.user.token);
  const response = useSelector((state) => state.user.message);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(5);
  const [index, setIndex] = useState(1);
  const [dropDownBtn, setDropDownBtn] = useState("USERS PER PAGE: 5");
  const [identify, setIdentify] = useState("");
  const pages = Math.ceil(numberOfUsers / pageSize);

  const returnToSamePage = () => {
    return new Promise((resolve) => {
      const pagesAfterDeletedUser = Math.ceil((numberOfUsers - 1) / pageSize);
      pagesAfterDeletedUser >= index
        ? resolve(index)
        : pagesAfterDeletedUser < 1
        ? resolve(1)
        : resolve(pagesAfterDeletedUser);
    });
  };

  const deleteUser = async (userId) => {
    const returnToPage = await returnToSamePage();
    dispatch(deleteUserById(token, userId, returnToPage, pageSize));
  };

  const setUserPerPageSize = (size) => {
    if (size === pageSize) return;
    setDropDownBtn(`USERS PER PAGE: ${size}`);
    dispatch(usersPerPage(token, 1, size));
    setIndex(1);
    setPageSize(size);
    setIdentify("page-first");
  };

  const getUsers = (e) => {
    if (e.target.value === index) return;
    dispatch(usersPerPage(token, e.target.value, pageSize));
    setIndex(e.target.value);
    setIdentify(e.target.id);
  };

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="mx-auto col-12 col-sm-12 col-md-12 col-lg-12 text-center">
        <div className="btn-group edit-menu">
          <button
            type="button"
            className="btn dropdown-toggle reset mt-3"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {dropDownBtn}
          </button>
          <ul className="dropdown-menu dropdown-menu-end">
            <li
              className="dropdown-item"
              value="5"
              onClick={(e) => setUserPerPageSize(e.target.value)}
            >
              5
            </li>
            <li
              className="dropdown-item"
              value="7"
              onClick={(e) => setUserPerPageSize(e.target.value)}
            >
              7
            </li>
            <li
              className="dropdown-item"
              value="10"
              onClick={(e) => setUserPerPageSize(e.target.value)}
            >
              10
            </li>
          </ul>
        </div>
        <table className="table caption-top users">
          <caption>USERS LIST</caption>
          <thead className="table-head">
            <tr>
              <th>USER ID</th>
              <th>USERNAME</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>JOINED</th>
              <th>EMAIL</th>
              <th>TICKETS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users ? (
              users.map((user) => {
                return (
                  <User key={user.userId} user={user} deleteUser={deleteUser} />
                );
              })
            ) : (
              <tr>
                <td colSpan="8">There are no users.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="response text-center">{response}</div>
      <br />
      {pages > 1 && (
        <Pagination
          pages={pages}
          index={index}
          getUsers={getUsers}
          identify={identify}
        />
      )}
      {loading && (
        <div className="text-center">
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
