import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [err, setErr] = useState("");
  const onSubmit = () => {
    console.log("submit");
  };

  return (
    <div className="container" style={{ marginTop: "20vh" }}>
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card my-5 bg-light">
            <div className="card-body">
              <h3 className="card-title text-center">Join In</h3>
              <div className="text-danger text-center">{err ? err : null}</div>
              <form className="form-signin" onSubmit={onSubmit}>
                <div className="form-label-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="User"
                    required
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                  />
                </div>

                <div className="form-label-group mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Room"
                    required
                    onChange={(e) => {
                      setRoom(e.target.value);
                    }}
                    value={room}
                  />
                </div>
                <Link
                  onClick={(e) => {
                    if (!name || !room) {
                      e.preventDefault();
                      setErr("Missing user or room!");
                    }
                  }}
                  to={`/chat?name=${name}&room=${room}`}
                >
                  <input
                    type="submit"
                    className="btn btn-primary btn-block text-uppercase mt-3"
                    value="submit"
                  />
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
