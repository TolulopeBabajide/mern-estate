import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './Components/Header';
import PrivateRoute from './Components/PrivateRoute';
import AdminSignIn from './admin/AdminSignin';
import PrivateAdmin from './admin/PrivateAdmin';
import AdminProfile from './admin/AdminProfile';
import CreateListing from './admin/CreateListing';

const App = () => {
  return (
    <BrowserRouter>
      {/* Header component is rendered on top of all routes */}
      <Header />
      <Routes>
        {/* Route for the Home page */}
        <Route element={<Home />} path="/" />
        {/* Route for the About page */}
        <Route element={<About />} path="/about" />
        {/* PrivateRoute is used for the Profile page, accessible only if the user is authenticated */}
        <Route element={<PrivateRoute />}>
          <Route element={<Profile />} path="/profile" />
        </Route>
        {/* Route for the SignIn page */}
        <Route element={<SignIn />} path="/signIn" />
        {/* Route for the SignUp page */}
        <Route element={<SignUp />} path="/signUp" />
        <Route element={<AdminSignIn/>} path="/adminpanel/signin"/>
        <Route element={<PrivateAdmin/>}>
          <Route element={<AdminProfile />} path='/adminpanel/admin/profile' />
          <Route element={<CreateListing />} path='/adminpanel/create-listing' />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
