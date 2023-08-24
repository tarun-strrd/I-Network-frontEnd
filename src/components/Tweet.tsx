import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import React, { useState } from "react";
import { baseUrl } from "../config";
import InputMultiline from "./partials/StyledTextArea";
import { useTweetContext } from "./screens/Home";

const Tweet = () => {
  const [tweet, setTweet] = useState<string>("");
  const [open, setOpen] = useState(false);
  //const { tweets_state, tweets_dispatch } = useTweetContext();

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTweet(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const tweetHandler = () => {
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
        console.log(data);
        //tweets_dispatch({ type: "ADD_TWEET", payload: data.tweet });
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        className="default-button-style default-twitter-text"
        style={{
          width: 150,
          marginLeft: -50,
          marginTop: 15,
          textTransform: "none",
        }}
        onClick={handleClickOpen}
      >
        <b>Tweet</b>
      </Button>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{ style: { borderRadius: 18 } }}
        >
          {/* <DialogTitle>Tweet</DialogTitle> */}
          <DialogContent>
            <InputMultiline
              Value={tweet}
              changeValue={(e) => onValueChange(e)}
              placeholder="What's happening..."
            />
            {/* <UnstyledSelectMultiple /> */}
          </DialogContent>
          <DialogActions>
            <Button
              className="default-button-style hover-white"
              style={{
                width: 150,
                color: "white",
              }}
              onClick={() => tweetHandler()}
            >
              Tweet
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default Tweet;
