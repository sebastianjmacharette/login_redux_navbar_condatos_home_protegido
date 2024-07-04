import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../shared/Navbar';

function Home() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (storedUser) {
      setUser(storedUser);
    }

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <>
      <Navbar />
   
    </>
  );
}

export default Home;
