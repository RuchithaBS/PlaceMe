import React, { useEffect, useState } from 'react';
import CertificateService from './CertificateService';
import './certificate.css';
import axios from 'axios';
import API_BASE_URL from '../../Config';

const Certificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [newCertificate, setNewCertificate] = useState({
    certificateId: '',
    dateIssued: '',
    studentId: '',
    courseName: '',
    student: null
  });
  const [studentSearchResults, setStudentSearchResults] = useState([]);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const data = await CertificateService.getAllCertificates();
      const formattedData = data.map(cert => ({
        ...cert,
        dateIssued: cert.dateIssued ? new Date(cert.dateIssued).toISOString().split('T')[0] : '',
        displayStudentId: cert.student ? cert.student.studentId : null
      }));
      setCertificates(formattedData);
      setFilteredCertificates(formattedData); // Set initial filtered data
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCertificate((prev) => ({ ...prev, [name]: value }));

    // Trigger student search for studentId field
    if (name === 'studentId' && value.length > 0) {
      searchStudentId(value);
    } else if (name === 'studentId') {
      setStudentSearchResults([]);
    }
  };

  const handleAddCertificate = async () => {
    try {
      await CertificateService.createCertificate({
        ...newCertificate,
        student: { studentId: newCertificate.studentId }
      });
      fetchCertificates();
      setNewCertificate({ certificateId: '', dateIssued: '', studentId: '', courseName: '', student: null });
    } catch (error) {
      console.error('Error adding certificate:', error);
    }
  };

  const handleUpdateCertificate = async (certificateId) => {
    try {
      await CertificateService.updateCertificate(certificateId, {
        ...newCertificate,
        student: { studentId: newCertificate.studentId }
      });
      setIsEditing(null);
      fetchCertificates();
    } catch (error) {
      console.error('Error updating certificate:', error);
    }
  };

  const handleDeleteCertificate = async (certificateId) => {
    try {
      await CertificateService.deleteCertificate(certificateId);
      fetchCertificates();
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
  };

  const searchStudentId = async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/students/${query}`);
      setStudentSearchResults(response.data);
    } catch (error) {
      console.error('Error searching student IDs:', error);
    }
  };

  const handleStudentSelect = (student) => {
    setNewCertificate((prev) => ({
      ...prev,
      studentId: student.studentId,
      student
    }));
    setStudentSearchResults([]);
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchId(value);

    // Filter certificates based on the search query
    const filtered = certificates.filter(cert =>
      cert.certificateId.toString().includes(value)
    );
    setFilteredCertificates(filtered);
  };

  return (
    <div className="certificate">
      <div className="certificate-container">
        <div className="search-bar">
        <input
          type="text"
          placeholder="Search Certificate ID..."
          value={searchId}
          onChange={handleSearchInputChange}
          className="search-input"
        />
      </div>
        <h1>Certificates</h1>
        <table className="certificate-table">
          <thead>
            <tr>
              <th>Certificate ID</th>
              <th>Date Issued</th>
              <th>Student ID</th>
              <th>Course Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="certificateId"
                  value={newCertificate.certificateId}
                  onChange={handleInputChange}
                  placeholder="ID"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="dateIssued"
                  value={newCertificate.dateIssued}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="studentId"
                  value={newCertificate.studentId}
                  onChange={handleInputChange}
                  placeholder="Student ID"
                />
                {studentSearchResults.length > 0 && (
                  <div className="student-search-results">
                    {studentSearchResults.map((student) => (
                      <div
                        key={student.studentId}
                        onClick={() => handleStudentSelect(student)}
                        className="student-search-item"
                      >
                        {student.studentId}
                      </div>
                    ))}
                  </div>
                )}
              </td>
              <td>
                <input
                  type="text"
                  name="courseName"
                  value={newCertificate.courseName}
                  onChange={handleInputChange}
                  placeholder="Course Name"
                />
              </td>
              <td>
                {isEditing ? (
                  <button onClick={() => handleUpdateCertificate(newCertificate.certificateId)}>Save</button>
                ) : (
                  <button onClick={handleAddCertificate}>Add</button>
                )}
              </td>
            </tr>

            {filteredCertificates.map((cert) => (
              <tr key={cert.certificateId}>
                <td>{cert.certificateId}</td>
                <td>{cert.dateIssued}</td>
                <td>{cert.displayStudentId ? cert.displayStudentId : 'N/A'}</td>
                <td>{cert.courseName}</td>
                <td>
                  <button onClick={() => { setIsEditing(cert.certificateId); setNewCertificate(cert); }}>Edit</button>
                  <button onClick={() => handleDeleteCertificate(cert.certificateId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Certificate;
