import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import Imagecards from './Imagecards'
import LoadingAnim from './LoadingAnim'
import background from '../assets/BG.svg'
import axios from 'axios'
import Search from './Search'
import Badrequest from './Badrequest'

const Homepage = ({moveImage, imageData, setImageData}) => {
  const [loading, setLoading] = useState(false)
const [errors, setErrors] = useState('')
    

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

    useEffect(() => {
      const getData = async () =>{
        try {
          setLoading(true)
          var res = await axios.get('https://api.pexels.com/v1/curated?per_page=8',{
            headers:{
              Authorization: import.meta.env.VITE_IMAGE_KEY,
              
            }
            
          })
          setImageData(res.data.photos)
          setTimeout(()=>{
            setLoading(false)
          },2000)
        } catch (error) {
          setLoading(false)
          setErrors(error.message)
        }
      }
      getData()
      
    }, []);

    if(imageData.length < 1){
      var imageDetailing = 'Looks like your item is out of this World, try another keyword'
    }
      imageDetailing = imageData.map((x, index) => <Imagecards key={x.url} index={index} id={x.id} src={x.src?.portrait} alt={x.alt} moveImage={moveImage} photographer={x.photographer} name={x.alt} />)

  return (
    
    <div className='h-screen '>
      <div className='h-[10svh] '>
      <Search setLoading={setLoading} setImageData={setImageData} setErrors={setErrors}/>
      </div>
      <div className='card-list py-[5px] md:h-[90svh]
    flex flex-wrap  justify-center md:gap-5 md:grid md:place-content-center md:grid-cols-[repeat(4,auto)]'  >
      {loading ? (<LoadingAnim/>) : errors ? (<Badrequest message={errors}/>) : imageDetailing}
    </div>
    </div>
  )
}

export default Homepage
