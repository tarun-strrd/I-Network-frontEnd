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

const Register = () => {
  const [name, setname] = useState<stringorNull>("");
  const [email, setemail] = useState<stringorNull>("");
  const [password, setpassword] = useState<stringorNull>("");
  const [confirmpassword, setconfirmpassword] = useState<stringorNull>("");
  const { snackBarDispatch } = useContext(snackBarContext)!;

  const navigate = useNavigate();

  const postDetails = (
    email: stringorNull,
    password: stringorNull,
    confirmpassword: stringorNull,
    name: stringorNull
  ) => {
    const error = validate(email, password, confirmpassword, name, "signup");
    if (error !== "No Error") {
      //console.log(error);
      snackBarDispatch({
        type: "SET_SNACKBAR",
        payload: { message: error, severity: "error" },
      });
      return;
    }
    fetch(`${baseUrl}/auth/signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          snackBarDispatch({
            type: "SET_SNACKBAR",
            payload: {
              message: data.error,
              severity: "success",
            },
          });
        } else {
          snackBarDispatch({
            type: "SET_SNACKBAR",
            payload: {
              message: "Successfully registered.Happy Tweets......",
              severity: "success",
            },
          });
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      style={{
        width: "50%",
        margin: "auto",
        marginTop: "10%",
      }}
    >
      <img
        src={TwitterLogo}
        alt="logo"
        className="logo"
        style={{ width: 50 }}
      />
      <h2>Sign Up</h2>
      <div>
        <TextField
          id="standard-error-helper-text"
          label="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          variant="standard"
          className="input-default-style"
        />
      </div>
      <div>
        <TextField
          id="standard-error-helper-text"
          label="Name"
          value={name}
          variant="standard"
          onChange={(e) => setname(e.target.value)}
          className="input-default-style"
        />
      </div>
      <div>
        <TextField
          id="standard-error-helper-text"
          label="password"
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          variant="standard"
          className="input-default-style"
        />
      </div>
      <div>
        <TextField
          id="standard-error-helper-text"
          label="confirm-password"
          type="password"
          value={confirmpassword}
          className="input-default-style"
          variant="standard"
          onChange={(e) => setconfirmpassword(e.target.value)}
        />
      </div>
      <Button
        variant="contained"
        style={{ marginTop: 20 }}
        className="default-button-style"
        onClick={() => postDetails(email, password, confirmpassword, name)}
      >
        Sign Up
      </Button>
      <div className="default-twitter-text">
        <h4>
          Already have an account ?{" "}
          <span>
            <Link to="/login">Login here</Link>
          </span>
        </h4>
      </div>
    </div>
  );
};

export default Register;
