import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';
import AddStaff from './components/staffs/AddStaff/AddStaff';
import EditStaff from './components/staffs/EditStaff/EditStaff';
import StaffList from './components/staffs/StaffList/StaffList';
import ViewStaff from './components/staffs/ViewStaff/ViewStaff';
import Location from './components/Navbar/Location';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <ToastContainer autoClose={1000} />
      <Routes>
        <Route path='/staff-app' element={<StaffList />} ></Route>
        <Route path='/staff-app/staff/location' element={<Location />} ></Route>
        <Route path='/staff-app/staff/list' element={<StaffList />} ></Route>
        <Route path='/staff-app/staff/add' element={<AddStaff />} ></Route>
        <Route path='/staff-app/staff/edit/:staffId' element={<EditStaff />} ></Route>
        <Route path='/staff-app/staff/view/:staffId' element={<ViewStaff />} ></Route>
      </Routes>
    </React.Fragment>
  );


}

export default App;
