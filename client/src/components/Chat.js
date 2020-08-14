import React, { useEffect, useState, useRef, useCallback } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Message from "./Message";

const endpoint = "https://vuducvi-server-chat-app-v1.herokuapp.com/";
const socket = io(endpoint);

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  //scroll bottom
  const ref = useRef(null);

  // Join room
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room });
    console.log(socket.id);

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, []);
  // Gửi message
  useEffect(() => {
    socket.on("message", ({ user, text }) => {
      // nguyên tắc unmutable của State
      setMessages([...messages, { user, text }]);
    });
  }, [messages]);
  // Hiện thị online user
  useEffect(() => {
    socket.on("online", (data) => {
      setUsers(data);
    });
  }, [users]);

  const sendMess = useCallback((e) => {
    e.preventDefault();
    socket.emit("sendMessage", text);
    setText("");
    const scroll = ref.current.scrollHeight - ref.current.clientHeight;
    console.log("ref.current.scrollHeight", ref.current.scrollHeight);
    console.log("ref.current.clientHeight", ref.current.clientHeight);
    ref.current.scrollTo(0, scroll);
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-8 mx-auto">
          <div
            className="card shadow"
            style={{ marginTop: "5vh", height: "90vh" }}
          >
            <div className="card-header h5 text-center">{room} </div>
            <div className="card-body row no-gutters p-0">
              <div className="col-3 border-right">
                <ul className="list-group list-group-flush">
                  {users.map((item, i) => (
                    <li key={i} className="list-group-item p-2">
                      <span
                        className="rounded-pill bg-success d-inline-block mr-1 align-middle"
                        style={{
                          width: ".4em",
                          height: ".4em",
                        }}
                      ></span>
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-9 scroll" ref={ref}>
                {messages.map((item, i) => (
                  <Message
                    key={i}
                    user={item.user}
                    text={item.text}
                    isSelf={item.user === name}
                  />
                ))}
              </div>
            </div>
            <div className="card-footer" style={{ padding: "0", margin: "0" }}>
              <form onSubmit={(e) => sendMess(e)}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                    style={{ border: "none", boxShadow: "none" }}
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                    value={text}
                  />
                  <div className="input-group-append">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ borderTopRightRadius: "0", boxShadow: "none" }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Chat);
