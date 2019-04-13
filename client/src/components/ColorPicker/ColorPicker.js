import React from "react";
import "./style.css";

function ColorPicker(props) {
  return (
    <div className="table-responsive" onClick={props.onChange}>
      <table className="table">
        <tbody>
          <tr>
            <td data-value="#FFF" style={{background: "#FFF" }}>White</td>
            <td data-value="#00FF00" style={{background: "#00FF00" }}>Green</td>
            <td data-value="#0000FF" style={{background: "#0000FF" }}>Blue</td>
            <td data-value="#FFFF00" style={{background: "#FFFF00" }}>Yellow</td>
            <td data-value="#00FFFF" style={{background: "#00FFFF" }}>Cyan</td>
          </tr>
          <tr>
            <td data-value="#FFF">White</td>
            <td data-value="#00FF00">Green</td>
            <td data-value="#0000FF">Blue</td>
            <td data-value="#FFFF00">Yellow</td>
            <td data-value="#00FFFF">Cyan</td>
          </tr>
        </tbody>
      </table>
    </div>
    // <div onChange={props.onChange}>
    //   <select>
    //     <option>Select a Color</option>
    //     <option value="#FFF">White</option>
    //     <option value="#00FF00">Green</option>
    //     <option value="#0000FF">Blue</option>
    //     <option value="#FFFF00">Yellow</option>
    //     <option value="#00FFFF">Cyan</option>
    //   </select>
    // </div>
  );
}

export default ColorPicker;