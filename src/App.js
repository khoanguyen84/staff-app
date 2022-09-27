import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import AddStaff from './components/staffs/AddStaff/AddStaff';
import EditStaff from './components/staffs/EditStaff/EditStaff';
import StaffList from './components/staffs/StaffList/StaffList';
import ViewStaff from './components/staffs/ViewStaff/ViewStaff';

function App() {
  return (
    <React.Fragment>
      <Navbar/>
      <Routes>
          <Route path='/staff-app' element={<Navigate to={'/staff-app/staff/list'}/>} ></Route>
          <Route path='/' element={<Navigate to={'/staff-app/staff/list'}/>} ></Route>
          <Route path='/staff-app/staff/list' element={<StaffList/>} ></Route>
          <Route path='/staff-app/staff/add' element={<AddStaff/>} ></Route>
          <Route path='/staff-app/staff/edit/:staffId' element={<EditStaff/>} ></Route>
          <Route path='/staff-app/staff/view/:staffId' element={<ViewStaff/>} ></Route>
      </Routes>
    </React.Fragment>
  );
}

export default App;
