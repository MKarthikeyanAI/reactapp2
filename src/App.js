// App.js
import React, { useState, useEffect } from 'react';
import { fetchUsers } from './api/userAPI';
import UserCard from './components/UserCard';

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
      setFilteredUsers(data);
    };
    getUsers();
  }, []);

  // Filter users based on search query
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Information Fetcher</h1>
      <input
        type="text"
        placeholder="Search users by name"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        style={{ padding: '10px', marginBottom: '20px', width: '300px' }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default App;
