import axios from "axios";

export default {
  createDesign: function(data) {
    return axios.post("/api/designs", data);
  },

  getAllDesigns: function(data){
    return axios.get("/api/designs/published")
  },

  getDesign: function(id) {
    return axios.get(`api/designs/${id}`);
  },

  updateDesign: function(id, data) {
    return axios.put(`api/designs/${id}`, data);
  },

  deleteDesign: function(id) {
    return axios.delete(`api/designs/${id}`);
  }
};
