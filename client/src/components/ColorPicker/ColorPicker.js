import React from "react";
import colorPalette from "../../utils/colorPalette";
import "./style.css";

function ColorPicker(props) {
  let colorArray = Object.entries(colorPalette);

  const groupSize = 5;

  const groups = colorArray
    .map((item, index) => {
      return index % groupSize === 0
        ? colorArray.slice(index, index + groupSize)
        : null;
    })
    .filter(item => item);

  let body = groups.map(row => {
    const colors = row.map(item => {
      console.log(item);
      return (
        <td
          key={item[0]}
          data-value={item[0]}
          style={{ background: `rgba(${item[0]})`, padding: "4px" }}
        >
          {item[1]}
        </td>
      );
    });

    return <tr>{colors}</tr>;
  });

  return (
    <div className="table-responsive" onClick={props.onChange}>
      <table className="table mt-3">
        <tbody>{body}</tbody>
      </table>
    </div>
  );
}

export default ColorPicker;
