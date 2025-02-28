import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  appendValue,
  clearLast,
  clearAll,
  evaluateExpression,
} from "../Slice/slice";
import myValues from "./values";
import "../style/style.css";

const Calculator = () => {
  const dispatch = useDispatch(); //trigger actions
  const input = useSelector((state) => state.calculator.input); //read data from the redux store

  const handleButtonClick = (value) => {
    if (value === "C") {
      dispatch(clearLast());
    } else if (value === "AC") {
      dispatch(clearAll());
    } else if (value === "=") {
      dispatch(evaluateExpression());
    } else {
      dispatch(appendValue(value));
    }
  };

  return (
    <>
      <div>
        <h1 className="simple">Simple Calculator</h1>
      </div>

      <div className="container">
        <div className="mainBody">
          <form className="opCont">
            <input type="text" className="inputContz" value={input} readOnly />
          </form>
          <div className="calc">
            {Array.from({ length: 5 }, (_, rowIndex) => (
              <div className="buttons" key={rowIndex}>
                {myValues
                  .slice(rowIndex * 4, rowIndex * 4 + 4)
                  .map((value, index) => (
                    <button
                      className="btnList"
                      key={index}
                      onClick={() => handleButtonClick(value)}
                    >
                      {value}
                    </button>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculator;
