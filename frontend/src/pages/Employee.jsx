import React, {useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {getEmployee, reset, closeEmployee} from '../features/employees/employeeSlice'
import {useParams, useNavigate} from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

function Employee() {
    const {employee, isLoading, isSuccess, isError, message} = useSelector((state) => state.employees)

    const params = useParams()

    const dispatch = useDispatch()

    const {employeeId} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        dispatch(getEmployee(employeeId))
        // eslint-disable-next-line
    }, [isError, message, employeeId])

    const onEmployeeClose = () => {
        dispatch(closeEmployee(employeeId))
        toast.success('Employee Closed Out')
    }

    if (isLoading) {
        return <Spinner />
    }

    if(isError) {
        return <h3>Somthing Went Wrong</h3>
    }

  return (
    <div className='ticket-page'>
        <header className='ticket-header'>
            <BackButton url='/employees' />
            <h2>
                Employee ID: {employee._id}
                <span className={`status status-${employee.status}`}>
                    {employee.status}
                </span>
            </h2>
            <h3>Date Created: {new Date(employee.createdAt).toLocaleString('en-US')}</h3>
            <h3>Add Somthing Else: // Note from developer</h3>
            <hr />
            <div className='ticket-desc'>
                <h3>Employee Information</h3>
                <p>First Name:  {employee.firstName}</p>
                <p>Middle Name: {employee.middleName}</p>
                <p>Last Name: {employee.lastName}</p>
                <p>Email: {employee.email}</p>
                <p>Social Security Number: {employee.socialSecurityNumber}</p>
                <p>Drivers License Number: {employee.driversLicenseNumber}</p>
                <p>License State & Expire Date: {employee.licenseExpireDate}</p>
                <p>Phone Number: {employee.phoneNumber}</p>
                <p>Address: {employee.address}</p>
            </div>
        </header>
        {employee.status !== 'closed' && (
            <button onClick={onEmployeeClose} className='btn btn-block btn-danger'>Close Out Employee</button>
        )}
        
    </div>
  )
}

export default Employee