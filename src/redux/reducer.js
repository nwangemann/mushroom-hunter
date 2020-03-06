import axios from "axios";

let initialState = {
  user: {},
  loading: false,
  loginView: true,
  guideView: false,
  detailViewPostID: "",
  selectedLocationMarker: {},
  markerSet: false
};

const LOGOUT = "LOGOUT";
const LOCATION_MARKER = "LOCATION_MARKER";
const REMOVE_MARKER_STYLE = "REMOVE_MARKER_STYLE"
const ADD_MARKER_STYLE = "ADD_MARKER_STYLE"
const ADD_GUIDE_VIEW = "ADD_GUIDE_VIEW";
const REMOVE_GUIDE_VIEW = "REMOVE_GUIDE_VIEW";
const ADD_LOGIN_VIEW = "ADD_LOGIN_VIEW";
const REMOVE_LOGIN_VIEW = "REMOVE_LOGIN_VIEW";
const SUBMIT_USER = "SUBMIT_USER";
const GET_SESSION = "GET_SESSION";
const SET_DETAIL_ID = "SET_DETAIL_ID";


export function setLocationMarker(location) {
  return {
    type: LOCATION_MARKER,
    payload: location
  };
}

export function removeMarkerStyle(){
  return {
    type: REMOVE_MARKER_STYLE,
    payload: { markerSet: false }
  }
}
export function addMarkerStyle(){
  return {
    type: ADD_MARKER_STYLE,
    payload: { markerSet: true }
  }
}

export function getDetailViewID(id) {
  return {
    type: SET_DETAIL_ID,
    payload: { detailViewPostID: id }
  };
}

export function logout() {
  axios.get("/auth/logout");
  return {
    type: LOGOUT,
    payload: { loginView: true }
  };
}

export function submitUser(user) {
  return {
    type: SUBMIT_USER,
    payload: user
  };
}

export function removeLoginView() {
  return {
    type: REMOVE_LOGIN_VIEW,
    payload: { loginView: false }
  };
}

export function addLoginView() {
  return {
    type: ADD_LOGIN_VIEW,
    payload: { loginView: true }
  };
}

export function addGuideView() {
  return {
    type: ADD_GUIDE_VIEW,
    payload: { loginView: true, guideView: true }
  };
}

export function removeGuideView() {
  return {
    type: REMOVE_GUIDE_VIEW,
    payload: { loginView: false, guideView: false }
  };
}

export function getSession() {
  let user = axios.get("/auth/userSession");
  return {
    type: GET_SESSION,
    payload: user.data
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT:
      return { ...state, loginView: true, user: {} };
    case SET_DETAIL_ID:
      return { ...state, detailViewPostID: action.payload };
    case LOCATION_MARKER:
      return { ...state, selectedLocationMarker: action.payload, markerSet: true };
      case REMOVE_MARKER_STYLE:
        return { ...state, markerSet: false };
      case ADD_MARKER_STYLE:
        return { ...state, markerSet: true };
    case ADD_GUIDE_VIEW:
      return { ...state, loginView: true, guideView: true };
    case REMOVE_GUIDE_VIEW:
      return { ...state, guideView: false };
    case REMOVE_LOGIN_VIEW:
      return { ...state, loginView: false };
    case ADD_LOGIN_VIEW:
      return { ...state, loginView: true };
    case SUBMIT_USER:
      return { ...state, user: action.payload };
    case GET_SESSION + "_PENDING":
      return { ...state, loading: true };
    case GET_SESSION + "_FULFILLED":
      return { user: action.payload, loading: false };
    case GET_SESSION + "_REJECTED":
      return { ...state, loading: true };
    default:
      return state;
  }
}
