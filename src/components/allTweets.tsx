import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { baseUrl } from "../config";
import getTimeAgo from "./utils/days_ago";
import { UserContext } from "../App";
import { useTweetContext } from "./screens/Home";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CreateComment from "./createComment";
import { Link } from "react-router-dom";

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

interface State {
  tweets: Tweet[];
}

const AllTweets = () => {
  const { state, dispatch } = useContext(UserContext)!;
  const { tweets_state, tweets_dispatch } = useTweetContext();
  const [loading, setLoading] = useState(true);
  const { tweets } = tweets_state;
  // console.log(tweets);

  // const tweets = [
  //   {
  //     _id: "64e715bd1b782bfbdcc6dab3",
  //     tweet: "srikanth tiwary here from family man",
  //     likes: ["64e68e28a2ad4b513da88c93"],
  //     postedBy: {
  //       _id: "64e68e28a2ad4b513da88c93",
  //       name: "Srikanth_tiwary",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692866007/jmqqfdxc9fn9pvnlk9wq.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-24T08:33:01.125Z",
  //     updatedAt: "2023-08-24T08:35:03.215Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e659a8b35a9f8e6ca1fd34",
  //     tweet: "arjun ssecond tweet",
  //     likes: ["64e68e28a2ad4b513da88c93", "64e3850c4292f2e5e43380f5"],
  //     postedBy: {
  //       _id: "64e64a76089eccded8f76425",
  //       name: "Arjun Reddy",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692814178/gzfixoir0yh72qd1dumn.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T19:10:32.857Z",
  //     updatedAt: "2023-08-23T23:11:40.497Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e651b7b35a9f8e6ca1fcd2",
  //     tweet: "neww user tweet",
  //     likes: ["64e3850c4292f2e5e43380f5"],
  //     postedBy: {
  //       _id: "64e64a76089eccded8f76425",
  //       name: "Arjun Reddy",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692814178/gzfixoir0yh72qd1dumn.jpg",
  //     },
  //     comments: ["64e683e71a9ff265d66b8525"],
  //     createdAt: "2023-08-23T18:36:39.254Z",
  //     updatedAt: "2023-08-23T23:11:47.887Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e6387a089eccded8f763e4",
  //     tweet: "dispatch refreshtest ",
  //     likes: ["64e64a76089eccded8f76425"],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T16:48:58.322Z",
  //     updatedAt: "2023-08-23T18:39:35.138Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e614bc48d9cdf46104fec5",
  //     tweet: "repetetion test",
  //     likes: ["64e68e28a2ad4b513da88c93"],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T14:16:28.654Z",
  //     updatedAt: "2023-08-23T22:58:14.187Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e604d948d9cdf46104feae",
  //     tweet: "Everything going weell",
  //     likes: [],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T13:08:41.749Z",
  //     updatedAt: "2023-08-23T21:24:55.086Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e604ce48d9cdf46104fea9",
  //     tweet: "final tets to check eery thin going ell",
  //     likes: [],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T13:08:30.324Z",
  //     updatedAt: "2023-08-23T21:24:48.319Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e6049b48d9cdf46104fea4",
  //     tweet: "tets agin middle eror",
  //     likes: ["64e64a76089eccded8f76425", "64e3850c4292f2e5e43380f5"],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T13:07:39.617Z",
  //     updatedAt: "2023-08-23T23:12:04.565Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e6044c48d9cdf46104fe99",
  //     tweet: "test middle error",
  //     likes: ["64e64a76089eccded8f76425", "64e3850c4292f2e5e43380f5"],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: ["64e68f43a62ce1b446d23ea7"],
  //     createdAt: "2023-08-23T13:06:20.838Z",
  //     updatedAt: "2023-08-23T23:12:44.431Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e6043748d9cdf46104fe8e",
  //     tweet: "tetst single twet",
  //     likes: ["64e64a76089eccded8f76425"],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T13:05:59.999Z",
  //     updatedAt: "2023-08-23T19:09:08.435Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e603a448d9cdf46104fe89",
  //     tweet: "tets tweet refresh 5",
  //     likes: ["64e64a76089eccded8f76425"],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T13:03:32.568Z",
  //     updatedAt: "2023-08-23T19:36:43.727Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e6035c48d9cdf46104fe7e",
  //     tweet: "test with profilepic 4",
  //     likes: ["64e64a76089eccded8f76425"],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T13:02:20.749Z",
  //     updatedAt: "2023-08-23T18:42:27.451Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e6031948d9cdf46104fe70",
  //     tweet: "tets without prfilepic",
  //     likes: [],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T13:01:13.487Z",
  //     updatedAt: "2023-08-23T19:51:22.093Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e6022548d9cdf46104fe5f",
  //     tweet: "tweet refresh profilePc test 4",
  //     likes: [],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T12:57:09.110Z",
  //     updatedAt: "2023-08-23T19:45:31.147Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e601f4967461e4a8abe4a8",
  //     tweet: "tweet refresh profilePc test 3",
  //     likes: ["64e64a76089eccded8f76425", "64e68e28a2ad4b513da88c93"],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T12:56:20.779Z",
  //     updatedAt: "2023-08-23T22:58:35.357Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e6010e4943ace9446e6b22",
  //     tweet: "testing for pic refresh 2",
  //     likes: [],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T12:52:30.237Z",
  //     updatedAt: "2023-08-23T18:50:37.587Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e600c8b5a001688f9003f1",
  //     tweet: "testing for pic refresh 2",
  //     likes: [],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T12:51:20.897Z",
  //     updatedAt: "2023-08-23T12:51:20.897Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e5fddf9ba9ba3efabc0d05",
  //     tweet: "testing for pic refresh 2",
  //     likes: ["64e64a76089eccded8f76425"],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T12:38:55.906Z",
  //     updatedAt: "2023-08-23T19:20:54.800Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e5fd16c8911c09fe98f84d",
  //     tweet: "testing for profile pic refresh 1",
  //     likes: [],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T12:35:34.340Z",
  //     updatedAt: "2023-08-23T12:35:34.340Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e5fcedc8911c09fe98f84a",
  //     tweet: "testing auto refresh 4",
  //     likes: ["64e64a76089eccded8f76425"],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T12:34:53.785Z",
  //     updatedAt: "2023-08-23T19:20:16.254Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e5fbf1c8911c09fe98f841",
  //     tweet: "testing tweet auto refresh 3",
  //     likes: ["64e64a76089eccded8f76425"],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T12:30:41.967Z",
  //     updatedAt: "2023-08-23T19:36:49.397Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e5fbc7c8911c09fe98f83e",
  //     tweet: "testing tweet auto refresh",
  //     likes: ["64e64a76089eccded8f76425"],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: ["64e6927c4ff9b270ef08867e"],
  //     createdAt: "2023-08-23T12:29:59.735Z",
  //     updatedAt: "2023-08-23T23:13:00.898Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e5e90cc8911c09fe98f7ed",
  //     tweet: "testing tweet auto refresh",
  //     likes: ["64e64a76089eccded8f76425", "64e68e28a2ad4b513da88c93"],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T11:10:04.979Z",
  //     updatedAt: "2023-08-24T08:34:59.106Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e5dde1c8911c09fe98f7c3",
  //     tweet: "testing this modal tweet",
  //     likes: [],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T10:22:25.878Z",
  //     updatedAt: "2023-08-23T10:22:25.878Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e5ddccc8911c09fe98f7c0",
  //     tweet: "still testing home page",
  //     likes: [],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T10:22:04.011Z",
  //     updatedAt: "2023-08-23T10:22:04.011Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e5dae9c8911c09fe98f7bd",
  //     tweet: "home page testing",
  //     likes: [],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T10:09:45.122Z",
  //     updatedAt: "2023-08-23T10:09:45.122Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e5da8fc8911c09fe98f7ba",
  //     tweet: "Testing Home page tweet style emptying afetr tweeted",
  //     likes: [],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T10:08:15.327Z",
  //     updatedAt: "2023-08-23T10:08:15.327Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e5d9aec8911c09fe98f7b0",
  //     tweet: "Testing Home page tweet style emptying afetr tweeted",
  //     likes: [],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T10:04:30.540Z",
  //     updatedAt: "2023-08-23T10:04:30.540Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e5d98ec8911c09fe98f7ad",
  //     tweet: "Testing Home page tweet style",
  //     likes: [],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T10:03:58.895Z",
  //     updatedAt: "2023-08-23T10:03:58.895Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e5d6c7c8911c09fe98f7a4",
  //     tweet: "testting time util to get time",
  //     likes: ["64e68e28a2ad4b513da88c93"],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-23T09:52:07.219Z",
  //     updatedAt: "2023-08-24T08:35:07.870Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e517fc262de16bb6203f91",
  //     tweet: "test tweet",
  //     likes: ["64e64a76089eccded8f76425", "64e3850c4292f2e5e43380f5"],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-22T20:18:04.833Z",
  //     updatedAt: "2023-08-23T23:12:49.247Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "64e517ea262de16bb6203f8e",
  //     tweet: "test tweet",
  //     likes: [],
  //     postedBy: {
  //       _id: "64e3850c4292f2e5e43380f5",
  //       name: "Tarun.Sayyapureddi",
  //       profilePic:
  //         "https://res.cloudinary.com/dfqau4u7l/image/upload/v1692731875/ueu9apzaznvsfbkukycp.jpg",
  //     },
  //     comments: [],
  //     createdAt: "2023-08-22T20:17:46.935Z",
  //     updatedAt: "2023-08-23T18:36:14.888Z",
  //     __v: 0,
  //   },
  // ];

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
        const newTweets = tweets.map((tweet) => {
          if (tweet._id === data.tweet._id) {
            return data.tweet;
          } else {
            return tweet;
          }
        });
        tweets_dispatch({ type: "GETTWEETS", payload: newTweets });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetch(`${baseUrl}/tweet/allTweets`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //  console.log(data.tweets);
        tweets_dispatch({ type: "GETTWEETS", payload: data.tweets });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return <div>Loading tweets...</div>;
  }

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
export default AllTweets;
