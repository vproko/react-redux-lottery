import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../store/actions/userActions";
import { addPrize, getPrizes, updatePrize, deletePrize } from "../store/async_actions/asyncAdminActions";

import Prize from "./Prize";

const Prizes = () => {
  const token = useSelector((state) => state.user.user.token);
  const prizes = useSelector((state) => state.admin.prizes);
  const loading = useSelector((state) => state.user.loading);
  const dispatch = useDispatch();
  const [create, setCreate] = useState(true);
  const [update, setUpdate] = useState(false);
  const [prizeId, setPrizeId] = useState("");
  const [name, setName] = useState("");
  const [numberOfHits, setNumberOfHits] = useState(1);

  const editPrize = (prize) => {
    setCreate(false);
    setUpdate(true);
    setPrizeId(prize.prizeId);
    setName(prize.name);
    setNumberOfHits(prize.numberOfHits);
  };

  const handleNameChange = (name) => {
    if(name.length === 0) {
      setCreate(true);
      setUpdate(false);
    }
    setName(name)
  }

  const updateThePrize = () => {
    dispatch(updatePrize(token, { prizeId, name, numberOfHits }));
    resetForm();
  };

  const removePrize = (prizeId) => {
    dispatch(deletePrize(token, prizeId));
  };

  const createPrize = () => {
    dispatch(
      addPrize(token, {
        prizeId: "00000000-0000-0000-0000-000000000000",
        name,
        numberOfHits,
      })
    );
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setNumberOfHits(1);
  };

  useEffect(() => {
    dispatch(getPrizes(token));
  }, [dispatch, token]);

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  return (
    <div className="mx-auto col-xs-12 col-sm-12 col-md-9 col-lg-8 col-xl-6 text-center">
      <table className="table prizes caption-top">
        <caption>PRIZES</caption>
        <thead className="table-head">
          <tr>
            <th>NAME</th>
            <th>NUMBER OF HITS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {prizes ? (
            prizes.map((prize) => (
              <Prize
                key={prize.prizeId}
                prize={prize}
                removePrize={removePrize}
                editPrize={editPrize}
              />
            ))
          ) : (
            <tr>
              <td className="align-middle" colSpan="4" id="users-info">
                THERE'RE NO PRIZES
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <form id="prize-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            NAME
          </label>
          <input
            type="text"
            className="form-control"
            id="prize-name"
            value={name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="number-of-hits" className="form-label">
            NUMBER OF HITS
          </label>
          <input
            type="number"
            className="form-control"
            id="number-of-hits"
            value={numberOfHits}
            onChange={(e) => setNumberOfHits(e.target.value)}
          />
        </div>
        <br />
        <button
          type="button"
          className="btn btn-danger reset me-2"
          id="reset"
          onClick={resetForm}
        >
          CANCEL
        </button>
        {create ? (
          <button
            type="button"
            className="btn btn-success submit"
            onClick={createPrize}
          >
            CREATE
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : null}
          </button>
        ) : null}
        {update ? (
          <button
            type="button"
            className="btn btn-success submit"
            onClick={updateThePrize}
          >
            UPDATE
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : null}
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default Prizes;
