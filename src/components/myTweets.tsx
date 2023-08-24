import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CreateComment from "./createComment";
import getTimeAgo from "./utils/days_ago";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { UserContext } from "../App";
import { baseUrl } from "../config";

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

const MyTweets = () => {
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState<Tweet[] | []>([]);
  const { state, dispatch } = useContext(UserContext)!;

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
        const newLikedTweets = tweets.map((tweet) => {
          if (tweet._id === data.tweet._id) {
            return data.tweet;
          } else {
            return tweet;
          }
        });
        setTweets(newLikedTweets);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch(`${baseUrl}/tweet/myTweets`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTweets(data.myTweets);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) return <div>Loading your favourites...</div>;

  return (
    <div>
      {tweets ? (
        tweets.map((tweet, index) => {
          return (
            <div
              className="default-card-styles"
              style={{ borderBottom: "1px solid #bdc4c9" }}
              key={index}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ textAlign: "left" }}>
                  <img
                    src={tweet?.postedBy?.profilePic}
                    alt="profile pic"
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%", marginRight: 10 }}
                  />
                </div>
                <div
                  style={{
                    textAlign: "left",
                  }}
                >
                  <p style={{ fontSize: 12, fontWeight: "bold" }}>
                    {tweet?.postedBy?.name}
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
  );
};

export default MyTweets;
