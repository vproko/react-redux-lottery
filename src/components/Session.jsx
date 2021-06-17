import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../store/actions/userActions";
import { endSession, startSession } from "../store/async_actions/asyncAdminActions";

const Session = () => {
  const token = useSelector((state) => state.user.user.token);
  const session = useSelector((state) => state.admin.session);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();

  const beginSession = () => {
    dispatch(startSession(token));
  };

  const stopSession = () => {
    dispatch(endSession(token, session.sessionId));
  };

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  return (
    <div className="mx-auto col-10 col-sm-10 col-md-10 col-lg-10 text-center mt-5">
      <table className="table caption-top">
        <caption>SESSION INFO</caption>
        <thead className="table-head">
          <tr>
            <th>SESSION ID</th>
            <th>START DATE</th>
            <th>END DATE</th>
            <th>TICKETS</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(session).length !== 0 &&
          session.constructor === Object ? (
            <tr>
              <td className="align-middle">{session.sessionId}</td>
              <td className="align-middle">
                {session.startDate
                  ? session.startDate.replace(/-/g, "/").slice(0, 10)
                  : null}
              </td>
              <td className="align-middle">
                {session.endDate
                  ? session.endDate.replace(/-/g, "/").slice(0, 10)
                  : null}
              </td>
              <td className="align-middle">
                {session.tickets ? session.tickets.length : null}
              </td>
            </tr>
          ) : (
            <tr>
              <td className="align-middle" colSpan="4" id="session-info">
                "THERE'S NO ACTIVE SESSION AT THE MOMENT"
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      {Object.keys(session).length !== 0 && session.constructor === Object ? (
        <button
          id="end-session"
          className="btn btn-danger reset"
          onClick={stopSession}
        >
          END SESSION
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </button>
      ) : (
        <button
          id="start-session"
          className="btn btn-success submit"
          onClick={beginSession}
        >
          START SESSION
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
        </button>
      )}
    </div>
  );
};

export default Session;
