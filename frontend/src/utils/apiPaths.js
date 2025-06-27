export const BASE_URL = "http://localhost:8080";

// utils/apiPath.js
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
  },
  USERS: {
    GET_ALL_USER: "/api/users",
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`,
  },
};
