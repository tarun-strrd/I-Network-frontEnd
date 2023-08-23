import React, { useContext } from "react";
import CreateProfile from "../CreateProfile";
import { UserContext } from "../../App";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { Button } from "@mui/material";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext)!;
  const navigate = useNavigate();
  const defaultProfilePic =
    "https://tse1.mm.bing.net/th?id=OIP.0g9t2RRpr0rhAKaJPbQriQHaHk&pid=Api&P=0&h=180";

  return (
    <div className="primary">
      <div className="left-profile">
        <Navbar />
      </div>
      <div className="default-card-styles">
        <div style={{ marginLeft: 10, padding: 15 }}>
          <div
            className="icon-with-text"
            style={{ marginBottom: 10, fontWeight: "bold" }}
          >
            <span>
              <ArrowBackIcon
                style={{ color: "#55abee", cursor: "pointer" }}
                className="default-icon"
                onClick={() => navigate(-1)}
              />{" "}
            </span>{" "}
            {state ? state.name : "loading"}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <img
                src={state ? state.profilePic : defaultProfilePic}
                alt="profile pic"
                className="profile-pic"
              />
            </div>
            <div>
              <CreateProfile />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <div style={{ fontWeight: "bold" }}>{state ? state.name : ""}</div>
            <div style={{ color: " #302d2d", fontSize: 12 }}>
              {state ? state.bio : ""}
            </div>
            <div style={{ color: " #302d2d", fontSize: 12 }}>
              {state ? state.location : ""}
            </div>
            <div style={{ display: "flex", color: " #302d2d" }}>
              <p style={{ marginRight: 19 }}>200 following</p>
              <p>300 followers</p>
            </div>
          </div>
        </div>
      </div>
      <div className="right-profile">right side</div>
    </div>
  );
};

export default Profile;
