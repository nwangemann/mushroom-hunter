import axios from "axios";

let initialState = {
  user: {},
  loading: false
};

const SUBMIT_USER = "SUBMIT_USER";
const GET_SESSION = "GET_SESSION";

export function submitUser(user) {
  return {
    type: SUBMIT_USER,
    payload: user
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
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
