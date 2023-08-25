import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../config";
import { UserContext } from "../App";

const defaultProfilePic =
  "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";

interface User {
  name: string;
  profilePic: string;
  _id: string;
}

const SuggestedNetworks = () => {
  const [users, setUsers] = useState<[User] | []>([]);
  const { state, dispatch } = useContext(UserContext)!;

  useEffect(() => {
    fetch(`${baseUrl}/user/suggestedNetworks`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("data", data.users);
        // console.log("state", state);
        setUsers(data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div
      style={{
        marginTop: 50,
        padding: 30,
        position: "fixed",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <h3 style={{ fontWeight: "bold", textAlign: "left" }}>
        Suggested Networks
      </h3>
      {users?.map((user, index) => {
        if (state?._id === user?._id) return null;
        return (
          <div
            className="icon-with-text"
            style={{ marginBottom: 30 }}
            key={index}
          >
            <img
              src={user?.profilePic}
              alt="profile pic"
              width={30}
              height={30}
              style={{ borderRadius: "50%", marginRight: 10 }}
            />
            <p style={{ fontSize: 6, fontWeight: "bold", marginRight: 9 }}>
              {user?.name}
            </p>
            <Link
              to={`/user/${user?._id}`}
              style={{
                textDecoration: "none",
                fontFamily: "roboto",
                color: "#55abee",
                fontSize: 6,
              }}
            >
              view profile
            </Link>
          </div>
        );
      })}
      <div
        className="icon-with-text"
        style={{
          marginBottom: 30,
        }}
      >
        <img
          src={defaultProfilePic}
          alt="profile pic"
          width={30}
          height={30}
          style={{ borderRadius: "50%", marginRight: 10 }}
        />
        <p style={{ fontSize: 6, fontWeight: "bold", marginRight: 9 }}>
          Ponniyan Selvan
        </p>
        <Link
          to="/profile"
          style={{
            textDecoration: "none",
            fontFamily: "roboto",
            color: "#55abee",
            fontSize: 6,
          }}
        >
          view profile
        </Link>
      </div>
      <div className="icon-with-text" style={{ marginBottom: 30 }}>
        <img
          src={defaultProfilePic}
          alt="profile pic"
          width={30}
          height={30}
          style={{ borderRadius: "50%", marginRight: 10 }}
        />
        <p style={{ fontSize: 6, fontWeight: "bold", marginRight: 9 }}>
          baahubali_kattappa
        </p>
        <Link
          to="/profile"
          style={{
            textDecoration: "none",
            fontFamily: "roboto",
            color: "#55abee",
            fontSize: 6,
          }}
        >
          view profile
        </Link>
      </div>
      <div className="icon-with-text" style={{ marginBottom: 30 }}>
        <img
          src={defaultProfilePic}
          alt="profile pic"
          width={30}
          height={30}
          style={{ borderRadius: "50%", marginRight: 10 }}
        />
        <p style={{ fontSize: 6, fontWeight: "bold", marginRight: 9 }}>
          arundathi_roy
        </p>
        <Link
          to="/profile"
          style={{
            textDecoration: "none",
            fontFamily: "roboto",
            color: "#55abee",
            fontSize: 6,
          }}
        >
          view profile
        </Link>
      </div>
    </div>
  );
};

export default SuggestedNetworks;
