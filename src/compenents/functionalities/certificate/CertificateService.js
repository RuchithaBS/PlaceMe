import axios from 'axios';
import API_BASE_URL from '../../Config';

const CertificateService = {
  getAllCertificates: async () => {
    const response = await axios.get(`${API_BASE_URL}/certificates`);
    return response.data;
  },

  getCertificateById: async (certificateId) => {
    const response = await axios.get(`${API_BASE_URL}/certificates/${certificateId}`);
    return response.data;
  },

  createCertificate: async (certificate) => {
    const response = await axios.post(`${API_BASE_URL}/certificates`, certificate, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  },

  updateCertificate: async (certificateId, certificate) => {
    const response = await axios.put(`${API_BASE_URL}/certificates/${certificateId}`, certificate, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  },

  deleteCertificate: async (certificateId) => {
    await axios.delete(`${API_BASE_URL}/certificates/${certificateId}`);
  },
};



export default CertificateService;
