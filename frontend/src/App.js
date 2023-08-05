import { Fragment, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "./Store";
import { loadUser } from "./actions/userAction";
import Register from "../src/Component/RegisterLogin/Register";
import Home from "../src/Component/Home/Home";
import HomeDetails from "../src/Component/Home/HomeDetails";
import NotFound from "../src/Component/NotFound";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<HomeDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
