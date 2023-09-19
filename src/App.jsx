import {Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Homepage from './components/Homepage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Homepage/>}/>
      </Routes>
    </>
  )
}

export default App
