import React from 'react'
import axios from 'axios'
import { FaUser } from 'react-icons/fa'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'
import {createEmployee, updateEmployee, reset} from '../features/employees/employeeSlice'
import {toast} from 'react-toastify'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'


function UpdateEmployee() {
  const {employee} = useSelector((state) => state.employees)
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.employees)



  const [formData, setFormData] = useState({
    firstName: `${employee.firstName}`,
    middleName: `${employee.middleName}`,
    lastName: `${employee.lastName}`,
    email: `${employee.email}`,
    status: `${employee.status}`,
    socialSecurityNumber: `${employee.socialSecurityNumber}`,
    driversLicenseNumber: `${employee.driversLicenseNumber}`,
    licenseExpireDate: `${employee.licenseExpireDate}`,
    phoneNumber: `${employee.phoneNumber}`,
    address: `${employee.address}`,
})

const {
  firstName ,
  middleName, 
  lastName, 
  email,
  status, 
  socialSecurityNumber, 
  driversLicenseNumber, 
  licenseExpireDate, 
  phoneNumber, 
  address 
} = formData

const dispatch = useDispatch()
const navigate = useNavigate()
const {employeeId} = useParams()

const onChange = (e) => {
  setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
  }))
}



//const onSubmit = (e) => {
//  e.preventDefault()
//  console.log(e.target[0].value)  

//}

const onSubmit = (e) => {
  e.preventDefault()
  dispatch(updateEmployee({
  employeeId,
  formData,
  }))
}
useEffect(() => {
  if(isError) {
    toast.error(message)
  }

  dispatch(reset())
}, [dispatch, isError, message])


if(isLoading) {
  return <Spinner />
}

  return (
    <>
     <BackButton url='/employees' />
    <section className="heading">
        <h1>
            <FaUser /> Update Driver information 
        </h1>
        <p>Please create the new account</p>
    </section>
        <section className='padding1'>
        <div>
           <p>Please press the big back button after submit you submit new information</p>
        </div>
        </section>
    <section className="form">
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <input 
                type="text" 
                className="form-control" 
                id="firstName" 
                name='firstName'
                value={firstName}
                onChange={onChange} 
                placeholder='Enter employees first name' 
                required
                />
            </div>
            <div className="form-group">
                <input 
                type="text" 
                className="form-control" 
                id="middleName" 
                name='middleName'
                value={middleName}
                onChange={onChange} 
                placeholder='Enter employees middle name or type none' 
                required
                />
            </div>
            <div className="form-group">
                <input 
                type="text" 
                className="form-control" 
                id="lastName" 
                name='lastName'
                value={lastName}
                onChange={onChange} 
                placeholder='Enter employees last name' 
                required
                />
            </div>
            <div className="form-group">
                <input 
                type="email" 
                className="form-control" 
                id="email" 
                name='email'
                value={email}
                onChange={onChange} 
                placeholder='Please enter employees email' 
                required
                />
            </div>
            <div className="form-group">
                <input 
                type="text" 
                className="form-control" 
                id="status" 
                name='status'
                value={status}
                onChange={onChange} 
                placeholder='Please enter employee status as new, current, or closed' 
                required
                />
            </div>
            <div className="form-group">
                <input 
                type="text" 
                className="form-control" 
                id="socialSecurityNumber" 
                name='socialSecurityNumber'
                value={socialSecurityNumber}
                onChange={onChange} 
                placeholder='Enter employees social security number. Numbers only' 
                required
                />
            </div>

            <div className="form-group">
                <input 
                type="text" 
                className="form-control" 
                id="driversLicenseNumber" 
                name='driversLicenseNumber'
                value={driversLicenseNumber}
                onChange={onChange} 
                placeholder='Please enter employees drivers license number' 
                required
                />
            </div>
            
            <div className="form-group">
                <input 
                type="text" 
                className="form-control" 
                id="licenseExpireDate" 
                name='licenseExpireDate'
                value={licenseExpireDate}
                onChange={onChange} 
                placeholder='Please enter license state and expire date in xx/xx/xxxx format' 
                required
                />
            </div>
            <div className="form-group">
                <input 
                type="text" 
                className="form-control" 
                id="phoneNumber" 
                name='phoneNumber'
                value={phoneNumber}
                onChange={onChange} 
                placeholder='Enter employees phone number' 
                required
                />
            </div>
            <div className="form-group">
                <input 
                type="text" 
                className="form-control" 
                id="address" 
                name='address'
                value={address}
                onChange={onChange} 
                placeholder='Enter employees address' 
                required
                />
            </div>
            
            <div className="form-group">
                <button className='btn btn-block'>
                    Submit
                </button>
                
            </div>
        </form>
    </section>
    </>
  )
}
export default UpdateEmployee