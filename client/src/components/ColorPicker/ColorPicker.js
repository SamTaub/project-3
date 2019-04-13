import React from "react";
import colorPalette from "../../utils/colorPalette";
import "./style.css";

function ColorPicker(props) {
  let colorArray = Object.entries(colorPalette);
  let table = [];

  for (let i = 0; i < colorArray.length; i++) {
    console.log(colorArray[i]);
    if ((i + 1) % 5 === 0) {
      table.push(
        <tr>
          <td
            data-value={colorArray[i][0]}
            style={{ background: `${colorArray[i][0]}`, width: "5px" }}
          >
            {colorArray[i][1]}
          </td>
        </tr>
      );
    } else {
      table.push(
        <td
          data-value={colorArray[i][0]}
          style={{ background: `${colorArray[i][0]}` }}
        >
          {colorArray[i][1]}
        </td>
      );
    }
  }

  return (
    <div className="table-responsive" onClick={props.onChange}>
      <table className="table">
        <tbody>{table}</tbody>
      </table>
    </div>
  );
}

export default ColorPicker;
