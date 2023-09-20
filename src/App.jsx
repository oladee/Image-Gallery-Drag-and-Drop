import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import {useState, useEffect} from 'react'
import Homepage from "./components/Homepage";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import {TouchBackend }from "react-dnd-touch-backend";
import { createClient } from 'pexels'

function App() {
  const isTouchDevice = () => {
    if ("ontouchstart" in window) {
      return true;
    }
    return false;
  };

  const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;

  const [imageData, setImageData] = useState([])

  useEffect(()=>{
    const client = createClient('QPBd3qLXlS8mfqMwhwVqmMuMuZbau4tEMku2VabcadkOBKJTF2VnEJfI');

        client.photos.curated({ per_page: 8 }).then(photos => setImageData(photos.photos));
  },[])

  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = imageData[dragIndex];

    setImageData(
      update(imageData, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, draggedImage]]
      })
    );
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <DndProvider backend={backendForDND}>
              <Homepage moveImage={moveImage} imageData={imageData} />
            </DndProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
