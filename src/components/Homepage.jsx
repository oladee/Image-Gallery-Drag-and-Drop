import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import Imagecards from './Imagecards'

const Homepage = ({moveImage, imageData}) => {

    

    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/')
        }

        if (!authToken) {
            navigate('/login')
        }
        

    },[])

    const imageDetailing = imageData.map((x, index) => <Imagecards key={x.url} index={index} id={x.id} src={x.src?.small} alt={x.alt} moveImage={moveImage} />)

  return (
    
    <div className='card-list py-[5px] w-[100%]
    flex flex-wrap justify-center md:grid md:place-content-center md:grid-cols-[repeat(4,auto)]' >
      {imageDetailing}
    </div>
  )
}

export default Homepage
