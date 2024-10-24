import React from "react";

const Toast = ({ message }) => {
  return (
    <div className="toast show position-fixed top-0 end-0 p-3 text-bg-success" role="alert">
      <div className="toast-body">{message}</div>
    </div>
  );
};

export default Toast;
