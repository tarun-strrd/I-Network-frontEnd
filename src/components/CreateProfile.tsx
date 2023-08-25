import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputMultiline from "./partials/StyledTextArea";
import UnstyledSelectMultiple from "./partials/MultiSelect";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext, snackBarContext } from "../App";
import { baseUrl, cloudinaryUrl } from "../config";
import { upload } from "@testing-library/user-event/dist/upload";

const defaultProfilePic =
  "https://tse1.mm.bing.net/th?id=OIP.0g9t2RRpr0rhAKaJPbQriQHaHk&pid=Api&P=0&h=180";

function CreateProfile() {
  const { state, dispatch } = useContext(UserContext)!;
  const inputFile = useRef<HTMLInputElement | null>(null)!;
  const [image, setImage] = useState<string>(defaultProfilePic);
  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState<string>(state ? state.bio : "");
  const [username, setUsername] = useState<string>(state ? state.name : "");
  const [location, setLocation] = useState<string>(state ? state.location : "");
  const { snackBarState, snackBarDispatch } = useContext(snackBarContext)!;

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setBio(state ? state.bio : "");
    setUsername(state ? state.name : "");
    setLocation(state ? state.location : "");
  }, [state]);

  const updateProfile = (bio: string, username: string, location: string) => {
    fetch(`${baseUrl}/user/updateProfile`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        bio,
        username,
        location,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.updatedUser);
        if (data.error) {
          console.log("error occured");
        } else {
          console.log("profile updated successfully");
          localStorage.setItem("user", JSON.stringify(data.updatedUser));
          dispatch({
            type: "UPDATEPROFILE",
            payload: {
              bio: data.updatedUser.bio,
              name: data.updatedUser.name,
              location: data.updatedUser.location,
            },
          });
          snackBarDispatch({
            type: "SET_SNACKBAR",
            payload: {
              message: "Profile updated successfully",
              severity: "success",
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    handleClose();
  };

  useEffect(() => {}, [state]);

  const uploadProfilePic = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files![0]);
    data.append("upload_preset", "iruphkvn");
    setImageLoading(true);
    const res = await fetch(cloudinaryUrl, {
      method: "post",
      body: data,
    });
    const file = await res.json();
    const url = file.secure_url;
    // console.log(url);
    fetch(`${baseUrl}/user/updateProfilePic`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log("error occured");
        } else {
          // console.log("profile pic updated successfully");
          setImage(data.updatedUser.profilePic);
          localStorage.setItem("user", JSON.stringify(data.updatedUser));
          dispatch({
            type: "UPDATEPROFILE",
            payload: {
              profilePic: data.updatedUser.profilePic,
            },
          });
          snackBarDispatch({
            type: "SET_SNACKBAR",
            payload: {
              message: "Profile pic updated successfully",
              severity: "success",
            },
          });
        }
      })
      .catch((err) => console.log(err));

    setImageLoading(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        //className="default-button-style"
        onClick={handleClickOpen}
      >
        Edit Profile
      </Button>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{ style: { borderRadius: 18 } }}
        >
          <DialogTitle>Edit your profile</DialogTitle>
          <DialogContent>
            <input
              type="file"
              name="profilePic"
              placeholder="upload from device"
              ref={inputFile}
              style={{ display: "none" }}
              onChange={(e) => uploadProfilePic(e)}
            />
            {!imageLoading ? (
              <div style={{ textAlign: "center" }}>
                <span onClick={() => inputFile.current?.click()}>
                  <img
                    src={state ? state.profilePic : defaultProfilePic}
                    alt="profile pic"
                    className="profile-pic"
                    style={{ cursor: "pointer" }}
                  />
                </span>
              </div>
            ) : (
              <h6>loading...</h6>
            )}
            <InputMultiline
              Value={bio}
              changeValue={(e) => onValueChange(e)}
              placeholder="Bio..."
            />
            <TextField
              autoFocus
              margin="dense"
              id="Username"
              label="Username"
              type="text"
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="Location"
              value={location}
              label="Location"
              type="text"
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              variant="standard"
            />
            {/* <UnstyledSelectMultiple /> */}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => updateProfile(bio, username, location)}
              className="default-button-style"
              style={{ color: "white", fontWeight: "bold" }}
            >
              Update Profile
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateProfile;
