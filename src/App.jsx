import { Routes, Route } from "react-router-dom";
import Form from "./components/Form";
import { useState} from "react";
import Homepage from "./components/Homepage";
import{
  DndProvider,
  TouchTransition,
  MouseTransition,
  Preview
} from "react-dnd-multi-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { TouchBackend } from "react-dnd-touch-backend";


function App() {

 const HTML5toTouch = {
    backends: [
      {
        id: "html5",
        backend: HTML5Backend,
        transition: MouseTransition,
      },
      {
        id: "touch",
        backend: TouchBackend,
        options: { enableMouseEvents: true },
        preview: true,
        transition: TouchTransition,
      },
    ],
  }; 

// const isTouchDevice = () => {
//   if ("ontouchstart" in window) {
//     return true;
//   }
//   return false;
// };

// const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;


  const [imageData, setImageData] = useState([]);

  
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
        <Route path="/login" element={<Form title='LOGIN' />} />
        <Route path="/register" element={<Form title='REGISTER' />} />
        <Route
          path="/"
          element={
            <DndProvider options={HTML5toTouch}>
              <Homepage moveImage={moveImage} imageData={imageData} setImageData={setImageData}/>

            </DndProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
