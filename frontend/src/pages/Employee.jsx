import React, {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import Modal from 'react-modal'
import {FaPlus} from 'react-icons/fa'
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
            <h2>Notes</h2>
        </header>

        {employee.status !== 'closed' && (
            <button onClick={openModal} className='btn'><FaPlus /> Add Note</button>
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
            <button onClick={onEmployeeClose} className='btn btn-block btn-danger'>Close Out Employee</button>
        )}
        
    </div>
  )
}

export default Employee