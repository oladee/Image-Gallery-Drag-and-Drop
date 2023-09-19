import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import { createClient } from 'pexels'
import Imagecards from './Imagecards'

const Homepage = () => {

    const [imageData, setImageData] = useState([{

    }])

    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')
        }

        if (!authToken) {
            navigate('/login')
        }

        const client = createClient('QPBd3qLXlS8mfqMwhwVqmMuMuZbau4tEMku2VabcadkOBKJTF2VnEJfI');

        client.photos.curated({ per_page: 10 }).then(photos => setImageData(photos.photos));

    },[])
    console.log(imageData)

    const imageDetailing = imageData.map(x => <Imagecards key={x.url} src={x.src?.small} alt={x.alt}/>)

  return (
    
    <div className='card-list py-[15px] gap-[15px] md:w-[100%] md:grid md:place-content-center md:grid-cols-[repeat(4,auto)]' >
      {imageDetailing}
      <img src='' alt="" />
    </div>
  )
}

export default Homepage
