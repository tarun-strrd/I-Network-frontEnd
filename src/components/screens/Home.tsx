import React, { createContext, useContext, useEffect, useReducer } from "react";
import Navbar from "../Navbar";
import AllTweets from "../allTweets";
import { reducer as tweet_reducer } from "../../reducers/tweetReducer";
import HomeTweet from "../HomeTweet";
import SuggestedNetworks from "../suggestedNetworks";

interface Tweet {
  comments: [string];
  likes: [string];
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

type Action = { type: string; payload: Tweet[] };
interface State {
  tweets: Tweet[];
}
interface TweetContextType {
  tweets_state: State;
  tweets_dispatch: (action: Action) => void;
}

export const useTweetContext = () => {
  const context = useContext(TweetContext);
  // console.log(context);
  if (!context) {
    throw new Error(
      "useTweetContext must be used within a TweetContextProvider"
    );
  }
  return context;
};
export const TweetContext = createContext<TweetContextType | undefined>(
  undefined
);
const Home = () => {
  console.log("Home");
  const initialState: State = {
    tweets: [],
  };

  const [tweets_state, tweets_dispatch] = useReducer(
    tweet_reducer,
    initialState
  );
  return (
    <div className="primary">
      <div className="left-profile">
        {" "}
        <Navbar />
      </div>
      <TweetContext.Provider value={{ tweets_state, tweets_dispatch }}>
        <div className="home">
          <div style={{ textAlign: "left" }}>
            <h1>Home</h1>
            <HomeTweet />
          </div>
          <AllTweets />
        </div>
      </TweetContext.Provider>
      <div className="right">
        <SuggestedNetworks />
      </div>
    </div>
  );
};

export default Home;
