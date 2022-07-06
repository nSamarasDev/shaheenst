import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { reset, getEmployees } from '../features/employees/employeeSlice'
//import TicketItem from '../components/TicketItem'

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
          <div>:</div>
          <div>Status</div>
          <div></div>
        </div>
        {/*{employees.map((employee) => (
          <TicketItem key={ticket._id} ticket={ticket} />
        ))}*/}
      </div>
    </>
  )
}

export default Employees