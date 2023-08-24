import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { UserContext } from "../../App";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar";
import SuggestedNetworks from "../suggestedNetworks";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { baseUrl } from "../../config";
import CreateComment from "../createComment";
import getTimeAgo from "../utils/days_ago";

const defaultProfilePic =
  "https://tse1.mm.bing.net/th?id=OIP.0g9t2RRpr0rhAKaJPbQriQHaHk&pid=Api&P=0&h=180";

interface Tweet {
  comments: string[];
  likes: string[];
  createdAt: string;
  postedBy: {
    name: string;
    profilePic: string;
    _id: string;
  };
  _id: string;
  tweet: string;
  updatedAt: string;
}

const UserProfile = () => {
  const [myPostsActive, setMyPostsActive] = useState(true);
  const { state, dispatch } = useContext(UserContext)!;
  const [userTweets, setUserTweets] = useState<Tweet[] | []>([]);
  const [user, setUser] = useState<any>(null);
  const { userId } = useParams();
  console.log(userId);
  const navigate = useNavigate();

  const callLikeOrUnlike = (tweet: Tweet) => {
    if (tweet.likes.includes(state._id)) {
      LikeOrUnlike(tweet._id, "unlike");
    } else {
      LikeOrUnlike(tweet._id, "like");
    }
  };

  const LikeOrUnlike = (tweetId: string, pathText: string) => {
    fetch(`${baseUrl}/tweet/${pathText}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ tweetId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const newLikedTweets = userTweets.map((tweet) => {
          if (tweet._id === data.tweet._id) {
            return data.tweet;
          } else {
            return tweet;
          }
        });
        setUserTweets(newLikedTweets);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch(`${baseUrl}/user/${userId}`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUser(data.user);
        setUserTweets(data.tweets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
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
              {user ? user.name : "loading"}
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
                  src={user ? user.profilePic : defaultProfilePic}
                  alt="profile pic"
                  className="profile-pic"
                />
              </div>
              <div>
                <Button className="default-button-styles">Follow</Button>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div style={{ fontWeight: "bold" }}>{user ? user.name : ""}</div>
              <div style={{ color: " #302d2d", fontSize: 12 }}>
                {user ? user.bio : ""}
              </div>
              <div style={{ color: " #302d2d", fontSize: 12 }}>
                {user ? user.location : ""}
              </div>
              <div style={{ display: "flex", color: " #302d2d" }}>
                <p style={{ marginRight: 19 }}>200 following</p>
                <p>300 followers</p>
              </div>
            </div>
          </div>
        </div>

        <h4 style={{ textAlign: "left" }}>Recent Tweets</h4>
        <div>
          {userTweets ? (
            userTweets.map((tweet, index) => {
              return (
                <div
                  key={index}
                  className="default-card-styles"
                  style={{ borderBottom: "1px solid #bdc4c9" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ textAlign: "left" }}>
                      <Link to={`/user/${tweet?.postedBy}`}>
                        <img
                          src={tweet?.postedBy?.profilePic}
                          alt="profile pic"
                          width={40}
                          height={40}
                          style={{ borderRadius: "50%", marginRight: 10 }}
                        />
                      </Link>
                    </div>
                    <div
                      style={{
                        textAlign: "left",
                      }}
                    >
                      <p style={{ fontSize: 12, fontWeight: "bold" }}>
                        <Link
                          to={`/user/${tweet?.postedBy?._id}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          {tweet?.postedBy?.name}
                        </Link>
                        <br />
                        <span
                          style={{
                            fontSize: 6,
                            color: "#2e3031",
                            fontWeight: "normal",
                          }}
                        >
                          {getTimeAgo(tweet.createdAt)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/tweet/${tweet._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div style={{ textAlign: "left" }}>{tweet?.tweet}</div>
                    <br />
                  </Link>
                  <div className="icon-with-text" style={{ textAlign: "left" }}>
                    {tweet.likes.includes(state._id) ? (
                      <FavoriteIcon
                        className={
                          tweet.likes.includes(state._id)
                            ? "default-icon liked"
                            : "default-icon unliked"
                        }
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          callLikeOrUnlike(tweet);
                        }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        className={
                          tweet.likes.includes(state._id)
                            ? "default-icon liked"
                            : "default-icon unliked"
                        }
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          callLikeOrUnlike(tweet);
                        }}
                      />
                    )}

                    <div>{tweet?.likes?.length}</div>

                    <div>
                      <CreateComment tweetReceived={tweet} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div>No tweets to display.</div>
          )}
        </div>
      </div>
      <div className="right">
        <SuggestedNetworks />
      </div>
    </div>
  );
};

export default UserProfile;
