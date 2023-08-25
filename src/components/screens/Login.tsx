import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SnackBar from "../partials/Snackbar";
import { AlertColor } from "@mui/material";
import validate from "../utils/validate";
import { baseUrl } from "../../config";
import TwitterLogo from "../../styles/assets/twitter-logo1.png";
import { snackBarContext } from "../../App";

type stringorNull = string | null;

const Login = () => {
  const [email, setemail] = useState<stringorNull>("");
  const [password, setpassword] = useState<stringorNull>("");
  const [error, setError] = useState<string>("No Error");
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { snackBarDispatch } = useContext(snackBarContext)!;
  const navigate = useNavigate();

  const postDetails = (email: stringorNull, password: stringorNull) => {
    const error = validate(email, password, "", "", "login");
    if (error !== "No Error") {
      //console.log(error);
      setError(error);
      setSeverity("error");
      setOpen(true);
      return;
    }
    fetch(`${baseUrl}/auth/signin`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) =>
        res
          .json()
          .then((data) => {
            console.log(data);
            if (data.error) {
              snackBarDispatch({
                type: "SET_SNACKBAR",
                payload: {
                  message: data.error,
                  severity: "error",
                },
              });
            } else {
              localStorage.setItem("token", data.token);
              localStorage.setItem("user", JSON.stringify(data.user));
              snackBarDispatch({
                type: "SET_SNACKBAR",
                payload: {
                  message: "Logged In. See what's happening...",
                  severity: "success",
                },
              });
              setTimeout(() => {
                navigate("/");
              }, 2000);
            }
          })
          .catch((err) => {
            console.log(err);
          })
      )
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div>
        {loading ? (
          <div>loading...</div>
        ) : (
          <div style={{ width: "50%", margin: "auto", marginTop: "10%" }}>
            <img
              src={TwitterLogo}
              alt="logo"
              className="logo"
              style={{ width: 50 }}
            />
            <h3>Sign In to Mini-Twitter</h3>
            <div>
              <TextField
                id="email"
                label="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                variant="standard"
                style={{ width: "100%" }}
              />
            </div>
            <div>
              <TextField
                id="password"
                label="password"
                type="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                variant="standard"
                className="input-default-style"
              />
            </div>
            <Button
              variant="contained"
              className="default-button-style"
              onClick={() => postDetails(email, password)}
            >
              Sign In
            </Button>

            <div className="default-twitter-text">
              Don't have an account? <Link to="/signup">Register here</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
