import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react'

const Homepage = () => {
    let navigate = useNavigate();
    useEffect(() => {
        let authToken = sessionStorage.getItem('Auth Token')

        if (authToken) {
            navigate('/home')
        }

        if (!authToken) {
            navigate('/login')
        }
    }, [])
  return (
    
    <div>
      hello
    </div>
  )
}

export default Homepage
