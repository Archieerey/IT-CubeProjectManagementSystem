import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Пожалуйста, войдите в систему.</p>;
  }

  return (
    <div className="user-profile">
      <h2>Профиль пользователя</h2>
      <p>Имя: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Роль: {user.role}</p>
    </div>
  );
};

export default UserProfile;