import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import axios from "../config/api";
import SkillModelForm from "../components/SkillModalForm";

const ProfileEditScreen = ({ match, history }) => {
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [tagline, setTagline] = useState("");
  const [dp, setDp] = useState("");
  const [about, setAbout] = useState("");
  const [uploading, setUploading] = useState(false);
  // const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  // const userDetails = useSelector((state) => state.userDetails);
  // const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!userInfo.name) {
        dispatch(getUserDetails("Profile"));
      } else {
        setName(userInfo.name);
        setAbout(userInfo.about);
        setDp(userInfo.dp);
        setTagline(userInfo.tagline);
        setUsername(userInfo.username);
      }
    }
  }, [dispatch, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        id: userInfo._id,
        name,
        userName,
        tagline,
        dp,
        about,
      })
    );
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    // const formData = new FormData();
    // formData.append("image", file);
    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "sk1xkp14");

    try {
      // const config = {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // };

      // const { data } = await axios.post("/api/upload", formData, config);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/dpscbesvf/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const img = await res.json();
      // Post `img.secure_url` to your server and save to MongoDB

      const imgUrl = await img.secure_url;
      setDp(
        imgUrl.replace(
          "dpscbesvf/image/upload",
          "dpscbesvf/image/upload/ar_1:1,c_thumb,z_0.75"
        )
      );

      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Edit Profile</h1>
        {success && <Message variant='success'>Profile Updated</Message>}
        {/* {loading && <Loader />} */}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='tagline'>
            <Form.Label>Tagline</Form.Label>
            <Form.Control
              type='tagline'
              placeholder='Enter tagline'
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='About'>
            <Form.Label>About</Form.Label>
            <Form.Control
              type='About'
              placeholder='Enter About'
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              as='textarea'
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='userName'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              disabled
              type='userName'
              placeholder='Enter UserName'
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image'>
            <Form.Label>Display Picture</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Image URL'
              value={dp}
              onChange={(e) => setDp(e.target.value)}
            ></Form.Control>
            <Form.File
              id='image-file'
              label='Choose File'
              custom
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />}
          </Form.Group>
          <br />
          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProfileEditScreen;
