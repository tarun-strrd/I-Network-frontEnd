import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import TwitterLogo from "../../styles/assets/twitter-logo1.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  console.log("Landing");
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex" }}>
      <div className="landing-left">
        <div className="icon-with-text text-icon-container">
          <div className="default-icon">
            <SearchIcon />
          </div>
          <div> Find your interests</div>
        </div>
        <div className="icon-with-text text-icon-container">
          <div className="default-icon">
            <PeopleAltIcon />
          </div>
          <div> Hear what people are talking about</div>
        </div>
        <div className="icon-with-text text-icon-container">
          <div className="default-icon">
            <QuestionAnswerIcon />
          </div>
          <div> Join the conversation</div>
        </div>
      </div>
      <div className="landing-right">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "70%",
          }}
        >
          <img
            src={TwitterLogo}
            alt="logo"
            className="logo"
            style={{ width: 50 }}
          />
          <div>
            <h3>See what's happening in the world right now</h3>
            <h4 className="default-twitter-text" style={{ textAlign: "left" }}>
              Join Mini-Twitter today.
            </h4>
          </div>
          <Button
            variant="contained"
            className="default-button-style"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#fff",
              width: "100%",
              borderRadius: 20,
              color: "#1DA1F2",
              border: "1px solid #1DA1F2",
            }}
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
