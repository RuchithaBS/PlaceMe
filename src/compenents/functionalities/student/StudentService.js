// StudentService.js
import axios from 'axios';
import API_BASE_URL from '../../Config';

const getAllStudents = async () => {
  const response = await axios.get(`${API_BASE_URL}/students`);
  return response.data;
};

const createStudent = async (student) => {
  const response = await axios.post(`${API_BASE_URL}/students`, student);
  return response.data;
};

const updateStudent = async (studentId, student) => {
  const response = await axios.put(`${API_BASE_URL}/students/${studentId}`, student);
  return response.data;
};

const deleteStudent = async (studentId) => {
  const response = await axios.delete(`${API_BASE_URL}/students/${studentId}`);
  return response.data;
};

export default {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
};

