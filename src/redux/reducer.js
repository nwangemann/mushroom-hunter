import axios from "axios";

let initialState = {
  user: {},
  loading: false,
  loginView: true,
  detailViewPostID: "",
  x: 0,
  y: 0
};

const LOGOUT = "LOGOUT";
const ADD_LOGIN_VIEW = "ADD_LOGIN_VIEW";
const REMOVE_LOGIN_VIEW = "REMOVE_LOGIN_VIEW";
const SUBMIT_USER = "SUBMIT_USER";
const GET_SESSION = "GET_SESSION";
const SET_DETAIL_ID = "SET_DETAIL_ID";
const SAVE_MAP_COORDS = "SAVE_MAP_COORDS";
const RETURN_MAP_COORDS = "RETURN_MAP_COORDS"

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

export function getSession() {
  let user = axios.get("/auth/userSession");
  console.log(user);
  return {
    type: GET_SESSION,
    payload: user.data
  };
}

export function saveMapCoords(x, y) {
  return {
    type: SAVE_MAP_COORDS,
    payload: {
      x: x,
      y: y
    }
  };
}

export function getMapCoords() {
  return {
    type: RETURN_MAP_COORDS
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGOUT:
      return { ...state, loginView: true };
    case SAVE_MAP_COORDS:
      return { ...state, x: action.payload.x, y: action.payload.y };
    case SET_DETAIL_ID:
      return { ...state, detailViewPostID: action.payload };
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
