import axios from "axios";

export default {
  createDesign: function(data) {
    return axios.post("/api/designs", data);
  },

  getAllPublishedDesigns: function(category, difficulty, sort) {
    // console.log(data);
    return axios.get(`/api/designs/published/${category}/${difficulty}/${sort}`);
  },

  getDesign: function(id) {
    return axios.get(`/api/designs/design/${id}`);
  },

  updateDesign: function(id, data) {
    return axios.put(`/api/designs/${id}`, data);
  }
};
