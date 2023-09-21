import React from 'react'

const Badrequest = ({message}) => {
  return (
    <div className="error-container bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-md">
        <div className="flex items-center">
          <div className="w-6 h-6 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-red-500"
            >
              <path
                fillRule="evenodd"
                d="M2.293 2.293a1 1 0 011.414 0L10 8.586l6.293-6.293a1 1 0 111.414 1.414L11.414 10l6.293 6.293a1 1 0 01-1.414 1.414L10 11.414l-6.293 6.293a1 1 0 01-1.414-1.414L8.586 10 2.293 3.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm">{message}</p>
          </div>
        </div>
      </div>
  )
}

export default Badrequest
