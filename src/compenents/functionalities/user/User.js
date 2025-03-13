import React, { useEffect, useState } from 'react';
import UserService from './UserService';
import './user.css';

const User = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    userId: '',
    username: '',
    password: '',
    type: '' // Type could be "STUDENT" or "COLLEGE"
  });
  const [searchUsername, setSearchUsername] = useState('');
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await UserService.getAllUsers();
      console.log("Fetched users:", data); // Log data to see the actual response structure
  
      // Map type to readable format, accounting for possible variations
      const usersWithReadableTypes = data.map(user => ({
        ...user,
        type: user.type === "STUDENT" ? 'STUDENT' 
            : user.type === "COLLEGE" ? 'COLLEGE' : 'Unkown'
      }));
  
      setUsers(usersWithReadableTypes);
      setFilteredUsers(usersWithReadableTypes); // Set initial filtered list to all users
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchUsername(value);

    // Filter users based on the search query
    const filtered = users.filter(user =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleAddUser = async () => {
    try {
      await UserService.createUser({
        ...newUser,
        type: newUser.type === 'STUDENT' ? 0 : 1 // Map type to ordinal value for API
      });
      fetchUsers();
      setNewUser({ userId: '', username: '', password: '', type: '' });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleUpdateUser = async (userId) => {
    try {
      await UserService.updateUser(userId, {
        ...newUser,
        type: newUser.type === 'STUDENT' ? '0' : '1' // Map type to ordinal value for API
      });
      setIsEditing(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await UserService.deleteUser(userId);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="user">
      <div className="user-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search Username..."
            value={searchUsername}
            onChange={handleSearchInputChange}
            className="search-input"
          />
        </div>
        <h1>Users</h1>
        <table className="user-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Password</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="userId"
                  value={newUser.userId}
                  onChange={handleInputChange}
                  placeholder="User ID"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                />
              </td>
              <td>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                />
              </td>
              <td>
                <select
                  name="type"
                  value={newUser.type}
                  onChange={handleInputChange}
                >
                  <option value="">Select Type</option>
                  <option value="STUDENT">Student</option>
                  <option value="COLLEGE">College</option>
                </select>
              </td>
              <td>
                {isEditing ? (
                  <button onClick={() => handleUpdateUser(newUser.userId)}>Save</button>
                ) : (
                  <button onClick={handleAddUser}>Add</button>
                )}
              </td>
            </tr>
            {(filteredUsers || users).map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.type}</td>
                <td>
                  <button onClick={() => { setIsEditing(user.userId); setNewUser(user); }}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.userId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
