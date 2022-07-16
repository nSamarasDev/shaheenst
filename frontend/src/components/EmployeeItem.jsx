import React from 'react'
import {Link} from 'react-router-dom'

function EmployeeItem({employee}) {
  return (
    <div className='ticket'>
        <div>{new Date(employee.createdAt).toLocaleString('en-US')}</div>
        <div>{employee.firstName}</div>
        <div className={`status status-${employee.status}`}>
            {employee.status}
        </div>
        <Link to={`/employee/${employee._id}`} className='btn btn-reverse button1 btn-sm'>
            View
        </Link>
    </div>
  )
}

export default EmployeeItem