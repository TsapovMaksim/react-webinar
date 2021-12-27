import React from "react";
import { cn } from "@bem-react/classname";
import propTypes from "prop-types";

import "./styles.css";

const Textarea = (props) => {
  const className = cn("Textarea");

  return (
    <textarea
      className={className()}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};

Textarea.propTypes = {
  value: propTypes.string,
  onChange: propTypes.func,
};

Textarea.defaultProps = {
  value: "",
  onChange: () => {},
};

export default React.memo(Textarea);
