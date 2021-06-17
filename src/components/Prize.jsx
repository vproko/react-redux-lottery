import React from "react";

const Prize = ({ prize, removePrize, editPrize }) => {
  return (
    <tr>
      <td className="align-middle">{prize.name}</td>
      <td className="align-middle">{prize.numberOfHits}</td>
      <td className="align-middle" id="trash-icon">
        <i
          className="fas fa-trash fa-lg"
          onClick={() => removePrize(prize.prizeId)}
        ></i>
        &nbsp;&nbsp;&nbsp;
        <i className="fas fa-pen fa-lg" onClick={() => editPrize(prize)}></i>
      </td>
    </tr>
  );
};

export default Prize;
