import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

interface User {
  node: {
    login: string;
    avatarUrl: string;
    url: string;
  };
}

interface Props {
  users: User[];
  onUserClick: (login: string) => void;
}

const UserList: React.FC<Props> = ({ users, onUserClick }) => {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const handleUserClick = (login: string) => {
    setSelectedUser(login);
    onUserClick(login);
  };

  return (
    <div className="user-list-container">
      <div className="users-section">
        <h2 className="text-left">Users</h2>
        <div className="d-flex flex-wrap justify-content-center">
          {users.map(({ node }) => (
            <div
              className={`card m-2 ${selectedUser === node.login ? 'selected-user' : ''}`}
              key={node.login}
              style={{
                width: '100px',
                cursor: 'pointer',
                border: '1px solid lightgray',
                boxShadow: selectedUser === node.login ? '0px 4px 15px rgba(0, 0, 225, 0.5)' : 'none',
                transition: 'box-shadow 0.3s ease-in-out' // Smooth transition effect
              }}
              onClick={() => handleUserClick(node.login)}
            >
              <img src={node.avatarUrl} alt={node.login} className="card-img-top" />
              <div className="card-body text-center">
                {node.login}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
