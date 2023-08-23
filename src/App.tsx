import React, { createContext, useContext, useEffect, useReducer } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Landing from "./components/screens/Landing";
import Login from "./components/screens/Login";
import Home from "./components/screens/Home";
import Register from "./components/screens/register";
import Profile from "./components/screens/Profile";
import { reducer as user_reducer } from "./reducers/userReducer";
import { reducer as tweet_reducer } from "./reducers/tweetReducer";

type stringOrNull = string | null;

interface UserContextType {
  state: any;
  dispatch: (action: any) => void;
}

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext)!;
  useEffect(() => {
    const userJSON = localStorage.getItem("user");
    const user = userJSON ? JSON.parse(userJSON) : null;
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      navigate("/landing");
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export const UserContext = createContext<UserContextType | null>(null);

function App() {
  const [state, dispatch] = useReducer(user_reducer, null);

  useEffect(() => {
    console.log("rerender due to user_state change");
    console.log(state);
  }, [state]);

  console.log("app");
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Router>
          <Routing />
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
