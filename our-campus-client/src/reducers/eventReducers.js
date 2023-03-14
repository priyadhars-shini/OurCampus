import {
  EVENT_LIST_FAIL,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_REQUEST,
  EVENT_DETAILS_REQUEST,
  EVENT_DETAILS_SUCCESS,
  EVENT_DETAILS_FAIL,
  EVENT_DELETE_REQUEST,
  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_CREATE_REQUEST,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAIL,
  EVENT_UPDATE_REQUEST,
  EVENT_UPDATE_SUCCESS,
  EVENT_UPDATE_FAIL,
  EVENT_CREATE_REVIEW_REQUEST,
  EVENT_CREATE_REVIEW_SUCCESS,
  EVENT_CREATE_REVIEW_FAIL,
  EVENT_TOP_REQUEST,
  EVENT_TOP_SUCCESS,
  EVENT_TOP_FAIL,
} from "../constants/eventConstants";


export const eventListReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case EVENT_LIST_REQUEST:
      return { loading: true, events: [] };
    case EVENT_LIST_SUCCESS:
      return {
        loading: false,
        events: action.payload.events,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case EVENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventDetailsReducer = (
  state = { event: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case EVENT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case EVENT_DETAILS_SUCCESS:
      return { loading: false, event: action.payload };
    case EVENT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_DELETE_REQUEST:
      return { loading: true };
    case EVENT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case EVENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_CREATE_REQUEST:
      return { loading: true };
    case EVENT_CREATE_SUCCESS:
      return { loading: false, success: true, event: action.payload };
    case EVENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventUpdateReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case EVENT_UPDATE_REQUEST:
      return { loading: true };
    case EVENT_UPDATE_SUCCESS:
      return { loading: false, success: true, event: action.payload };
    case EVENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventReviewCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case EVENT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case EVENT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case EVENT_CREATE_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventTopRatedReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case EVENT_TOP_REQUEST:
      return { loading: true, events: [] };
    case EVENT_TOP_SUCCESS:
      return { loading: false, events: action.payload };
    case EVENT_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
