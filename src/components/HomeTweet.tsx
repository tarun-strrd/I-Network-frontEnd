import React, { useContext, useState } from "react";
import InputMultiline from "./partials/StyledTextArea";
import { Button } from "@mui/material";
import { baseUrl } from "../config";
import { useTweetContext } from "./screens/Home";
import { snackBarContext } from "../App";

const HomeTweet = () => {
  console.log("HomeTweet");
  const [tweet, setTweet] = useState<string>("");
  const { tweets_dispatch } = useTweetContext();
  const { snackBarDispatch } = useContext(snackBarContext)!;

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTweet(e.target.value);
  };

  const tweetHandler = () => {
    if (tweet.length === 0) return;
    fetch(`${baseUrl}/tweet/createTweet`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ tweet }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.tweet);
        tweets_dispatch({ type: "ADD_TWEET", payload: data.tweet });
        snackBarDispatch({
          type: "SET_SNACKBAR",
          payload: { message: "Tweeted!", severity: "success" },
        });
        setTweet("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #E0E3E7",
      }}
    >
      <div style={{ width: "70%" }}>
        <InputMultiline
          Value={tweet}
          changeValue={(e) => onValueChange(e)}
          placeholder="What's happening..."
        />
      </div>
      <div style={{ textAlign: "right" }}>
        <Button
          className="default-button-style hover-white default-twitter-text"
          style={{
            width: 120,
            color: "white",
            textTransform: "none",
          }}
          onClick={() => tweetHandler()}
        >
          <b>Tweet</b>
        </Button>
      </div>
    </div>
  );
};

export default HomeTweet;
