// CollegeService.js
import axios from 'axios';
import API_BASE_URL from '../../Config';

class CollegeService {
  getAllColleges() {
    return axios.get(`${API_BASE_URL}/colleges`).then(response => response.data);
  }

  getCollegeById(collegeId) {
    return axios.get(`${API_BASE_URL}/colleges/${collegeId}`).then(response => response.data);
  }

  createCollege(college) {
    return axios.post(`${API_BASE_URL}/colleges`, college).then(response => response.data);
  }

  updateCollege(collegeId, college) {
    return axios.put(`${API_BASE_URL}/colleges/${collegeId}`, college).then(response => response.data);
  }

  deleteCollege(collegeId) {
    return axios.delete(`${API_BASE_URL}/colleges/${collegeId}`).then(response => response.data);
  }
}

export default new CollegeService();
