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
interface State {
  tweets: Tweet[];
}
type Action = { type: string; payload: Tweet[] };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "GETTWEETS":
      return { tweets: [...action.payload] };
    case "ADD_TWEET": {
      return { ...state, tweets: [...action.payload, ...state.tweets] };
    }

    default:
      return state;
  }
};

export { reducer };
