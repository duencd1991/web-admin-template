import React from "react";
import "./checkBox.scss";

const Checkbox = props => {

  return (
    <div className={props.disable ? "checkbox disable" : "checkbox"}>
      <input className="styled-checkbox" type="checkbox"
        checked={props.checked} id={`${props.id}-checkbox-${props.value}`}
        onChange={(e) => props.onChange(props.value, e.target.checked)} />
      <label htmlFor={`${props.id}-checkbox-${props.value}`}>{props.title} &nbsp;</label>
    </div>
  );
}

export default Checkbox;