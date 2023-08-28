import React, { useContext, useEffect, useState } from "react";
import CreateProfile from "../CreateProfile";
import { UserContext } from "../../App";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import { Button } from "@mui/material";
import AllTweets from "../allTweets";
import SuggestedNetworks from "../suggestedNetworks";
import LikedTweets from "../likedTweets";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MyTweets from "../myTweets";

const Profile = () => {
  const { state, dispatch } = useContext(UserContext)!;
  console.log(state);
  const [myPostsActive, setMyPostsActive] = useState(true);
  const navigate = useNavigate();
  const defaultProfilePic =
    "https://tse1.mm.bing.net/th?id=OIP.0g9t2RRpr0rhAKaJPbQriQHaHk&pid=Api&P=0&h=180";

  return state ? (
    <div className="primary">
      <div className="left-profile">
        <Navbar />
      </div>
      <div>
        {/* //profile pic and name */}
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
              <div style={{ fontWeight: "bold" }}>
                {state ? state.name : ""}
              </div>
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

        {/* //active inactive tabs */}
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            borderLeft: "1px solid #e6ecf0",
            borderBottom: "1px solid #e6ecf0",
            borderRight: "1px solid #e6ecf0",
          }}
        >
          <div
            className={myPostsActive ? "active-tab" : "inactive-tab"}
            style={{
              width: "50%",
              padding: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              if (!myPostsActive) setMyPostsActive(true);
            }}
          >
            <span style={{ marginRight: 10 }}>
              <PersonPinOutlinedIcon />
            </span>
            <span>My tweets</span>
          </div>
          <div
            style={{
              width: "50%",
              padding: 10,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              if (myPostsActive) setMyPostsActive(false);
            }}
            className={myPostsActive ? "inactive-tab" : "active-tab"}
          >
            <span style={{ marginRight: 10 }}>
              <FavoriteBorderOutlinedIcon />
            </span>
            <span>Favourites</span>
          </div>
        </div>

        {/* //tweets */}
        {myPostsActive ? <MyTweets /> : <LikedTweets />}
      </div>
      <div className="right">
        <SuggestedNetworks />
      </div>
    </div>
  ) : (
    <div>loading...</div>
  );
};

export default Profile;
