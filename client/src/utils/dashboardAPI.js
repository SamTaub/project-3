import axios from "axios";

export default {
  // Get dashboard data associated with a user's id (or however else we want to structure this). DRAFT.
  getPublishedDesigns: function(userId) {
    console.log(`dashboard API getting published designs by ${userId}`);
    return axios.get(`/api/users/dashboard/${userId}/published`);
  },

  getDrafts: function(userId) {
    console.log(`dashboard API getting drafts by ${userId}`);
    return axios.get(`/api/users/dashboard/${userId}/drafts`);
  },
  
  getFavorites: function(userId) {
    console.log(`dashboard API getting favorites for ${userId}`);
    return axios.get(`/api/users/${userId}/favorites`)
  },

  publishDesign: function(designId, data) {
    console.log(`Dashboard API publishing design ${designId}`);
    return axios.put(`/api/designs/publish/${designId}`, data);
  },

  unpublishDesign: function(designId) {
    console.log(`Dashboard API unpublishing design ${designId}`);
    return axios.put(`/api/designs/unpublish/${designId}`);
  },

  deleteDesign: function(designId) {
    console.log(`Deleting design ${designId}...`);
    return axios.delete(`/api/designs/design/${designId}`);
  }
  // Add /create route here or in a seperate file? Thinking a seperate file.
};
