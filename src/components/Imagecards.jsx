import React from 'react'

const Imagecards = ({src, alt}) => {

  return (
    <div className="card-profile md:w-[95%] transition duration-300 transform rounded shadow-lg hover:scale-90">
      <img src={src} alt={alt} className="card--img"/>
    </div>
  )
}

export default Imagecards
