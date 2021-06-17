import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage, setMessage } from "../store/actions/userActions";
import { checkNumbers } from "../store/async_actions/asyncUserActions";

const Home = () => {
  const response = useSelector((state) => state.user.message);
  const dispatch = useDispatch();

  const [num1, setNum1] = useState(1);
  const [num2, setNum2] = useState(2);
  const [num3, setNum3] = useState(3);
  const [num4, setNum4] = useState(4);
  const [num5, setNum5] = useState(5);
  const [num6, setNum6] = useState(6);
  const [num7, setNum7] = useState(7);

  const valueController = (number) => {
    let value = parseInt(number.length < 2 ? number : number.slice(0, 2));
    if (parseInt(value) < 1 || String(value) === "NaN") value = 1;
    if (parseInt(value) > 37) value = 37;
    return value;
  };

  const hasDuplicates = () => {
    return new Promise((resolve) => {
      const inputs = document.querySelectorAll("input");
      const values = [];
      let check;
      for (const input of inputs) {
        values.push(parseInt(input.value));
      }
      if ([...new Set(values)].length < 7) check = true;
      resolve(check);
    });
  };

  const check = async(e) => {
    e.preventDefault();
    const check = await hasDuplicates();
    if(check) return dispatch(setMessage("Remove duplicates"));
    dispatch(checkNumbers(
      [num1, num2, num3, num4, num5, num6, num7]
        .sort((a, b) => a - b)
        .join(", ")
    ));
  };

  useEffect(() => {
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  return (
    <div className="container-fluid text-center">
      <h3 id="title">
        WELCOME TO LO<sub>TT</sub>ERY
      </h3>
      <form id="check-numbers">
        <input
          className="form-control"
          type="number"
          name="num1"
          id="num1"
          value={num1}
          onChange={(event) => setNum1(valueController(event.target.value))}
        />
        <input
          className="form-control"
          type="number"
          name="num2"
          id="num2"
          value={num2}
          onChange={(event) => setNum2(valueController(event.target.value))}
        />
        <input
          className="form-control"
          type="number"
          name="num3"
          id="num3"
          value={num3}
          onChange={(event) => setNum3(valueController(event.target.value))}
        />
        <input
          className="form-control"
          type="number"
          name="num4"
          id="num4"
          value={num4}
          onChange={(event) => setNum4(valueController(event.target.value))}
        />
        <input
          className="form-control"
          type="number"
          name="num5"
          id="num5"
          value={num5}
          onChange={(event) => setNum5(valueController(event.target.value))}
        />
        <input
          className="form-control"
          type="number"
          name="num6"
          id="num6"
          value={num6}
          onChange={(event) => setNum6(valueController(event.target.value))}
        />
        <input
          className="form-control"
          type="number"
          name="num7"
          id="num7"
          value={num7}
          onChange={(event) => setNum7(valueController(event.target.value))}
        />
        <br />
        <button
          type="submit"
          className="btn btn-success submit mt-5"
          onClick={check}
        >
          CHECK
        </button>
        <br />
        <br />
        <div className="response">{response}</div>
      </form>
    </div>
  );
};

export default Home;
