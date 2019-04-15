import axios from "axios";

export default {
  // Get dashboard data associated with a user's id (or however else we want to structure this). DRAFT.
  getPublishedDesigns: function() {
      console.log("dashboard API getting published designs");
    return axios.get("api/users/dashboard/published");
  }

  // Add /create route here or in a seperate file? Thinking a seperate file.
};
