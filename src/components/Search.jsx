import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import ticket from '../assets/Two Tickets.svg'
import search from '../assets/Search.svg'
import axios from 'axios'


const Search = ({setLoading, setImageData, setErrors}) => {
    let navigate = useNavigate()

    const [inputValue, SetInputValue] = useState('')
  

  
    const searcher = async (queries) =>{
      try {
        setErrors('')
        setLoading(true)
        var res = await axios.get(`https://api.pexels.com/v1/search?query=${queries}&per_page=8`,{
          method: 'GET',
          headers:{
            Accept: "application/json",
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
  

  function handleSearch(e){
    e.preventDefault()
    searcher(inputValue)
  }


  return (
    <nav className='px-8 md:px-14 py-3 bg-slate-600 bg-cover'>
        <ul className="flex items-center justify-between  text-white">
          <img src={ticket} alt="logo" className="w-[20%] md:w-14 stroke-cyan-500 " />

          <form className="flex border-2 border-white rounded-md justify-between w-52 md:w-[50%] px-1 items-center" onSubmit={handleSearch}>
            <input
              type="text"
              name="userSearch"
              id="userSearch"
              value={inputValue}
              onChange={(event) => SetInputValue(event.target.value)}
              placeholder="Search by title or place or event"
              className="bg-transparent opacity- font-normal w-3/4 placeholder-white outline-none"
              autoComplete='off'
            />
            <img src={search} alt="searchIcon" onClick={handleSearch}
            />
          </form>

          <div className="hidden md:flex items-center">
            <h5 className="mr-5 bg-rose-700 py-1 px-6 cursor-pointer hover:bg-slate-400 hover:text-rose-700 transition-all rounded-md font-medium" onClick={
                ()=>{
                    sessionStorage.clear()
                    navigate('/login')
                }
            }>Sign out</h5>
          </div>
        </ul>
      </nav>
  )
}

export default Search
