import React from 'react'

const Spinner = () => {
  return (
    <div className="container mt-4">
       <button className="btn btn-primary" type="button" disabled>
  <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
  Loading...
</button>

    </div>
  )
}

export default Spinner