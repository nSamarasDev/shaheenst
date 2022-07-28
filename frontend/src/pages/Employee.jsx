import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import Modal from 'react-modal'
import {FaPlus, FaTrash} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {getEmployee, closeEmployee} from '../features/employees/employeeSlice'
import {getNotes, createNote,  reset as notesReset,} from '../features/notes/noteSlice'
import {useParams, useNavigate} from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'

const customStyles = {
    content: {
      width: '600px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      position: 'relative',
    },
}

  Modal.setAppElement('#root')

function Employee() {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [noteText, setNoteText] = useState('')
    const {employee, isLoading, isSuccess, isError, message} = useSelector((state) => state.employees)
    const {notes, isLoading: notesIsLoading} = useSelector((state) => state.notes)

    const params = useParams()
    const dispatch = useDispatch()
    const {employeeId} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }

        dispatch(getEmployee(employeeId))
        dispatch(getNotes(employeeId))
        // eslint-disable-next-line
    }, [isError, message, employeeId])

    const onEmployeeClose = () => {
        dispatch(closeEmployee(employeeId))
        toast.success('Employee Closed Out')
        navigate('/employees')
    }

    // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({ noteText, employeeId }))
    closeModal()
  }


// Open/close modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

    if (isLoading || notesIsLoading) {
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
            </h2 >
            <h3>Date Created: {new Date(employee.createdAt).toLocaleString('en-US')}</h3>
            <h3>Add something else :</h3> <Link to={`/employee/${employee._id}/update`} className='button1 btn btn-sm'>
            Click to correct or update information
        </Link>
            <hr />
            <div className='grid-container'>
              <div className="item">First Name:</div>
              <div className="item">{employee.firstName}</div>
              <div className="item">Middle Name:</div>
              <div className="item">{employee.middleName}</div>
              <div className="item">Last Name:</div>
              <div className="item">{employee.lastName}</div>
              <div className="item">Email:</div>
              <div className="item">{employee.email}</div>
              <div className="item">Social Security Number:</div>
              <div className="item">{employee.socialSecurityNumber}</div>
              <div className="item">Drivers License Number:</div>
              <div className="item">{employee.driversLicenseNumber}</div>
              <div className="item">License State & Expire Date:</div>
              <div className="item">{employee.licenseExpireDate}</div>
              <div className="item">Phone Number:</div>
              <div className="item">{employee.phoneNumber}</div>
              <div className="item">Address:</div>
              <div className="item">{employee.address}</div>
            </div>
            <h2>Notes</h2>
        </header>

        {employee.status !== 'closed' && (
            <button onClick={openModal} className='btn button1'><FaPlus /> Add Note</button>
        )}

<Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

        {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

        {employee.status !== 'closed' && (
            <button onClick={onEmployeeClose} className='btn btn-block btn-danger button1'>Close Out Employee</button>
        )}
        
    </div>
  )
}

export default Employee