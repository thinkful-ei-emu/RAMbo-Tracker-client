import React from "react";
import "./ValidationError.css";

export default function ValidationError(props) {
  if (props.message) {
    return <div className="ValidationError">{props.message}</div>;
  }

  return <></>;
}
