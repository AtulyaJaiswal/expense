import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { clearMessages, settingData } from "../../actions/userAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

const HomeDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();

  const {
    loading: updateLoading,
    message,
    error,
  } = useSelector((state) => state.updateData);

  const [gettingData, setGettingData] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [fileName, setFileName] = useState(state.fileName);

  const findTotal = () => {
    var tot = 0;
    for (let i = 0; i < gettingData.length; i++) {
      tot += Number(gettingData[i].amount);
    }
    setTotalSum(tot);
  };

  useEffect(() => {
    var tempData = [];
    for (let i = 0; i < state.data.length; i++) {
      tempData.push({
        amount: state.data[i].amount,
        date: state.data[i].date,
        expenseType: state.data[i].expenseType,
      });
    }
    setGettingData(tempData);
  }, []);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessages());
      navigate("/home");
    }
    if (error) {
      toast.error(error);
      dispatch(clearMessages());
    }
  }, [message, error]);

  const addInput = () => {
    setGettingData((s) => {
      return [
        ...s,
        {
          amount: "",
          date: "",
          expenseType: "",
        },
      ];
    });
  };
  const removeInput = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setGettingData((s) => {
      let newArr = [...s];
      newArr.splice(index, 1);
      return newArr;
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    var newArr = gettingData.slice();
    if (e.target.name === "amount") {
      newArr[index] = {
        ...newArr[index],
        [e.target.name]: Number(e.target.value),
      };
    } else {
      newArr[index] = { ...newArr[index], [e.target.name]: e.target.value };
    }
    setGettingData(newArr);
  };

  const updateData = () => {
    dispatch(settingData(fileName, gettingData));
  };

  return (
    <Fragment>
      {updateLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <div>
            <h2>{fileName}</h2>

            <div>
              <input
                onChange={(e) => setFileName(e.target.value)}
                value={fileName}
                type="text"
                required
              />
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </div>

            <div className="entry">
              <div className="address" id="label_input">
                {gettingData.map((item, i) => {
                  return (
                    <div>
                      <input
                        onChange={handleChange}
                        value={item.date}
                        id={i}
                        name="date"
                        type="text"
                        size="40"
                        required
                      />
                      <input
                        onChange={handleChange}
                        value={item.expenseType}
                        id={i}
                        name="expenseType"
                        type="text"
                        size="40"
                        required
                      />
                      <input
                        onChange={handleChange}
                        value={item.amount}
                        id={i}
                        name="amount"
                        type="number"
                        size="40"
                        required
                      />
                      <button id={i} onClick={removeInput}>
                        Remove
                      </button>
                    </div>
                  );
                })}

                <button onClick={addInput}>Add another field</button>
              </div>
            </div>
            <div>
              <button onClick={findTotal}>Total</button> {totalSum}
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div>
              <button onClick={updateData}>Update</button>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomeDetails;
