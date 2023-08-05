import React, { Fragment, useEffect, useState } from "react";
import "./Register.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../actions/userAction";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, user, isAuthenticated } = useSelector(
    (state) => state.registerLoginUser
  );

  const [name, setName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [loginEmail, setLoginEmail] = useState("");

  const registerUser = () => {
    dispatch(register(name, registerEmail));
  };

  const loginUser = () => {
    dispatch(login(loginEmail));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  return (
    <Fragment>
      <div>
        <h2>Register</h2>
        <div>
          <div>
            <p>Name</p>
            <input
              className="border"
              required
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <p>Email</p>
            <input
              className="border"
              required
              type="text"
              placeholder="Enter your email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
          </div>
          <div>
            <button onClick={registerUser}>Register</button>
          </div>
        </div>
        <div>
          <h2> Login </h2>
          <div>
            <div>
              <p>Email</p>
              <input
                className="border"
                required
                type="text"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div>
              <button onClick={loginUser}>Register</button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
