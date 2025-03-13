// UserService.js
import axios from 'axios';
import API_BASE_URL from '../../Config';

class UserService {
  getAllUsers() {
    return axios.get(`${API_BASE_URL}/users`).then(response => response.data);
  }

  getUserById(userId) {
    return axios.get(`${API_BASE_URL}/users/${userId}`).then(response => response.data);
  }

  createUser(user) {
    return axios.post(`${API_BASE_URL}/users`, user).then(response => response.data);
  }

  updateUser(userId, user) {
    return axios.put(`${API_BASE_URL}/users/${userId}`, user).then(response => response.data);
  }

  deleteUser(userId) {
    return axios.delete(`${API_BASE_URL}/users/${userId}`).then(response => response.data);
  }
}

export default new UserService();
