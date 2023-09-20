import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { useState, useEffect } from "react";
import Homepage from "./components/Homepage";
import {
  DndProvider,
  TouchTransition,
  MouseTransition,
} from "react-dnd-multi-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { TouchBackend } from "react-dnd-touch-backend";
import axios from "axios";


function App() {

//  const HTML5toTouch = {
//     backends: [
//       {
//         id: "html5",
//         backend: HTML5Backend,
//         transition: MouseTransition,
//       },
//       {
//         id: "touch",
//         backend: TouchBackend,
//         options: { enableMouseEvents: true },
//         preview: true,
//         transition: TouchTransition,
//       },
//     ],
//   };

const isTouchDevice = () => {
  if ("ontouchstart" in window) {
    return true;
  }
  return false;
};

const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;


  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const getData = async () =>{
      try {
        var res = await axios.get('https://api.pexels.com/v1/curated?per_page=8',{
          headers:{
            Authorization: import.meta.env.VITE_IMAGE_KEY,
            
          }
          
        })
        setImageData(res.data.photos)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
    
  }, []);
console.log(imageData)
  const moveImage = (dragIndex, hoverIndex) => {
    const draggedImage = imageData[dragIndex];

    setImageData(
      update(imageData, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, draggedImage],
        ],
      })
    );
  };

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
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
