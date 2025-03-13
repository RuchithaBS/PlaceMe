// PlacementService.js
import axios from 'axios';
import API_BASE_URL from '../../Config';

class PlacementService {
  getAllPlacements() {
    return axios.get(`${API_BASE_URL}/placements`).then(response => response.data);
  }

  getPlacementById(placementId) {
    return axios.get(`${API_BASE_URL}/placements/${placementId}`).then(response => response.data);
  }

  createPlacement(placement) {
    return axios.post(`${API_BASE_URL}/placements`, placement).then(response => response.data);
  }

  updatePlacement(placementId, placement) {
    return axios.put(`${API_BASE_URL}/placements/${placementId}`, placement).then(response => response.data);
  }

  deletePlacement(placementId) {
    return axios.delete(`${API_BASE_URL}/placements/${placementId}`).then(response => response.data);
  }
}

export default new PlacementService();
