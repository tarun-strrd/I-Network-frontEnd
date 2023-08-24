import { Button, Dialog, DialogContent, DialogActions } from "@mui/material";
import React, { useState } from "react";
import InputMultiline from "./partials/StyledTextArea";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import getTimeAgo from "./utils/days_ago";
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

interface Props {
  tweetReceived: Tweet;
}

const CreateComment = ({ tweetReceived }: Props) => {
  const [tweet, setTweet] = useState<string>("");
  const [open, setOpen] = useState(false);

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTweet(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleComment = (comment: string) => {
    fetch(`${baseUrl}/tweet/comment`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({ tweetId: tweetReceived._id, comment }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };

  return (
    <div>
      <Button>
        <QuestionAnswerOutlinedIcon
          style={{ color: "black" }}
          onClick={handleClickOpen}
        />
      </Button>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{ style: { borderRadius: 18 } }}
        >
          {/* <DialogTitle>Tweet</DialogTitle> */}
          <DialogContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <img
                  src={tweetReceived?.postedBy?.profilePic}
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
                  {tweetReceived?.postedBy?.name}
                  <br />
                  <span
                    style={{
                      fontSize: 6,
                      color: "#2e3031",
                      fontWeight: "normal",
                    }}
                  >
                    {getTimeAgo(tweetReceived.createdAt)}
                  </span>
                </p>
              </div>
            </div>
            <div style={{ textAlign: "left", marginBottom: 50 }}>
              {tweetReceived?.tweet}
            </div>
            <InputMultiline
              Value={tweet}
              changeValue={(e) => onValueChange(e)}
              placeholder="Reply..."
            />
            {/* <UnstyledSelectMultiple /> */}
            <h5>Comments</h5>
            {/* <div>
              {tweetReceived?.comments?.map((comment, index) => {
                return <div key={index}>{comment}</div>;
              })}
            </div> */}
          </DialogContent>
          <DialogActions>
            <Button
              className="default-button-style hover-white"
              style={{
                width: 100,
                color: "white",
              }}
              onClick={() => handleComment(tweet)}
            >
              Post
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
export default CreateComment;
