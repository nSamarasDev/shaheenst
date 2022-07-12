import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Employees from './pages/Employees';
import Employee from './pages/Employee';
import NewEmployee from './pages/NewEmployee';
import UpdateEmployee from './pages/UpdateEmployee'

import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/new-employee' element={<PrivateRoute />}>
              <Route path='/new-employee' element={<NewEmployee />} />
            </Route>

            <Route path='/employees' element={<PrivateRoute />}>
              <Route path='/employees' element={<Employees />} />
            </Route>

            <Route path='/employee/:employeeId' element={<PrivateRoute />}>
              <Route path='/employee/:employeeId' element={<Employee />} />
            </Route>

            <Route path='/employee/:employeeId/update' element={<PrivateRoute />}>
              <Route path='/employee/:employeeId/update' element={<UpdateEmployee />} />
            </Route>

            
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
