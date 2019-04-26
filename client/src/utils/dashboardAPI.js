import axios from "axios";

export default {
  getPublishedDesigns: function(userId) {
    return axios.get(`/api/users/dashboard/${userId}/published`);
  },

  getDrafts: function(userId) {
    return axios.get(`/api/users/dashboard/${userId}/drafts`);
  },
  
  getFavorites: function(userId) {
    return axios.get(`/api/users/${userId}/favorites`)
  },

  publishDesign: function(designId, data) {
    return axios.put(`/api/designs/publish/${designId}`, data);
  },

  unpublishDesign: function(designId) {
    return axios.put(`/api/designs/unpublish/${designId}`);
  },

  deleteDesign: function(designId) {
    return axios.delete(`/api/designs/design/${designId}`);
  },

  addFavorite: function(userId, designId) {
    return axios.put(`/api/users/${userId}/favorites/${designId}`)
  },

  removeFavorite: function(userId, designId) {
    return axios.delete(`/api/users/${userId}/favorites/${designId}`)
  }
};
