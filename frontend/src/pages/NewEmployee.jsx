import React from 'react'
import { FaUser } from 'react-icons/fa'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createEmployee, reset} from '../features/employees/employeeSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewEmpolyee() {
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.employees)
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    status: '',
    socialSecurityNumber: '',
    driversLicenseNumber: '',
    licenseExpireDate: '',
    phoneNumber: '',
    address: '',
})

const {
  firstName, 
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

const onChange = (e) => {
  setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
  }))
}

useEffect(() => {
  if(isError) {
    toast.error(message)
  }

  if(isSuccess) {
    dispatch(reset())
    navigate('/employees')
  }

  dispatch(reset())
}, [dispatch, isError, isSuccess, navigate, message])

const onSubmit = (e) => {
  e.preventDefault()
  dispatch(createEmployee({
  firstName, 
  middleName, 
  lastName, 
  email,
  status, 
  socialSecurityNumber, 
  driversLicenseNumber, 
  licenseExpireDate, 
  phoneNumber, 
  address 
  }))
}

if(isLoading) {
  return <Spinner />
}

  return (
    <>
    <BackButton url='/' />
    <section className="heading">
        <h1>
            <FaUser /> Enter new employee's information 
        </h1>
        <p>Please create the new account</p>
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

export default NewEmpolyee