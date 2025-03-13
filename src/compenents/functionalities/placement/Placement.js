import React, { useEffect, useState } from 'react';
import PlacementService from './PlacementService';

import './placement.css';
import axios from 'axios';
import API_BASE_URL from '../../Config';

const Placement = () => {
  const [placements, setPlacements] = useState([]);
  const [filteredPlacements, setFilteredPlacements] = useState([]);
  const [newPlacement, setNewPlacement] = useState({
    placementId: '',
    collegeId: '',
    companyName: '',
    jobRole: '',
    akashCollege: null
  });
  const [collegeSearchResults, setCollegeSearchResults] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const data = await PlacementService.getAllPlacements();
      setPlacements(data);
      setFilteredPlacements(data);
    } catch (error) {
      console.error('Error fetching placements:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPlacement((prev) => ({ ...prev, [name]: value }));

    if (name === 'collegeId' && value.length > 0) {
      searchCollegeId(value);
    } else if (name === 'collegeId') {
      setCollegeSearchResults([]);
    }
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchId(value);

    const filtered = placements.filter(placement =>
      placement.placementId.toString().includes(value)
    );
    setFilteredPlacements(filtered);
  };

  const searchCollegeId = async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/colleges/${query}`);
      setCollegeSearchResults(response.data);
    } catch (error) {
      console.error('Error searching college IDs:', error);
    }
  };

  const handleCollegeSelect = (college) => {
    setNewPlacement((prev) => ({
      ...prev,
      collegeId: college.collegeId,
      akashCollege: college
    }));
    setCollegeSearchResults([]);
  };

  const handleAddPlacement = async () => {
    try {
      await PlacementService.createPlacement({
        ...newPlacement,
        akashCollege: { collegeId: newPlacement.collegeId }
      });
      fetchPlacements();
      setNewPlacement({ placementId: '', collegeId: '', companyName: '', jobRole: '', akashCollege: null });
    } catch (error) {
      console.error('Error adding placement:', error);
    }
  };

  const handleUpdatePlacement = async (placementId) => {
    try {
      await PlacementService.updatePlacement(placementId, {
        ...newPlacement,
        akashCollege: { collegeId: newPlacement.collegeId }
      });
      setIsEditing(null);
      fetchPlacements();
    } catch (error) {
      console.error('Error updating placement:', error);
    }
  };

  const handleDeletePlacement = async (placementId) => {
    try {
      await PlacementService.deletePlacement(placementId);
      fetchPlacements();
    } catch (error) {
      console.error('Error deleting placement:', error);
    }
  };

  return (
    <div className="placement">
      <div className="placement-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Placement ID..."
            value={searchId}
            onChange={handleSearchInputChange}
            className="search-input"
          />
        </div>
        <h1>Placements</h1>
        <table className="placement-table">
          <thead>
            <tr>
              <th>Placement ID</th>
              <th>College ID</th>
              <th>Company Name</th>
              <th>Job Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="placementId"
                  value={newPlacement.placementId}
                  onChange={handleInputChange}
                  placeholder="Placement ID"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="collegeId"
                  value={newPlacement.collegeId}
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
                        {college.collegeId}
                      </div>
                    ))}
                  </div>
                )}
              </td>
              <td>
                <input
                  type="text"
                  name="companyName"
                  value={newPlacement.companyName}
                  onChange={handleInputChange}
                  placeholder="Company Name"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="jobRole"
                  value={newPlacement.jobRole}
                  onChange={handleInputChange}
                  placeholder="Job Role"
                />
              </td>
              <td>
                {isEditing ? (
                  <button onClick={() => handleUpdatePlacement(newPlacement.placementId)}>Save</button>
                ) : (
                  <button onClick={handleAddPlacement}>Add</button>
                )}
              </td>
            </tr>
            {(filteredPlacements || placements).map((placement) => (
              <tr key={placement.placementId}>
                <td>{placement.placementId}</td>
                <td>{placement.akashCollege ? placement.akashCollege.collegeId : 'N/A'}</td>
                <td>{placement.companyName}</td>
                <td>{placement.jobRole}</td>
                <td>
                  <button onClick={() => { setIsEditing(placement.placementId); setNewPlacement(placement); }}>Edit</button>
                  <button onClick={() => handleDeletePlacement(placement.placementId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Placement;
