import React from 'react'

function Input({errorMessage, ...props}) {
  return (
    <div className='input-text'>
        <input {...props} />
        {errorMessage && <div className='error-message'>{errorMessage}</div>}
    </div>
  )
}

export default Input