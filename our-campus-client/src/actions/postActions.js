import axios from "../config/api";
import {
  POST_LIST_FAIL,
  POST_LIST_SUCCESS,
  POST_LIST_REQUEST,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DELETE_FAIL,
  POST_CREATE_REQUEST,
  POST_CREATE_SUCCESS,
  POST_CREATE_FAIL,
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAIL,
  POST_CREATE_REVIEW_REQUEST,
  POST_CREATE_REVIEW_SUCCESS,
  POST_CREATE_REVIEW_FAIL,
  POST_TOP_REQUEST,
  POST_TOP_SUCCESS,
  POST_TOP_FAIL,
  POST_LIKE_REQUEST,
  POST_LIKE_FAIL,
  POST_LIKE_SUCCESS,
  POST_UNLIKE_REQUEST,
  POST_UNLIKE_SUCCESS,
  POST_UNLIKE_FAIL,
} from "../constants/postConstants";

export const listPosts = (keyword = "", pageNumber = "") => async (
  dispatch
) => {
  try {
    dispatch({ type: POST_LIST_REQUEST });
    const { data } = await axios.get(`/posts?keyword=${keyword}`);

    dispatch({
      type: POST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPostDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: POST_DETAILS_REQUEST });
    const { data } = await axios.get(`/posts/${id}`);

    dispatch({
      type: POST_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePost = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        username: userInfo.username,
      },
    };

    await axios.delete(`/posts/${id}`, config);
    dispatch({
      type: POST_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: POST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPost = (post) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/posts`, post, config);
    dispatch({
      type: POST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePost = (post) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/posts/${post._id}`, post, config);
    dispatch({
      type: POST_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPostReview = (postId, review) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: POST_CREATE_REVIEW_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const userId = userInfo._id;
    const username = userInfo.username;

    review = { ...review, userId, username };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/posts/${postId}/comments`, review, config);
    dispatch({
      type: POST_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: POST_CREATE_REVIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTopPosts = () => async (dispatch) => {
  try {
    dispatch({ type: POST_TOP_REQUEST });
    const { data } = await axios.get(`/posts/top`);

    dispatch({
      type: POST_TOP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_TOP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const like = (post) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_LIKE_REQUEST,
    });

    const {
      userLogin: {
        userInfo: { _id, token },
      },
    } = getState();

    const config = {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // console.log(user.username+" "+username);
    // const { data } = await axios.post(`/users/${user.username}/request`, {username}, config);
    await axios.post(`/posts/${post._id}/like`, { _id }, config);

    dispatch({ type: POST_LIKE_SUCCESS });
    // dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_LIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const unlike = (post) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_UNLIKE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const _id = userInfo._id;

    const config = {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // const { data } = await axios.post(`/users/${post.username}/unrequest`, {username}, config);
    await axios.post(`/posts/${post._id}/unlike`, { _id }, config);

    dispatch({ type: POST_UNLIKE_SUCCESS });
    // dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: POST_UNLIKE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
