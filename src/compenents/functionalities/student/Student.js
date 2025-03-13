// Student.js
import React, { useEffect, useState } from 'react';
import StudentService from './StudentService';
import './student.css';
import axios from 'axios';
import API_BASE_URL from '../../Config';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    studentId: '',
    name: '',
    email: '',
    contact: '',
    yearOfStudy: '',
    branch: '',
    cgpa: '',
    placementStatus: '',
    collegeId: '',
    userId: '',
    akashCollege: null,
    user: null,
  });
  const [collegeSearchResults, setCollegeSearchResults] = useState([]);
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await StudentService.getAllStudents();
      setStudents(data);
      setFilteredStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({ ...prev, [name]: value }));

    // Trigger search for collegeId and userId fields
    if (name === 'collegeId' && value.length > 0) {
      searchCollegeId(value);
    } else if (name === 'collegeId') {
      setCollegeSearchResults([]);
    }

    if (name === 'userId' && value.length > 0) {
      searchUserId(value);
    } else if (name === 'userId') {
      setUserSearchResults([]);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchId(value);

    // Filter students based on the search query
    const filtered = students.filter(student =>
      student.studentId.toString().includes(value)
    );
    setFilteredStudents(filtered);
  };

  const searchCollegeId = async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/colleges/${query}`);
      setCollegeSearchResults(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      console.error('Error searching college IDs:', error);
      setCollegeSearchResults([]);
    }
  };

  const searchUserId = async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${query}`);
      setUserSearchResults(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      console.error('Error searching user IDs:', error);
      setUserSearchResults([]);
    }
  };

  const handleCollegeSelect = (college) => {
    setNewStudent((prev) => ({
      ...prev,
      collegeId: college.collegeId,
      akashCollege: college
    }));
    setCollegeSearchResults([]);
  };

  const handleUserSelect = (user) => {
    setNewStudent((prev) => ({
      ...prev,
      userId: user.userId,
      user
    }));
    setUserSearchResults([]);
  };

  const handleAddStudent = async () => {
    try {
      await StudentService.createStudent({
        ...newStudent,
        akashCollege: { collegeId: newStudent.collegeId },
        user: { userId: newStudent.userId },
      });
      fetchStudents();
      setNewStudent({
        studentId: '',
        name: '',
        email: '',
        contact: '',
        yearOfStudy: '',
        branch: '',
        cgpa: '',
        placementStatus: '',
        collegeId: '',
        userId: '',
        akashCollege: null,
        user: null,
      });
      setIsEditing(null);  // reset editing state
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };
  

  const handleUpdateStudent = async (studentId) => {
    try {
      const updatedData = {
        ...newStudent,
        akashCollege: { collegeId: newStudent.collegeId },
        user: { userId: newStudent.userId }
      };
      await StudentService.updateStudent(studentId, updatedData);
      fetchStudents(); // Refresh data
      setIsEditing(null);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };
  
  const handleDeleteStudent = async (studentId) => {
    try {
      await StudentService.deleteStudent(studentId);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="student">
      <div className="student-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Student ID..."
            value={searchId}
            onChange={handleSearchInputChange}
            className="search-input"
          />
        </div>
        <h1>Students</h1>
        <table className="student-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Year of Study</th>
              <th>Branch</th>
              <th>CGPA</th>
              <th>Placement Status</th>
              <th>College ID</th>
              <th>User ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="studentId"
                  value={newStudent.studentId}
                  onChange={handleInputChange}
                  placeholder="Student ID"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={newStudent.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={newStudent.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="contact"
                  value={newStudent.contact}
                  onChange={handleInputChange}
                  placeholder="Contact"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="yearOfStudy"
                  value={newStudent.yearOfStudy}
                  onChange={handleInputChange}
                  placeholder="Year of Study"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="branch"
                  value={newStudent.branch}
                  onChange={handleInputChange}
                  placeholder="Branch"
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  name="cgpa"
                  value={newStudent.cgpa}
                  onChange={handleInputChange}
                  placeholder="CGPA"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="placementStatus"
                  value={newStudent.placementStatus}
                  onChange={handleInputChange}
                  placeholder="Placement Status"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="collegeId"
                  value={newStudent.collegeId}
                  onChange={handleInputChange}
                  placeholder="College ID"
                />
                {collegeSearchResults.length > 0 && (
                  <div className="college-search-results">
                    {collegeSearchResults.map((college) => (
                      <div
                        key={college.collegeId}
                        onClick={() => handleCollegeSelect(college)}
                        className="college-search-item"
                      >
                        {college.collegeId} - {college.name}
                      </div>
                    ))}
                  </div>
                )}
              </td>
              <td>
                <input
                  type="text"
                  name="userId"
                  value={newStudent.userId}
                  onChange={handleInputChange}
                  placeholder="User ID"
                />
                {userSearchResults.length > 0 && (
                  <div className="user-search-results">
                    {userSearchResults.map((user) => (
                      <div
                        key={user.userId}
                        onClick={() => handleUserSelect(user)}
                        className="user-search-item"
                      >
                        {user.userId} - {user.username}
                      </div>
                    ))}
                  </div>
                )}
              </td>
              <td>
                {isEditing ? (
                  <button onClick={() => handleUpdateStudent(newStudent.studentId)}>Save</button>
                ) : (
                  <button onClick={handleAddStudent}>Add</button>
                )}
              </td>
            </tr>
            {(filteredStudents || students).map((student) => (
              <tr key={student.studentId}>
                <td>{student.studentId}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.contact}</td>
                <td>{student.yearOfStudy}</td>
                <td>{student.branch}</td>
                <td>{student.cgpa}</td>
                <td>{student.placementStatus}</td>
                <td>{student.akashCollege ? student.akashCollege.collegeId : 'N/A'}</td>
                <td>{student.user ? student.user.userId : 'N/A'}</td>
                <td>
                  <button onClick={() => { setIsEditing(student.studentId); setNewStudent(student); }}>Edit</button>
                  <button onClick={() => handleDeleteStudent(student.studentId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
