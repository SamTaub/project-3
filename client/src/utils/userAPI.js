import axios from "axios";
const bcrypt = require("bcrypt-nodejs");

export default {
  // Send post request to the /api/signup endpoint. Should return a boolean response.
  signUp: function(username, email, password) {
    return axios.post("/api/signup", {
      username,
      email,
      password
    });
  },

  // Send a post request to the /api/login endpoint. Should return a boolean response.
  logIn: function(email, password) {
    return axios.post("/api/login", {
      email: email,
      password: password
    });
  },

  // Get request to logout the current user. Should return a boolean response.
  logOut: function() {
    return axios.get("/api/logout");
  },

  // Send a request to the api/user endpoint to see if req.user exists.
  // Expects a boolean response.
  checkAuthStatus: function() {
    return axios.get("/api/user");
  },

  // Get dashboard data associated with a user's id (or however else we want to structure this). DRAFT.
  getDashboard: function(id) {
    return axios.get(`/api/user/dashboard/${id}`);
  }

  // Add /create route here or in a seperate file? Thinking a seperate file.
};
