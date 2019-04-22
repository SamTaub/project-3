import axios from "axios";
const bcrypt = require("bcrypt-nodejs");

export default {
  // Send post request to the /api/signup endpoint. Should return a boolean response.
  signUp: function(username, email, password) {
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
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
    return axios.get("/logout");
  },

  // Send a request to the api/user endpoint to see if req.user exists.
  // Expects a boolean response.
  checkAuthStatus: function() {
    return axios.get("/api/user");
  },

  // Refactored in dashboard API- not needed
  // Get dashboard data associated with a user's id (or however else we want to structure this). DRAFT.
  // getDashboard: function(id) {
  //   return axios.get(`/api/user/dashboard/${id}`);
  // },

  findUser: function(id) {
    return axios.get(`/api/users/user/${id}`);
  }

  // Add /create route here or in a seperate file? Thinking a seperate file.
};
