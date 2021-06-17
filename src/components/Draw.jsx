import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendDrawnNumbers } from "../store/async_actions/asyncAdminActions";
import { clearMessage } from "../store/actions/userActions";

const Draw = () => {
  const session = useSelector((state) => state.admin.session);
  const token = useSelector((state) => state.user.user.token);
  const response = useSelector((state) => state.user.message);
  const loading = useSelector((state) => state.user.loading);

  const dispatch = useDispatch();

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);
  const [num5, setNum5] = useState(0);
  const [num6, setNum6] = useState(0);
  const [num7, setNum7] = useState(0);

  const generateLuckyNumbers = () => {
    return new Promise((resolve) => {
      let count = 0;
      let numbers = [];

      while (count < 7) {
        let luckyNumber = Math.ceil(Math.random() * 37);
        if (numbers.indexOf(luckyNumber) === -1) {
          numbers.push(luckyNumber);
          count++;
        }
      }

      resolve(numbers.sort((a, b) => a - b));
    });
  };

  const displayNumbers = (numbers) => {
    return new Promise((resolve) => {
      const setters = [ setNum1, setNum2, setNum3, setNum4, setNum5, setNum6, setNum7 ];
      let index = 0;
      let timer = setInterval(() => {
        if (index < 7) {
          setters[index](numbers[index]);
          index++;
        } else {
          resolve(clearInterval(timer));
        }
      }, 900);
    });
  };

  const drawNumbers = async () => {
    let numbers = await generateLuckyNumbers();
    await displayNumbers(numbers);
    let data = {
      DrawId: "00000000-0000-0000-0000-000000000000",
      Date: new Date(),
      DrawnNumbers: numbers.join(", ").toString(),
      SessionId: "00000000-0000-0000-0000-000000000000",
    };
    dispatch(sendDrawnNumbers(token, data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  return (
    <div className="container-fluid">
      {!session ? (
        <h3 className="text-center" id="draw-title">
          THERE'S NO ACTIVE SESSION
        </h3>
      ) : null}
      <div className="row justify-content-center mt-5">
        <div className="num" key="num1">
          {num1}
        </div>
        <div className="num" key="num2">
          {num2}
        </div>
        <div className="num" key="num3">
          {num3}
        </div>
        <div className="num" key="num4">
          {num4}
        </div>
        <div className="num" key="num5">
          {num5}
        </div>
        <div className="num" key="num6">
          {num6}
        </div>
        <div className="num" key="num7">
          {num7}
        </div>
      </div>
      <br />
      <div className="text-center">
        <button
          id="draw-btn"
          type="button"
          className="btn btn-success submit"
          onClick={drawNumbers}
          disabled={
            Object.keys(session).length !== 0 &&
            session.constructor === Object
              ? false
              : true
          }
        >
          DRAW
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : null}
        </button>
        <br />
        <br />
        <div className="response text-center">{response}</div>
      </div>
    </div>
  );
};

export default Draw;
