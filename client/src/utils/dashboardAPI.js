import axios from "axios";

export default {
  // Get dashboard data associated with a user's id (or however else we want to structure this). DRAFT.
  getPublishedDesigns: function(userId) {
      console.log(`dashboard API getting published designs by ${userId}`);
    return axios.get(`/api/users/dashboard/${userId}/published`);
  }

  // Add /create route here or in a seperate file? Thinking a seperate file.
};
