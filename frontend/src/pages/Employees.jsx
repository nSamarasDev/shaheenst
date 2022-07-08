import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { reset, getEmployees } from '../features/employees/employeeSlice'
import EmployeeItem from '../components/EmployeeItem'

function Employees() {
  const { employees, isLoading, isSuccess } = useSelector(
    (state) => state.employees
  )

  const dispatch = useDispatch()

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset())
      }
    }
  }, [dispatch, isSuccess])

  useEffect(() => {
    dispatch(getEmployees())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton url='/' />
      <h1>Employees</h1>
      <div className='tickets'>
        <div className='ticket-headings'>
          <div>Date</div>
          <div>Slug</div>
          <div>Status</div>
          <div></div>
        </div>
        {employees.map((employee) => (
          <EmployeeItem key={employee._id} employee={employee} />
        ))}
      </div>
    </>
  )
}

export default Employees