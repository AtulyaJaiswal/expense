import React, { Fragment, useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { settingData } from "../../actions/userAction";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state) => state.registerLoginUser);

  // const {
  //   loading: updateLoading,
  //   message,
  //   error,
  // } = useSelector((state) => state.updateData);

  const [newFileName, setNewFileName] = useState("");

  const openParticularFile = (i) => {
    navigate(`/home/:${user.expenseData[i]._id}`, {
      state: user.expenseData[i],
    });
  };
  const createNewFile = () => {
    dispatch(settingData(newFileName, []));
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div>
            <h2>Home</h2>
            <p>{user && user.name}</p>
            <p>{user && user.email}</p>

            <div>
              <input
                onChange={(e) => setNewFileName(e.target.value)}
                value={newFileName}
                type="text"
                required
              />
              <button onClick={createNewFile}>Add File</button>
            </div>

            {user &&
              user.expenseData &&
              user.expenseData.map((expense, i) => (
                <div key={i}>
                  <div onClick={(e) => openParticularFile(i)}>
                    {expense.fileName}
                  </div>
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
