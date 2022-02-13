import React, { useState } from "react";
import "./style.css";
function FormInput({ input, onChange }) {
  const [focused, setFocused] = useState(false);
  const focusOn = (e) => setFocused(true);
  return (
    <div className="formInput">
    
      <input
        className="formInput__item"
        onChange={(e) => onChange(e)}
        {...input}
        onBlur={focusOn}
        onFocus={() => input.name === "cpassword" && setFocused(true)}
        focused={focused.toString()}
      />
      <span className="errorMsg">{input.errorMsg}</span>
    </div>
  );
}

export default FormInput;
