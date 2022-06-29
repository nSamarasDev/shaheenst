import React from 'react'
import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

function Home() {
  return (
    <>
        <section className="heading">
          <h1>What do you need to do</h1>
          <p>Please choose from an option below</p>
        </section>

        <Link to='/new-employee' className='btn btn-reverse btn-block'>
          <FaQuestionCircle /> Create employee information
        </Link>

        <Link to='/employees' className='btn btn-block'>
          <FaTicketAlt /> View all employees
        </Link>
    </>
  )
}

export default Home