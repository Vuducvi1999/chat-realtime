import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactEmoji from "react-emoji";

function Message({ user, text, isSelf }) {
  return isSelf ? (
    <div className="mt-3 d-flex align-items-center flex-row-reverse">
      <div className="text-break d-inline-block px-3 py-1 mx-2 alert-primary rounded text-body text-monospace">
        {ReactEmoji.emojify(text)}
      </div>
      <span
        className="text-black-50 small text-center"
        style={{ flexBasis: "28%" }}
      >
        {user}
      </span>
    </div>
  ) : user === "admin" ? (
    <div className="text-center d-flex">
      <hr className="flex-grow-1" />
      <span className="px-2 font-weight-lighter small align-self-center">
        {text}
      </span>
      <hr className="flex-grow-1" />
    </div>
  ) : (
    <div className="mt-3 d-flex align-items-center">
      <div className="text-break d-inline-block px-3 py-1 mx-2 alert-secondary rounded text-body text-monospace">
        {ReactEmoji.emojify(text)}
      </div>
      <span
        className="text-black-50 small text-center"
        style={{ flexBasis: "28%" }}
      >
        {user}
      </span>
    </div>
  );
}

export default Message;
