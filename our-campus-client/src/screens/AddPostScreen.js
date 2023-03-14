import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userActions";
import { createPost } from "../actions/postActions";
import FormContainer from "../components/FormContainer";
import axios from "../config/api";
import { useHistory } from "react-router-dom";

const AddPostScreen = ({ hide }) => {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [dp, setDp] = useState("");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postInfo = useSelector((state) => state.postCreate);
  const { loading, success, error } = postInfo;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!userInfo.name) {
        dispatch(getUserDetails("Profile"));
      } else {
        setDp(userInfo.dp);
        setUsername(userInfo.username);
      }
    }
  }, [dispatch, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPost({ username, image, dp, caption }));
    if (success) {
      hide();
      history.push("/profile");
    }
  };

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append("image", file);
  //   setUploading(true);

  //   try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     };

  //     const { data } = await axios.post("/api/upload", formData, config);

  //     setImage(data);
  //     setUploading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setUploading(false);
  //   }
  // };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    setUploading(true);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "sk1xkp14");

    try {
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
      setImage(
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
        <h1>Add Post</h1>
        {success && <Message variant='success'>Post Added</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='image'>
            <Form.Label>Select Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Image URL'
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.File
              id='image-file'
              label='Choose File'
              custom
              onChange={uploadFileHandler}
            ></Form.File>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId='Caption'>
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type='Caption'
              placeholder='Enter Caption'
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <br />
          <Button type='submit' variant='primary'>
            Add
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default AddPostScreen;
