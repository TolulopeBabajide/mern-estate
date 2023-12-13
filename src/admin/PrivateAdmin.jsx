import React from 'react'

import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateAdmin = () => {
  // Access the currentUser from the Redux store
  const { currentUser } = useSelector((state) => state.user);

  // If currentUser exists, render the child components (Outlet)
  // If currentUser doesn't exist, navigate to the Sign In page

  return currentUser && currentUser.role === "admin" ? <Outlet /> : <Navigate to='/adminpanel/signin' />;
};

export default PrivateAdmin