import React from 'react'

const ErrText = ({err}) => {
  return (
    <div>
        <small className='text-red-600 font-semibold'>{err}</small>
    </div>
  )
}

export default ErrText