import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PrivateRoutes({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return children;
}