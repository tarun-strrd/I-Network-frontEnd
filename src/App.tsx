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
import UserProfile from "./components/screens/userProfile";
import snackBarReducer from "./reducers/SnackBarReducer";
import SnackBar from "./components/partials/Snackbar";
import Snackbar from "./components/partials/Snackbar";

type stringOrNull = string | null;
interface ISnackBarState {
  message: string;
  severity: string;
}

interface SnackbarContextType {
  snackBarState: ISnackBarState | null;
  snackBarDispatch: React.Dispatch<any>;
}
interface UserContextType {
  state: any;
  dispatch: React.Dispatch<any>;
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
      <Route path="/user/:userId" element={<UserProfile />} />
      <Route path="/tweet/:tweetId" element={<Profile />} />
    </Routes>
  );
};

export const UserContext = createContext<UserContextType | null>(null);
export const snackBarContext = createContext<SnackbarContextType | null>(null);

function App() {
  const [state, dispatch] = useReducer(user_reducer, null);
  const [snackBarState, snackBarDispatch] = useReducer(snackBarReducer, null);

  useEffect(() => {
    console.log("rerender due to user_state change");
    console.log(state);
  }, [state]);

  console.log("app");
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <snackBarContext.Provider value={{ snackBarState, snackBarDispatch }}>
        <div className="App">
          {snackBarState !== null && <Snackbar />}
          <Router>
            <Routing />
          </Router>
        </div>
      </snackBarContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
