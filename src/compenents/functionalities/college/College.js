import React, { useEffect, useState } from 'react';
import CollegeService from './CollegeService';
import './college.css';
import axios from 'axios';
import API_BASE_URL from '../../Config';

const College = () => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [newCollege, setNewCollege] = useState({
    collegeId: '',
    name: '',
    location: '',
    contact: '',
    userId: '',
    user: null,
    placement: []
  });
  const [userSearchResults, setUserSearchResults] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const data = await CollegeService.getAllColleges();
      setColleges(data);
      setFilteredColleges(data); // Set initial filtered list to all colleges
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCollege((prev) => ({ ...prev, [name]: value }));

    // Trigger user search for userId field
    if (name === 'userId' && value.length > 0) {
      searchUserId(value);
    } else if (name === 'userId') {
      setUserSearchResults([]);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchId(value);

    // Filter colleges based on the search query
    const filtered = colleges.filter(college =>
      college.collegeId.toString().includes(value)
    );
    setFilteredColleges(filtered);
  };

  const searchUserId = async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${query}`);
      setUserSearchResults(response.data);
    } catch (error) {
      console.error('Error searching user IDs:', error);
    }
  };

  const handleUserSelect = (user) => {
    setNewCollege((prev) => ({
      ...prev,
      userId: user.userId,
      user  // Auto-fill user details
    }));
    setUserSearchResults([]);
  };

  const handleAddCollege = async () => {
    try {
      await CollegeService.createCollege({
        ...newCollege,
        user: { userId: newCollege.userId }  // Include user in the required format
      });
      fetchColleges();
      setNewCollege({ collegeId: '', name: '', location: '', contact: '', userId: '', user: null });
    } catch (error) {
      console.error('Error adding college:', error);
    }
  };

  const handleUpdateCollege = async (collegeId) => {
    try {
      await CollegeService.updateCollege(collegeId, {
        ...newCollege,
        user: { userId: newCollege.userId }  // Include user in the required format
      });
      setIsEditing(null);
      fetchColleges();
    } catch (error) {
      console.error('Error updating college:', error);
    }
  };

  const handleDeleteCollege = async (collegeId) => {
    try {
      await CollegeService.deleteCollege(collegeId);
      fetchColleges();
    } catch (error) {
      console.error('Error deleting college:', error);
    }
  };

  return (
    <div className="college">
      <div className="college-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search College ID..."
            value={searchId}
            onChange={handleSearchInputChange}
            className="search-input"
          />
        </div>
        <h1>Colleges</h1>
        <table className="college-table">
          <thead>
            <tr>
              <th>College ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Contact</th>
              <th>User ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="collegeId"
                  value={newCollege.collegeId}
                  onChange={handleInputChange}
                  placeholder="College ID"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={newCollege.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="location"
                  value={newCollege.location}
                  onChange={handleInputChange}
                  placeholder="Location"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="contact"
                  value={newCollege.contact}
                  onChange={handleInputChange}
                  placeholder="Contact"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="userId"
                  value={newCollege.userId}
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
                        {user.userId}
                      </div>
                    ))}
                  </div>
                )}
              </td>
              <td>
                {isEditing ? (
                  <button onClick={() => handleUpdateCollege(newCollege.collegeId)}>Save</button>
                ) : (
                  <button onClick={handleAddCollege}>Add</button>
                )}
              </td>
            </tr>
            {(filteredColleges || colleges).map((college) => (
              <tr key={college.collegeId}>
                <td>{college.collegeId}</td>
                <td>{college.name}</td>
                <td>{college.location}</td>
                <td>{college.contact}</td>
                <td>{college.user ? college.user.userId : 'N/A'}</td>
                <td>
                  <button onClick={() => { setIsEditing(college.collegeId); setNewCollege(college); }}>Edit</button>
                  <button onClick={() => handleDeleteCollege(college.collegeId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default College;
