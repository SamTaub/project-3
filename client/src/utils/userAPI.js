import axios from "axios";

export default {
  // Function that sends a post request to the /api/signup endpoint. Should return a boolean response.
  signUp: function(username, email, password) {
    return axios.post("/api/signup", {
      username: username,
      email: email,
      password: password
    });
  },

  // Function that sends a post request to the /api/login endpoint. Should return a boolean response.
  logIn: function(email, password) {
    return axios.post("api/login", {
      email: email,
      password: password
    });
  },

  // Get request to logout the current user. Should return a boolean response.
  logOut: function() {
    return axios.get("/logout");
  },

  // Function sends a request to the api/user endpoint to see if req.user exists.
  // Expects a boolean response.
  checkAuthStatus: function() {
    return axios.get("api/user");
  }
};
