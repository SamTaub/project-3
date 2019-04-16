import axios from "axios";

export default {
  saveDesign: function(data) {
    return axios.post("/api/designs", data);
  },

  getDesign: function(id) {
    return axios.get(`api/designs/${id}`);
  },

  updateDesign: function(id) {
    return axios.put(`api/designs/${id}`);
  },

  deleteDesign: function(id) {
    return axios.delete(`api/designs/${id}`);
  }
};
